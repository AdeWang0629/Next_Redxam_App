export interface SimpleWallet {
  address: string;
  wif: string;
  txsCount: number;
  hasPendingTxs: boolean;
}

export interface BalanceRecords {
  balance: number;
  timestamp: number;
}

export interface bankAccount {
  accessToken: String;
  accounts: [
    {
      id: String;
      name: String;
      logo: String;
      type: String;
    }
  ];
}

export interface TokenWallet {
  BTC: SimpleWallet;
  TEST_BTC: SimpleWallet;
  POLYGON_USDT: SimpleWallet;
  USDT_POLYGON: SimpleWallet;
  TEST_POLYGON_USDT: SimpleWallet;
  TEST_USDT_POLYGON: SimpleWallet;
  POLYGON_USDC: SimpleWallet;
  POLYGON_DAI: SimpleWallet;
  MATIC: SimpleWallet;
  TEST_MATIC: SimpleWallet;
}
