import { tokens } from '@/tokens/listTokens';
import { SimpleWallet, TokenWallet } from '@/database/types';

/**
 *
 * @returns new BTC wallet
 * From: https://gist.github.com/bitgord/7cc3b4269b22765613a1340d6695865e
 */
export const generateWallets = (): TokenWallet => {
  const wallets = {};
  try {
    tokens.forEach(token => {
      wallets[token.symbol] = token.createWallet() as SimpleWallet;
    });
  } catch (e) {
    console.error(e);
  }
  return wallets as TokenWallet;
};
