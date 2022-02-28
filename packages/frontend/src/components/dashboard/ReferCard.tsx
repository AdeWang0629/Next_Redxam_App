import Image from 'next/image';
import referBg from '@public/images/dashboard/refer-bg.svg';
import shareIcon from '@public/icons/share.svg';
import IconButton from './IconButton';
import Card from './Card';

// Imgs

const ReferCard = () => (
  <Card width="lg:w-[440px]" height="h-[197px]" my="my-6 lg:my-0">
    <div className="flex h-full">
      <div className="flex flex-col justify-center pl-7">
        <p className="font-secondary text-sm text-[#6A6E73]">
          Get rewarded when a friend adds money to redxam. Your earnings are:
        </p>
        <p className="font-secondary text-sm text-[#6A6E73] mt-2 mb-6">
          <span className="text-[#61D404] font-bold text-xl ">$70</span> from{' '}
          <span className="text-[#2A3037] font-bold">7</span> referrals.
        </p>
        <IconButton buttonText="Refer & Earn Now" buttonIcon={shareIcon} />
      </div>
      <div className="w-full h-full flex justify-end rounded-[25px] w-[72%]">
        <Image
          src={referBg}
          alt="Refer Background"
          width="197px"
          height="189px"
          className="rounded-r-[25px]"
        />
      </div>
    </div>
  </Card>
);

export default ReferCard;
