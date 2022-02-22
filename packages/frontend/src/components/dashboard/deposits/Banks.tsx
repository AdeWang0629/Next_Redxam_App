/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import * as Sentry from '@sentry/nextjs';
import Script from 'next/script';
import { usePlaidLink } from 'react-plaid-link';
import Image from 'next/image';
import api from '@utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import UnlinkModel from '@components/models/UnlinkModel';
import DepositModel from '@components/models/DepositModel';
import { UserContext } from '@providers/User';
import { getCookie } from 'cookies-next';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import BankImage from '@public/images/dashboard/deposits/bank.svg';
import closeIcon from '@public/images/dashboard/deposits/close.svg';
import { Deposit } from '@utils/types';
import bankIcon from '@public/icons/bank.svg';
import TsxsTable from './TransactionsTable';
import Card from '../Card';

interface Teller {
  accessToken: string;
  invalidAccessToken: boolean;
  accountId: string;
  balance: number;
  payeeId: string;
  memo: string;
  paymentModel: boolean;
  depositValue: number;
  userId: string;
  bankName: string;
}

const BanksView: NextPage = () => {
  const { user } = useContext(UserContext);
  let userId = '';
  if (user) {
    userId = user._id;
  }
  const [paymentApi] = useState('TELLER');
  const [mxConnect, setMxConnect] = useState(null);
  const [tellerConnect, setTellerConnect] = useState(null);
  const [plaidToken, setPlaidToken] = useState('');
  const [deposits, setDeposits] = useState<[] | Deposit[]>([]);

  const [accounts, setAccounts] = useState<
  | []
  | [{ _id: string; id: string; name: string; logo?: string; type: string }]
  >([]);
  const [selectedToUnlink, setSelectedToUnlink] = useState<[] | [string]>([]);
  const [unlinkMode, setUnlinkMode] = useState(false);
  const [showUnlinkModel, setShowUnlinkModel] = useState(false);
  const [showDepositModel, setShowDepositModel] = useState(false);
  const [openMx, setOpenMx] = useState(false);
  const [mxWidgetError, setMxWidgetError] = useState(false);
  const [teller, setTeller] = useState<Teller>({
    accessToken: '',
    invalidAccessToken: false,
    accountId: '',
    balance: 0,
    payeeId: '',
    memo: '',
    paymentModel: false,
    depositValue: 0,
    userId: '',
    bankName: '',
  });

  const currentEnvironment =
    typeof window !== 'undefined'
      ? (getCookie('environment') as string) || 'production'
      : 'production';

  useEffect(() => {
    (async () => {
      const { data: plaidTokenData } = await api.getPlaidToken();
      setPlaidToken(plaidTokenData.token);

      const { data: accountsData } = await api.getBankAccounts();
      setAccounts(accountsData.accounts);

      const { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(
        userDepositsData.data.userDeposits
          .filter((deposit: { type: string }) => deposit.type === 'FIAT')
          .sort(
            (
              firstTimestamp: { timestamp: number },
              secondTimeStamp: { timestamp: number },
            ) => secondTimeStamp.timestamp - firstTimestamp.timestamp,
          ),
      );
    })();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { open, exit, ready } = usePlaidLink({
    onSuccess: (public_token, metadata) =>
      api.linkPlaidAccount(public_token, metadata).then(async () => {
        const { data: accountsData } = await api.getBankAccounts();
        setAccounts(accountsData.accounts);
      }),
    token: plaidToken,
    countryCodes: ['US', 'CA', 'GB', 'IE', 'FR', 'ES', 'NL'],
    env: process.env.NODE_ENV === 'development' ? 'sandbox' : 'development',
  });

  const handleAddBankAccount = async () => {
    switch (paymentApi) {
      case 'MX':
        // eslint-disable-next-line no-case-declarations
        const { data: widgetUrl } = await api.getMXWidgetUrl();
        if (widgetUrl.errors) {
          Sentry.captureEvent(widgetUrl.errors);
          return setMxWidgetError(true);
        }
        setOpenMx(true);
        setTimeout(() => {
          // @ts-ignore
          mxConnect?.load(widgetUrl.data.mxWidgetConnect.widgetUrl);
        }, 100);
        break;

      case 'TELLER':
        // @ts-ignore
        tellerConnect.open();
        break;

      case 'PLAID':
        break;

      default:
        break;
    }

    return null;
  };

  const handleTellerAccount = async (accessToken: string): Promise<string> => {
    const {
      data: {
        data: { tellerAccounts },
      },
    } = await api.tellerAccounts(accessToken, userId);

    if (tellerAccounts.message === 'invalid access token provided') {
      setTeller((state) => ({
        ...state,
        invalidAccessToken: true,
      }));
    }

    if (tellerAccounts.success) {
      setTeller((state) => ({
        ...state,
        accountId: tellerAccounts.accountId,
        balance: tellerAccounts.balance,
        bankName: tellerAccounts.bankName,
        userId,
      }));
    }
    return tellerAccounts.accountId;
  };

  const handleTellerPayee = async (accountId: string, accessToken: string) => {
    const {
      data: {
        data: { tellerPayee },
      },
    } = await api.tellerPayee(accountId, accessToken);

    if (tellerPayee.connect_token) {
      // @ts-ignore
      const setup = window.TellerConnect.setup({
        environment:
          currentEnvironment === 'production' ? 'production' : 'sandbox',
        connectToken: tellerPayee.connect_token,
        applicationId: 'app_nu123i0nvg249720i8000',
        onSuccess({ payee: { id } }: { payee: { id: string } }) {
          setTeller((state) => ({
            ...state,
            paymentModel: true,
            payeeId: id,
          }));
        },
      });
      setup.open();
    } else {
      setTeller((state) => ({
        ...state,
        paymentModel: true,
        payeeId: tellerPayee.payeeId,
      }));
    }
  };

  const handleBankDeposit = async () => {
    const {
      accountId,
      depositValue,
      payeeId,
      accessToken,
      memo,
      bankName,
      userId: tellerUserId,
    } = teller;
    const {
      data: {
        data: { tellerPayment },
      },
    } = await api.tellerPayment(
      accountId,
      depositValue,
      payeeId,
      accessToken,
      bankName,
      tellerUserId,
      memo,
    );

    if (tellerPayment.connect_token) {
      // @ts-ignore
      const setup = window.TellerConnect.setup({
        environment:
          currentEnvironment === 'production' ? 'production' : 'sandbox',
        connectToken: tellerPayment.connect_token,
        applicationId: 'app_nu123i0nvg249720i8000',
        async onSuccess({ payment: { id } }: any) {
          setTeller((state) => ({ ...state, paymentModel: false }));
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { depositValue, bankName, userId } = teller;
          await api.tellerPaymentVerified(
            id,
            depositValue,
            bankName,
            userId,
          );
        },
      });
      setup.open();
    } else setTeller((state) => ({ ...state, paymentModel: false }));
  };

  return (
    <>
      {paymentApi === 'MX' ? (
        <Script
          id="widget"
          src="https://atrium.mx.com/connect.js"
          onLoad={() => {
            setMxConnect(
              // @ts-ignore
              new window.MXConnect({
                id: 'widget',
                iframeTitle: 'Connect',
                targetOrigin: '*',
              }),
            );
          }}
        />
      ) : paymentApi === 'TELLER' ? (
        <Script
          id="teller"
          src="https://cdn.teller.io/connect/connect.js"
          onLoad={() => {
            setTellerConnect(
              // @ts-ignore
              window.TellerConnect.setup({
                environment:
                  currentEnvironment === 'production'
                    ? 'production'
                    : 'sandbox',
                applicationId: 'app_nu123i0nvg249720i8000',

                async onSuccess({ accessToken }: any) {
                  setTeller((state) => ({
                    ...state,
                    accessToken,
                  }));

                  const accountId = await handleTellerAccount(accessToken);
                  await handleTellerPayee(accountId, accessToken);
                },
              }),
            );
          }}
        />
      ) : (
        paymentApi === 'PLAID' && ''
      )}

      <div className="flex flex-col lg:flex-row lg:gap-x-3">
        <div className="flex-1 flex flex-col">
          <Card otherClasses="w-full h-[fit-content] bg-white flex flex-col rounded-[25px] shadow-card mr-3">
            <div className="flex items-center justify-between px-8">
              <h1 className="font-secondary font-medium text-lg py-6">
                Added banks
              </h1>
              {accounts.length ? (
                unlinkMode ? (
                  selectedToUnlink.length ? (
                    <button
                      className="bg-lighter-black text-white py-2 px-8 rounded-[25px] border font-secondary text-sm font-medium"
                      style={{
                        boxShadow:
                          '0px 12px 20px rgba(39, 43, 34, 0.1), 0px 8.14815px 8px rgba(39, 43, 34, 0.05), 0px 1.85185px 8px rgba(39, 43, 34, 0.025)',
                      }}
                      onClick={() => setShowUnlinkModel(true)}
                    >
                      Unlink
                    </button>
                  ) : (
                    <button
                      className="py-2 px-8 rounded-[25px] border font-secondary text-sm font-medium"
                      onClick={() => setUnlinkMode(false)}
                    >
                      Cancel
                    </button>
                  )
                ) : (
                  <button
                    className="rounded-full border border-palette-gray w-10 h-10 flex items-center justify-center"
                    onClick={() => setUnlinkMode(true)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt as IconProp}
                      className="text-lighter-black"
                    />
                  </button>
                )
              ) : null}
            </div>
            <hr />
            {accounts.length > 0 ? (
              <div className="flex flex-col">
                {accounts.map((account) => (
                  <div
                    className="flex items-center px-8 py-5 border-b"
                    key={account._id}
                  >
                    <div className="flex-1 flex items-center">
                      <Image
                        src={
                          account.logo
                            ? `data:image/png;base64,${account.logo}`
                            : bankIcon
                        }
                        width="40"
                        height="40"
                        alt="account logo"
                      />
                      <div className="flex flex-col justify-center ml-5">
                        <h2 className="font-secondary text-sm font-medium">
                          {account.name}
                        </h2>
                        <h3 className="font-secondary font-medium text-xs mt-1.5 text-palette-gray first-letter:uppercase">
                          {account.type}
                        </h3>
                      </div>
                    </div>
                    {unlinkMode ? (
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="h-5 w-5"
                          // @ts-ignore
                          checked={selectedToUnlink.includes(account._id)}
                          onClick={() => {
                            // @ts-ignore
                            selectedToUnlink.includes(account._id)
                              ? // @ts-ignore
                              setSelectedToUnlink((prev) =>
                                prev.filter((id) => id !== account._id))
                              : // @ts-ignore
                              setSelectedToUnlink((prev) => [
                                ...prev,
                                account._id,
                              ]);
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="flex items-center justify-center py-4 border-b">
                  <button
                    className="font-secondary font-medium underline cursor-pointer transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={!plaidToken.length}
                  >
                    Add Bank Account
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-16 flex flex-col items-center px-8 pb-10">
                <Image src={BankImage} alt="Bank Ilustration" />
                <p className="mt-6 text-lighter-black font-secondary font-normal text-center">
                  Your KYC is complete, now you can add multiple bank accounts
                  to your redxam.
                </p>

                <button
                  className="bg-card-button rounded-[50px] py-4 px-16 mt-10 font-secondary font-medium text-white transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    boxShadow:
                      '0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)',
                  }}
                  onClick={handleAddBankAccount}
                  // disabled={!plaidToken.length}
                >
                  Add Bank Account
                </button>
              </div>
            )}
            {/* TellerAccessToken Errr */}
            {teller.invalidAccessToken && (
              <div className="fixed bg-black/50 w-screen h-screen z-10 ml-auto mr-auto left-0 right-0 top-0 text-center">
                <Card
                  width="w-[622px]"
                  height="h-[150px]"
                  py="py-7"
                  otherClasses="bg-white fixed m-auto top-0 right-0 left-0 bottom-0 text-center opacity-100"
                >
                  <div className="w-full flex flex-col justify-between items-center px-7">
                    <button
                      className="bg-[#2A3037] w-[40px] h-[40px] rounded-[500px] mb-4"
                      onClick={() =>
                        setTeller((state) => ({
                          ...state,
                          invalidAccessToken: false,
                        }))
                      }
                    >
                      <Image
                        src={closeIcon || ''}
                        alt="Close Icon"
                        width="14px"
                        height="14px"
                      />
                    </button>
                    <p className="text-lg font-secondary">
                      Invalid Access Token
                    </p>
                  </div>
                </Card>
              </div>
            )}

            {/* Teller Payment Model */}
            {teller.paymentModel && (
              <div className="fixed bg-black/50 w-screen h-screen z-10 ml-auto mr-auto left-0 right-0 top-0 text-center">
                <Card
                  width="w-[622px]"
                  height="h-[320px]"
                  py="py-4"
                  otherClasses="bg-white fixed m-auto top-0 right-0 left-0 bottom-0 text-center opacity-100"
                >
                  <div className="p-8 flex flex-col items-center w-full">
                    <div className="mb-4 input-wrapper">
                      <input
                        type="text"
                        className="font-secondary"
                        onChange={(e) =>
                          setTeller((state) => ({
                            ...state,
                            memo: e.target.value,
                          }))
                        }
                        value={teller.memo}
                        id="tellerMemo"
                      />
                      <label className="font-primary" htmlFor="firstName">
                        Enter a description
                      </label>
                    </div>
                    <div className="flex flex-row font-secondary font-bold text-[2.625rem] px-auto">
                      <span className="text-card-button">$</span>
                      <input
                        className="font-secondary font-bold bg-transparent text-center appearance-none border-none outline-none"
                        value={`${teller.depositValue}`}
                        style={{
                          width: `${teller.depositValue.toString().length}ch`,
                        }}
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus
                        onChange={({ target }) => {
                          const value = target.value.replace(/[^0-9]/g, '');
                          setTeller((state) => ({
                            ...state,
                            depositValue: parseFloat(value),
                          }));
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
                      disabled={teller.depositValue < 10}
                      onClick={() => handleBankDeposit()}
                    >
                      Deposit to Wallet
                    </button>
                  </div>
                </Card>
              </div>
            )}
          </Card>
          {accounts.length ? (
            <button
              className="w-2/3 mx-auto bg-card-button rounded-[50px] py-4 px-16 mt-10 font-secondary font-medium text-white transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                boxShadow:
                  '0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)',
              }}
              onClick={() => setShowDepositModel(true)}
            >
              Deposit to Wallet
            </button>
          ) : null}
        </div>

        <TsxsTable deposits={deposits} depositsType="fiat" />

        {openMx && (
          <div className="fixed bg-black/50 w-screen h-screen z-10 ml-auto mr-auto left-0 right-0 top-0 text-center">
            <Card
              width="w-[350px] sm:w-[450px]"
              height="h-[720px]"
              p="p-3 sm:p-7"
              otherClasses="bg-white fixed m-auto top-0 right-0 left-0 bottom-0 text-center"
            >
              <div className="flex justify-end mb-6">
                <button
                  className="bg-[#2A3037] w-[40px] h-[40px] rounded-[500px]"
                  onClick={() => setOpenMx(false)}
                >
                  <Image
                    src={closeIcon || ''}
                    alt="Close Icon"
                    width="14px"
                    height="14px"
                  />
                </button>
              </div>
              <div id="widget" className="z-10" />
            </Card>
          </div>
        )}
      </div>

      {mxWidgetError && (
        <div className="fixed bg-black/50 w-screen h-screen z-10 ml-auto mr-auto left-0 right-0 top-0 text-center">
          <Card
            width="w-[210px]"
            height="h-[210px]"
            p="p-3 sm:p-7"
            otherClasses="bg-white fixed m-auto top-0 right-0 left-0 bottom-0 text-center"
          >
            <button
              className="bg-[#2A3037] w-[40px] h-[40px] rounded-[500px] mb-4"
              onClick={() => setMxWidgetError(false)}
            >
              <Image
                src={closeIcon || ''}
                alt="Close Icon"
                width="14px"
                height="14px"
              />
            </button>
            <p className="font-bold text-xl font-secondary text-red-600">
              Something wrong happened
            </p>
          </Card>
        </div>
      )}

      {showUnlinkModel ? (
        <UnlinkModel
          isOpened={showUnlinkModel}
          setOpened={setShowUnlinkModel}
          accounts={accounts}
          IDs={selectedToUnlink}
          fetchAccounts={async () => {
            const { data: accountsData } = await api.getBankAccounts();
            setAccounts(accountsData.accounts);
            setUnlinkMode(false);
            setSelectedToUnlink([]);
          }}
        />
      ) : null}

      {showDepositModel ? (
        <DepositModel
          isOpened={showDepositModel}
          setOpened={setShowDepositModel}
          accounts={accounts as any}
        />
      ) : null}
    </>
  );
};

export default BanksView;
