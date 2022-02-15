import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import { getCookie } from 'cookies-next';
import api from '@utils/api';

export type Context = {
  balanceRecords:
    | null
    | [
        {
          balance: number;
          timestamp: number;
        },
      ];
  setBalanceRecords: Dispatch<SetStateAction<null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  noBalanceRecords: boolean;
  setNoBalanceRecords: Dispatch<SetStateAction<boolean>>;
};

export const BalanceRecordsContext = createContext<Context>({
  balanceRecords: null,
  setBalanceRecords: () => {},
  loading: false,
  setLoading: () => {},
  noBalanceRecords: false,
  setNoBalanceRecords: () => {},
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const [balanceRecords, setBalanceRecords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noBalanceRecords, setNoBalanceRecords] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (getCookie('token')) {
        setLoading(true);
        api
          .getPerformanceRecords()
          .then(({ data }) => {
            console.log(data);
            setNoBalanceRecords(false);
            setBalanceRecords(data.data.balanceRecords);
          })
          .catch(() => setNoBalanceRecords(true))
          .finally(() => setLoading(false));
      } else setNoBalanceRecords(true);
    }
  }, []);

  return (
    <BalanceRecordsContext.Provider
      value={{
        balanceRecords,
        setBalanceRecords,
        loading,
        setLoading,
        noBalanceRecords,
        setNoBalanceRecords,
      }}
    >
      {children}
    </BalanceRecordsContext.Provider>
  );
}
