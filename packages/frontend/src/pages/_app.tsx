import "@styles/globals.css";
import type { AppProps } from "next/app";
import EnvironmentsSwitcher from "@components/global/EnvironmentsSwitcher";
import UserProvider from "@providers/User";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      {process.env.NODE_ENV === "development" ? <EnvironmentsSwitcher /> : null}
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
