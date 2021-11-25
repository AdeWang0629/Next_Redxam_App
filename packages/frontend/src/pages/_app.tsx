import "@styles/globals.css";
import type { AppProps } from "next/app";
import EnvironmentsSwitcher from "@components/global/EnvironmentsSwitcher";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NODE_ENV === "development" ? <EnvironmentsSwitcher /> : null}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
