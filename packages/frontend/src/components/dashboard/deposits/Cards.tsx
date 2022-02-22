import { NextPage } from 'next';
import Image from 'next/image';
import api from '@utils/api';
import { getMonthName } from '@utils/helpers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BankIcon from '@public/icons/bank.svg';
import EmptyImage from '@public/images/dashboard/deposits/empty.svg';
import { Deposit } from '@utils/types';
import Card from '../Card';

const CardsView: NextPage = () => {
  const router = useRouter();
  const [deposits, setDeposits] = useState<[] | Deposit[]>([]);
  const [filteredDeposits, setFilteredDeposits] = useState<
  | []
  | [
    {
      month: number;
      deposits: Deposit[];
    },
  ]
  >([]);
  const [pendingDeposits, setPendingDeposits] = useState<[] | Deposit[]>([]);

  const [value, setValue] = useState<number>(0);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function deposit() {
    const confirmation = confirm(`Are you sure you want to deposit $${value}?`);
    if (!confirmation) return;

    setDepositLoading(true);

    api
      .stripeDeposit(value)
      .then((res) => {
        router.push(res.data.url);
      })
      .catch((error) => {
        console.log(error);
        alert(error?.message || 'An error occurred!');
      })
      .finally(() => setDepositLoading(false));
  }

  useEffect(() => {
    (async () => {
      const { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(userDepositsData.data.userDeposits);
      setPendingDeposits(
        userDepositsData.data.userDeposits.filter(
          (depositDetails: Deposit) => depositDetails.status === 'pending',
        ),
      );
    })();
  }, []);

  useEffect(() => {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    setFilteredDeposits(
      // @ts-ignore
      months.map((month) => {
        const filtered = deposits
          .filter((depositDetails) => depositDetails.status !== 'pending')
          .filter((depositDetails) => (
            depositDetails.type === 'FIAT' &&
              new Date(depositDetails.timestamp).getMonth() + 1 === month &&
              new Date(depositDetails.timestamp).getFullYear() ===
                new Date().getFullYear()
          ));

        return {
          month,
          deposits: filtered.sort((a, b) => b.timestamp - a.timestamp),
        };
      }),
    );
  }, [deposits]);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col">
        <Card otherClasses="w-full h-[fit-content] bg-white flex flex-col rounded-[25px] shadow-card mr-3">
          <div className="flex items-center justify-between px-8">
            <h1 className="font-secondary font-medium text-lg py-6">
              Deposit
            </h1>
          </div>
          <hr />
          <div className="p-8 flex flex-col items-center w-full">
            <div className="flex flex-row font-secondary font-bold text-[2.625rem] px-auto">
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
              Enter amount you want to deposit
            </span>
            <button
              className="w-full mx-auto bg-card-button rounded-[50px] py-4 px-16 mt-10 font-secondary font-medium text-white transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                boxShadow:
                    '0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)',
              }}
              disabled={value < 10 || depositLoading}
              onClick={deposit}
            >
              Deposit to Wallet
            </button>
          </div>
        </Card>
      </div>

      <Card otherClasses="flex-1 w-full h-[fit-content] bg-white flex flex-col rounded-[25px] shadow-card mt-8 lg:mt-0 lg:ml-3">
        <h1 className="px-8 py-6 font-secondary font-medium text-lg">
          Recent deposits from Card
        </h1>
        <hr />
        {pendingDeposits.length ? (
          <>
            <div className="bg-yellow-100 py-1.5">
              <p className="font-secondary text-yellow-400 font-bold text-xs pl-7">
                Pending
              </p>
            </div>
            <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
              {pendingDeposits.map((depositDetails, index) => (
                <div
                  className={`flex items-center ${
                    // eslint-disable-next-line no-nested-ternary
                    pendingDeposits.length !== 1 && index === 0
                      ? 'pb-5'
                      : pendingDeposits.length !== 1
                        ? 'py-5'
                        : ''
                  } ${
                    // eslint-disable-next-line no-nested-ternary
                    pendingDeposits.length !== 1 &&
                      index === pendingDeposits.length - 1
                      ? 'pt-5 pb-0'
                      : pendingDeposits.length !== 1
                        ? 'border-b'
                        : ''
                  }`}
                  key={`deposit${depositDetails.timestamp}`}
                >
                  <Image
                    src={
                        depositDetails.bankIcon
                          ? `data:image/png;base64,${depositDetails.bankIcon}`
                          : BankIcon
                      }
                    width="40px"
                    height="40px"
                    alt="Card Image"
                  />
                  <div className="flex flex-col justify-center ml-4">
                    <p className="font-secondary text-sm text-lighter-black mb-1.5">
                      {depositDetails.bankName || 'Unknown card'}
                    </p>
                    <p className="font-secondary text-xs text-[#95989B] capitalize">
                      {depositDetails.bankType || 'Unknown card type'}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-end ml-auto">
                    <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                      {depositDetails.currency === 'USD' ? '$' : depositDetails.currency}
                      {depositDetails.amount}
                    </p>
                    <div className="flex justify-center items-center">
                      <p className="font-secondary text-xs text-[#95989B] mr-1">
                        Pending •
                        {' '}
                        {new Date(depositDetails.timestamp).toLocaleDateString(
                          undefined,
                          {
                            day: '2-digit',
                            month: 'short',
                          },
                        )}
                        {', '}
                        {new Date(depositDetails.timestamp).toLocaleTimeString(
                          undefined,
                          {
                            minute: '2-digit',
                            hour: '2-digit',
                          },
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
        {filteredDeposits.length &&
          filteredDeposits.filter(
            (filteredDeposit) => filteredDeposit.deposits.length,
          )?.length ? (
            filteredDeposits
              .filter((filteredDeposit) => filteredDeposit.deposits.length)
              .map((filteredDeposit) => (
                <div key={`deposits${filteredDeposit.month}`}>
                  <div className="bg-[#FAFAFA] py-1.5">
                    <p className="font-secondary text-lighter-black font-bold text-xs pl-7">
                      {getMonthName(filteredDeposit.month)}
                      {' '}
                      {new Date().getFullYear()}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                    {filteredDeposit.deposits.map((depositDetails, index) => (
                      <div
                        className={`flex items-center ${
                          index === 0 ? 'pb-5' : 'py-5'
                        } ${
                          index === filteredDeposit.deposits.length - 1
                            ? 'pt-5 pb-0'
                            : 'border-b'
                        }`}
                        key={
                          `deposit${filteredDeposit.month}${depositDetails.timestamp}`
                        }
                      >
                        <Image
                          src={
                            depositDetails.bankIcon
                              ? `data:image/png;base64,${depositDetails.bankIcon}`
                              : BankIcon
                          }
                          width="40px"
                          height="40px"
                          alt="Card Image"
                        />
                        <div className="flex flex-col justify-center ml-4">
                          <p className="font-secondary text-sm text-lighter-black mb-1.5">
                            {depositDetails.bankName || 'Unknown card'}
                          </p>
                          <p className="font-secondary text-xs text-[#95989B] capitalize">
                            {depositDetails.bankType || 'Unknown card type'}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-end ml-auto">
                          <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                            {depositDetails.currency === 'USD'
                              ? '$'
                              : depositDetails.currency}
                            {depositDetails.amount}
                          </p>

                          <div className="flex justify-center items-center">
                            <p className="font-secondary text-xs text-[#95989B] mr-1">
                              {new Date(depositDetails.timestamp).toLocaleDateString(
                                undefined,
                                {
                                  day: '2-digit',
                                  month: 'short',
                                },
                              )}
                              {', '}
                              {new Date(depositDetails.timestamp).toLocaleTimeString(
                                undefined,
                                {
                                  minute: '2-digit',
                                  hour: '2-digit',
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          ) : (
            <div className="mt-16 flex flex-col items-center px-8 pb-10">
              <Image src={EmptyImage} />
              <p className="mt-6 text-lighter-black font-secondary font-normal text-center">
                No transactions has been made from any of the cards.
              </p>
            </div>
          )}
      </Card>
    </div>
  );
};

export default CardsView;
