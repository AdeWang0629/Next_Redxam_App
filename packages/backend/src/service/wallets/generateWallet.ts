import { tokens } from '@/tokens/listTokens';
import { SimpleWallet, TokenWallet } from '@/database/types';
import { NETWORK } from './consts';

/**
 *
 * @returns new BTC wallet
 * From: https://gist.github.com/bitgord/7cc3b4269b22765613a1340d6695865e
 */
export const generateWallets = (): TokenWallet => {
  const wallets = {};
  tokens.forEach(token => {
    wallets[token.symbol] = token.createWallet() as SimpleWallet;
  });
  return wallets as TokenWallet;
};
