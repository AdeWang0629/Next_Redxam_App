import { useState, useEffect } from "react";
import { NextPage } from "next";
import * as Sentry from "@sentry/nextjs";
import Script from "next/script";
import { usePlaidLink } from "react-plaid-link";
import Image from "next/image";
import api from "@utils/api";
import Card from "../Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getMonthName } from "@utils/helpers";
import UnlinkModel from "@components/models/UnlinkModel";
import DepositModel from "@components/models/DepositModel";

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BankImage from "@public/images/dashboard/deposits/bank.svg";
import BankIcon from "@public/icons/bank.svg";
import EmptyImage from "@public/images/dashboard/deposits/empty.svg";
import closeIcon from "@public/images/dashboard/deposits/close.svg";

const BanksView: NextPage = () => {
  const [mxConnect, setMxConnect] = useState(null);
  const [plaidToken, setPlaidToken] = useState("");
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
        }
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
            }
          ];
        }
      ]
  >([]);
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

  useEffect(() => {
    (async () => {
      let { data: plaidTokenData } = await api.getPlaidToken();
      setPlaidToken(plaidTokenData.token);

      let { data: accountsData } = await api.getBankAccounts();
      setAccounts(accountsData.accounts);

      let { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(userDepositsData.data.userDeposits);
    })();
  }, []);

  useEffect(() => {
    let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    setFilteredDeposits(
      // @ts-ignore
      months.map((month) => {
        let filtered = deposits
          .filter((deposit) => deposit.status !== "pending")
          .filter((deposit) => {
            return (
              deposit.type === "FIAT" &&
              new Date(deposit.timestamp).getMonth() + 1 === month &&
              new Date(deposit.timestamp).getFullYear() ===
                new Date().getFullYear()
            );
          });

        return { month, deposits: filtered };
      })
    );
  }, [deposits]);

  const { open, exit, ready } = usePlaidLink({
    onSuccess: (public_token, metadata) =>
      api.linkPlaidAccount(public_token, metadata).then(async () => {
        let { data: accountsData } = await api.getBankAccounts();
        setAccounts(accountsData.accounts);
      }),
    token: plaidToken,
    countryCodes: ["US", "CA", "GB", "IE", "FR", "ES", "NL"],
    env: process.env.NODE_ENV === "development" ? "sandbox" : "development",
  });

  return (
    <>
      <Script
        id="widget"
        src="https://atrium.mx.com/connect.js"
        onLoad={() => {
          setMxConnect(
            // @ts-ignore
            new window.MXConnect({
              id: "widget",
              iframeTitle: "Connect",
              targetOrigin: "*",
            })
          );
        }}
      />
      <div className="flex flex-col lg:flex-row">
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
                          "0px 12px 20px rgba(39, 43, 34, 0.1), 0px 8.14815px 8px rgba(39, 43, 34, 0.05), 0px 1.85185px 8px rgba(39, 43, 34, 0.025)",
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
                      icon={faTrashAlt}
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
                        src={`data:image/png;base64,${account.logo}`}
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
                                  prev.filter((id) => id !== account._id)
                                )
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
                <Image src={BankImage} />
                <p className="mt-6 text-lighter-black font-secondary font-normal text-center">
                  Your KYC is complete, now you can add multiple bank accounts
                  to your redxam.
                </p>
                <button
                  className="bg-card-button rounded-[50px] py-4 px-16 mt-10 font-secondary font-medium text-white transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    boxShadow:
                      "0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)",
                  }}
                  onClick={async () => {
                    let { data: widgetUrl } = await api.getMXWidgetUrl();
                    if (widgetUrl.errors) {
                      Sentry.captureEvent(widgetUrl.errors);
                      return setMxWidgetError(true);
                    }
                    setOpenMx(true);
                    setTimeout(() => {
                      // @ts-ignore
                      mxConnect?.load(widgetUrl.data.mxWidgetConnect.widgetUrl);
                    }, 50);
                  }}
                  disabled={!plaidToken.length}
                >
                  Add Bank Account
                </button>
              </div>
            )}
          </Card>
          {accounts.length ? (
            <button
              className="w-2/3 mx-auto bg-card-button rounded-[50px] py-4 px-16 mt-10 font-secondary font-medium text-white transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                boxShadow:
                  "0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)",
              }}
              onClick={() => setShowDepositModel(true)}
            >
              Deposit to Wallet
            </button>
          ) : null}
        </div>

        <Card otherClasses="flex-1 w-full h-[fit-content] bg-white flex flex-col rounded-[25px] shadow-card mt-8 lg:mt-0 lg:ml-3">
          <h1 className="px-8 py-6 font-secondary font-medium text-lg">
            Recent deposits from Bank
          </h1>
          <hr />
          {deposits.filter((deposit) => deposit.status === "pending").length ? (
            <>
              <div className="bg-yellow-100 py-1.5">
                <p className="font-secondary text-yellow-400 font-bold text-xs pl-7">
                  Pending
                </p>
              </div>
              <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                {deposits
                  .filter((deposit) => deposit.status === "pending")
                  .map((deposit, index) => (
                    <div
                      className={`flex items-center ${
                        deposits.filter(
                          (deposit) => deposit.status === "pending"
                        ).length !== 1 && index === 0
                          ? "pb-5"
                          : deposits.filter(
                              (deposit) => deposit.status === "pending"
                            ).length !== 1
                          ? "py-5"
                          : ""
                      } ${
                        deposits.filter(
                          (deposit) => deposit.status === "pending"
                        ).length !== 1 &&
                        index ===
                          deposits.filter(
                            (deposit) => deposit.status === "pending"
                          ).length -
                            1
                          ? "pt-5 pb-0"
                          : deposits.filter(
                              (deposit) => deposit.status === "pending"
                            ).length !== 1
                          ? "border-b"
                          : ""
                      }`}
                      key={"deposit" + deposit.timestamp}
                    >
                      <Image
                        src={
                          deposit.bankIcon
                            ? `data:image/png;base64,${deposit.bankIcon}`
                            : BankIcon
                        }
                        width={"40px"}
                        height={"40px"}
                        className={deposit.bankIcon ? "rounded-full" : ""}
                        alt="Bank Image"
                      />
                      <div className="flex flex-col justify-center ml-4">
                        <p className="font-secondary text-sm text-lighter-black mb-1.5">
                          {deposit.bankName || "Unknown bank"}
                        </p>
                        <p className="font-secondary text-xs text-[#95989B]">
                          PLACEHOLDER: ACC TYPE
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-end ml-auto">
                        <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                          {deposit.currency === "USD" ? "$" : deposit.currency}
                          {deposit.amount}
                        </p>
                        <div className="flex justify-center items-center">
                          <p className="font-secondary text-xs text-[#95989B] mr-1">
                            Pending •{" "}
                            {new Date(deposit.timestamp).toLocaleDateString(
                              undefined,
                              {
                                day: "2-digit",
                                month: "short",
                              }
                            )}
                            {", "}
                            {new Date(deposit.timestamp).toLocaleTimeString(
                              undefined,
                              {
                                minute: "2-digit",
                                hour: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          ) : null}
          {filteredDeposits.length ? (
            filteredDeposits
              .filter((filteredDeposits) => filteredDeposits.deposits.length)
              .map((filteredDeposit) => (
                <div key={"deposits" + filteredDeposit.month}>
                  <div className="bg-[#FAFAFA] py-1.5">
                    <p className="font-secondary text-lighter-black font-bold text-xs pl-7">
                      {getMonthName(filteredDeposit.month)}{" "}
                      {new Date().getFullYear()}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                    {filteredDeposit.deposits.map((deposit, index) => (
                      <div
                        className={`flex items-center ${
                          index === 0 ? "pb-5" : "py-5"
                        } ${
                          index === filteredDeposit.deposits.length - 1
                            ? "pt-5 pb-0"
                            : "border-b"
                        }`}
                        key={
                          "deposit" + filteredDeposit.month + deposit.timestamp
                        }
                      >
                        <Image
                          src={
                            deposit.bankIcon
                              ? `data:image/png;base64,${deposit.bankIcon}`
                              : BankIcon
                          }
                          width={"40px"}
                          height={"40px"}
                          className={deposit.bankIcon ? "rounded-full" : ""}
                          alt="Bank Image"
                        />
                        <div className="flex flex-col justify-center ml-4">
                          <p className="font-secondary text-sm text-lighter-black mb-1.5">
                            {deposit.bankName || "Unknown bank"}
                          </p>
                          <p className="font-secondary text-xs text-[#95989B]">
                            {deposit.bankType || "Unknown account type"}
                          </p>
                        </div>
                        <div className="flex flex-col justify-center items-end ml-auto">
                          <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                            {deposit.currency === "USD"
                              ? "$"
                              : deposit.currency}
                            {deposit.amount}
                          </p>

                          <div className="flex justify-center items-center">
                            <p className="font-secondary text-xs text-[#95989B] mr-1">
                              {new Date(deposit.timestamp).toLocaleDateString(
                                undefined,
                                {
                                  day: "2-digit",
                                  month: "short",
                                }
                              )}
                              {", "}
                              {new Date(deposit.timestamp).toLocaleTimeString(
                                undefined,
                                {
                                  minute: "2-digit",
                                  hour: "2-digit",
                                }
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
                No transactions has been made from any of the added bank
                accounts.
              </p>
            </div>
          )}
        </Card>

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
                    src={closeIcon || ""}
                    alt="Close Icon"
                    width="14px"
                    height="14px"
                  />
                </button>
              </div>
              <div id="widget" className="z-10"></div>
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
                src={closeIcon || ""}
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
            let { data: accountsData } = await api.getBankAccounts();
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
