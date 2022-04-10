/* eslint-disable lines-between-class-members */
import WAValidator from 'trezor-address-validator';
import axios from 'axios';
import { ethers } from 'ethers';
import crypto from 'crypto';
import Web3 from 'web3';
import { ECPair, payments, networks, TransactionBuilder } from 'bitcoinjs-lib';
import * as Sentry from '@sentry/node';
import {
  sendPendingTxEmail,
  sendConfirmedTxEmail,
  emailStatus,
  sendBalanceSurpassThreshold
} from '@/apis/sendgrid';
import blockchair from '@/apis/blockchair';
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
  Transaction,
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
  getBalance(address: string): Promise<number> {
    return new Promise((resolutionFunc, _) => resolutionFunc(0));
  }
  getWalletTxs(address: string): Promise<Transaction[]> {
    return new Promise((resolutionFunc, _) => resolutionFunc([]));
  }
  hasWalletNewTxs(wallet: Wallet, txs: Deposit[]): boolean {
    return false;
  }
  getWalletDeposits(txs: Transaction[], address: string): Deposit[] {
    return [];
  }
  updateWalletDeposits(deposits: Deposit[], wallet: Wallet): Promise<void> {
    return new Promise((resolutionFunc, _) => resolutionFunc(null));
  }
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
  getUnspentInfo(txs: Transaction[], wallet: Wallet): Promise<UnspentInfo> {
    throw new Error('Method not implemented.');
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
      if (this.isPendingDeposit(status, dbDeposit)) {
        const user = await this.getUser(userId);
        return sendPendingTxEmail(
          user,
          this.symbol,
          deposit.value * 0.00000001
        );
      } else if (this.isConfirmedDeposit(status, dbDeposit)) {
        const user = await this.getUser(userId);
        return sendConfirmedTxEmail(
          user,
          this.symbol,
          deposit.value * 0.00000001
        );
      } else if (this.isCofirmedDepositWithoutPending(status, dbDeposit)) {
        const user = await this.getUser(userId);
        return sendConfirmedTxEmail(
          user,
          this.symbol,
          deposit.value * 0.00000001
        );
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  async tokenToFiat(wey: number, fiat: Fiats): Promise<number> {
    const tokenPrice = (
      await axios.get(
        // eslint-disable-next-line max-len
        'https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd'
      )
    ).data['matic-network'][fiat.toLowerCase()];
    return wey * 0.00000001 * tokenPrice;
  }
  async getWallets(): Promise<Wallet[]> {
    return (
      await User.find(
        {
          wallets: { $exists: true },
          verification: true,
          accountStatus: 'accepted'
        },
        { _id: 1, 'wallets.MATIC': 1 }
      )
    ).map(user => ({
      userId: user._id,
      address: user.wallets.MATIC.address,
      txsCount: user.wallets.MATIC.txsCount,
      hasPendingTxs: user.wallets.MATIC.hasPendingTxs,
      wif: user.wallets.MATIC.wif
    }));
  }
}
