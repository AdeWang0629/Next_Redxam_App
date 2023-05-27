import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import closeIcon from '@public/images/dashboard/deposits/close.svg';
import { Tokens, Token } from '@utils/types';
import tokensData from '@utils/Tokens.json';
import Card from '../Card';

type Props = {
  setTokenModal(modal: boolean): void;
  handleToken(newToken: Token): void;
};

const TokenModal = ({ setTokenModal, handleToken }: Props) => {
  const [tokens] = useState<Tokens>(tokensData);
  const { t } = useTranslation('dashboard');

  return (
    <div className="fixed bg-black/50 w-screen h-screen z-10 ml-auto mr-auto left-0 right-0 top-0 text-center">
      <Card
        width="md:w-[622px] w-[95%]"
        height="h-1/2"
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
        {Object.keys(tokens).map(key => (
          <div
            role="button"
            tabIndex={0}
            className="flex px-7 mt-5 w-full cursor-pointer"
            onClick={() => {
              handleToken(tokens[key]);
              setTokenModal(false);
            }}
          >
            <Image
              src={tokens[key].ico}
              alt={`${tokens[key].name} logo`}
              width="28px"
              height="28px"
            />
            <p className="font-secondary text-lg ml-6">{key}</p>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default TokenModal;
