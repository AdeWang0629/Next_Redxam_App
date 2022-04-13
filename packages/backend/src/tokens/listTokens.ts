import * as Sentry from '@sentry/node';
import { INTERVAL } from './consts';
import { Token } from './token';
import { BitcoinBitcoinMainnetToken } from './bitcoin-bitcoin-mainnet.token';
import { BitcoinBitcoinTestnetToken } from './bitcoin-bitcoin-testnet.token';
import { MATICMainnetToken } from './usdt-polygon-mainnet.token';
import { MATICTestnetToken } from './usdt-polygon-testnet.token';

export const tokens: Token[] = [
  new BitcoinBitcoinMainnetToken(),
  new BitcoinBitcoinTestnetToken(),
  new MATICMainnetToken(),
  new MATICTestnetToken()
];

const tokenWatcher = () => {
  let interval;
  try {
    interval = setInterval(() => {
      tokens.forEach(async token => {
        const wallets = await token.getWallets();
        for (const wallet of wallets) {
          const txs = await token.getWalletTxs(wallet.address);
          const deposits = token.getWalletDeposits(txs, wallet.address);
          const hasNewTxs = token.hasWalletNewTxs(wallet, deposits);
          if (hasNewTxs) {
            await token.updateWalletDeposits(deposits, wallet);
          }

          if (token.getUnspentInfo) {
            const unspentInfo = await token.getUnspentInfo(txs, wallet);
            await token.handleThreshold(unspentInfo, wallet);
          } else if (token.handleTokenThreshold) {
            await token.handleTokenThreshold(wallet);
          }
        }
      });
    }, INTERVAL);
  } catch (error) {
    console.log(error);
    clearInterval(interval);
    Sentry.captureException(error);
  }
};

export default tokenWatcher;
