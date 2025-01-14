/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import api from '@utils/api';

import { getCookie } from 'cookies-next';
import { Deposit } from '@utils/types';

export default function Deposits() {
  const [deposits, setDeposits] = useState<[] | Deposit[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.getTransactions(
        getCookie('admin_token') as string
      );

      setDeposits(
        data.data.getTransactions.transactions.sort(
          (
            firstTimestamp: { timestamp: number },
            secondTimeStamp: { timestamp: number }
          ) => secondTimeStamp.timestamp - firstTimestamp.timestamp
        )
      );
    })();
  }, []);

  const confirmDeposit = async (depositId: string) => {
    try {
      // await api.addContributionFromValue(
      //   getCookie('admin_token') as string,
      //   amount,
      //   email
      // );
      await api.updateDepositStatus(
        getCookie('admin_token') as string,
        depositId,
        'completed'
      );
    } catch (error: any) {
      alert(error.message);
    }
  };

  return deposits.length ? (
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
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20 ">
            Address:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20 ">
            Hash:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
            Date:
          </th>
          <th className="bg-black dark:bg-gray-300 bg-opacity-10 py-4 px-2 text-left border border-black dark:border-white border-opacity-20 rounded-tr-xl">
            Confirm
          </th>
        </tr>
      </thead>
      <tbody>
        {deposits.map(deposit => (
          <tr key={deposit._id}>
            <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
              {deposit.email}
            </td>
            <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
              {!deposit.bankName ? (
                <span className="underline font-bold">N/A</span>
              ) : (
                deposit.bankName
              )}
            </td>
            <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
              {!deposit.type ? (
                <span className="underline font-bold">N/A</span>
              ) : (
                deposit.type
              )}
            </td>
            <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
              <span className="underline font-bold">{deposit.amount}</span>
            </td>
            <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
              {!deposit.currency ? (
                <span className="underline font-bold">N/A</span>
              ) : (
                deposit.currency
              )}
            </td>

            <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
              {deposit.direction ? (
                <span>Deposit</span>
              ) : (
                <span>Withdrawal</span>
              )}
            </td>
            <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
              {!deposit.address ? (
                <span className="underline font-bold">N/A</span>
              ) : (
                deposit.address
              )}
            </td>
            <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
              {!deposit.hash ? (
                <span className="underline font-bold">N/A</span>
              ) : (
                deposit.hash
              )}
            </td>
            <td className="bg-black dark:bg-gray-300 bg-opacity-5 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
              {!deposit.timestamp ? (
                <span className="underline font-bold">N/A</span>
              ) : (
                new Date(deposit.timestamp).toLocaleDateString(undefined, {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  minute: '2-digit',
                  hour: '2-digit'
                })
              )}
            </td>
            <td className="bg-[#3eb402] dark:bg-gray-300 py-4 px-2 text-left border border-black dark:border-white border-opacity-20">
              <button
                className="text-white"
                onClick={() => confirmDeposit(deposit._id)}
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
