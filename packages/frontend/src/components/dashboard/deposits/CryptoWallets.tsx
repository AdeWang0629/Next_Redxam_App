import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Token } from '@utils/types';

// Components
import TokenSelector from './TokenSelector';
import NetworkSelector from './NetworkSelector';
import CryptoAddress from './CryptoAddress';
import Card from '../Card';
import CryptoInput from '../withdrawals/CryptoInput';

const CryptoWallets = type => {
  const { t } = useTranslation('dashboard');

  const [token, setToken] = useState<Token | null>(null);
  const [network, setNetwork] = useState<{
    name: string;
    address: string;
  }>({ name: '', address: '' });

  const handleToken = (newToken: Token) => {
    setToken(newToken);
    handleNetwork({ name: '', address: '' });
  };

  const handleNetwork = (selectedNetwork: {
    name: string;
    address: string;
  }) => {
    setNetwork(selectedNetwork);
  };

  return (
    <Card otherClasses="md:w-1/2 w-full h-[fit-content] bg-white flex flex-col rounded-[25px] shadow-card mr-3">
      <div className="flex items-center justify-between px-8">
        <h1 className="font-secondary font-medium text-lg py-6">
          {type === 'deposit' ? t('depositToWallet') : t('withdrawToWallet')}
        </h1>
      </div>
      <hr />

      {!token ||
        (network.address === '' && (
          <p className="text-center text-sm font-secondary text-[#636369] mt-3">
            {t('selectTokenAndNetwork')}
          </p>
        ))}

      <TokenSelector token={token} handleToken={handleToken} />

      <NetworkSelector
        networks={token?.networks}
        network={network}
        handleNetwork={handleNetwork}
      />
      {token && network.address && type === 'deposit' ? (
        <CryptoAddress
          address={network.address}
          tokenSymbol={token.symbol}
          network={network.name}
        />
      ) : (
        token &&
        network.address && (
          <CryptoInput
            address={network.address}
            tokenSymbol={token.symbol}
            network={network.name}
          />
        )
      )}
    </Card>
  );
};

export default CryptoWallets;
