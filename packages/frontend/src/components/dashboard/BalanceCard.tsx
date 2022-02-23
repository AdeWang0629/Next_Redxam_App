import { useContext, useState, useEffect } from 'react';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';
import { UserContext } from '@providers/User';
import { HomeContext } from '@providers/Home';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@utils/hooks';

// Imgs
import leafsBg from '@public/images/dashboard/leafs-bg.svg';
import Card from './Card';

const BalanceCard = () => {
  const { user } = useContext(UserContext);
  const { home, loading } = useContext(HomeContext);
  const [balance, setBalance] = useState(0);
  const locale = useLocale();

  const localeToCountry = new Map();

  localeToCountry.set('en', 'US');
  localeToCountry.set('es', 'ES');

  const country: string = localeToCountry.get(locale) || 'UAE';

  useEffect(() => {
    if (home) {
      setBalance(home.balance);
    }
  }, [home]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((e) => e + (e * 0.05) / 365 / 24 / 60 / 60);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const balanceNumber =
    country !== 'UAE' ? balance.toFixed(5) : (balance * 3.672).toFixed(5);

  const balanceInfo =
    country !== 'UAE' ? (
      <ReactPlaceholder
        showLoadingAnimation
        type="textRow"
        ready={!loading}
        style={{ height: 36, marginTop: 0, width: '80%' }}
      >
        <p className="font-secondary font-bold text-3xl text-black w-[80%]">
          $
          {balanceNumber}
        </p>
      </ReactPlaceholder>
    ) : (
      <ReactPlaceholder
        showLoadingAnimation
        type="textRow"
        ready={!loading}
        style={{ height: 36, marginTop: 0, width: '80%' }}
      >
        <p className="font-secondary font-bold text-3xl text-black w-[80%]">
          AED
          {' '}
          {balanceNumber}
        </p>
      </ReactPlaceholder>
    );
  return (
    <Card width="lg:w-[440px]" height="h-[197px]" otherClasses="relative">
      <div className="absolute right-2.5 top-[-55px]">
        <Image
          src={leafsBg}
          alt="Leafs Background"
          width="114px"
          height="154px"
        />
      </div>

      <div className="py-6 px-6">
        <p className="font-secondary text-base text-lighter-black opacity-50 mb-1">
          Total redxam balance
        </p>
        {balanceInfo}
      </div>
      <p className="text-center bg-light-gray py-1 font-secondary text-sm text-[#95989B]">
        Your pending balance is
        <span className="text-lighter-black font-medium ml-1.5">
          $
          {user?.pending_balance}
        </span>
      </p>
      <div className="w-full">
        <Link href="/deposit">
          <a className="w-1/2 inline-block text-center font-medium font-secondary text-base underline py-4 border-r border-r-[#EAEAEB]">
            Deposit
          </a>
        </Link>
        <button className="w-1/2 font-medium font-secondary text-base underline py-4">
          Withdraw
        </button>
      </div>
    </Card>
  );
};

export default BalanceCard;
