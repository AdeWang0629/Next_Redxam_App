import { useState, useEffect } from 'react';
import api from '@utils/api';
import Image from 'next/image';
import Card from './Card';
import TsxsTable from './deposits/TransactionsTable';
import filterIcon from '@public/icons/filter.svg';

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
        },
      ]
  >([]);

  useEffect(() => {
    (async () => {
      let { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(userDepositsData.data.userDeposits);
    })();
  }, []);

  return <TsxsTable deposits={deposits} depositsType="all" />;
};

export default RecentActivity;
