import { useState, useEffect } from 'react';
import api from '@utils/api';
import { Deposit } from '@utils/types';

import TsxsTable from './TransactionsTable';

const CryptoDeposits = () => {
  const [deposits, setDeposits] = useState<[] | Deposit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(
        userDepositsData.data.userTransactions
          .filter((deposit: { type: string }) => deposit.type === 'CRYPTO')
          .sort(
            (
              firstTimestamp: { timestamp: number },
              secondTimeStamp: { timestamp: number }
            ) => secondTimeStamp.timestamp - firstTimestamp.timestamp
          )
      );
      setLoading(false);
    })();
  }, []);
  return (
    <TsxsTable deposits={deposits} depositsType="crypto" loading={loading} />
  );
};

export default CryptoDeposits;
