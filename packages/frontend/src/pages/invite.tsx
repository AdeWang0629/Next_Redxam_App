import { NextPage } from "next";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import api from "@utils/api";
import { useRouter } from "next/router";
import { UserContext } from "@providers/User";

import Logo from "@public/logo.svg";

const Invite: NextPage = () => {
  const { user, loading, noUser, setUser, setLoading, setNoUser } = useContext(
    UserContext
  );
  const router = useRouter();
  const [code, setCode] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  // @ts-ignore
  useEffect(() => {
    if (noUser) return router.push("/login");
  }, [noUser]);

  useEffect(() => {
    if (
      !loading &&
      !noUser &&
      user?.accountStatus &&
      user?.accountStatus !== "invited"
    ) {
      router.push("/");
    }
  }, [user?.accountStatus]);

  if (loading) return <span>loading</span>;

  function handleSubmit() {
    if (!code || code.length !== 6) return alert("Invalid code!");

    setSubmitLoading(true);
    api
      .invite(code)
      .then(({ data }) => {
        if (
          !data.data.changeAccountStatus.success &&
          data.data.changeAccountStatus.message === "invalid code"
        ) {
          alert("Invalid code!");
        } else if (data.data.changeAccountStatus.success) {
          api
            .getUserData()
            .then(({ data: accountData }) => {
              setNoUser(false);
              setUser(accountData.data.user[0]);
              alert("Account activated successfully!");
            })
            .catch(() => setNoUser(true))
            .finally(() => setLoading(false));
        }
      })
      .catch(() => alert("An error occurred!"))
      .finally(() => setSubmitLoading(false));
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <section className="flex items-center">
        <Image src={Logo} width={"68px"} height={"59px"} />
        <span className="font-primary font-bold text-5xl text-buttons-green ml-7">
          redxam
        </span>
      </section>

      <section className="flex flex-col mt-16">
        <h1 className="font-secondary font-bold text-lighter-black text-6xl">
          Enter your invite code
        </h1>
        <p className="font-primary text-center text-lighter-black mt-3">
          As part of the alpha/beta list enter the code sent to you so you start
          onboarding.
        </p>
      </section>

      <section className="flex flex-col items-center mt-12 w-full max-w-xs">
        <input
          type="text"
          placeholder="Enter invite code"
          className="px-8 py-3 border border-gray-200 rounded-full w-full outline-none focus:shadow focus:border-2 font-extralight mx-2"
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          className="bg-buttons-green rounded-[30px] text-black w-2/3 mt-6 py-4 px-16 transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={submitLoading}
        >
          Submit
        </button>
      </section>
    </main>
  );
};

export default Invite;