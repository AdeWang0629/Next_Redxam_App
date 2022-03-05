import { useState, useEffect } from 'react';
import api from '@utils/api';
import TsxsTable from './deposits/TransactionsTable';

const RecentActivity = () => {
  const [deposits, setDeposits] = useState<
  | []
  | [
    {
      type: string;
      amount: number;
      index: null;
      currency: string;
      timestamp: number;
      processedByRedxam: true | false;
      status: string;
      hash: null;
      address: null;
      bankIcon: string | null;
      bankName: string | null;
      bankType: string | null;
    }
  ]
  >([]);

  useEffect(() => {
    (async () => {
      const { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(userDepositsData.data.userDeposits);
    })();
  }, []);

  return <TsxsTable deposits={deposits} depositsType="all" />;
};

export default RecentActivity;
