import { useContext, useEffect } from "react";
import { UserContext } from "@providers/User";
import Image from "next/image";
import Link from "next/link";
import Card from "./Card";

// Imgs
import leafsBg from "@public/images/dashboard/leafs-bg.svg";

const BalanceCard = () => {
  const { user } = useContext(UserContext);
  return (
    <Card width="lg:w-[440px]" height="h-[197px]">
      <div className="absolute right-2.5 top-[-55px]">
        <Image
          src={leafsBg}
          alt="Leafs Background"
          width="114px"
          height="154px"
        />
      </div>

      <div className="py-6 px-6">
        <p className="font-secondary text-base text-lighter-black opacity-50 mb-1">
          Total redxam balance
        </p>
        <p className="font-secondary font-bold text-3xl text-black">
          ${user?.balance}
        </p>
      </div>
      <p className="text-center bg-light-gray py-1 font-secondary text-sm text-[#95989B]">
        Your pending balance is
        <span className="text-lighter-black font-medium ml-1.5">
          ${user?.pending_balance}
        </span>
      </p>
      <div className="w-full">
        <Link href="/deposit">
          <a className="w-1/2 inline-block text-center font-medium font-secondary text-base underline py-4 border-r border-r-[#EAEAEB]">
            Deposit
          </a>
        </Link>
        <button className="w-1/2 font-medium font-secondary text-base underline py-4">
          Withdraw
        </button>
      </div>
    </Card>
  );
};

export default BalanceCard;
