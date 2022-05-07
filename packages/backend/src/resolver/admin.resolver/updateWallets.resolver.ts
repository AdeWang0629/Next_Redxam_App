import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import { Admin, Deposits } from '@/database';
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
  Deposits.find({ type: 'CRYPTO' }).then(async deposits => {
    for (const deposit of deposits) {
      if (deposit.currency === 'USDT') {
        await deposit.updateOne({ $set: { network: 'POLYGON_USDT' } });
      }
      if (deposit.currency === 'ERC20TEST') {
        await deposit.updateOne({
          $set: { network: 'TEST_POLYGON_USDT', currency: 'USDT' }
        });
      }
      if (deposit.currency === 'DAI') {
        await deposit.updateOne({ $set: { network: 'POLYGON_DAI' } });
      }
      if (deposit.currency === 'USDC') {
        await deposit.updateOne({ $set: { network: 'POLYGON_USDC' } });
      }
      if (deposit.currency === 'BTC') {
        await deposit.updateOne({ $set: { network: 'BTC' } });
      }
      if (deposit.currency === 'TEST_BTC') {
        await deposit.updateOne({
          $set: { network: 'TEST_BTC', currency: 'BTC' }
        });
      }
    }
  });
};
