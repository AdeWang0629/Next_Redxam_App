import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import {
  Admin,
  InternalDeposits,
  Transactions,
  TransactionStatus,
  TransactionTypes
} from '@/database';
import getAuthorizationToken from '../share/getAuthorizationToken';
import { generateWallets } from '@/service/wallets';

const { TOKEN_SECURITY_KEY, NODE_ENV } = process.env;

interface adminToken {
  adminId: string;
}

export const updateWallets = async (_: void, req: Request) => {
  console.debug('[Resolve] admin called');
  const auth = getAuthorizationToken(req.headers.authorization);
  if (!auth.success) return { message: auth.message, success: auth.success };

  try {
    const payload = verify(auth.token, TOKEN_SECURITY_KEY) as adminToken;
    const adminData = await Admin.findOne({ _id: payload.adminId });
    if (!adminData) return { success: false, message: 'invalid admin token' };
    await updateWalletsScript();
    return {
      success: true,
      message: 'users wallets updated sucessfully'
    };
  } catch (err) {
    return { message: err.message, success: false };
  }
};

const updateWalletsScript = async () => {
  const txs = await Transactions.find({});
  for (const tx of txs) {
    tx.updateOne({
      $set: {
        direction: TransactionTypes.DEPOSIT
      }
    });
  }
  const internals = await InternalDeposits.find({});
  for (const internal of internals) {
    Transactions.create({
      ...internal.toObject(),
      direction: TransactionTypes.DEPOSIT,
      status: TransactionStatus.PENDING,
      processedByRedxam: false
    });
  }
};
