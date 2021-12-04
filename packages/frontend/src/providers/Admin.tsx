import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import api from "@utils/api";

export type Context = {
  user: null | { email: string };
  setUser: Dispatch<SetStateAction<null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  noUser: boolean;
  setNoUser: Dispatch<SetStateAction<boolean>>;
};

export const AdminContext = createContext<Context>({
  user: null,
  setUser: () => {},
  loading: false,
  setLoading: () => {},
  noUser: false,
  setNoUser: () => {},
});

export default function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("admin_token")) {
        setLoading(true);
        api
          .getAdminDetails(sessionStorage.getItem("admin_token") as string)
          .then(({ data }) => {
            setNoUser(false);
            setUser(data.data.admin);
          })
          .catch(() => setNoUser(true))
          .finally(() => setLoading(false));
      } else setNoUser(true);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{ user, setUser, loading, setLoading, noUser, setNoUser }}
    >
      {children}
    </AdminContext.Provider>
  );
}
