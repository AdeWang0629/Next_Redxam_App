import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { UserContext } from '@providers/User';

import closeIcon from '@public/images/dashboard/deposits/close.svg';
import Card from '../Card';

type Props = {
  setNetworkModal(network: boolean): void;
  handleNetwork(selectedNetwork: {
    name: string;
    address: string;
    tsxCount: number;
  }): void;
};

const NetworkModal = ({ setNetworkModal, handleNetwork }: Props) => {
  const { t } = useTranslation('dashboard');
  const { user } = useContext(UserContext);

  return (
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
            className="flex flex-col mb-6 w-full"
            onClick={() => {
              handleNetwork({ name: 'BTC', ...user!.wallets.BTC });
              setNetworkModal(false);
            }}
          >
            <p className="font-secondary text-base font-medium">BTC</p>
            <p className="font-secondary text-base text-[#95989B] mt-1.5">
              Bitcoin
            </p>
          </button>
          {process.env.NODE_ENV === 'development' && (
            <button
              className="flex flex-col w-full"
              onClick={() => {
                handleNetwork({
                  name: 'Testnet BTC',
                  ...user!.wallets.TEST_BTC
                });
                setNetworkModal(false);
              }}
            >
              <p className="font-secondary text-base font-medium">Test BTC</p>
              <p className="font-secondary text-base text-[#95989B] mt-1.5">
                Testnet Bitcoin
              </p>
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NetworkModal;
