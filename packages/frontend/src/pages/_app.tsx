/* eslint-disable @next/next/no-script-component-in-head */
import '@styles/globals.css';
import type { AppProps } from 'next/app';
import EnvironmentsSwitcher from '@components/global/EnvironmentsSwitcher';
import AdminProvider from '@providers/Admin';
import HomeProvider from '@providers/Home';
import UserProvider from '@providers/User';
import BalanceRecordsProvider from '@providers/BalanceRecords';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { useLocale } from '@utils/hooks';
import 'tippy.js/dist/tippy.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  const locale = useLocale();

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.svg" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo.svg" />

        {locale === 'ar' ? (
          <>
            <meta
              name="title"
              content="ردزام | مساعدك الشخصي للأستثمار بالعملات الرقمية."
            />
            <meta
              name="description"
              content="مساعدك الشخصي للأستثمار بالعملات الرقمية."
            />
            <meta
              property="og:title"
              content="ردزام | مساعدك الشخصي للأستثمار بالعملات الرقمية."
            />
            <meta property="og:site_name" content="ردزام" />
            <meta property="twitter:title" content="ردزام" />
            <meta
              property="twitter:description"
              content="مساعدك الشخصي للأستثمار بالعملات الرقمية."
            />
            <meta
              property="og:image"
              content="https://res.cloudinary.com/redxamcloud/image/upload/w_1200,c_scale/v1651089650/redxam-arabic_pabqoy.png"
            />
            <meta
              property="twitter:image"
              content="https://res.cloudinary.com/redxamcloud/image/upload/w_1200,c_scale/v1651089650/redxam-arabic_pabqoy.png"
            />
          </>
        ) : (
          <>
            <meta
              name="title"
              content="redxam | Your Personal Crypto Investment Assistant."
            />
            <meta
              name="description"
              content="Your Personal Crypto Investment Assistant."
            />
            <meta
              property="og:title"
              content="redxam | Your Personal Crypto Investment Assistant."
            />
            <meta property="og:site_name" content="redxam" />
            <meta property="twitter:title" content="redxam" />
            <meta
              property="twitter:description"
              content="Your Personal Crypto Investment Assistant."
            />
            <meta
              property="og:image"
              content="https://res.cloudinary.com/redxamcloud/image/upload/w_1200,c_scale/v1651089650/redxam-english_gvqtde.png"
            />
            <meta
              property="twitter:image"
              content="https://res.cloudinary.com/redxamcloud/image/upload/w_1200,c_scale/v1651089650/redxam-english_gvqtde.png"
            />
          </>
        )}

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://redxam.com/" />
        <meta property="og:description" content="" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://redxam.com/" />
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
        <Script
          strategy="afterInteractive"
          id="tiktok"
          dangerouslySetInnerHTML={{
            __html: `
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load('CB2UJS3C77U3T6AMG1V0');
            ttq.page();
            ttq.track('ViewContent');
          }(window, document, 'ttq');      
        `
          }}
        />
      </Head>

      {process.env.NODE_ENV !== 'production' ? <EnvironmentsSwitcher /> : ''}
      <AdminProvider>
        <HomeProvider>
          <UserProvider>
            <BalanceRecordsProvider>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <Component {...pageProps} />
            </BalanceRecordsProvider>
          </UserProvider>
        </HomeProvider>
      </AdminProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
