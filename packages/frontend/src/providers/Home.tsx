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
    setLoading(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        if (getCookie("token")) {
          api
            .getHomeData()
            .then(({ data }) => {
              setNoHome(false);
              setHome(data.data.home);
            })
            .catch(() => setNoHome(true))
            .finally(() => setLoading(false));
        } else {
          setNoHome(true);
          setLoading(false);
        }
      }
    }, 1000);
  }, []);

  return (
    <HomeContext.Provider
      value={{ home, setHome, loading, setLoading, noHome, setNoHome }}
    >
      {children}
    </HomeContext.Provider>
  );
}
