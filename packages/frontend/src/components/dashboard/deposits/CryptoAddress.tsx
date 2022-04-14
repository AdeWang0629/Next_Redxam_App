import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import QRCode from 'qrcode';

import copyIcon from '@public/images/dashboard/deposits/copy.svg';

type Props = { address: string };

const CryptoAddress = ({ address }: Props) => {
  const { t } = useTranslation('dashboard');

  const [qrCode, setQrCode] = useState('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [qrCodeModal, setQrCodeModal] = useState<boolean>(false);

  useEffect(() => {
    async function generateQrCode() {
      try {
        const addressQrCode = await QRCode.toDataURL(address);
        setQrCode(addressQrCode);
      } catch (error) {
        return null;
      }
      return null;
    }

    generateQrCode();
  }, [address]);

  return (
    <>
      <div className="px-8 lg:px-20 mt-4">
        <p className="font-medium text-xs text-[#2A3037] mb-2 font-secondary">
          {t('copyAddress')}
        </p>

        <div className="flex justify-between items-center relative">
          <p className="font-secondary text-xs text-[#95989B]">{address}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(address);
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
  );
};

export default CryptoAddress;
