import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { UserContext } from "@providers/User";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { user, loading, noUser } = useContext(UserContext);
  const router = useRouter();

  // @ts-ignore
  useEffect(() => {
    if (noUser) return router.push("/login");
  }, [noUser]);

  if (loading) return <span>loading</span>;

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export default Home;
