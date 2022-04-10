import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import { Admin, User } from '@/database';
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
  const users = await User.find({}, { wallets: { MATIC: 0 } });
  for (const user of users) {
    const newWallets = generateWallets();
    const wallets = user.wallets;
    if (wallets.MATIC) {
      continue;
    } else {
      wallets.MATIC = newWallets.MATIC;
    }
    console.log(wallets);
    try {
      await user.updateOne({ $set: { wallets } });
    } catch (e) {
      console.error(e);
    }
  }
};
