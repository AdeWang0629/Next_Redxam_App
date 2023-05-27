import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import InternalLayout from '@components/global/InternalLayout';
import IconButton from '@components/dashboard/IconButton';
import { useTranslation } from 'next-i18next';
import { UserContext } from '@providers/User';
import BackIcon from '@public/icons/back.svg';
import Switcher from '@components/dashboard/deposits/Switcher';
import Crypto from '@components/dashboard/deposits/Crypto';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ZelleWithdrawals from '@components/dashboard/withdrawals/ZelleWithdrawals';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return { props: {} };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['withdrawals']))
    }
  };
};

const Withdrawal: NextPage = () => {
  const { t } = useTranslation('withdrawal');
  const { user, loading, noUser } = useContext(UserContext);
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('crypto');

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
  }, [user?.accountStatus, router, loading, noUser]);

  if (loading) return <span>loading</span>;

  let depositContent = null;

  switch (activeSection) {
    case 'crypto':
      depositContent = <Crypto type="withdrawal" />;
      break;

    default:
      depositContent = (
        <div>
          <ZelleWithdrawals />
        </div>
      );
      break;
  }

  return (
    <InternalLayout>
      <Head>
        <title>redxam - Withdrawal</title>
      </Head>
      <div className="max-w-[900px] my-0 mx-auto px-3 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
          <IconButton
            buttonText={t('withdrawals')}
            buttonIcon={BackIcon}
            buttonHref="/home"
          />
          <Switcher
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            type="withdrawal"
          />
        </div>
        {depositContent}
      </div>
    </InternalLayout>
  );
};

export default Withdrawal;
