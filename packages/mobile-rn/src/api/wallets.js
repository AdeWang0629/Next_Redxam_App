const walletQuery = `wallets {
    BTC {
      address
      txsCount
    }
    TEST_BTC {
      address
      txsCount
    }
    POLYGON_USDT {
      address
      txsCount
    }
    TEST_POLYGON_USDT {
      address
      txsCount
    }
    POLYGON_USDC {
      address
      txsCount
    }
    POLYGON_DAI {
      address
      txsCount
    }
  }`;

export default walletQuery;
