import { NextPage } from 'next';
import Image from 'next/image';
import api from '@utils/api';
import Card from '../Card';
import { getMonthName } from '@utils/helpers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BankIcon from '@public/icons/bank.svg';
import EmptyImage from '@public/images/dashboard/deposits/empty.svg';

const CardsView: NextPage = () => {
  const router = useRouter();
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
  const [filteredDeposits, setFilteredDeposits] = useState<
    | []
    | [
        {
          month: number;
          deposits: [
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
          ];
        },
      ]
  >([]);

  const [value, setValue] = useState<number>(10);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function deposit() {
    let confirmation = confirm(`Are you sure you want to deposit $${value}?`);
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

  useEffect(() => {
    (async () => {
      let { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(userDepositsData.data.userDeposits);
    })();
  }, []);

  useEffect(() => {
    let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    setFilteredDeposits(
      // @ts-ignore
      months.map(month => {
        let filtered = deposits
          .filter(deposit => deposit.status !== 'pending')
          .filter(deposit => {
            return (
              deposit.type === 'FIAT' &&
              new Date(deposit.timestamp).getMonth() + 1 === month &&
              new Date(deposit.timestamp).getFullYear() ===
                new Date().getFullYear()
            );
          });

        return {
          month,
          deposits: filtered.sort((a, b) => b.timestamp - a.timestamp),
        };
      }),
    );
  }, [deposits]);

  return (
    <>
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
                  style={{ width: value.toString().length + 'ch' }}
                  onChange={({ target }) => {
                    const value = +target.value.replace(/[^0-9]/g, '');
                    setValue(value);
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
          {deposits.filter(deposit => deposit.status === 'pending').length ? (
            <>
              <div className="bg-yellow-100 py-1.5">
                <p className="font-secondary text-yellow-400 font-bold text-xs pl-7">
                  Pending
                </p>
              </div>
              <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                {deposits
                  .filter(deposit => deposit.status === 'pending')
                  .map((deposit, index) => (
                    <div
                      className={`flex items-center ${
                        deposits.filter(deposit => deposit.status === 'pending')
                          .length !== 1 && index === 0
                          ? 'pb-5'
                          : deposits.filter(
                              deposit => deposit.status === 'pending',
                            ).length !== 1
                          ? 'py-5'
                          : ''
                      } ${
                        deposits.filter(deposit => deposit.status === 'pending')
                          .length !== 1 &&
                        index ===
                          deposits.filter(
                            deposit => deposit.status === 'pending',
                          ).length -
                            1
                          ? 'pt-5 pb-0'
                          : deposits.filter(
                              deposit => deposit.status === 'pending',
                            ).length !== 1
                          ? 'border-b'
                          : ''
                      }`}
                      key={'deposit' + deposit.timestamp}
                    >
                      <Image
                        src={
                          deposit.bankIcon
                            ? `data:image/png;base64,${deposit.bankIcon}`
                            : BankIcon
                        }
                        width={'40px'}
                        height={'40px'}
                        alt="Card Image"
                      />
                      <div className="flex flex-col justify-center ml-4">
                        <p className="font-secondary text-sm text-lighter-black mb-1.5">
                          {deposit.bankName || 'Unknown card'}
                        </p>
                        <p className="font-secondary text-xs text-[#95989B] capitalize">
                          {deposit.bankType || 'Unknown card type'}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-end ml-auto">
                        <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                          {deposit.currency === 'USD' ? '$' : deposit.currency}
                          {deposit.amount}
                        </p>
                        <div className="flex justify-center items-center">
                          <p className="font-secondary text-xs text-[#95989B] mr-1">
                            Pending •{' '}
                            {new Date(deposit.timestamp).toLocaleDateString(
                              undefined,
                              {
                                day: '2-digit',
                                month: 'short',
                              },
                            )}
                            {', '}
                            {new Date(deposit.timestamp).toLocaleTimeString(
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
            filteredDeposits => filteredDeposits.deposits.length,
          )?.length ? (
            filteredDeposits
              .filter(filteredDeposits => filteredDeposits.deposits.length)
              .map(filteredDeposit => (
                <div key={'deposits' + filteredDeposit.month}>
                  <div className="bg-[#FAFAFA] py-1.5">
                    <p className="font-secondary text-lighter-black font-bold text-xs pl-7">
                      {getMonthName(filteredDeposit.month)}{' '}
                      {new Date().getFullYear()}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                    {filteredDeposit.deposits.map((deposit, index) => (
                      <div
                        className={`flex items-center ${
                          index === 0 ? 'pb-5' : 'py-5'
                        } ${
                          index === filteredDeposit.deposits.length - 1
                            ? 'pt-5 pb-0'
                            : 'border-b'
                        }`}
                        key={
                          'deposit' + filteredDeposit.month + deposit.timestamp
                        }
                      >
                        <Image
                          src={
                            deposit.bankIcon
                              ? `data:image/png;base64,${deposit.bankIcon}`
                              : BankIcon
                          }
                          width={'40px'}
                          height={'40px'}
                          alt="Card Image"
                        />
                        <div className="flex flex-col justify-center ml-4">
                          <p className="font-secondary text-sm text-lighter-black mb-1.5">
                            {deposit.bankName || 'Unknown card'}
                          </p>
                          <p className="font-secondary text-xs text-[#95989B] capitalize">
                            {deposit.bankType || 'Unknown card type'}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-end ml-auto">
                          <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                            {deposit.currency === 'USD'
                              ? '$'
                              : deposit.currency}
                            {deposit.amount}
                          </p>

                          <div className="flex justify-center items-center">
                            <p className="font-secondary text-xs text-[#95989B] mr-1">
                              {new Date(deposit.timestamp).toLocaleDateString(
                                undefined,
                                {
                                  day: '2-digit',
                                  month: 'short',
                                },
                              )}
                              {', '}
                              {new Date(deposit.timestamp).toLocaleTimeString(
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
    </>
  );
};

export default CardsView;
