import { useState, useEffect, useContext } from "react";
import { UserContext } from "@providers/User";
import { NextPage } from "next";
import Image from "next/image";
import api from "@utils/api";
import Card from "../Card";
import { getMonthName } from "@utils/helpers";
import QRCode from "qrcode";

import btcLogo from "@public/icons/bitcoin.svg";
import BankIcon from "@public/icons/bank.svg";
import arrowDrop from "@public/images/dashboard/deposits/arrow-drop.svg";
import closeIcon from "@public/images/dashboard/deposits/close.svg";
import EmptyImage from "@public/images/dashboard/deposits/empty.svg";
import copyIcon from "@public/images/dashboard/deposits/copy.svg";

const BitcoinView: NextPage = () => {
  const { user } = useContext(UserContext);

  const [tokenModal, setTokenModal] = useState(false);
  const [token, setToken] = useState("");
  const [tokenIcon, setTokenIcon] = useState("");
  const [networkModal, setNetworkModal] = useState(false);
  const [network, setNetwork] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [qrCodeModal, setQrCodeModal] = useState(false);
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

  const [pendingCryptoDeposits, setPendingCryptoDeposits] = useState<
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

  const [cryptoDeposits, setCryptoDeposits] = useState<
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

  useEffect(() => {
    async function generateQrCode() {
      try {
        const addressQrCode = await QRCode.toDataURL(
          user?.wallet?.address || ""
        );
        setQrCode(addressQrCode);
      } catch (error) {
        return null;
      }
    }
    generateQrCode();
  }, [user?.wallet?.address, qrCode]);

  useEffect(() => {
    (async () => {
      let { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(
        userDepositsData.data.userDeposits
          .filter((deposit: { type: string }) => deposit.type === "CRYPTO")
          .sort(
            (
              firstTimestamp: { timestamp: number },
              secondTimeStamp: { timestamp: number }
            ) => secondTimeStamp.timestamp - firstTimestamp.timestamp
          )
      );
    })();
  }, []);

  useEffect(() => {
    setPendingCryptoDeposits(
      // @ts-ignore
      deposits.filter((deposit) => deposit.status === "pending")
    );

    setCryptoDeposits(
      // @ts-ignore
      deposits.filter((deposit) => deposit.status !== "pending")
    );
  }, [deposits]);

  const handleToken = (token: string, tokenIcon: string) => {
    setToken(token);
    setTokenIcon(tokenIcon);
    setTokenModal(false);
  };

  const handleNetwork = (network: string) => {
    setNetwork(network);
    setNetworkModal(false);
  };

  let month = -1;
  let year = new Date().getFullYear();

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col">
          <Card otherClasses="w-full h-[fit-content] bg-white flex flex-col rounded-[25px] shadow-card mr-3">
            <div className="flex items-center justify-between px-8">
              <h1 className="font-secondary font-medium text-lg py-6">
                Deposit to Wallet
              </h1>
            </div>
            <hr />

            {token === "" || network === "" ? (
              <p className="text-center text-sm font-secondary text-[#636369] mt-3">
                Please select token & network
              </p>
            ) : (
              ""
            )}

            <div className="flex flex-col px-8 mb-5 mt-3">
              <label
                htmlFor="token"
                className="mb-5 font-secondary font-medium text-xl"
              >
                Token
              </label>

              <button
                className="border-2 border-solid	border-[#D4D5D3] rounded-[25px] px-5 h-14 flex justify-between items-center"
                onClick={() => setTokenModal(true)}
              >
                <div className="flex items-center">
                  {token ? (
                    <>
                      <Image
                        src={tokenIcon || ""}
                        alt="BTC Logo"
                        width="28px"
                        height="28px"
                      />
                      <p className="ml-4 font-secondary text-sm">{token}</p>
                    </>
                  ) : (
                    <p className="font-secondary text-sm opacity-50">
                      Select token
                    </p>
                  )}
                </div>
                <Image
                  src={arrowDrop || ""}
                  alt="Arrow Dropdown"
                  width="24px"
                  height="24px"
                />
              </button>
            </div>

            {/* Token Modal */}
            {tokenModal && (
              <div className="fixed bg-black/50 w-screen h-screen z-10 ml-auto mr-auto left-0 right-0 top-0 text-center">
                <Card
                  width="w-[622px]"
                  height="h-[170px]"
                  py="py-7"
                  otherClasses="bg-white fixed m-auto top-0 right-0 left-0 bottom-0 text-center opacity-100"
                >
                  <div className="w-full flex justify-between items-center px-7 pb-7 border-b border-[#E7EAEB]">
                    <p className="text-lg font-secondary">Select Token</p>
                    <button
                      className="bg-[#2A3037] w-[40px] h-[40px] rounded-[500px]"
                      onClick={() => setTokenModal(false)}
                    >
                      <Image
                        src={closeIcon || ""}
                        alt="Close Icon"
                        width="14px"
                        height="14px"
                      />
                    </button>
                  </div>
                  <div className="px-7 mt-5">
                    <button
                      className="flex"
                      onClick={() => handleToken("BTC", btcLogo)}
                    >
                      <Image
                        src={btcLogo || ""}
                        alt="BTC Logo"
                        width="28px"
                        height="28px"
                      />
                      <p className="font-secondary text-lg ml-6">BTC</p>
                    </button>
                  </div>
                </Card>
              </div>
            )}
            <div className="flex flex-col px-8 pb-6">
              <label
                htmlFor="network"
                className="mb-5 font-secondary font-medium text-xl"
              >
                Network
              </label>

              <button
                className="border-2 border-solid	border-[#D4D5D3] rounded-[25px] px-5 h-14 flex justify-between items-center"
                onClick={() => setNetworkModal(true)}
              >
                {network ? (
                  <p className="font-secondary text-sm">{network}</p>
                ) : (
                  <p className="font-secondary text-sm opacity-50">
                    Select Network
                  </p>
                )}

                <Image
                  src={arrowDrop || ""}
                  alt="Arrow Dropdown"
                  width="24px"
                  height="24px"
                />
              </button>
            </div>

            {/* Network Modal */}
            {networkModal && (
              <div className="fixed bg-black/50 w-screen h-screen z-10 ml-auto mr-auto left-0 right-0 top-0 text-center">
                <Card
                  width="w-[622px]"
                  height="h-[200px]"
                  py="py-7"
                  otherClasses="bg-white fixed m-auto top-0 right-0 left-0 bottom-0 text-center opacity-100"
                >
                  <div className="w-full flex justify-between items-center px-7 pb-7 border-b border-[#E7EAEB]">
                    <p className="text-lg font-secondary">Select Network</p>
                    <button
                      className="bg-[#2A3037] w-[40px] h-[40px] rounded-[500px]"
                      onClick={() => setNetworkModal(false)}
                    >
                      <Image
                        src={closeIcon || ""}
                        alt="Close Icon"
                        width="14px"
                        height="14px"
                      />
                    </button>
                  </div>
                  <div className="px-7 mt-5">
                    <button
                      className="flex flex-col"
                      onClick={() => handleNetwork("BTC")}
                    >
                      <p className="font-secondary text-base font-medium">
                        BTC
                      </p>
                      <p className="font-secondary text-base text-[#95989B] mt-1.5">
                        Bitcoin
                      </p>
                    </button>
                  </div>
                </Card>
              </div>
            )}
            {token && network && (
              <>
                <div className="px-8 lg:px-20 mt-4">
                  <p className="font-medium text-xs text-[#2A3037] mb-2 font-secondary">
                    Copy Address
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-secondary text-xs text-[#95989B]">
                      {user?.wallet?.address}
                    </p>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          user?.wallet?.address || ""
                        )
                      }
                    >
                      <Image
                        src={copyIcon || ""}
                        alt="Copy Button"
                        width="22px"
                        height="22px"
                      />
                    </button>
                  </div>
                  <div className="flex justify-center items-center my-6 relative">
                    <button
                      className="bg-light-gray bg-black w-[96px] h-[96px] p-6 rounded-full"
                      onMouseEnter={() => setQrCodeModal(true)}
                      onMouseLeave={() => setQrCodeModal(false)}
                    >
                      {qrCode && (
                        <Image
                          src={qrCode || ""}
                          alt="QR Code"
                          width="40px"
                          height="40px"
                        />
                      )}
                    </button>
                    {qrCodeModal && (
                      <div className="w-[150px] h-[150px] absolute left-[195px] top-[12px] shadow-card rounded-[10px] before:absolute before:content-[''] before:w-[0] before:h-[0] before:left-[-11px] before:top-[18px] before:border-b-[15px] before:border-b-transparent before:border-t-[15px] before:border-t-transparent before:border-r-[12px] before:border-r-white">
                        {qrCode && (
                          <Image
                            src={qrCode || ""}
                            alt="QR Code"
                            width="200px"
                            height="200px"
                            className="rounded-[10px]"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pb-6 px-8">
                  <ul>
                    <li className="before:content-['\2022'] before:text-[#67CE0C] before:font-bold before:inline-block before:w-[4px] before:pr-3.5 text-xs font-secondary text-[#95989B] mb-2">
                      Send only BTC to this deposit address
                    </li>
                    <li className="before:content-['\2022'] before:text-[#67CE0C] before:font-bold before:inline-block before:w-[4px] before:pr-3.5 text-xs font-secondary text-[#95989B]">
                      Make sure the network is bitcoin
                    </li>
                  </ul>
                </div>
              </>
            )}
          </Card>
        </div>

        <Card otherClasses="flex-1 w-full h-[fit-content] bg-white flex flex-col rounded-[25px] shadow-card mt-8 lg:mt-0 lg:ml-3">
          <h1 className="px-8 py-6 font-secondary font-medium text-lg">
            Recent Deposits to Wallet
          </h1>

          {deposits.length ? (
            <>
              {pendingCryptoDeposits.length > 0 && (
                <>
                  <div className="bg-yellow-100 py-1.5">
                    <p className="font-secondary text-yellow-400 font-bold text-xs pl-7">
                      Pending
                    </p>
                  </div>
                  <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                    {pendingCryptoDeposits.map(
                      (pendingCryptoDeposit, index) => (
                        <div
                          className={`flex items-center ${
                            pendingCryptoDeposits.length !== 1 && index === 0
                              ? "pb-5"
                              : pendingCryptoDeposits.filter(
                                  (pendingCryptoDeposit) =>
                                    pendingCryptoDeposit.status === "pending"
                                ).length !== 1
                              ? "py-5"
                              : ""
                          } ${
                            pendingCryptoDeposits.length !== 1 &&
                            index === pendingCryptoDeposits.length - 1
                              ? "pt-5 pb-0"
                              : pendingCryptoDeposits.length !== 1
                              ? "border-b"
                              : ""
                          }`}
                          key={
                            "pendingCryptoDeposit" +
                            pendingCryptoDeposit.timestamp
                          }
                        >
                          <Image
                            src={btcLogo}
                            width={"40px"}
                            height={"40px"}
                            className={
                              pendingCryptoDeposit.bankIcon
                                ? "rounded-full"
                                : ""
                            }
                            alt="Bank Image"
                          />
                          <div className="flex flex-col justify-center ml-4">
                            <p className="font-secondary text-sm text-lighter-black mb-1.5">
                              Bitcoin
                            </p>
                            <p className="font-secondary text-xs text-[#95989B]">
                              Processing
                            </p>
                          </div>
                          <div className="flex flex-col justify-center items-end ml-auto">
                            <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                              {pendingCryptoDeposit.currency === "USD"
                                ? "$"
                                : pendingCryptoDeposit.currency}{" "}
                              {pendingCryptoDeposit.amount * 0.00000001}
                            </p>
                            <div className="flex justify-center items-center">
                              <p className="font-secondary text-xs text-[#95989B] mr-1">
                                Pending •{" "}
                                {new Date(
                                  pendingCryptoDeposit.timestamp
                                ).toLocaleDateString(undefined, {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                                {", "}
                                {new Date(
                                  pendingCryptoDeposit.timestamp
                                ).toLocaleTimeString(undefined, {
                                  minute: "2-digit",
                                  hour: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {cryptoDeposits.length > 0 &&
                cryptoDeposits.map((deposit) => {
                  if (
                    new Date(deposit.timestamp).getFullYear() <= year &&
                    new Date(deposit.timestamp).getMonth() + 1 !== month
                  ) {
                    year = new Date(deposit.timestamp).getFullYear();
                    month = new Date(deposit.timestamp).getMonth() + 1;
                    return (
                      <div key={"deposits" + month + year}>
                        <div className="bg-[#FAFAFA] py-1.5">
                          <p className="font-secondary text-lighter-black font-bold text-xs pl-7">
                            {getMonthName(month)} {year}
                          </p>
                        </div>

                        {cryptoDeposits.map((deposit) => {
                          if (
                            new Date(deposit.timestamp).getFullYear() ===
                              year &&
                            new Date(deposit.timestamp).getMonth() + 1 === month
                          ) {
                            return (
                              <div className="flex flex-col justify-center py-5 px-7 border-b border-[#EAEAEB]">
                                <div
                                  className={`flex items-center`}
                                  key={"deposit" + month + deposit.timestamp}
                                >
                                  <Image
                                    src={btcLogo}
                                    width={"40px"}
                                    height={"40px"}
                                    className={
                                      deposit.bankIcon ? "rounded-full" : ""
                                    }
                                    alt="Bank Image"
                                  />
                                  <div className="flex flex-col justify-center ml-4">
                                    <p className="font-secondary text-sm text-lighter-black mb-1.5">
                                      Bitcoin
                                    </p>
                                    <p className="font-secondary text-xs text-[#95989B]">
                                      Processed
                                    </p>
                                  </div>
                                  <div className="flex flex-col justify-center items-end ml-auto">
                                    <p className="font-secondary font-bold text-sm text-lighter-black mb-1.5">
                                      {deposit.currency === "USD"
                                        ? "$"
                                        : deposit.currency}{" "}
                                      {deposit.amount * 0.00000001}
                                    </p>
                                    <div className="flex justify-center items-center">
                                      <p className="font-secondary text-xs text-[#95989B] mr-1">
                                        {new Date(
                                          deposit.timestamp
                                        ).toLocaleDateString(undefined, {
                                          day: "2-digit",
                                          month: "short",
                                        })}
                                        {", "}
                                        {new Date(
                                          deposit.timestamp
                                        ).toLocaleTimeString(undefined, {
                                          minute: "2-digit",
                                          hour: "2-digit",
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
        </Card>
      </div>
    </>
  );
};

export default BitcoinView;
