import React from "react";
import Image from "next/image";

import leafsBg from "@public/images/dashboard/leafs-bg.svg";

const BalanceCard = () => {
  return (
    <div
      className="shadow-card rounded-3xl relative"
      style={{ width: "440px" }}
    >
      <div className="absolute" style={{ right: "10px", top: "-55px" }}>
        <Image
          src={leafsBg}
          alt="Leafs Background"
          width="114px"
          height="154px"
        />
      </div>

      <div className="py-7 px-6">
        <p className="font-secondary text-base text-lighter-black opacity-50 mb-1">
          Total redxam balance
        </p>
        <p className="font-secondary font-bold text-3xl text-black">
          $30,700.00
        </p>
      </div>
      <p
        className="mt-6 text-center bg-light-gray py-1 font-secondary text-sm"
        style={{ color: "#95989B" }}
      >
        Your pending balance is{" "}
        <span className="text-lighter-black font-medium ml-1.5">$2200.00</span>
      </p>
      <div className="w-full">
        <button
          className="w-1/2 font-medium font-secondary text-base underline py-4"
          style={{ borderRight: "1px solid #EAEAEB" }}
        >
          Deposit
        </button>
        <button className="w-1/2 font-medium font-secondary text-base underline py-4">
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;
