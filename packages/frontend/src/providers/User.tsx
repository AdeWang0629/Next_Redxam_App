import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode
} from 'react';
import { getCookie } from 'cookies-next';
import api from '@utils/api';

export type Context = {
  user: null | {
    token: string;
    _id: string;
    email: string;
    phone: string;
    accountStatus: string;
    referralCode: string;
    pending_balance: number;
    wallets: {
      BTC: {
        address: string;
        tsxCount: number;
      };
      TEST_BTC: {
        address: string;
        tsxCount: number;
      };
    };
  };
  setUser: Dispatch<SetStateAction<null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  noUser: boolean;
  setNoUser: Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext<Context>({
  user: null,
  setUser: () => {},
  loading: false,
  setLoading: () => {},
  noUser: false,
  setNoUser: () => {}
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (getCookie('token')) {
        setLoading(true);
        api
          .getUserData()
          .then(({ data }) => {
            setNoUser(false);
            setUser(data.data.user[0]);
          })
          .catch(() => setNoUser(true))
          .finally(() => setLoading(false));
      } else setNoUser(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, setLoading, noUser, setNoUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
