import { verify } from 'jsonwebtoken';
import { Admin } from '@/database';
import getAuthorizationToken from '../share/getAuthorizationToken';

interface adminToken {
  adminId: string;
}

const { TOKEN_SECURITY_KEY } = process.env;

export const isValidAdmin = async authorization => {
  const auth = getAuthorizationToken(authorization);
  if (!auth.success) return { message: auth.message, success: auth.success };
  const payload = verify(auth.token, TOKEN_SECURITY_KEY) as adminToken;
  const adminData = await Admin.findOne({ _id: payload.adminId });
  if (!adminData) return { success: false, message: 'invalid admin token' };
  return { success: true };
};
