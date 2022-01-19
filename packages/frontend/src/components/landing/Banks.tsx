import type { NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import redxamLogo from "@public/images/redxam-logo.svg";
import bankChase from "@public/images/bank-chase.png";
import bankBofa from "@public/images/bank-bofa2.png";
import bankTD from "@public/images/bank-td.png";
import { useState } from "react";

const Banks: NextPage = () => {
  const { t } = useTranslation("banks");

  return (
    <section className="max-w-7xl mx-auto flex flex-col mt-24 mb-48">
      <h2 className="text-4xl w-full md:w-[39rem] mx-auto mb-24 text-center text-black dark:text-gray-200 font-bold leading-[-0.03em]">
        {t("banks-title")}
      </h2>
      <div className="flex flex-col md:flex-row justify-around space-y-12 md:space-y-0">
        <Bank image={redxamLogo} name={t("redxam")} rate={t("redxam-rate")} />
        <Bank image={bankChase} name={t("chase")} rate={t("chase-rate")} />
        <Bank image={bankBofa} name={t("bofa")} rate={t("bofa-rate")} />
        <Bank image={bankTD} name={t("tdbank")} rate={t("tdbank-rate")} />
      </div>
    </section>
  );
};

interface BankProps {
  image: StaticImageData;
  name: string;
  rate: string;
}

const Bank: NextPage<BankProps> = ({ image, name, rate }) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={image}
        alt={name}
        width="60"
        height="60"
        placeholder={name === "Redxam" ? "empty" : "blur"}
      />
      <div className="flex flex-col items-center">
        <span className="font-semibold text-2xl leading-7 text-black text-opacity-80 my-4 font-secondary dark:text-white">
          {name}
        </span>
        <span className="text-4xl leading-10 text-lighter-black dark:text-gray-200 tracking-[-0.04em] text-opacity-60 font-secondary font-medium">
          {rate}%
        </span>
      </div>
    </div>
  );
};

export default Banks;
