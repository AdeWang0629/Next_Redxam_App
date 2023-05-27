import { tokens } from '@/tokens/listTokens';
import { SimpleWallet, TokenWallet } from '@/database/types';

const polygonERC20 = ['TEST_POLYGON_USDT', 'POLYGON_USDC', 'POLYGON_DAI'];

/**
 *
 * @returns new BTC wallet
 * From: https://gist.github.com/bitgord/7cc3b4269b22765613a1340d6695865e
 */
export const generateWallets = (): TokenWallet => {
  const wallets = {};
  try {
    tokens.forEach(token => {
      wallets[token.network] = token.createWallet() as SimpleWallet;
    });
  } catch (e) {
    console.error(e);
  }
  for (const token of polygonERC20) {
    wallets[token] = wallets['POLYGON_USDT'];
  }
  console.log(wallets);
  return wallets as TokenWallet;
};
