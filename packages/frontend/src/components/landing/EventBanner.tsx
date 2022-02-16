import type { NextComponentType } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WaitlistModel from '@components/models/WaitlistModel';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import MouseIcon from '@public/icons/mouse.svg';
import HeroImage from '@public/images/hero.svg';

const EventBanner: NextComponentType = () => {
  const { t } = useTranslation('hero');
  const [waitlistModelOpened, setWaitlistModelOpened] = useState(false);
  const [referralCodeString, setReferralCodeString] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.hasOwnProperty('referral')) {
      setWaitlistModelOpened(true);
      setReferralCodeString(router.query.referral as string);
    }
  }, []);

  return (
    <>
      <section className="w-1/2 px-16 md:px-0 mx-auto flex justify-center items-center mt-60">
        <div
          className="w-[70%] p-5 uppercase font-primary font-black text-[30px] py-3.5 font-bold text-center rounded-full mb-10 bg-buttons-green"
          style={{ fontFamily: 'Montserrat' }}
        >
          1pm podcast on clubhose!!
        </div>
        <div className="flex">
          <span className="mx-2">0</span>
          <span className="mx-2">2</span>
          <span className="mx-2">32</span>
          <span className="mx-2">16</span>
        </div>
      </section>
    </>
  );
};

export default EventBanner;
