import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@providers/User';
import { useRouter } from 'next/router';
import api from '@utils/api';
import InternalLayout from '@components/dashboard/InternalLayout';
import IconButton from '@components/dashboard/IconButton';
import Switcher from '@components/dashboard/deposits/Switcher';
import KYC from '@components/dashboard/deposits/KYC';
import Banks from '@components/dashboard/deposits/Banks';
import Cards from '@components/dashboard/deposits/Cards';
import Crypto from '@components/dashboard/deposits/Crypto';

import BackIcon from '@public/icons/back.svg';

const Deposit: NextPage = () => {
  const { user, loading, noUser } = useContext(UserContext);
  const router = useRouter();

  const [activeSection, setActiveSection] = useState('card');
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

      if (data.review.reviewResult) setIsValidApplicant(data.review.reviewResult.reviewAnswer === 'GREEN');
    })();
  });

  if (loading) return <span>loading</span>;

  let depositContent = null;

  switch (activeSection) {
    case 'crypto':
      depositContent = (
        <div>
          <Crypto />
        </div>
      );
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
      <div className="max-w-[900px] my-0 mx-auto px-3 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
          <IconButton
            buttonText="Deposits"
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
