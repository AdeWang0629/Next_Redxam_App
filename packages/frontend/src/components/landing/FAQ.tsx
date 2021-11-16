import type { NextPage } from "next";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import QuestionsImage from "@public/images/questions-img.png";

const FAQ: NextPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(-1);

  let questions = [
    {
      title: "How does redxam earn money?",
      body: "redxam makes a quarter of the interest earned. Instead of having a fix pricing, we strive to provide the best returns for our customers.",
    },
    {
      title: "How do the portfolios generate interest lending assets?",
      body: "Our portfolios, including our conservative plan, lend the money through a secure collateral-based system to borrowers that pay an interest for the assets borrowed.",
    },
    {
      title: "How secure is redxam?",
      body: "We use bank-level security combined with impenetrable Bitcoin and Ethereum blockchain technologies. this combination provides one of the most secured financial networks in the world.",
    },
    {
      title: "Does redxam require verified identification?",
      body: "We don’t require verification as long as you use crypto currencies for your savings account. Stable-coins are the recommended way of depositing assets.",
    },
    {
      title: "How much do you need to invest with redxam?",
      body: "We recommend depositing at least the value of 0.1BTC as this will function as a cushion for any market volatility and transfer fees. We estimate about $20 to $30 on fees so we bundle transactions with other redxam users to reduce the costs to virtually $0.",
    },
  ];

  return (
    <section className="flex flex-row mt-24 mb-48">
      <div className="max-w-4xl mx-auto flex flex-col">
        <h4 className="mb-7 text-[1.0625rem] font-medium uppercase text-[#828282] tracking-[0.3em]">
          frequently asked questions
        </h4>
        <h2 className="w-[600px] self-start text-left text-[2.8125rem] leading-normal text-lighter-black font-secondary font-bold mb-36">
          Quick answer to
          <br /> your questions.
        </h2>
        <div className="flex flex-col">
          {questions.map((question, idx) => (
            <div
              className="flex flex-col w-[63.75rem] py-8 px-16 bg-[#F6F6FA] rounded-[30px] mb-8 transition-all duration-500"
              key={"question" + idx}
            >
              <div
                className="flex flex-row justify-between items-center cursor-pointer transition-all duration-500"
                onClick={() =>
                  setActiveQuestion((prev) => (prev === idx ? -1 : idx))
                }
              >
                <span className="text-4xl leading-10 w-auto font-primary font-medium text-black text-opacity-50 tracking-[-0.04em]">
                  {question.title}
                </span>
                <FontAwesomeIcon
                  className={`text-4xl text-black text-opacity-50 ml-1 ${
                    activeQuestion === idx
                      ? "animate-flip transform rotate-180"
                      : ""
                  }`}
                  icon={faAngleDown}
                />
              </div>
              <p
                className={`leading-[1.8] font-primary text-black text-opacity-80 pt-7 ${
                  activeQuestion === idx ? "animate-fade-in-down" : "hidden"
                }`}
              >
                {question.body}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Image src={QuestionsImage} alt="" />
      </div>
    </section>
  );
};

export default FAQ;
