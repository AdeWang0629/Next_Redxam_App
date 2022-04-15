import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { UserContext } from '@providers/User';

import { Network } from '@utils/types';

import closeIcon from '@public/images/dashboard/deposits/close.svg';
import Card from '../Card';

type Props = {
  networks: { [key: string]: Network };
  setNetworkModal(network: boolean): void;
  handleNetwork(selectedNetwork: {
    name: string;
    address: string;
    tsxCount: number;
  }): void;
};

const NetworkModal = ({ networks, setNetworkModal, handleNetwork }: Props) => {
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
          {Object.keys(networks).map(key => {
            if (
              !networks[key].isTestnet ||
              (networks[key].isTestnet &&
                process.env.NODE_ENV === 'development')
            ) {
              return (
                <button
                  className="flex flex-col mb-6 w-full"
                  onClick={() => {
                    handleNetwork({
                      name: networks[key].name,
                      // @ts-ignore
                      ...user!.wallets[key]
                    });
                    setNetworkModal(false);
                  }}
                >
                  <p className="font-secondary text-base font-medium">
                    {networks[key].name}
                  </p>
                </button>
              );
            }
            return null;
          })}
        </div>
      </Card>
    </div>
  );
};

export default NetworkModal;
