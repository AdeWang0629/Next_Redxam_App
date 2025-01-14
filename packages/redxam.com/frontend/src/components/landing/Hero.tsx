import type { NextComponentType } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginModel from '@components/models/LoginModel';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import MouseIcon from '@public/icons/mouse.svg';
import HeroImage from '@public/images/hero.svg';

const Hero: NextComponentType = () => {
  const { t } = useTranslation('hero');
  const [loginModelOpened, setLoginModelOpened] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line no-prototype-builtins
    if (router.query.hasOwnProperty('referral')) {
      setLoginModelOpened(true);
    }
  }, [router.query]);

  return (
    <>
      <section className="max-w-3xl lg:max-w-4xl xl:max-w-7xl px-16 md:px-0 mx-auto flex flex-col items-center mt-40 mb-72">
        <h1 className="text-5xl md:text-7xl leading-tight mb-10 text-center font-bold text-lighter-black dark:text-gray-200 capitalize">
          {`${t('title-first')} `}
          <span className="relative before:transform before:scale-x-0 before:origin-bottom-right before:block before:absolute before:inset-0 before:bg-[#38f53b] before:z-[-1] before:transition-transform before:duration-300 before:ease-linear hover:before:scale-x-100 hover:before:origin-bottom-left">
            {t('title-second-span')}
          </span>{' '}
          {t('title-third')}
        </h1>
        <p className="font-primary text-[1.0625rem] max-w-[43.0625rem] mb-[1.875rem] text-center text-black dark:text-white text-opacity-80">
          {t('description')}
        </p>
        <button
          className="font-primary text-[15px] w-[15rem] py-3.5 font-bold text-center rounded-[30px] mb-10 bg-buttons-green"
          onClick={() => setLoginModelOpened(true)}
          id="join-waiting"
        >
          {t('login-button')}
        </button>
        <Link href="/#benefits" passHref shallow scroll>
          <Image src={MouseIcon} alt="scroll" />
        </Link>
        <Image src={HeroImage} alt="screenshots from the app" />
      </section>
      {loginModelOpened && (
        <LoginModel
          isOpened={loginModelOpened}
          setOpened={setLoginModelOpened}
        />
      )}
    </>
  );
};

export default Hero;
