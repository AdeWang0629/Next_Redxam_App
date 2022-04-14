import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import arrowDrop from '@public/images/dashboard/deposits/arrow-drop.svg';
import TokenModal from './TokenModal';

type Props = {
  token: string;
  handleToken(newToken: string, newTokenImage: string): void;
  tokenIcon: string;
};

const TokenSelector = ({ token, handleToken, tokenIcon }: Props) => {
  const { t } = useTranslation('dashboard');
  const [tokenModal, setTokenModal] = useState<boolean>(false);

  return (
    <>
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
        <TokenModal setTokenModal={setTokenModal} handleToken={handleToken} />
      )}
    </>
  );
};

export default TokenSelector;
