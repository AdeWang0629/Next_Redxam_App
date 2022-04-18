import * as Sentry from '@sentry/node';
import { INTERVAL } from './consts';
import { Token } from './token';
import { BitcoinBitcoinMainnetToken } from './bitcoin-bitcoin-mainnet.token';
import { BitcoinBitcoinTestnetToken } from './bitcoin-bitcoin-testnet.token';
import { USDTMainnetToken } from './usdt-polygon-mainnet.token';
import { USDTTestnetToken } from './usdt-polygon-testnet.token';
import { USDCMainnetToken } from './usdc-polygon-mainnet.token';
import { DAIMainnetToken } from './dai-polygon-mainnet.token';

export const tokens: Token[] = [
  new BitcoinBitcoinMainnetToken(),
  new BitcoinBitcoinTestnetToken(),
  new USDTMainnetToken(),
  new USDTTestnetToken(),
  new USDCMainnetToken(),
  new DAIMainnetToken()
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
