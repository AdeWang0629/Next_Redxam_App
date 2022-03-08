/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getMonthName } from '@utils/helpers';
import bankIcon from '@public/icons/bank.svg';

import filterIcon from '@public/icons/filter.svg';
import btcLogo from '@public/icons/bitcoin.svg';
import EmptyImage from '@public/images/dashboard/deposits/empty.svg';
import { Deposit } from '@utils/types';
import { useTranslation } from 'next-i18next';
import Card from '../Card';

interface TransactionsTableProps {
  deposits: Deposit[] | [];
  depositsType: string;
}

const TransactionsTable = ({
  deposits,
  depositsType
}: TransactionsTableProps) => {
  const { t } = useTranslation('dashboard');
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
            {t('recentActivity')}
          </h2>
          <button className="flex justify-center items-center border border-[#EAEAEB] rounded-[81px] p-3">
            <Image
              src={filterIcon}
              width="20px"
              height="16px"
              alt="Filter Button"
            />
          </button>
        </div>
      ) : depositsType === 'crypto' ? (
        <h2 className="px-8 py-6 font-secondary font-medium text-lg">
          {t('recentDepositsWallet')}
        </h2>
      ) : (
        <h2 className="px-8 py-6 font-secondary font-medium text-lg">
          {t('recentDepositsBanks')}
        </h2>
      )}

      {deposits.length ? (
        <>
          {pendingDeposits.length > 0 && (
            <>
              <div className="bg-yellow-100 py-1.5">
                <p className="font-secondary text-yellow-400 font-bold text-xs ltr:pl-7 rtl:pr-7">
                  {t('pending')}
                </p>
              </div>
              <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                {pendingDeposits.map((pendingDeposit, index) => (
                  <div
                    className={`flex items-center ${
                      pendingDeposits.length !== 1 && index === 0
                        ? 'pb-5'
                        : pendingDeposits.filter(
                            pendingDepositDetails =>
                              pendingDepositDetails.status === 'pending'
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
                    key={pendingDeposit._id}
                  >
                    <Image
                      src={
                        pendingDeposit.bankIcon
                          ? `data:image/png;base64,${pendingDeposit.bankIcon}`
                          : pendingDeposit.type === 'FIAT'
                          ? bankIcon
                          : btcLogo
                      }
                      width="40px"
                      height="40px"
                      className={pendingDeposit.bankIcon ? 'rounded-full' : ''}
                      alt="Bank Image"
                    />
                    <div className="flex flex-col justify-center ltr:ml-4 rtl:mr-4">
                      <p className="font-secondary text-sm text-lighter-black mb-1.5">
                        {pendingDeposit.type === 'CRYPTO'
                          ? 'Bitcoin'
                          : pendingDeposit.bankName}
                      </p>
                      <p className="font-secondary text-xs text-[#95989B]">
                        {t('processing')}
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-end ltr:ml-auto rtl:mr-auto">
                      <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                        {pendingDeposit.currency === 'USD'
                          ? '$'
                          : pendingDeposit.currency}{' '}
                        {pendingDeposit.type === 'FIAT'
                          ? pendingDeposit.amount
                          : pendingDeposit.amount * 0.00000001}
                      </p>
                      <div className="flex justify-center items-center">
                        <p className="font-secondary text-xs text-[#95989B] ltr:mr-1 rtl:ml-1 text-right">
                          {t('pending')}
                          {' • '}
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
                  <div key={`deposits${month}${year}`}>
                    <div className="bg-[#FAFAFA] py-1.5">
                      <p className="font-secondary text-lighter-black font-bold text-xs ltr:pl-7 rtl:pr-7">
                        {getMonthName(month)}
                        {' '}
                        {year}
                      </p>
                    </div>

                    {acceptedDeposits.map(depositDetails => {
                      if (
                        new Date(depositDetails.timestamp).getFullYear() ===
                          year &&
                        new Date(depositDetails.timestamp).getMonth() + 1 ===
                          month
                      ) {
                        return (
                          <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                            <div
                              className="flex items-center"
                              key={deposit._id}
                            >
                              <Image
                                src={
                                  depositDetails.bankIcon
                                    ? `data:image/png;base64,${depositDetails.bankIcon}`
                                    : depositDetails.type === 'FIAT'
                                    ? bankIcon
                                    : btcLogo
                                }
                                width="40px"
                                height="40px"
                                className={
                                  depositDetails.bankIcon ? 'rounded-full' : ''
                                }
                                alt="Bank Image"
                              />
                              <div className="flex flex-col justify-center ltr:ml-4 rtl:mr-4">
                                <p className="font-secondary text-sm text-lighter-black mb-1.5">
                                  {depositDetails.type === 'CRYPTO'
                                    ? 'Bitcoin'
                                    : depositDetails.bankName}
                                </p>
                                <p className="font-secondary text-xs text-[#95989B]">
                                  {t('processed')}
                                </p>
                              </div>
                              <div className="flex flex-col justify-center items-end ltr:ml-auto rtl:mr-auto">
                                <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                                  {depositDetails.currency === 'USD'
                                    ? '$'
                                    : depositDetails.currency}{' '}
                                  {depositDetails.type === 'FIAT'
                                    ? depositDetails.amount
                                    : depositDetails.amount * 0.00000001}
                                </p>
                                <div className="flex justify-center items-center">
                                  <p className="font-secondary text-xs text-[#95989B] ltr:mr-1 rtl:ml-1">
                                    {new Date(
                                      depositDetails.timestamp
                                    ).toLocaleDateString(undefined, {
                                      day: '2-digit',
                                      month: 'short'
                                    })}
                                    {', '}
                                    {new Date(
                                      depositDetails.timestamp
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

                      return null;
                    })}
                  </div>
                );
              }

              return null;
            })}
        </>
      ) : (
        <div className="mt-16 flex flex-col items-center px-8 pb-10">
          <Image src={EmptyImage} alt="No Transactions Ilustration" />
          <p className="mt-6 text-lighter-black font-secondary font-normal text-center">
            {t('noTransactions')}
          </p>
        </div>
      )}
      {depositsType === 'all' && (
        <button
          className="w-full text-center font-medium font-secondary text-base underline py-4"
          onClick={() => router.push('/deposit')}
        >
          {t('viewAll')}
        </button>
      )}
    </Card>
  );
};

export default TransactionsTable;
