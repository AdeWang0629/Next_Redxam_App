import { JWT } from '@/config/jwt';
import {
  Contribution,
  TotalPrice,
  User,
  Deposits,
  DepositsType,
  DepositsCurrencyType
} from '@/database';
import { Request } from 'express';
import { tokens } from '@/tokens/listTokens';

const getUserById = (userId: string) => {
  return User.findById(userId).lean().exec();
};

const getTotalContributions = async (): Promise<number> => {
  const [result] = await User.aggregate()
    .group({
      _id: null,
      totalContributions: {
        $sum: '$contribution'
      }
    })
    .exec();

  return result.totalContributions;
};

const getTotalPrice = async () => {
  const totalPrice = await TotalPrice.findOne({}, { _id: 0, price: 1 })
    .lean()
    .exec();

  return parseFloat(totalPrice?.price) || 0;
};

const getUserContribution = (userId: string) => {
  return Contribution.findOne({ user_id: userId }).lean().exec();
};

const getPendingBalance = async (userId: string) => {
  const pendingDeposits = await Deposits.find({ userId, status: 'pending' });
  let pending = 0;
  const tokensHash = {};
  for (const token of tokens) {
    tokensHash[token.symbol] = token;
  }

  for (const deposit of pendingDeposits) {
    if (deposit.currency === DepositsCurrencyType.USD) {
      pending += deposit.amount;
    } else if (deposit.type === DepositsType.CRYPTO) {
      pending += await tokensHash[deposit.currency].tokenToFiat(
        deposit.amount,
        'USD'
      );
    }
  }

  return pending;
};

const getData = async (userId: string) => {
  const userData = getUserById(userId);
  const userContributions = getUserContribution(userId);
  const totalPrice = getTotalPrice();
  const totalContributions = getTotalContributions();
  return Promise.all([
    userData,
    userContributions,
    totalPrice,
    totalContributions
  ]);
};

/**
 * @Choooks22 user query doesn't have params, use authorization header in client instead
 */
export const user = async (_: void, req: Request) => {
  console.debug('[Resolve] user called');
  const payload = await new JWT().authorize(req.headers.authorization);

  if (!payload || payload.type !== 'verified') {
    return null;
  }

  try {
    const data = await getData(payload.userId);

    const [userData, userContributions, totalPrice, totalContributions] = data;
    const pending_balance = await getPendingBalance(payload.userId);
    return [
      {
        ...userData,
        pending_balance,
        contributions: userContributions,
        totalPrice,
        totalContributions
      }
    ];
  } catch {
    return null;
  }
};
