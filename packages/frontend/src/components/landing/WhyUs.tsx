import type { NextPage } from "next";
import Image from "next/image";

import ClockIcon from "@public/icons/clock-icon.svg";
import DepositIcon from "@public/icons/deposit-icon.svg";
import QualityIcon from "@public/icons/quality-icon.svg";
import WealthIcon from "@public/icons/wealth-icon.svg";

const WhyUs: NextPage = () => {
  return (
    <section className="max-w-7xl mx-auto flex flex-col mt-24 mb-48">
      <h2 className="w-full md:w-[600px] self-start text-left text-3xl md:text-[2.8125rem] text-center leading-normal text-lighter-black font-secondary font-bold mb-24">
        Why you should Invest with redxam
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-2 gap-x-40 gap-y-16">
        <Card
          color="rgba(242, 153, 74, 0.1)"
          icon={DepositIcon}
          title="Deposit and Withdraw at Anytime"
          description="Designed to help you own your future. Tell us how wealthy you want to be at retirement and we’ll build a personalized investment plan for you."
        />
        <Card
          color="rgba(187, 107, 217, 0.1)"
          icon={ClockIcon}
          title="No Transaction Fees"
          description="Get guidance in your investing journey and feel more confident in your decisions. Talk to our experts anytime and dive deeper into your personal finance."
        />
        <Card
          color="rgba(39, 174, 96, 0.1)"
          icon={WealthIcon}
          title="Wealth Management System"
          description="It's not just money, it's superior wealth management. We handle this so you can focus on what you're best at."
        />
        <Card
          color="rgba(45, 156, 219, 0.1)"
          icon={QualityIcon}
          title="Highest Quality Service"
          description="We spend a great deal of time to ensure the coins you get on redxam are among the highest quality anywhere."
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
        <h3 className="text-black text-opacity-80 mb-2.5 text-4xl text-center">
          {title}
        </h3>
        <p className="font-primary text-lg text-black text-opacity-80 leading-[1.8] text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default WhyUs;
