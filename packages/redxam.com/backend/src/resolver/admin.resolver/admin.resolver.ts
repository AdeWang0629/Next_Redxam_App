import { verify } from 'jsonwebtoken';
import { Admin } from '@/database';
import { Request } from 'express';
import getAuthorizationToken from '../share/getAuthorizationToken';

const key = process.env.TOKEN_SECURITY_KEY;

export interface adminToken {
  adminId: string;
}

export const admin = async (_: void, req: Request) => {
  console.debug('[Resolve] admin called');
  const auth = getAuthorizationToken(req.headers.authorization);

  if (!auth.success) return auth;

  const payload = verify(auth.token, key) as adminToken;

  try {
    const adminData = await Admin.findOne({ _id: payload.adminId });
    return adminData._id ? adminData : { err: 'admin not found' };
  } catch (err) {
    return { err };
  }
};
