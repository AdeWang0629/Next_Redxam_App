import { useContext, useState, useEffect } from 'react';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';
import { UserContext } from '@providers/User';
import { HomeContext } from '@providers/Home';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@utils/hooks';
import { useTranslation } from 'next-i18next';
import Tippy from '@tippyjs/react';

// Imgs
import leafsBg from '@public/images/dashboard/leafs-bg.svg';
import Card from './Card';

const BalanceCard = () => {
  const { t } = useTranslation('dashboard');
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
      setBalance(e => e + (e * 0.05) / 365 / 24 / 60 / 60);
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
          ${balanceNumber}
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
          AED {balanceNumber}
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
      <Tippy content="Interest is not showing properly. Backend is accounting the balance but UI isn't showing correctly. This should be fix soon!">
        <div className="py-6 px-6">
          <p className="font-secondary text-base text-lighter-black opacity-50 mb-1">
            {t('totalBalance')}
          </p>
          {balanceInfo}
        </div>
      </Tippy>
      <p className="text-center bg-light-gray py-1 font-secondary text-sm text-[#95989B]">
        {t('pendingBalance')}{' '}
        <span className="text-lighter-black font-medium ml-1.5">
          ${user?.pending_balance.toFixed(2)}
        </span>
      </p>
      <div className="w-full">
        <Link href="/deposit">
          <a className="w-1/2 inline-block text-center font-medium font-secondary text-base underline py-4 border-r border-r-[#EAEAEB]">
            {t('deposit')}
          </a>
        </Link>
        <Link href="/withdrawal">
          <a className="w-1/2 inline-block text-center font-medium font-secondary text-base underline py-4 border-r border-r-[#EAEAEB]">
            {t('withdraw')}
          </a>
        </Link>
      </div>
    </Card>
  );
};

export default BalanceCard;
