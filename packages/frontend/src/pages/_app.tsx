import "@styles/globals.css";
import type { AppProps } from "next/app";
import EnvironmentsSwitcher from "@components/global/EnvironmentsSwitcher";
import AdminProvider from "@providers/Admin";
import UserProvider from "@providers/User";
import Head from "next/head";
import { useEffect } from "react";

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
      </Head>

      {process.env.NODE_ENV !== "production" ? <EnvironmentsSwitcher /> : ""}
      <AdminProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AdminProvider>
    </>
  );
}

export default MyApp;
