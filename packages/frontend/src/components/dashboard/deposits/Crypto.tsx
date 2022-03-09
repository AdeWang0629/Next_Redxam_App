import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@providers/User';
import { NextPage } from 'next';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import api from '@utils/api';
import QRCode from 'qrcode';

import btcLogo from '@public/icons/bitcoin.svg';
import arrowDrop from '@public/images/dashboard/deposits/arrow-drop.svg';
import closeIcon from '@public/images/dashboard/deposits/close.svg';
import copyIcon from '@public/images/dashboard/deposits/copy.svg';
import { Deposit } from '@utils/types';
import { useTranslation } from 'next-i18next';
import TsxsTable from './TransactionsTable';
import Card from '../Card';

const Crypto: NextPage = () => {
  const { t } = useTranslation('dashboard');
  const { user } = useContext(UserContext);

  const [tokenModal, setTokenModal] = useState(false);
  const [token, setToken] = useState('');
  const [tokenIcon, setTokenIcon] = useState('');
  const [networkModal, setNetworkModal] = useState(false);
  const [network, setNetwork] = useState<{
    name: string;
    address: string;
    tsxCount: number;
    wif: string;
  }>({ name: '', address: '', tsxCount: 0, wif: '' });
  const [qrCode, setQrCode] = useState('');
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [deposits, setDeposits] = useState<[] | Deposit[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    async function generateQrCode() {
      try {
        const addressQrCode = await QRCode.toDataURL(network.address || '');
        setQrCode(addressQrCode);
      } catch (error) {
        return null;
      }
      return null;
    }

    generateQrCode();
  }, [network.address]);

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

  const handleNetwork = (selectedNetwork: {
    name: string;
    address: string;
    tsxCount: number;
    wif: string;
  }) => {
    setNetwork(selectedNetwork);
    setNetworkModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Card otherClasses="md:w-1/2 w-full h-[fit-content] bg-white flex flex-col rounded-[25px] shadow-card mr-3">
        <div className="flex items-center justify-between px-8">
          <h1 className="font-secondary font-medium text-lg py-6">
            {t('depositToWallet')}
          </h1>
        </div>
        <hr />

        {token === '' || network.address === '' ? (
          <p className="text-center text-sm font-secondary text-[#636369] mt-3">
            {t('selectTokenAndNetwork')}
          </p>
        ) : (
          ''
        )}

        <div className="flex flex-col px-8 mb-5 mt-3">
          <label
            htmlFor="token"
            className="mb-5 font-secondary font-medium text-xl"
          >
            {t('token')}
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
                  {t('selectToken')}
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
                <p className="text-lg font-secondary">{t('selectToken')}</p>
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
            {t('network')}
          </label>

          <button
            className="border-2 border-solid border-[#D4D5D3] rounded-[25px] px-5 h-14 flex justify-between items-center"
            onClick={() => setNetworkModal(true)}
          >
            {network.address ? (
              <p className="font-secondary text-sm">{network.name}</p>
            ) : (
              <p className="font-secondary text-sm opacity-50">
                {t('selectNetwork')}
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
              width="md:w-[622px] w-[95%]"
              height="h-1/2"
              py="py-7"
              otherClasses="bg-white fixed m-auto top-0 right-0 left-0 bottom-0 text-center opacity-100"
            >
              <div className="w-full flex justify-between items-center px-7 pb-7 border-b border-[#E7EAEB]">
                <p className="text-lg font-secondary">{t('selectNetwork')}</p>
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
                  className="flex flex-col mb-6"
                  onClick={() =>
                    handleNetwork({ name: 'BTC', ...user?.wallets?.BTC })
                  }
                >
                  <p className="font-secondary text-base font-medium">BTC</p>
                  <p className="font-secondary text-base text-[#95989B] mt-1.5">
                    Bitcoin
                  </p>
                </button>
                {getCookie('environment') !== 'production' && (
                  <button
                    className="flex flex-col"
                    onClick={() =>
                      handleNetwork({
                        name: 'Tesnet BTC',
                        ...user?.wallets?.TEST_BTC
                      })
                    }
                  >
                    <p className="font-secondary text-base font-medium">
                      Test BTC
                    </p>
                    <p className="font-secondary text-base text-[#95989B] mt-1.5">
                      Tesnet Bitcoin
                    </p>
                  </button>
                )}
              </div>
            </Card>
          </div>
        )}
        {token && network.address && (
          <>
            <div className="px-8 lg:px-20 mt-4">
              <p className="font-medium text-xs text-[#2A3037] mb-2 font-secondary">
                {t('copyAddress')}
              </p>

              <div className="flex justify-between items-center relative">
                <p className="font-secondary text-xs text-[#95989B]">
                  {network?.address}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(network?.address || '');
                    setIsCopied(true);
                    setTimeout(() => {
                      setIsCopied(false);
                    }, 2500);
                  }}
                >
                  {isCopied && (
                    <div className="text-sm bg-[#5ec709] right-10 py-1 rounded-[10px] w-[130px] z-1 text-[#c7e4a8] absolute  before:content-[''] before:absolute before:content-[''] before:w-[0] before:h-[0] before:right-[-11px] before:border-b-[8px] before:border-b-transparent before:border-t-[8px] before:border-t-transparent before:border-r-[#5ec709]  before:border-l-[14px] before:border-l-[#5ec709]">
                      <p className="font-secondary font-medium text-xs text-white m-auto">
                        Copied to clipboard
                      </p>
                    </div>
                  )}
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
                  {t('sendBTCOnly')}
                </li>
                <li className="before:content-['•'] before:text-[#67CE0C] before:font-bold before:inline-block before:w-[4px] before:pr-3.5 text-xs font-secondary text-[#95989B]">
                  {t('makeSure')}
                </li>
              </ul>
            </div>
          </>
        )}
      </Card>

      <TsxsTable deposits={deposits} depositsType="crypto" />
    </div>
  );
};

export default Crypto;
