/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import api from '@utils/api';
import { getCookie } from 'cookies-next';
import { Deposit } from '@utils/types';

export default function Withdrawals() {
  const [transactions, setTransactions] = useState<[] | Deposit[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.getTransactions(
        getCookie('admin_token') as string
      );

      setTransactions(
        data.data.getTransactions.transactions.sort(
          (
            firstTimestamp: { timestamp: number },
            secondTimeStamp: { timestamp: number }
          ) => secondTimeStamp.timestamp - firstTimestamp.timestamp
        )
      );
    })();
  }, []);

  const confirmWithdrawal = async (txId: string) => {
    try {
      await api.confirmWithdrawal(getCookie('admin_token') as string, txId);
    } catch (error: any) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    }
  };

  return transactions.length ? (
    <table className="w-full border-separate">
      <thead>
        <tr>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20 rounded-tl-xl">
            Email:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20 rounded-tl-xl">
            Name:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
            Type:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
            Amount:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
            Currency:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
            Type:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
            Date:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20 rounded-tr-xl">
            {' '}
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions
          .filter(val => val.direction === 'WITHDRAWAL')
          .map(transaction => (
            <tr key={transaction._id}>
              <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
                {transaction.email}
              </td>
              <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
                {!transaction.bankName ? (
                  <span className="underline font-bold">N/A</span>
                ) : (
                  transaction.bankName
                )}
              </td>
              <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
                {!transaction.type ? (
                  <span className="underline font-bold">N/A</span>
                ) : (
                  transaction.type
                )}
              </td>
              <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
                {transaction.amount}
              </td>
              <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
                {!transaction.currency ? (
                  <span className="underline font-bold">N/A</span>
                ) : (
                  transaction.currency
                )}
              </td>

              <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
                <span>{transaction.direction}</span>
              </td>
              <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
                {!transaction.timestamp ? (
                  <span className="underline font-bold">N/A</span>
                ) : (
                  new Date(transaction.timestamp).toLocaleDateString(
                    undefined,
                    {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      minute: '2-digit',
                      hour: '2-digit'
                    }
                  )
                )}
              </td>
              <td className="bg-[#3eb402] dark:bg-gray-300 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
                <button
                  className="text-white"
                  onClick={() => confirmWithdrawal(transaction._id)}
                >
                  Confirm
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  ) : (
    <h1 className="text-2xl mx-32">Loading..</h1>
  );
}
