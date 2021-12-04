import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import { UserContext } from "@providers/User";
import { useRouter } from "next/router";

import InternalLayout from "@components/dashboard/InternalLayout";
import IconButton from "@components/dashboard/IconButton";
import settings from "@public/icons/settings.svg";
import BalanceCard from "@components/dashboard/BalanceCard";
import ReferCard from "@components/dashboard/ReferCard";
import RecentActivity from "@components/dashboard/RecentActivity";

const Home: NextPage = () => {
  const { user, loading, noUser } = useContext(UserContext);
  const router = useRouter();

  // @ts-ignore
  useEffect(() => {
    if (noUser) return router.push("/login");
  }, [noUser]);

  if (loading) return <span>loading</span>;

  return (
    <InternalLayout>
      <div className="max-w-[900px] my-0 mx-auto">
        <div className="flex justify-between items-center  mb-10">
          <p>Hello, John Doe</p>
          <IconButton buttonText={"Settings"} buttonIcon={settings} />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <BalanceCard />
          <ReferCard />
          <RecentActivity />
          <div></div>
        </div>
      </div>
    </InternalLayout>
  );
};

export default Home;
