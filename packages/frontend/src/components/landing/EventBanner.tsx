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
          className="w-[70%] p-5 uppercase font-primary font-black text-[24px] font-bold text-center rounded-full bg-buttons-green mr-6"
          style={{ fontFamily: 'Montserrat' }}
        >
          1pm podcast on clubhose!!
        </div>
        <div className='text-center flex flex-col items-center justify-center'>
          <div className="flex font-black" style={{ fontFamily: 'Montserrat' }}>
            <div className="mx-2 flex flex-col">
              <span className='text-2xl'>
                0
              </span>
              <span className='text-sm'>
                DAYS
              </span>
            </div>
            <div className="mx-2 flex flex-col">
              <span className='text-2xl'>
                2
              </span>
              <span className='text-sm'>
                HOURS
              </span>
            </div>
            <div className="mx-2 flex flex-col">
              <span className='text-2xl'>
                23
              </span>
              <span className='text-sm'>
                MINUTES
              </span>
            </div>
            <div className="mx-2 flex flex-col">
              <span className='text-2xl'>
                14
              </span>
              <span className='text-sm'>
                SECONDS
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className='text-center text-2xl font-bold text-[#000] mt-6 hover:text-[#ACE96B] ease-in-out duration-150'>
        <a href='#'>- CLICK HERE TO JOIN -</a>
      </div>
    </>
  );
};

export default EventBanner;
