import {
  Transactions,
  TransactionTypes,
  TransactionStatus,
  DepositsCurrencyType,
  DepositsType,
  User
} from '@/database';
import { Request } from 'express';
import { CpsInstance } from 'twilio/lib/rest/preview/trusted_comms/cps';
import { handleEmail } from '../../utils/emailHandler';

const requestWithdrawal = async (
  {
    arg
  }: {
    arg: {
      zelleEmail: string;
      amount: number;
      userId: string;
    };
  },
  req: Request
) => {
  console.debug('[Resolve] withdrawals called');
  await Transactions.create({
    userId: arg.userId,
    type: DepositsType.FIAT,
    currency: DepositsCurrencyType.USD,
    direction: TransactionTypes.WITHDRAWAL,
    address: arg.zelleEmail,
    amount: arg.amount,
    timestamp: new Date().getTime(),
    status: TransactionStatus.PENDING
  });

  const user = await User.findOne({ _id: arg.userId }, { email: 1 })
    .lean()
    .exec();
  if (!user) throw new Error('User does not exist');

  handleEmail(user.email, 'withdrawalRequest', 'Your withdrawal was requested');
  return {
    success: true,
    message: 'withdrawal was requested'
  };
};
export default requestWithdrawal;
