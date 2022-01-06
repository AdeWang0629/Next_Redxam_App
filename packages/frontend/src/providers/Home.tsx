import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { getCookie } from "cookies-next";
import api from "@utils/api";

export type Context = {
  home: null | {
    balance: number;
    dolarChange: number;
    percentChange: number;
  };
  setHome: Dispatch<SetStateAction<null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  noHome: boolean;
  setNoHome: Dispatch<SetStateAction<boolean>>;
};

export const HomeContext = createContext<Context>({
  home: null,
  setHome: () => {},
  loading: false,
  setLoading: () => {},
  noHome: false,
  setNoHome: () => {},
});

export default function HomeProvider({ children }: { children: ReactNode }) {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noHome, setNoHome] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (getCookie("token")) {
        setLoading(true);
        api
          .getHomeData()
          .then(({ data }) => {
            setNoHome(false);
            setHome(data.data.home);
          })
          .catch(() => setNoHome(true))
          .finally(() => setLoading(false));
      } else setNoHome(true);
    }
  }, []);

  return (
    <HomeContext.Provider
      value={{ home, setHome, loading, setLoading, noHome, setNoHome }}
    >
      {children}
    </HomeContext.Provider>
  );
}
