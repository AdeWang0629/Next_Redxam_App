import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import arrowDrop from '@public/images/dashboard/deposits/arrow-drop.svg';

import { Network } from '@utils/types';

import NetworkModal from './NetworkModal';

type NetworkWallet = {
  name: string;
  address: string;
};

type Props = {
  networks: { [key: string]: Network } | undefined;
  network: NetworkWallet;
  handleNetwork(selectedNetwork: NetworkWallet): void;
};

const NetworkSelector = ({ networks, network, handleNetwork }: Props) => {
  const { t } = useTranslation('dashboard');
  const [networkModal, setNetworkModal] = useState<boolean>(false);

  return (
    <>
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
      {networks && networkModal && (
        <NetworkModal
          networks={networks}
          setNetworkModal={setNetworkModal}
          handleNetwork={handleNetwork}
        />
      )}
    </>
  );
};

export default NetworkSelector;
