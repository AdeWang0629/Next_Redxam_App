/* eslint-disable react/jsx-one-expression-per-line */
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import referBg from '@public/images/dashboard/refer-bg.svg';
import shareIcon from '@public/icons/share.svg';
import Tippy from '@tippyjs/react';
import IconButton from './IconButton';
import Card from './Card';

// Imgs

const ReferCard = (props: { referralURL: string }) => {
  const { t } = useTranslation('dashboard');
  const { referralURL } = props;
  const referralURLlocal = referralURL;
  return (
    <Card width="lg:w-[440px]" height="h-[197px]" my="my-6 lg:my-0">
      <div className="flex h-full">
        <div className="flex flex-col justify-center ltr:pl-7 rtl:pr-7">
          <p className="font-secondary text-sm text-[#6A6E73]">
            {t('getRewarded')}
          </p>
          <p className="font-secondary text-sm text-[#6A6E73] my-2">
            <span className="text-[#61D404] font-bold text-xl ">$0</span>{' '}
            {t('from')} <span className="text-[#2A3037] font-bold">0</span>{' '}
            {t('referrals')}.
          </p>
          <p className="font-secondary text-sm text-[#6A6E73] mb-2">
            Try sharing your referral code!
          </p>
          <Tippy content="Click to copy link">
            {/* @ts-ignore */}
            <div
              role="button"
              style={{ marginLeft: '-50px' }}
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(referralURLlocal || '');
              }}
            >
              <IconButton
                buttonText={t('referAndEarn')}
                buttonIcon={shareIcon}
              />
            </div>
          </Tippy>
        </div>
        <div className="w-full h-full flex justify-end rounded-[25px] w-[72%]">
          <Image
            src={referBg}
            alt="Refer Background"
            width="197px"
            height="189px"
            className="ltr:rounded-r-[25px] rtl:rounded-l-[25px]"
          />
        </div>
      </div>
    </Card>
  );
};

export default ReferCard;
