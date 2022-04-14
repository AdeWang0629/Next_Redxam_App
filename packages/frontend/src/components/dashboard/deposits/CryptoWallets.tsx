import { useState } from 'react';
import { useTranslation } from 'next-i18next';

// Components
import TokenSelector from './TokenSelector';
import NetworkSelector from './NetworkSelector';
import CryptoAddress from './CryptoAddress';
import Card from '../Card';

const CryptoWallets = () => {
  const { t } = useTranslation('dashboard');

  const [token, setToken] = useState('');
  const [tokenIcon, setTokenIcon] = useState('');
  const [network, setNetwork] = useState<{
    name: string;
    address: string;
    tsxCount: number;
  }>({ name: '', address: '', tsxCount: 0 });

  const handleToken = (newToken: string, newTokenIcon: string) => {
    setToken(newToken);
    setTokenIcon(newTokenIcon);
    handleNetwork({ name: '', address: '', tsxCount: 0 });
  };

  const handleNetwork = (selectedNetwork: {
    name: string;
    address: string;
    tsxCount: number;
  }) => {
    setNetwork(selectedNetwork);
  };

  return (
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

      <TokenSelector
        token={token}
        tokenIcon={tokenIcon}
        handleToken={handleToken}
      />

      <NetworkSelector network={network} handleNetwork={handleNetwork} />

      {token && network.address && <CryptoAddress address={network.address} />}
    </Card>
  );
};

export default CryptoWallets;
