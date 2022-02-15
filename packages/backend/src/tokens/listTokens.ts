import { Token } from './token';
import { BitcoinBitcoinMainnetToken } from './bitcoin-bitcoin-mainnet.token';

const tokens: Token[] = [new BitcoinBitcoinMainnetToken()];

const tokenWatcher = () => {
  setInterval(() => {
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
};

export default tokenWatcher;
