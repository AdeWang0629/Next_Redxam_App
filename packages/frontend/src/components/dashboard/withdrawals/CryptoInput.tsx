import React from 'react';
import { useTranslation } from 'next-i18next';

import Tippy from '@tippyjs/react';

type Props = { tokenSymbol: string; network: string };

const CryptoInput = ({ tokenSymbol, network }: Props) => {
  const { t } = useTranslation('dashboard');

  return (
    <>
      <div className="px-8 mt-4">
        <Tippy content="Crypto withdrawal unavailable">
          <div className="input-wrapper">
            <input disabled type="text" className="font-secondary" />
            <label className="font-primary" htmlFor="firstName">
              {t('Enter wallet address')}
            </label>
          </div>
        </Tippy>
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
