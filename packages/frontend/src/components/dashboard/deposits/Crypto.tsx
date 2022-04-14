import { NextPage } from 'next';

import CryptoWallets from './CryptoWallets';
import CryptoDeposits from './CryptoDeposits';

const Crypto: NextPage = () => (
  <div className="flex flex-col md:flex-row">
    <CryptoWallets />
    <CryptoDeposits />
  </div>
);

export default Crypto;
