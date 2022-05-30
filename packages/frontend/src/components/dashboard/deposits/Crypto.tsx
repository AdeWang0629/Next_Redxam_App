/* eslint-disable react/destructuring-assignment */
import { NextPage } from 'next';

import CryptoWallets from './CryptoWallets';
import CryptoDeposits from './CryptoDeposits';

interface CryptoProps {
  type: 'deposit' | 'withdrawal';
}

const Crypto: NextPage<CryptoProps> = props => (
  <div className="flex flex-col md:flex-row">
    <CryptoWallets type={props.type} />
    <CryptoDeposits />
  </div>
);

export default Crypto;
