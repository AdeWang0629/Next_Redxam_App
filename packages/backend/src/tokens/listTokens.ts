import * as Sentry from '@sentry/node';
import { Token } from './token';
import { BitcoinBitcoinMainnetToken } from './bitcoin-bitcoin-mainnet.token';
import { BitcoinBitcoinTestnetToken } from './bitcoin-bitcoin-testnet.token';

export const tokens: Token[] = [new BitcoinBitcoinMainnetToken(), new BitcoinBitcoinTestnetToken()];

const tokenWatcher = () => {
  let interval;
  try {
    interval = setInterval(() => {
      tokens.forEach(async token => {
        const wallets = await token.getWallets();
        for (const wallet of wallets) {
          const txs = await token.getWalletTxs(wallet.wallet.address);
          const hasNewTxs = token.hasWalletNewTxs(wallet, txs);
          if (hasNewTxs) {
            const deposits = token.getWalletDeposits(txs, wallet.wallet.address);
            await token.updateWalletDeposits(deposits, wallet);
          }

          const unspentInfo = await token.getUnspentInfo(txs, wallet);
          await token.handleThreshold(unspentInfo, wallet);
        }
      });
    }, 30000);
  } catch (error) {
    Sentry.captureException(error);
    clearInterval(interval);
  }
};

export default tokenWatcher;
