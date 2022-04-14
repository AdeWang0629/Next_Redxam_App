const walletQuery = `wallets {
    BTC {
      address
      txsCount
    }
    TEST_BTC {
      address
      txsCount
    }
    MATIC {
      address
      txsCount
    }
    TEST_MATIC {
      address
      txsCount
    }
  }`;

export default walletQuery;
