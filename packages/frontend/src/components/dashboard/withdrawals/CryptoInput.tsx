import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import QRCode from 'qrcode';

import copyIcon from '@public/images/dashboard/deposits/copy.svg';

type Props = { address: string; tokenSymbol: string; network: string };

const CryptoInput = ({ address, tokenSymbol, network }: Props) => {
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
      <div className="px-8 mt-4">
        <div className="input-wrapper">
          <input type="text" className="font-secondary" />
          <label className="font-primary" htmlFor="firstName">
            Enter wallet address
          </label>
        </div>
      </div>
      <div className="pb-6 px-8">
        <ul>
          <li className="before:content-['•'] before:text-[#67CE0C] before:font-bold before:inline-block before:w-[4px] before:pr-3.5 text-xs font-secondary text-[#95989B] mb-2 mt-3">
            {`Send only to ${tokenSymbol} addresses`}
          </li>
          <li className="before:content-['•'] before:text-[#67CE0C] before:font-bold before:inline-block before:w-[4px] before:pr-3.5 text-xs font-secondary text-[#95989B] mt-3">
            {`Make sure it's on the ${network} network`}
          </li>
        </ul>
      </div>
    </>
  );
};

export default CryptoInput;
