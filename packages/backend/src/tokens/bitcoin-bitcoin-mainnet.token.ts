import WAValidator from 'trezor-address-validator';
import { ECPair, payments, networks } from 'bitcoinjs-lib';
import * as Sentry from '@sentry/node';
import blockchain from '@/apis/blockchain';
import { User, Deposits, DepositsType } from '@/database';
import { Token, Wallet, UserWallet, Transaction, Deposit } from './token';

export class BitcoinBitcoinMainnetToken implements Token {
  readonly name = 'Bitcoin';

  readonly symbol = 'BTC';

  readonly network = 'Bitcoin';

  readonly isTestNet = false;

  createWallet(): Wallet {
    const network = networks['bitcoin'];
    const keyPair = ECPair.makeRandom({ network });
    const { address } = payments.p2pkh({ pubkey: keyPair.publicKey, network });
    const wif = keyPair.toWIF();
    return { address, wif, txsCount: 0, hasPendingTxs: false };
  }

  validateAddress(address: string): boolean {
    return WAValidator.validate(address, this.symbol);
  }

  async getBalance(address: string): Promise<number> {
    const balance = await blockchain.getAddressBalance(address);
    return balance;
  }

  async getWallets(): Promise<UserWallet[]> {
    return (
      await User.find(
        { wallets: { $exists: true }, verification: true, accountStatus: 'accepted' },
        { _id: 1, 'wallets.BTC': 1 },
      )
  }

  async getWalletTxs(address: string): Promise<Transaction[]> {
    const res = await blockchain.getTxByAddress(address);
    if (res.status === 200) {
      return res.txs.map(tx => ({
        blockId: tx.height,
        hash: tx.hash,
        outputs: tx.outputs,
      }));
    } else {
      Sentry.captureException(res.error);
      return [];
    }
  }

  getWalletDeposits(txs: Transaction[], address: string): Deposit[] {
    const userTxs: Deposit[] = [];

    txs.forEach(tx => {
      const outputs = tx.outputs.filter(output => output.address === address);
      outputs.forEach((out, index) =>
        userTxs.push({
          blockId: tx.blockId,
          value: out.value,
          index,
          hash: tx.hash,
        }),
      );
    });

    return userTxs;
  }

  hasWalletNewTxs(wallet: UserWallet, txs: Transaction[]): boolean {
    return txs.length > wallet.wallet.txsCount || wallet.wallet.hasPendingTxs;
  }

  async updateWalletDeposits(deposits: Deposit[], wallet: UserWallet): Promise<void> {
    let hasPendingTxs = false;

    for (const deposit of deposits) {
      const status = deposit.blockId > 0 ? 'completed' : 'pending';
      if (deposit.blockId === -1) hasPendingTxs = true;

      await Deposits.updateOne(
        { userId: wallet.userId, hash: deposit.hash },
        {
          $set: {
            userId: wallet.userId,
            address: wallet.wallet.address,
            index: deposit.index,
            type: DepositsType.CRYPTO,
            currency: this.symbol,
            processedByRedxam: false,
            hash: deposit.hash,
            amount: deposit.value,
            status,
          },
          $setOnInsert: {
            timestamp: Date.now(),
          },
        },
        {
          upsert: true,
        },
      );
    }

    await User.updateOne(
      {
        _id: wallet.userId,
      },
      {
        $set: { hasPendingTxs, 'wallet.txsCount': deposits.length },
      },
    );
  }

  sendToAddress(address: string, amount: number): boolean {
    return true;
  }

  // Methods not defined in the interface should be private
  private someBitcoinMethod(): void {
    // ...
  }
}
