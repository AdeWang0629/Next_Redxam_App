import "@styles/globals.css";
import type { AppProps } from "next/app";
import EnvironmentsSwitcher from "@components/global/EnvironmentsSwitcher";
import AdminProvider from "@providers/Admin";
import UserProvider from "@providers/User";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AdminProvider>
      <UserProvider>
        {typeof window !== "undefined" &&
        !document.baseURI.includes("redxam.com") ? (
          <EnvironmentsSwitcher />
        ) : null}
        <Component {...pageProps} />
      </UserProvider>
    </AdminProvider>
  );
}

export default MyApp;
