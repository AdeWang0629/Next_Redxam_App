import type { NextPage } from "next";
import Image from "next/image";

import redxamLogo from "@public/images/redxam-logo.svg";
import bankChase from "@public/images/bank-chase.png";
import bankBofa from "@public/images/bank-bofa2.png";
import bankTD from "@public/images/bank-td.png";
import { useState } from "react";

const Banks: NextPage = () => {
  const [averageRate, setAverageRate] = useState(0.05);

  return (
    <section className="max-w-7xl mx-auto flex flex-col mt-24 mb-48">
      <h2 className="text-4xl w-[39rem] mx-auto mb-24 text-center text-black font-bold leading-[-0.03em]">
        This is what other banks around the world will give you.
      </h2>
      <div className="flex flex-row justify-around">
        <Bank image={redxamLogo} name="Redxam" rate={averageRate} />
        <Bank image={bankChase} name="Chase" rate={0.01} />
        <Bank image={bankBofa} name="Bofa" rate={0.01} />
        <Bank image={bankTD} name="TD Bank" rate={0.01} />
      </div>
    </section>
  );
};

interface BankProps {
  image: StaticImageData;
  name: string;
  rate: number;
}

const Bank: NextPage<BankProps> = ({ image, name, rate }) => {
  return (
    <div className="flex flex-col items-center">
      <Image src={image} alt={name} width="60" height="60" />
      <div className="flex flex-col items-center">
        <span className="font-semibold text-2xl leading-7 text-black text-opacity-80 my-4 font-secondary">
          {name}
        </span>
        <span className="font-medium text-4xl leading-10 text-lighter-black tracking-[-0.04em] text-opacity-60 font-secondary">
          {rate}%
        </span>
      </div>
    </div>
  );
};

export default Banks;
