import "@styles/globals.css";
import type { AppProps } from "next/app";
import EnvironmentsSwitcher from "@components/global/EnvironmentsSwitcher";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <EnvironmentsSwitcher />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
