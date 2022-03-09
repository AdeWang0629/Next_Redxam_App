import { useState, useEffect } from 'react';
import api from '@utils/api';
import TsxsTable from './deposits/TransactionsTable';
import { Deposit } from '@utils/types';


const RecentActivity = () => {
  const [deposits, setDeposits] = useState<
    | []
    | [Deposit]
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
