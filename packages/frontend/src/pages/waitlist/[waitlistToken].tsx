import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@utils/api";
import Card from "@components/dashboard/Card";

import Logo from "@public/logo.svg";

const WaitlistToken: NextPage = () => {
  const router = useRouter();
  const [waitlistLevel, setWaitlistLevel] = useState<{
    message: String;
    success: Boolean;
    level: String;
    referralCode: String;
  }>({
    message: "",
    success: false,
    level: "",
    referralCode: "",
  });
  const [error, setError] = useState(false);
  const { waitlistToken } = router.query;

  useEffect(() => {
    (async () => {
      const { data } = await api.getWaitlistLevel(waitlistToken as String);
      setWaitlistLevel(data.data.waitlistLevel);
    })();
  }, [waitlistToken]);

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{
        background: "linear-gradient(155.44deg, #9EF01A 0%, #38B000 70%)",
      }}
    >
      <Card
        width="w-[350px]"
        height="h-[300px]"
        otherClasses="flex flex-col items-center justify-center bg-white p-2"
      >
        <div className="flex items-center mb-6">
          <Image src={Logo} alt="redxam logo" width="46px" height="42px" />
          <h2 className="ml-4 font-medium text-3xl">redxam</h2>
        </div>

        <h3 className="font-secondary text-lg text-center">
          Your position in the waitlist is <br />
        </h3>
        <p className="font-bold text-3xl my-2">{waitlistLevel.level}</p>
        <h3 className="font-secondary text-lg text-center">
          Invite your friends and get higher your waitlist level with your
          referral code <br />
        </h3>
        <p className="font-bold text-3xl mt-4">{waitlistLevel.referralCode}</p>
      </Card>
    </div>
  );
};

export default WaitlistToken;
