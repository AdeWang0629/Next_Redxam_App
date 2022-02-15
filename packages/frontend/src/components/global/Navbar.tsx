import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import WaitlistModel from '@components/models/WaitlistModel';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import Logo from '@public/logo.svg';
import ArabicLogo from '@public/arabic-logo.svg';
import LoginModel from '@components/models/LoginModel';

interface NavbarProps {
  transparentBackground?: boolean;
  title?: string;
}

const Navbar: NextPage<NavbarProps> = ({
  transparentBackground = false,
  title
}) => {
  const { locale } = useRouter();
  const { t } = useTranslation('navbar');
  let [navMobile, setNavMobile] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [waitlistModelOpened, setWaitlistModelOpened] = useState(false);
  const [loginModelOpened, setLoginModelOpened] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(
    (typeof window !== 'undefined' && localStorage.getItem('theme')) || 'light'
  );
  const [icon, setIcon] = useState(currentTheme === 'dark' ? faSun : faMoon);

  useEffect(() => {
    // @ts-ignore
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  const toggleTheme = () => {
    if (!currentTheme || currentTheme === 'light') {
      localStorage.setItem('theme', 'dark');
      setCurrentTheme('dark');
      document.body.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      setCurrentTheme('light');
      document.body.classList.remove('dark');
    }
  };

  useEffect(() => {
    setIcon(currentTheme === 'dark' ? faSun : faMoon);
  }, [currentTheme]);

  return (
    <>
      <Head>
        <title>redxam{title ? ' | ' + title : ''}</title>
      </Head>
      <nav
        className={`py-6 z-10 ${
          transparentBackground && scrollTop <= 0 && !navMobile
            ? 'bg-transparent'
            : 'bg-white'
        } fixed w-full top-0`}
        style={{
          boxShadow: '0 2px 2px -2px rgb(0 0 0 / 20%)'
        }}
      >
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto items-center">
          <div className="flex items-center justify-between flex-1 w-full px-8 md:px-0">
            <div
              className={`flex items-center md:flex-1 ${
                locale === 'ar' && 'flex-row-reverse'
              }`}
              dir={locale === 'ar' ? 'ltr' : ''}
            >
              <Link href="/">
                <a className="flex items-center cursor-pointer">
                  <Image
                    src={locale === 'ar' ? ArabicLogo : Logo}
                    alt="redxam logo"
                    width={locale === 'ar' ? undefined : '36px'}
                    height={locale === 'ar' ? '56px' : '32px'}
                  />
                  {locale !== 'ar' && (
                    <h2
                      className={`ml-4 font-medium text-2xl  ${
                        transparentBackground && scrollTop <= 0 && !navMobile
                          ? 'text-buttons-green'
                          : 'text-lighter-black'
                      }`}
                    >
                      redxam
                    </h2>
                  )}
                </a>
              </Link>
            </div>
            <div className="md:hidden md:flex-1 flex relative justify-center items-center w-5 h-5 cursor-pointer transition-all duration-500 ease-in-out">
              <button
                className={`w-5 h-5 rounded-md transition-all duration-500 ease-in-out before:absolute before:w-5 before:h-[2px] ${
                  transparentBackground && scrollTop <= 0 && !navMobile
                    ? 'before:bg-white after:bg-white'
                    : 'before:bg-black after:bg-black'
                } before:rounded-md before:transition-all before:duration-500 before:ease-in-out after:absolute after:w-5 after:h-[2px] after:rounded-md after:transition-all after:duration-500 after:ease-in-out before:transform before:translate-y-[-6px] after:transform after:translate-y-[6px] ${
                  navMobile
                    ? 'transform bg-transparent before:transform before:rotate-45 after:transform after:-rotate-45 before:translate-x-[0px] before:translate-y-[0px] after:translate-x-[0px] after:translate-y-[0px]'
                    : ''
                }`}
                onClick={() => setNavMobile(prev => !prev)}
              ></button>
            </div>
          </div>
          <div
            className={`flex flex-row justify-end items-center flex-[2] ${
              !navMobile
                ? 'hidden md:flex'
                : 'flex-col items-center justify-center'
            }`}
          >
            <ul
              className={`flex flex-col md:flex-row text-center font-primary ${
                transparentBackground && scrollTop <= 0 && !navMobile
                  ? 'text-white'
                  : 'text-black'
              } text-[15px]"`}
            >
              <li className={`mt-[25px] md:mt-0 md:mr-[50px]`}>
                <Link href="/about">
                  <a>{t('about')}</a>
                </Link>
              </li>
              <li className="mt-[25px] md:mt-0 md:mr-[50px]">
                <Link href="/#benefits" shallow scroll>
                  <a>{t('benefits')}</a>
                </Link>
              </li>
              <li className="mt-[25px] md:mt-0 md:mr-[50px]">
                <Link href="/#security" shallow scroll>
                  <a>{t('security')}</a>
                </Link>
              </li>
              <li
                className={`mt-[25px] md:mt-0 md:mr-[50px] ${
                  locale === 'ar' && 'md:ml-[50px]'
                }`}
              >
                <button
                  className={`${
                    transparentBackground && scrollTop <= 0 && !navMobile
                      ? 'text-white'
                      : 'text-black'
                  }`}
                  onClick={() => setLoginModelOpened(true)}
                >
                  {t('login')}
                </button>
              </li>
            </ul>
            <button
              className="font-primary text-[15px] px-16 py-4 font-bold text-center rounded-[30px] bg-buttons-green order-first md:order-none mt-[25px] md:mt-0"
              onClick={() => setWaitlistModelOpened(true)}
            >
              {t('waitlist')}
            </button>
            {/* <button
              className="flex items-center justify-center md:ml-[50px] order-first md:order-none mt-[25px] md:mt-0"
              onClick={toggleTheme}
            >
              <FontAwesomeIcon
                icon={icon}
                className={`${
                  transparentBackground && scrollTop <= 0 && !navMobile
                    ? "text-white"
                    : "text-black"
                }`}
              />
            </button> */}
          </div>
        </div>
      </nav>
      {waitlistModelOpened && (
        <WaitlistModel
          isOpened={waitlistModelOpened}
          setOpened={setWaitlistModelOpened}
        />
      )}
      {loginModelOpened && (
        <LoginModel
          isOpened={loginModelOpened}
          setOpened={setLoginModelOpened}
        />
      )}
    </>
  );
};

export default Navbar;
