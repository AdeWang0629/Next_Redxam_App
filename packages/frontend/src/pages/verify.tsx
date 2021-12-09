import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "@providers/User";
import { setCookies } from "cookies-next";
import api from "src/utils/api";

const Verify: NextPage = () => {
  const { setUser, setLoading, setNoUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!router.query.token) return;

    setLoading(true);
    api
      .verify(router.query.token as string)
      .then(async ({ data }) => {
        if (data.data.verifyToken.success) {
          setCookies("token", data.data.verifyToken.token);
          api.getUserData().then(({ data: data2 }) => {
            setUser(data2.data.user[0]);
            setNoUser(false);
            router.push("/home");
          });
        } else {
          alert(data.data.verifyToken.message);
          router.push("/login");
        }
      })
      .catch(() => {
        alert("Network Error. Please try again later.");
        router.push("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router.query?.token]);
  return <div>loading</div>;
};

export default Verify;
