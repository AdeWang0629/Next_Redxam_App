import { UserProps, DepositsProps } from '@/database';
import { emailStatus } from '@/apis/sendgrid';

export interface Token {
  readonly name: string;
  readonly symbol: string;
  readonly network: string;
  readonly isTestNet: boolean;
  readonly txFee: number;
  readonly threshold: number;

  createWallet(): Wallet;
  validateAddress(address: string): boolean;
  getBalance(address: string): Promise<number>;
  getWallets(): Promise<UserWallet[]>;
  getWalletTxs(addres: string): Promise<Transaction[]>;
  hasWalletNewTxs(wallet: UserWallet, txs: Transaction[]): boolean;
  getWalletDeposits(txs: Transaction[], address: string): Deposit[];
  updateWalletDeposits(deposits: Deposit[], wallet: UserWallet): Promise<void>;
  sendToAddress(address: string, amount: number): boolean;
  isPendingDeposit(status: DepositStatus, deposit: DepositsProps): boolean;
  isConfirmedDeposit(status: DepositStatus, deposit: DepositsProps): boolean;
  isCofirmedDepositWithoutPending(status: DepositStatus, deposit: DepositsProps): boolean;
  getUser(userId: string): Promise<UserProps>;
  depositConfirmationMailing(deposit: Deposit, userId: string): Promise<emailStatus>;
}

export type NonExist = null | undefined;
export type DepositStatus = 'pending' | 'completed';

export interface Wallet {
  address: string;
  wif: string;
  txsCount: number;
  hasPendingTxs: boolean;
}

export interface UserWallet {
  wallet: Wallet;
  userId: string;
}

export interface Transaction {
  blockId: string | number;
  hash: string;
  outputs: {
    address: string;
    value: number;
  }[];
}

export interface Deposit {
  blockId: string | number;
  value: number;
  index: number;
  hash: string;
}
