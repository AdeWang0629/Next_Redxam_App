export interface Token {
  readonly name: string;
  readonly symbol: string;
  readonly network: string;
  readonly isTestNet: boolean;

  createWallet(): Wallet;
  validateAddress(address: string): boolean;
  sendToAddress(address: string, amount: number): boolean;
  getBalance(address: string): Promise<number>;
}

export interface Wallet {
  address: string;
  wif: string;
  txsCount: number;
}
