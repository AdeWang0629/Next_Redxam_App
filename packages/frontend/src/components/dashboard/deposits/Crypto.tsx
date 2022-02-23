import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@providers/User';
import { NextPage } from 'next';
import Image from 'next/image';
import api from '@utils/api';
import QRCode from 'qrcode';

import btcLogo from '@public/icons/bitcoin.svg';
import arrowDrop from '@public/images/dashboard/deposits/arrow-drop.svg';
import closeIcon from '@public/images/dashboard/deposits/close.svg';
import copyIcon from '@public/images/dashboard/deposits/copy.svg';
import { Deposit } from '@utils/types';
import TsxsTable from './TransactionsTable';
import Card from '../Card';

const Crypto: NextPage = () => {
  const { user } = useContext(UserContext);

  const [tokenModal, setTokenModal] = useState(false);
  const [token, setToken] = useState('');
  const [tokenIcon, setTokenIcon] = useState('');
  const [networkModal, setNetworkModal] = useState(false);
  const [network, setNetwork] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [deposits, setDeposits] = useState<[] | Deposit[]>([]);

  useEffect(() => {
    async function generateQrCode() {
      try {
        const addressQrCode = await QRCode.toDataURL(
          user?.wallet?.address || ''
        );
        setQrCode(addressQrCode);
      } catch (error) {
        return null;
      }

      return null;
    }

    generateQrCode();
  }, [user?.wallet?.address, qrCode]);

  useEffect(() => {
    (async () => {
      const { data: userDepositsData } = await api.getUserDeposits();
      setDeposits(
        userDepositsData.data.userDeposits
          .filter((deposit: { type: string }) => deposit.type === 'CRYPTO')
          .sort(
            (
              firstTimestamp: { timestamp: number },
              secondTimeStamp: { timestamp: number }
            ) => secondTimeStamp.timestamp - firstTimestamp.timestamp
          )
      );
    })();
  }, []);

  const handleToken = (newToken: string, newTokenIcon: string) => {
    setToken(newToken);
    setTokenIcon(newTokenIcon);
    setTokenModal(false);
  };

  const handleNetwork = (newNetwork: string) => {
    setNetwork(newNetwork);
    setNetworkModal(false);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-x-3">
      <div className="flex-1 flex flex-col">
        <Card otherClasses="w-full h-[fit-content] bg-white flex flex-col rounded-[25px] shadow-card mr-3">
          <div className="flex items-center justify-between px-8">
            <h1 className="font-secondary font-medium text-lg py-6">
              Deposit to Wallet
            </h1>
          </div>
          <hr />

          {token === '' || network === '' ? (
            <p className="text-center text-sm font-secondary text-[#636369] mt-3">
              Please select token & network
            </p>
          ) : (
            ''
          )}

          <div className="flex flex-col px-8 mb-5 mt-3">
            <label
              htmlFor="token"
              className="mb-5 font-secondary font-medium text-xl"
            >
              Token
            </label>

            <button
              className="border-2 border-solid border-[#D4D5D3] rounded-[25px] px-5 h-14 flex justify-between items-center"
              onClick={() => setTokenModal(true)}
            >
              <div className="flex items-center">
                {token ? (
                  <>
                    <Image
                      src={tokenIcon || ''}
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
                src={arrowDrop || ''}
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
                    src={closeIcon || ''}
                    alt="Close Icon"
                    width="14px"
                    height="14px"
                  />
                </button>
              </div>
              <div className="px-7 mt-5">
                <button
                  className="flex"
                  onClick={() => handleToken('BTC', btcLogo)}
                >
                  <Image
                    src={btcLogo || ''}
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
              className="border-2 border-solid border-[#D4D5D3] rounded-[25px] px-5 h-14 flex justify-between items-center"
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
                src={arrowDrop || ''}
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
                    src={closeIcon || ''}
                    alt="Close Icon"
                    width="14px"
                    height="14px"
                  />
                </button>
              </div>
              <div className="px-7 mt-5">
                <button
                  className="flex flex-col"
                  onClick={() => handleNetwork('BTC')}
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
                      user?.wallet?.address || ''
                    )
                      }
                >
                  <Image
                    src={copyIcon || ''}
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
                    src={qrCode || ''}
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
                    src={qrCode || ''}
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
                <li className="before:content-['•'] before:text-[#67CE0C] before:font-bold before:inline-block before:w-[4px] before:pr-3.5 text-xs font-secondary text-[#95989B] mb-2">
                  Send only BTC to this deposit address
                </li>
                <li className="before:content-['•'] before:text-[#67CE0C] before:font-bold before:inline-block before:w-[4px] before:pr-3.5 text-xs font-secondary text-[#95989B]">
                  Make sure the network is bitcoin
                </li>
              </ul>
            </div>
          </>
          )}
        </Card>
      </div>

      <TsxsTable deposits={deposits} depositsType="crypto" />
    </div>
  );
};

export default Crypto;
