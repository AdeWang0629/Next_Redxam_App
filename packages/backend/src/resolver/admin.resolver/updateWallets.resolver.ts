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
  User.find().then(async res => {
    for (const user of res) {
      const newWallets = generateWallets();
      if (user.wallets.MATIC) {
        await User.updateOne(
          { _id: user._id },
          {
            $set: {
              'wallets.USDT_POLYGON': {
                ...user.wallets.MATIC,
                txsCount: 0,
                hasPendingTxs: false
              },
              'wallets.POLYGON_USDC': {
                ...user.wallets.MATIC,
                txsCount: 0,
                hasPendingTxs: false
              },
              'wallets.POLYGON_DAI': {
                ...user.wallets.MATIC,
                txsCount: 0,
                hasPendingTxs: false
              }
            }
          }
        );
      } else if (!user.wallets.USDT_POLYGON) {
        await User.updateOne(
          { _id: user._id },
          {
            $set: {
              'wallets.USDT_POLYGON': newWallets.USDT_POLYGON,
              'wallets.POLYGON_USDC': newWallets.USDT_POLYGON,
              'wallets.POLYGON_DAI': newWallets.USDT_POLYGON
            }
          }
        );
      } else {
        await User.updateOne(
          { _id: user._id },
          {
            $set: {
              'wallets.POLYGON_USDC': user.wallets.USDT_POLYGON,
              'wallets.POLYGON_DAI': user.wallets.USDT_POLYGON
            }
          }
        );
      }
      if (user.wallets.TEST_MATIC) {
        await User.updateOne(
          { _id: user._id },
          {
            $set: {
              'wallets.TEST_USDT_POLYGON': {
                ...user.wallets.MATIC,
                txsCount: 0,
                hasPendingTxs: false
              }
            }
          }
        );
      } else if (!user.wallets.TEST_USDT_POLYGON) {
        await User.updateOne(
          { _id: user._id },
          {
            $set: { 'wallets.TEST_USDT_POLYGON': newWallets.TEST_USDT_POLYGON }
          }
        );
      }
    }
  });
};
