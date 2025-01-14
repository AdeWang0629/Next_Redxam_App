import type { NextPage } from 'next';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { UserContext } from '@providers/User';
import { useRouter } from 'next/router';

import Tippy from '@tippyjs/react';
import InternalLayout from '@components/global/InternalLayout';
import IconButton from '@components/dashboard/IconButton';
import settings from '@public/icons/settings.svg';
import logout from '@public/icons/logout.svg';
import BalanceCard from '@components/dashboard/BalanceCard';
import ReferCard from '@components/dashboard/ReferCard';
import NFTCard from '@components/dashboard/NFTCard';
import RecentActivity from '@components/dashboard/RecentActivity';
import Chart from '@components/dashboard/ChartCard';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { setCookies } from 'cookies-next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Loader from '@components/global/Loader';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return { props: {} };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['dashboard']))
    }
  };
};

const Home: NextPage = () => {
  const { t } = useTranslation('dashboard');
  const { user, loading, noUser } = useContext(UserContext);
  const router = useRouter();

  // @ts-ignore
  useEffect(() => {
    if (noUser) return router.push('/login');
    return null;
  }, [noUser, router]);

  useEffect(() => {
    if (
      !noUser &&
      !loading &&
      user?.accountStatus &&
      user?.accountStatus === 'invited'
    ) {
      router.push('/invite');
    }
  }, [user?.accountStatus, noUser, loading, router]);

  if (loading) return <Loader height="h-screen" />;
  return (
    <InternalLayout>
      <Head>
        <title>redxam - Home</title>
      </Head>
      <div className="px-3 lg:px-0 max-w-[900px] my-0 mx-auto">
        <div className="flex justify-between items-center mb-10">
          <Tippy content="Coming soon">
            <div>
              <IconButton
                buttonText={t('settings')}
                buttonIcon={settings}
                data-tooltip-target="tooltip-default"
              />
            </div>
          </Tippy>
          <Tippy content="Click to log out">
            <button
              type="button"
              onClick={() => {
                setCookies('token', null);
                router.push(window.location.origin);
              }}
            >
              <IconButton
                buttonText="Log out"
                buttonIcon={logout}
                data-tooltip-target="tooltip-default"
              />
            </button>
          </Tippy>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-5">
          <BalanceCard />
          <ReferCard
            referralURL={`https://redxam.com/?referral=${
              user ? user.referralCode : ''
            }`}
          />
          <RecentActivity />
          <Chart
            data={new Array(100).fill(0).map((_, i) => ({
              time: new Date().getTime() + 60000 * 60 * 24 * i,
              value: 100 * i - 3 * i * (Math.random() > 0.5 ? 1 : -1)
            }))}
          />
          <NFTCard />
          <div />
        </div>
      </div>
    </InternalLayout>
  );
};

export default Home;
