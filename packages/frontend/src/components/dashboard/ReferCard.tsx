/* eslint-disable react/jsx-one-expression-per-line */
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import referBg from '@public/images/dashboard/refer-bg.svg';
import shareIcon from '@public/icons/share.svg';
import IconButton from './IconButton';
import Card from './Card';

// Imgs

const ReferCard = () => {
  const { t } = useTranslation('dashboard');
  return (
    <Card width="lg:w-[440px]" height="h-[197px]" my="my-6 lg:my-0">
      <div className="flex h-full">
        <div className="flex flex-col justify-center ltr:pl-7 rtl:pr-7">
          <p className="font-secondary text-sm text-[#6A6E73]">{t('getRewarded')}</p>
          <p className="font-secondary text-sm text-[#6A6E73] mt-2 mb-6">
            <span className="text-[#61D404] font-bold text-xl ">$70</span> {t('from')}{' '}
            <span className="text-[#2A3037] font-bold">7</span> {t('referrals')}.
          </p>
          <IconButton buttonText={t('referAndEarn')} buttonIcon={shareIcon} />
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
