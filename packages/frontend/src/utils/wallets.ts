const walletQuery = `wallets {
    BTC {
      address
      txsCount
    }
    TEST_BTC {
      address
      txsCount
    }
    USDT_POLYGON {
      address
      txsCount
    }
    TEST_USDT_POLYGON {
      address
      txsCount
    }
  }`;

export default walletQuery;
