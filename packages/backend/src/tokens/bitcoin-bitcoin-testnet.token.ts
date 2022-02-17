import { User } from '@/database';
import { Token, Wallet } from './token';
import { BitcoinBitcoinMainnetToken } from './bitcoin-bitcoin-mainnet.token';
import {
  TEST_BTC_BALANCE_THRESHOLD,
  TEST_BTC_TX_FEE,
  TEST_REDXAM_ADDRESS,
} from './consts';


export class BitcoinBitcoinTestnetToken
  extends BitcoinBitcoinMainnetToken
  implements Token {

  readonly symbol;

  readonly isTestNet;

  readonly txFee;

  readonly threshold;

  readonly redxamAddress;

  constructor() {
    super();
    this.isTestNet = true;
    this.symbol = 'TEST_BTC';
    this.txFee = TEST_BTC_TX_FEE;
    this.threshold = TEST_BTC_BALANCE_THRESHOLD;
    this.redxamAddress = TEST_REDXAM_ADDRESS;
  }

  async getWallets(): Promise<Wallet[]> {
    return (
      await User.find(
        {
          wallets: { $exists: true },
          verification: true,
          accountStatus: 'accepted',
        },
        { _id: 1, 'wallets.TEST_BTC': 1 },
      )
    ).map(user => ({
      userId: user._id,
      address: user.wallets.TEST_BTC.address,
      txsCount: user.wallets.TEST_BTC.txsCount,
      hasPendingTxs: user.wallets.TEST_BTC.hasPendingTxs,
      wif: user.wallets.TEST_BTC.wif,
    }));
  }
}
