import { UserProps, DepositsProps } from '@/database';
import { emailStatus } from '@/apis/sendgrid';

export interface Token {
  readonly name: string;
  readonly symbol: string;
  readonly network: string;
  readonly isTestNet: boolean;
  readonly txFee: number;
  readonly threshold: number;
  readonly redxamAddress: string;

  createWallet(): Wallet;
  validateAddress(address: string): boolean;
  getBalance(address: string): Promise<number>;
  getWallets(): Promise<Wallet[]>;
  getWalletTxs(addres: string): Promise<Transaction[]>;
  hasWalletNewTxs(wallet: Wallet, txs: Deposit[]): boolean;
  getWalletDeposits(txs: Transaction[], address: string): Deposit[];
  updateWalletDeposits(deposits: Deposit[], wallet: Wallet): Promise<void>;
  isPendingDeposit(status: DepositStatus, deposit: DepositsProps): boolean;
  isConfirmedDeposit(status: DepositStatus, deposit: DepositsProps): boolean;
  isCofirmedDepositWithoutPending(
    status: DepositStatus,
    deposit: DepositsProps
  ): boolean;
  getUser(userId: string): Promise<UserProps>;
  depositConfirmationMailing(
    deposit: Deposit,
    userId: string
  ): Promise<emailStatus>;
  getUnspentInfo(txs: Transaction[], wallet: Wallet): Promise<UnspentInfo>;
  handleThreshold(unspentInfo: UnspentInfo, wallet: Wallet): Promise<void>;
  createRawTx(txData: TxData, unspentInfo: UnspentInfo): { hash: string };
  tokenToFiat(amount: number, fiat: Fiats): Promise<number>;
}

export type Fiats = 'USD' | 'EUR' | 'AED';

export type DepositStatus = 'pending' | 'completed';

export interface Wallet {
  address: string;
  wif: string;
  txsCount: number;
  hasPendingTxs: boolean;
  userId?: string;
}

export interface TxData {
  senderWIF: string;
  receiverAddress: string;
}

export interface UnspentInfo {
  balance: number;
  outputs: {
    hash: string;
    index: number;
    value: number;
  }[];
}

export type Transaction = TransactionBTC | TransactionMatic;

export interface TransactionBTC {
  blockId: string | number;
  hash: string;
  outputs: {
    address: string;
    value: number;
  }[];
}

export interface TransactionMatic {
  blockId: string | number;
  hash: string;
  value: number;
  address: string;
}

export interface Deposit {
  blockId: string | number;
  value: number;
  index: number;
  hash: string;
}
