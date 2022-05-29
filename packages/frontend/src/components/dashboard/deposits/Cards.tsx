/* eslint-disable @typescript-eslint/no-shadow */
import { NextPage } from 'next';
import api from '@utils/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Deposit } from '@utils/types';
import { useTranslation } from 'next-i18next';
import Card from '../Card';
import TsxsTable from './TransactionsTable';

const CardsView: NextPage = () => {
  const { t } = useTranslation('dashboard');
  const router = useRouter();
  const [deposits, setDeposits] = useState<[] | Deposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<number>(0);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(
        userDepositsData.data.userTransactions
          .filter((deposit: { type: string }) => deposit.type === 'FIAT')
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

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function deposit() {
    const confirmation = confirm(`Are you sure you want to deposit $${value}?`);
    if (!confirmation) return;

    setDepositLoading(true);

    api
      .stripeDeposit(value)
      .then(res => {
        router.push(res.data.url);
      })
      .catch(error => {
        console.log(error);
        alert(error?.message || 'An error occurred!');
      })
      .finally(() => setDepositLoading(false));
  }

  return (
    <div className="flex flex-col ltr:lg:flex-row rtl:lg:flex-row-reverse">
      <div className="flex-1 flex flex-col mr-3">
        <Card otherClasses="w-full h-[fit-content] bg-white flex flex-col rounded-[25px] shadow-card mr-3">
          <div className="flex items-center justify-between px-8">
            <h1 className="font-secondary font-medium text-lg py-6">
              {t('deposit')}
            </h1>
          </div>
          <hr />
          <div className="p-8 flex flex-col items-center w-full">
            <div
              dir="ltr"
              className="flex flex-row font-secondary font-bold text-[2.625rem] px-auto"
            >
              <span className="text-card-button">$</span>
              <input
                className="font-secondary font-bold bg-transparent text-center appearance-none border-none outline-none"
                value={`${numberWithCommas(value)}`}
                style={{ width: `${value.toString().length}ch` }}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                onChange={({ target }) => {
                  const newValue = +target.value.replace(/[^0-9]/g, '');
                  setValue(newValue);
                }}
              />
              <span>.00</span>
            </div>
            <span className="font-secondary text-sm text-[#95989B]">
              {t('enterAmountToDeposit')}
            </span>
            <button
              className="w-full mx-auto bg-card-button rounded-[50px] py-4 px-16 mt-10 font-secondary font-medium text-white transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                boxShadow:
                  '0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)'
              }}
              disabled={value < 10 || depositLoading}
              onClick={deposit}
            >
              {t('depositToWallet')}
            </button>
          </div>
        </Card>
      </div>
      <TsxsTable deposits={deposits} depositsType="fiat" loading={loading} />
    </div>
  );
};

export default CardsView;
