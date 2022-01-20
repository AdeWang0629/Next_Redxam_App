import type { NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import ClockIcon from "@public/icons/clock-icon.svg";
import DepositIcon from "@public/icons/deposit-icon.svg";
import QualityIcon from "@public/icons/quality-icon.svg";
import WealthIcon from "@public/icons/wealth-icon.svg";

const WhyUs: NextPage = () => {
  const { t } = useTranslation("whyus");
  return (
    <section
      className="max-w-7xl mx-auto flex flex-col pt-24 pb-48"
      id="benefits"
    >
      <h2 className="w-full md:w-[600px] self-start text-left text-3xl md:text-[2.8125rem] leading-normal text-lighter-black dark:text-gray-200 font-secondary font-bold mb-24">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-2 gap-x-40 gap-y-16">
        <Card
          color="rgba(242, 153, 74, 0.1)"
          icon={DepositIcon}
          title={t("deposit-card-title")}
          description={t("deposit-card-desc")}
        />
        <Card
          color="rgba(187, 107, 217, 0.1)"
          icon={ClockIcon}
          title={t("transaction-card-title")}
          description={t("transaction-card-desc")}
        />
        <Card
          color="rgba(39, 174, 96, 0.1)"
          icon={WealthIcon}
          title={t("wealth-card-title")}
          description={t("wealth-card-desc")}
        />
        <Card
          color="rgba(45, 156, 219, 0.1)"
          icon={QualityIcon}
          title={t("quality-card-title")}
          description={t("quality-card-desc")}
        />
      </div>
    </section>
  );
};

interface CardProps {
  color: string;
  icon: string;
  title: string;
  description: string;
}

const Card: NextPage<CardProps> = ({ color, icon, title, description }) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 md:p-0">
      <div
        className="mb-6 rounded-full h-20 w-20 flex items-center justify-center"
        style={{ background: color }}
      >
        <Image src={icon} alt="" />
      </div>
      <div className="flex flex-col">
        <h3 className="text-black dark:text-white text-opacity-80 mb-2.5 text-4xl text-center capitalize">
          {title}
        </h3>
        <p className="font-primary text-lg text-black dark:text-white text-opacity-80 leading-[1.8] text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default WhyUs;
