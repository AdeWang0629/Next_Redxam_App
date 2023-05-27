import { verify } from 'jsonwebtoken';
import {
  Admin,
  Transactions,
  TransactionTypes,
  TransactionStatus
} from '@/database';
import { Request } from 'express';
import getAuthorizationToken from '../share/getAuthorizationToken';

const key = process.env.TOKEN_SECURITY_KEY;

export interface adminToken {
  adminId: string;
}

export const getTransactions = async (_: void, req: Request) => {
  console.debug('[Resolve] admin called');
  const auth = getAuthorizationToken(req.headers.authorization);

  if (!auth.success) return auth;

  const payload = verify(auth.token, key) as adminToken;

  try {
    const adminData = await Admin.findOne({ _id: payload.adminId });
    if (!adminData) return { success: false, message: 'admin not found' };

    const transactions = await Transactions.aggregate([
      {
        $match: {
          status: TransactionStatus.PENDING
        }
      },
      { $addFields: { ObjectUserId: { $toObjectId: '$userId' } } },
      {
        $lookup: {
          from: 'users',
          localField: 'ObjectUserId',
          foreignField: '_id',
          pipeline: [{ $project: { email: 1, _id: 0 } }],
          as: 'user'
        }
      },
      { $unwind: '$user' },
      { $addFields: { email: '$user.email' } }
    ]);

    return { transactions, success: true, message: '' };
  } catch (err) {
    return { success: false, message: err.message };
  }
};
