export interface Token {
  readonly name: string;
  readonly symbol: string;
  readonly network: string;
  readonly isTestNet: boolean;

  createWallet(): Wallet;
  validateAddress(address: string): boolean;
  getBalance(address: string): Promise<number>;
  getWallets(): Promise<UserWallet[]>;
  getWalletTxs(addres: string): Promise<Transaction[]>;
  hasWalletNewTxs(wallet: UserWallet, txs: Transaction[]): boolean;
  getWalletDeposits(txs: Transaction[], address: string): Deposit[];
  updateWalletDeposits(deposits: Deposit[], wallet: UserWallet): Promise<void>;
  sendToAddress(address: string, amount: number): boolean;
}

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
