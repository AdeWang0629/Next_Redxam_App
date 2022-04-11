/* eslint-disable lines-between-class-members */
import axios from 'axios';
import { ethers } from 'ethers';
import crypto from 'crypto';
import Web3 from 'web3';
import * as Sentry from '@sentry/node';
import matic from '@/apis/polygon';
import { MaticTx } from '@/apis/polygon/types';
import {
  sendPendingTxEmail,
  sendConfirmedTxEmail,
  emailStatus,
  sendBalanceSurpassThreshold
} from '@/apis/sendgrid';
import {
  User,
  Deposits,
  InternalDeposits,
  DepositsType,
  UserProps,
  DepositsProps
} from '@/database';
import {
  Token,
  Wallet,
  TransactionMatic,
  Deposit,
  DepositStatus,
  UnspentInfo,
  TxData,
  Fiats
} from './token';
import {
  MATIC_TX_FEE,
  MATIC_BALANCE_THRESHOLD,
  REDXAM_ADDRESS_MATIC
} from './consts';

export class MATICMainnetToken implements Token {
  isPendingDeposit(status: DepositStatus, deposit: DepositsProps): boolean {
    return false;
  }
  isConfirmedDeposit(status: DepositStatus, deposit: DepositsProps): boolean {
    return false;
  }
  isCofirmedDepositWithoutPending(
    status: DepositStatus,
    deposit: DepositsProps
  ): boolean {
    return false;
  }
  getUnspentInfo(txs: [], wallet: Wallet) {
    return null;
  }
  handleThreshold(unspentInfo: UnspentInfo, wallet: Wallet): Promise<void> {
    return new Promise((resolutionFunc, _) => resolutionFunc(null));
  }
  createRawTx(txData: TxData, unspentInfo: UnspentInfo): { hash: string } {
    return { hash: 'asd' };
  }
  readonly name = 'Polygon';
  readonly symbol = 'MATIC';
  readonly network = 'Matic';
  readonly isTestNet = false;
  readonly txFee = MATIC_TX_FEE;
  readonly threshold = MATIC_BALANCE_THRESHOLD;
  readonly redxamAddress = REDXAM_ADDRESS_MATIC;
  createWallet(): Wallet {
    const id = crypto.randomBytes(32).toString('hex');
    const privateKey = '0x' + id;
    const wallet = new ethers.Wallet(privateKey);
    return {
      address: wallet.address,
      wif: privateKey,
      txsCount: 0,
      hasPendingTxs: false
    };
  }
  validateAddress(address: string): boolean {
    return Web3.utils.isAddress(address);
  }

  getBalance(address: string): Promise<number> {
    return matic.getWalletBalance(address, this.isTestNet);
  }

  getWalletTxs(address: string): Promise<TransactionMatic[]> {
    return new Promise(resolve => {
      setTimeout(async () => {
        const txs: MaticTx[] = await matic.getWalletTxs(
          address,
          this.isTestNet
        );
        resolve(
          txs.map(tx => ({
            blockId: tx.blockNumber,
            value: tx.value,
            hash: tx.hash,
            address: tx.to
          }))
        );
      }, 500);
    });
  }

  getWalletDeposits(txs: TransactionMatic[], address: string): Deposit[] {
    return txs.map((tx, index) => {
      if (tx.address.toLowerCase() !== address.toLowerCase()) return null;
      return {
        ...tx,
        address,
        index
      };
    });
  }

  hasWalletNewTxs(wallet: Wallet, txs: Deposit[]): boolean {
    return txs.length > wallet.txsCount || wallet.hasPendingTxs;
  }

  async updateWalletDeposits(
    deposits: Deposit[],
    wallet: Wallet
  ): Promise<void> {
    let hasPendingTxs = false;

    for (const deposit of deposits) {
      if (deposit.blockId === -1) hasPendingTxs = true;
      await this.depositConfirmationMailing(deposit, wallet.userId);
      await Deposits.updateOne(
        { userId: wallet.userId, hash: deposit.hash },
        {
          $set: {
            userId: wallet.userId,
            address: wallet.address,
            index: deposit.index,
            type: DepositsType.CRYPTO,
            currency: this.symbol,
            processedByRedxam: false,
            hash: deposit.hash,
            amount: deposit.value
          },
          $setOnInsert: {
            timestamp: Date.now(),
            status: 'pending'
          }
        },
        {
          upsert: true
        }
      );
    }

    const currentWallet = `wallets.${this.symbol}`;

    await User.updateOne(
      {
        _id: wallet.userId
      },
      {
        $set: {
          [`${currentWallet}.hasPendingTxs`]: hasPendingTxs,
          [`${currentWallet}.txsCount`]: deposits.length
        }
      }
    );
  }

  async getUser(userId: string): Promise<UserProps> {
    return User.findOne({ _id: userId });
  }

  async depositConfirmationMailing(
    deposit: Deposit,
    userId: string
  ): Promise<emailStatus> {
    try {
      const status = deposit.blockId > 0 ? 'completed' : 'pending';
      const dbDeposit = await Deposits.findOne({ hash: deposit.hash });
      const decimals = this.isTestNet ? 18 : 6;
      if (this.isPendingDeposit(status, dbDeposit)) {
        const user = await this.getUser(userId);
        return sendPendingTxEmail(
          user,
          this.symbol,
          deposit.value / Math.pow(10, decimals)
        );
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async tokenToFiat(wey: number, fiat: Fiats): Promise<number> {
    const decimals = this.isTestNet ? 18 : 6;
    return wey / Math.pow(10, decimals);
  }
  async getWallets(): Promise<Wallet[]> {
    const res = await User.find(
      {
        [`wallets.${this.symbol}`]: { $exists: true },
        verification: true,
        accountStatus: 'accepted'
      },
      { _id: 1, [`wallets.${this.symbol}`]: 1 }
    );
    return res.map(user => ({
      userId: user._id,
      address: user.wallets[this.symbol].address,
      txsCount: user.wallets[this.symbol].txsCount,
      hasPendingTxs: user.wallets[this.symbol].hasPendingTxs,
      wif: user.wallets[this.symbol].wif
    }));
  }
}
