import '@styles/globals.css';
import type { AppProps } from 'next/app';
import EnvironmentsSwitcher from '@components/global/EnvironmentsSwitcher';
import AdminProvider from '@providers/Admin';
import HomeProvider from '@providers/Home';
import UserProvider from '@providers/User';
import BalanceRecordsProvider from '@providers/BalanceRecords';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  /* useEffect(() => {
    if (typeof window !== "undefined") {
      let theme = localStorage.getItem("theme");
      if (theme === "dark") document.body.classList.add("dark");
    }
  }, []); */

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.svg" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <meta
          name="title"
          content="redxam | Your Personal Crypto Investment Assistant."
        />
        <meta
          name="description"
          content="Your Personal Crypto Investment Assistant."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://redxam.com/" />
        <meta
          property="og:title"
          content="redxam | Your Personal Crypto Investment Assistant."
        />
        <meta property="og:site_name" content="redxam" />
        <meta property="og:description" content="" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/chopstix/image/upload/w_1200,c_scale/v1619918507/staticRedxam/LinkFork_1.jpg"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://redxam.com/" />
        <meta property="twitter:title" content="redxam" />
        <meta
          property="twitter:description"
          content="Your Personal Crypto Investment Assistant."
        />
        <meta
          property="twitter:image"
          content="https://res.cloudinary.com/chopstix/image/upload/w_1200,c_scale/v1619918507/staticRedxam/LinkFork_1.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="194x194"
          href="/favicon-194x194.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#58be05" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#58be05" />
      </Head>

      {process.env.NODE_ENV !== 'production' ? <EnvironmentsSwitcher /> : ''}
      <AdminProvider>
        <HomeProvider>
          <UserProvider>
            <BalanceRecordsProvider>
              <Component {...pageProps} />
            </BalanceRecordsProvider>
          </UserProvider>
        </HomeProvider>
      </AdminProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
