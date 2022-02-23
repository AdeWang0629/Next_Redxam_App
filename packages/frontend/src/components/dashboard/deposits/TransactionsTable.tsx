import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Card from '../Card';
import { getMonthName } from '@utils/helpers';
import bankIcon from '@public/icons/bank.svg';

import filterIcon from '@public/icons/filter.svg';
import btcLogo from '@public/icons/bitcoin.svg';
import EmptyImage from '@public/images/dashboard/deposits/empty.svg';
import { Deposit } from '@utils/types';

interface TransactionsTableProps {
  deposits: Deposit[] | [];
  depositsType: string;
}

const TransactionsTable = ({
  deposits,
  depositsType
}: TransactionsTableProps) => {
  const router = useRouter();

  const [pendingDeposits, setPendingDeposits] = useState<[] | Deposit[]>([]);
  const [acceptedDeposits, setAcceptedDeposits] = useState<[] | Deposit[]>([]);

  useEffect(() => {
    setPendingDeposits(
      // @ts-ignore
      deposits.filter(deposit => deposit.status === 'pending')
    );

    setAcceptedDeposits(
      // @ts-ignore
      deposits.filter(deposit => deposit.status !== 'pending')
    );
  }, [deposits]);

  let month = -1;
  let year = new Date().getFullYear();

  return (
    <Card otherClasses="flex-1 w-full h-[fit-content] bg-white flex flex-col rounded-[25px] shadow-card mt-8 lg:mt-0">
      {depositsType === 'all' ? (
        <div className="flex justify-between items-center py-4 px-7">
          <h2 className="font-secondary text-lg font-medium text-lighter-black">
            Recent Activity
          </h2>
          <button className="flex justify-center items-center border border-[#EAEAEB] rounded-[81px] p-3">
            <Image
              src={filterIcon}
              width={'20px'}
              height={'16px'}
              alt="Filter Button"
            />
          </button>
        </div>
      ) : depositsType === 'crypto' ? (
        <h2 className="px-8 py-6 font-secondary font-medium text-lg">
          Recent Deposits to Wallet
        </h2>
      ) : (
        <h2 className="px-8 py-6 font-secondary font-medium text-lg">
          Recent Deposits from Banks
        </h2>
      )}

      {deposits.length ? (
        <>
          {pendingDeposits.length > 0 && (
            <>
              <div className="bg-yellow-100 py-1.5">
                <p className="font-secondary text-yellow-400 font-bold text-xs pl-7">
                  Pending
                </p>
              </div>
              <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                {pendingDeposits.map((pendingDeposit, index) => (
                  <div
                    className={`flex items-center ${
                      pendingDeposits.length !== 1 && index === 0
                        ? 'pb-5'
                        : pendingDeposits.filter(
                            pendingDeposit =>
                              pendingDeposit.status === 'pending'
                          ).length !== 1
                        ? 'py-5'
                        : ''
                    } ${
                      pendingDeposits.length !== 1 &&
                      index === pendingDeposits.length - 1
                        ? 'pt-5 pb-0'
                        : pendingDeposits.length !== 1
                        ? 'border-b'
                        : ''
                    }`}
                    key={'pendingDeposit' + pendingDeposit.timestamp}
                  >
                    <Image
                      src={
                        pendingDeposit.bankIcon
                          ? `data:image/png;base64,${pendingDeposit.bankIcon}`
                          : pendingDeposit.type === 'FIAT'
                          ? bankIcon
                          : btcLogo
                      }
                      width={'40px'}
                      height={'40px'}
                      className={pendingDeposit.bankIcon ? 'rounded-full' : ''}
                      alt="Bank Image"
                    />
                    <div className="flex flex-col justify-center ml-4">
                      <p className="font-secondary text-sm text-lighter-black mb-1.5">
                        {pendingDeposit.type === 'CRYPTO'
                          ? 'Bitcoin'
                          : pendingDeposit.bankName}
                      </p>
                      <p className="font-secondary text-xs text-[#95989B]">
                        Processing
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-end ml-auto">
                      <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                        {pendingDeposit.currency === 'USD'
                          ? '$'
                          : pendingDeposit.currency}{' '}
                        {pendingDeposit.type === 'FIAT'
                          ? pendingDeposit.amount
                          : pendingDeposit.amount * 0.00000001}
                      </p>
                      <div className="flex justify-center items-center">
                        <p className="font-secondary text-xs text-[#95989B] mr-1 text-right">
                          Pending •{' '}
                          {new Date(
                            pendingDeposit.timestamp
                          ).toLocaleDateString(undefined, {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                          {', '}
                          {new Date(
                            pendingDeposit.timestamp
                          ).toLocaleTimeString(undefined, {
                            minute: '2-digit',
                            hour: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {acceptedDeposits.length > 0 &&
            acceptedDeposits.map(deposit => {
              if (
                new Date(deposit.timestamp).getFullYear() <= year &&
                new Date(deposit.timestamp).getMonth() + 1 !== month
              ) {
                year = new Date(deposit.timestamp).getFullYear();
                month = new Date(deposit.timestamp).getMonth() + 1;
                return (
                  <div key={'deposits' + month + year}>
                    <div className="bg-[#FAFAFA] py-1.5">
                      <p className="font-secondary text-lighter-black font-bold text-xs pl-7">
                        {getMonthName(month)} {year}
                      </p>
                    </div>

                    {acceptedDeposits.map(deposit => {
                      if (
                        new Date(deposit.timestamp).getFullYear() === year &&
                        new Date(deposit.timestamp).getMonth() + 1 === month
                      ) {
                        return (
                          <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                            <div
                              className={`flex items-center`}
                              key={'deposit' + month + deposit.timestamp}
                            >
                              <Image
                                src={
                                  deposit.bankIcon
                                    ? `data:image/png;base64,${deposit.bankIcon}`
                                    : deposit.type === 'FIAT'
                                    ? bankIcon
                                    : btcLogo
                                }
                                width={'40px'}
                                height={'40px'}
                                className={
                                  deposit.bankIcon ? 'rounded-full' : ''
                                }
                                alt="Bank Image"
                              />
                              <div className="flex flex-col justify-center ml-4">
                                <p className="font-secondary text-sm text-lighter-black mb-1.5">
                                  {deposit.type === 'CRYPTO'
                                    ? 'Bitcoin'
                                    : deposit.bankName}
                                </p>
                                <p className="font-secondary text-xs text-[#95989B]">
                                  Processed
                                </p>
                              </div>
                              <div className="flex flex-col justify-center items-end ml-auto">
                                <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                                  {deposit.currency === 'USD'
                                    ? '$'
                                    : deposit.currency}{' '}
                                  {deposit.type === 'FIAT'
                                    ? deposit.amount
                                    : deposit.amount * 0.00000001}
                                </p>
                                <div className="flex justify-center items-center">
                                  <p className="font-secondary text-xs text-[#95989B] mr-1">
                                    {new Date(
                                      deposit.timestamp
                                    ).toLocaleDateString(undefined, {
                                      day: '2-digit',
                                      month: 'short'
                                    })}
                                    {', '}
                                    {new Date(
                                      deposit.timestamp
                                    ).toLocaleTimeString(undefined, {
                                      minute: '2-digit',
                                      hour: '2-digit'
                                    })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              }
            })}
        </>
      ) : (
        <div className="mt-16 flex flex-col items-center px-8 pb-10">
          <Image src={EmptyImage} alt="No Transactions Ilustration" />
          <p className="mt-6 text-lighter-black font-secondary font-normal text-center">
            No transactions has been made from wallet.
          </p>
        </div>
      )}
      {depositsType === 'all' && (
        <button
          className="w-full text-center font-medium font-secondary text-base underline py-4"
          onClick={() => router.push('/deposit')}
        >
          View all
        </button>
      )}
    </Card>
  );
};

export default TransactionsTable;
