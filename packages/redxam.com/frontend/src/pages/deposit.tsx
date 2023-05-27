import type { NextPage } from 'next';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@providers/User';
import { useRouter } from 'next/router';
import api from '@utils/api';
import InternalLayout from '@components/global/InternalLayout';
import IconButton from '@components/dashboard/IconButton';
import Switcher from '@components/dashboard/deposits/Switcher';
import KYC from '@components/dashboard/deposits/KYC';
import Banks from '@components/dashboard/deposits/Banks';
import Cards from '@components/dashboard/deposits/Cards';
import Crypto from '@components/dashboard/deposits/Crypto';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import BackIcon from '@public/icons/back.svg';

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

const Deposit: NextPage = () => {
  const { t } = useTranslation('dashboard');
  const { user, loading, noUser } = useContext(UserContext);
  const router = useRouter();

  const [activeSection, setActiveSection] = useState('crypto');
  const [isApplicant, setIsApplicant] = useState(false);
  const [isValidApplicant, setIsValidApplicant] = useState(false);
  const [isInit, setIsInit] = useState(false);

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

  useEffect(() => {
    (async () => {
      const { data } = await api.getApplicantData();

      if (data.status !== 200) return;

      setIsApplicant(true);
      if (!data.review) return;

      setIsInit(data.review.reviewStatus === 'init');

      if (data.review.reviewResult)
        setIsValidApplicant(data.review.reviewResult.reviewAnswer === 'GREEN');
    })();
  });

  if (loading) return <span>loading</span>;

  let depositContent = null;

  switch (activeSection) {
    case 'crypto':
      depositContent = <Crypto type="deposit" />;
      break;

    case 'card':
      depositContent = (
        <div>
          {isValidApplicant && <Cards />}
          {(!isApplicant || isInit || !isValidApplicant) && <KYC />}
        </div>
      );
      break;

    default:
      depositContent = (
        <div>
          {isValidApplicant && <Banks />}
          {(!isApplicant || isInit || !isValidApplicant) && <KYC />}
        </div>
      );
      break;
  }

  return (
    <InternalLayout>
      <Head>
        <title>redxam - Deposit</title>
      </Head>
      <div className="max-w-[900px] my-0 mx-auto px-3 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
          <IconButton
            buttonText={t('deposits')}
            buttonIcon={BackIcon}
            buttonHref="/home"
          />
          <Switcher
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
        {depositContent}
      </div>
    </InternalLayout>
  );
};

export default Deposit;
