import WAValidator from 'trezor-address-validator';
import { ECPair, payments, networks } from 'bitcoinjs-lib';
import * as Sentry from '@sentry/node';
import blockchain from '@/apis/blockchain';
import { User } from '@/database';
import { Token, Wallet, UserWallet } from './token';

interface WalletDeposit {
  block_id: string | number;
  value: number;
  txIndex: number;
  txHash: string;
}

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
    return { address, wif, txsCount: 0 };
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
        { wallet: { $exists: true }, verification: true, accountStatus: 'accepted' },
        { _id: 1, wallet: 1, hasPendingTxs: 1 },
      )
    ).map(doc => ({ ...doc, userId: doc._id } as UserWallet));
  }

  async getWalletTxs(address: string): Promise<Tx[]> {
    const res = await blockchain.getTxByAddress(address);
    if (res.status === 200) {
      return res.txs;
    } else {
      Sentry.captureException(res.error);
      return [];
    }
  }

  getWalletDeposits(txs: Tx[], address: string): WalletDeposit[] {
    const userTxs: WalletDeposit[] = [];

    txs.forEach(tx => {
      const outputs = tx.outputs.filter(output => output.address === address);
      outputs.forEach((out, index) =>
        userTxs.push({
          block_id: tx.height,
          value: out.value,
          txIndex: index,
          txHash: tx.hash,
        }),
      );
    });

    return userTxs;
  }

  sendToAddress(address: string, amount: number): boolean {
    return true;
  }

  // Methods not defined in the interface should be private
  private someBitcoinMethod(): void {
    // ...
  }
}
