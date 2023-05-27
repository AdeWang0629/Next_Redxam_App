import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import {
  Admin,
  TransactionsProps,
  User,
  UserProps,
  Transactions
} from '@/database';
import getAuthorizationToken from '../share/getAuthorizationToken';
import { handleEmail } from '@/utils/emailHandler';

const { TOKEN_SECURITY_KEY } = process.env;

interface adminToken {
  adminId: string;
}

interface Response {
  success: boolean;
  message: string;
}

export const confirmWithdrawal = async (
  { arg }: { arg: { txId: string; amount: number } },
  req: Request
): Promise<Response> => {
  console.debug('[Resolve] admin called');
  const auth = getAuthorizationToken(req.headers.authorization);
  if (!auth.success) return { message: auth.message, success: auth.success };

  try {
    const payload = verify(auth.token, TOKEN_SECURITY_KEY) as adminToken;

    const adminData = await Admin.findOne({ _id: payload.adminId });
    if (!adminData) return { success: false, message: 'invalid admin token' };

    const tx = await Transactions.findOne({ _id: arg.txId });
    if (!tx)
      return { success: false, message: 'deposit is not in the waitlist' };

    if (tx.status === 'completed')
      return {
        success: false,
        message: `tx status is already ${tx.status}`
      };

    const user = await User.findOne({ _id: tx.userId });

    const newBalance = user.balance - arg.amount;
    await user.updateOne({ balance: newBalance });

    await handleChangeDepositStatus(tx, user);

    return { success: true, message: 'deposit status updated succesfully' };
  } catch (err) {
    console.log(err);
    return { message: err.message, success: false };
  }
};

const handleChangeDepositStatus = async (
  tx: TransactionsProps,
  user: UserProps
) => {
  await tx.updateOne({
    $set: { status: 'completed', processedByRedxam: true }
  });
  await handleEmail(
    user.email,
    'withdrawalConfirmation',
    'Your deposit got processed by redxam 🎉'
  );
};
