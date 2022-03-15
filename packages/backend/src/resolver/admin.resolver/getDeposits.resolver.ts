import { verify } from 'jsonwebtoken';
import { Admin, Deposits } from '@/database';
import { Request } from 'express';
import getAuthorizationToken from '../share/getAuthorizationToken';

const key = process.env.TOKEN_SECURITY_KEY;

export interface adminToken {
  adminId: string;
}

export const getDeposits = async (_: void, req: Request) => {
  console.debug('[Resolve] admin called');
  const auth = getAuthorizationToken(req.headers.authorization);

  if (!auth.success) return auth;

  const payload = verify(auth.token, key) as adminToken;

  try {
    const adminData = await Admin.findOne({ _id: payload.adminId });
    if (!adminData) return { success: false, message: 'admin not found' };
    // const deposits = await Deposits.find({ status: 'pending' });
    console.log('alejandro el admin');
    const deposits = await Deposits.aggregate([
      {
        $lookup: {
          from: 'Users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userEmail'
        }
      }
      // { $unwind: 'userEmail' }
      // {
      //   $project: {
      //     email: '$userEmail.email'
      //   }
      // }
    ]);
    console.log(deposits);

    console.log(deposits);
    return { deposits, success: true, message: '' };
  } catch (err) {
    return { success: false, message: err.message };
  }
};
