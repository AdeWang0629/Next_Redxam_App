import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@providers/User";
import { useRouter } from "next/router";
import Link from "next/link";
import api from "@utils/api";
import InternalLayout from "@components/dashboard/InternalLayout";
import IconButton from "@components/dashboard/IconButton";
import Switcher from "@components/dashboard/deposits/Switcher";
import KYC from "@components/dashboard/deposits/KYC";
import Banks from "@components/dashboard/deposits/Banks";
import Bitcoin from "@components/dashboard/deposits/Bitcoin";

import BackIcon from "@public/icons/back.svg";

const Deposit: NextPage = () => {
  const { user, loading, noUser } = useContext(UserContext);
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("bank");
  const [isApplicant, setIsApplicant] = useState(false);
  const [isValidApplicant, setIsValidApplicant] = useState(false);
  const [isInit, setIsInit] = useState(false);

  // @ts-ignore
  useEffect(() => {
    if (noUser) return router.push("/login");
  }, [noUser]);

  useEffect(() => {
    if (
      !noUser &&
      !loading &&
      user?.accountStatus &&
      user?.accountStatus === "invited"
    ) {
      router.push("/invite");
    }
  }, [user?.accountStatus]);

  useEffect(() => {
    (async () => {
      let { data } = await api.getApplicantData();

      if (data.status !== 200) return;

      setIsApplicant(true);
      if (!data.review) return;

      setIsInit(data.review.reviewStatus === "init");

      if (data.review.reviewResult)
        setIsValidApplicant(data.review.reviewResult.reviewAnswer === "GREEN");
    })();
  });

  if (loading) return <span>loading</span>;

  return (
    <InternalLayout>
      <div className="max-w-[900px] my-0 mx-auto px-3 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
          <IconButton
            buttonText={"Deposits"}
            buttonIcon={BackIcon}
            buttonHref="/home"
          />
          <Switcher
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {activeSection === "bank" ? (
          <div>
            {isValidApplicant && <Banks />}
            {(!isApplicant || isInit || !isValidApplicant) && <KYC />}
          </div>
        ) : activeSection === "card" ? (
          <div>
            {isValidApplicant && ""}
            {(!isApplicant || isInit || !isValidApplicant) && <KYC />}
          </div>
        ) : activeSection === "bitcoin" ? (
          <div>
            {isValidApplicant && <Bitcoin />}
            {(!isApplicant || isInit || !isValidApplicant) && <KYC />}
          </div>
        ) : null}
      </div>
    </InternalLayout>
  );
};

export default Deposit;
