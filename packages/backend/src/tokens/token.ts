export interface Token {
  readonly name: string;
  readonly symbol: string;
  readonly network: string;
  readonly isTestNet: boolean;

  createWallet(): Wallet;
  validateAddress(address: string): boolean;
  getBalance(address: string): Promise<number>;
  getWallets(): Promise<UserWallet[]>;
  getWalletTxs(addres: string): Promise<Tx[]>;
  sendToAddress(address: string, amount: number): boolean;
  getWalletDeposits(txs: any[], address: string): any[];
}

export interface Wallet {
  address: string;
  wif: string;
  txsCount: number;
}

export interface UserWallet {
  wallet: Wallet;
  userId: string;
  hasPendingTxs: boolean;
}
