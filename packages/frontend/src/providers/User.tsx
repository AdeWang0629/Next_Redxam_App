import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import api from "src/utils/api";

export type Context = {
  user: null | { token: string; id: string };
  setUser: Dispatch<SetStateAction<null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  noUser: boolean;
};

export const UserContext = createContext<Context>({
  user: null,
  setUser: () => {},
  loading: false,
  setLoading: () => {},
  noUser: false,
});

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("token")) {
        setLoading(true);
        api
          .getUserData()
          .then(({ data }) => {
            setUser(data.data.user[0]);
          })
          .catch(() => setNoUser(true))
          .finally(() => setLoading(false));
      } else setNoUser(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, setLoading, noUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
