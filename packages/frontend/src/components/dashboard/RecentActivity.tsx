import { useState, useEffect } from 'react';
import api from '@utils/api';
import { Deposit } from '@utils/types';
import TsxsTable from './deposits/TransactionsTable';

const RecentActivity = () => {
  const [deposits, setDeposits] = useState<[] | [Deposit]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(userDepositsData.data.userTransactions);
      setLoading(false);
    })();
  }, []);

  return (
    <TsxsTable
      deposits={deposits.filter(val => val.direction === 'DEPOSIT')}
      depositsType="all"
      loading={loading}
    />
  );
};

export default RecentActivity;
