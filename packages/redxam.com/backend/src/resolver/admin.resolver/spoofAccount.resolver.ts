import { verify } from 'jsonwebtoken';
import { Admin } from '@/database';
import { Request } from 'express';
import getAuthorizationToken from '../share/getAuthorizationToken';

import { JWT } from '@/config/jwt';
import { User, UserProps } from '@/database';
import { Argument, SpoofInput } from '../types';

const key = process.env.TOKEN_SECURITY_KEY;

export interface adminToken {
  adminId: string;
}

const fetchUser = async (
  data: string
): Promise<Pick<UserProps, '_id' | 'accountStatus'>> => {
  return User.findOne({ $or: [{ email: data }, { phone: data }] }, { _id: 1 })
    .lean()
    .exec();
};

const generateURL = async (userId, origin) => {
  const loginToken = await new JWT({ userId, type: 'login' }).sign();
  const makeURL = (token: string, originURL: string) =>
    originURL + `/verify?token=${token}`;
  const loginUrl = makeURL(loginToken, origin);
  return loginUrl;
};

export const spoofAccount = async (
  { arg }: Argument<SpoofInput>,
  req: Request
) => {
  console.log('[Resolve] spoofer');
  const auth = getAuthorizationToken(req.headers.authorization);

  if (!auth.success) return auth;

  const payload = verify(auth.token, key) as adminToken;

  try {
    const adminData = await Admin.findOne({ _id: payload.adminId });
    if (!adminData) return { success: false, message: 'admin not found' };

    console.log(arg.email);
    const user = await fetchUser(arg.email);
    const userLoginUrl = generateURL(user, req.headers.origin);

    return { success: true, message: userLoginUrl };
  } catch (err) {
    return { success: false, message: err.message };
  }
};
