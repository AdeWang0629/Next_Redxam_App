import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";

import FirstStartImage from "@public/images/start-img1.png";
import SecondStartImage from "@public/images/start-img2.png";
import ThirdStartImage from "@public/images/start-img3.png";

const Starting: NextPage = () => {
  const [step, setStep] = useState(0);

  return (
    <section className="max-w-7xl mx-auto flex flex-col mt-24 mb-48 p-4 md:p-0">
      <h4 className="mb-7 text-[1.0625rem] font-medium uppercase text-[#828282] tracking-[0.3em]">
        how to start
      </h4>
      <h2 className="w-full md:w-[600px] self-start text-left text-3xl md:text-[2.8125rem] leading-normal text-lighter-black dark:text-gray-200 font-secondary font-bold mb-3.5">
        Starting is very Simple
      </h2>
      <p className="font-primary text-lg text-black dark:text-white text-opacity-80 leading-[1.8] ">
        Start investing with redxam in three simple steps
      </p>
      <div className="flex flex-col-reverse md:flex-row items-center mt-40">
        <div className="flex flex-col flex-1">
          <Image
            src={
              step === 0
                ? FirstStartImage
                : step === 1
                ? SecondStartImage
                : ThirdStartImage
            }
            alt={`step $${step + 1}`}
            layout="fixed"
            width="323px"
            height="628px"
            placeholder="blur"
          />
        </div>
        <div className="flex flex-col flex-1">
          <div
            className={`flex flex-row my-[1.875rem] py-8 pr-11 rounded-3xl items-start transition-all duration-500 ${
              step === 0 ? "bg-[#fcfcfc] shadow-2xl" : ""
            }`}
            style={{
              boxShadow: step === 0 ? "0 5px 40px rgb(0 0 0 / 8%)" : undefined,
            }}
            onMouseEnter={() => setStep(0)}
          >
            <div
              className={`w-20 h-20 min-h-[5rem] min-w-[5rem] rounded-full border border-darker-primary ${
                step === 0
                  ? "bg-darker-primary text-white"
                  : "hover:bg-darker-primary text-darker-primary hover:text-white"
              } flex items-center justify-center ml-11 mr-12 text-opacity-80`}
            >
              <span className="text-4xl text-center font-secondary font-medium">
                1
              </span>
            </div>
            <div>
              <h3
                className={`mb-1.5 text-2xl md:text-3xl text-black ${
                  step === 0 ? "dark:text-black" : "dark:text-white"
                } text-opacity-80`}
              >
                Create an Account
              </h3>
              <p
                className={`w-full md:w-[20.9375rem] text-black ${
                  step === 0 ? "dark:text-black" : "dark:text-white"
                } text-opacity-80`}
              >
                Signup for an account with just name and email.
              </p>
            </div>
          </div>
          <div
            className={`flex flex-row my-[1.875rem] py-8 pr-11 rounded-3xl items-start transition-all duration-500 ${
              step === 1 ? "bg-[#fcfcfc] shadow-2xl" : ""
            }`}
            style={{
              boxShadow: step === 1 ? "0 5px 40px rgb(0 0 0 / 8%)" : undefined,
            }}
            onMouseEnter={() => setStep(1)}
          >
            <div
              className={`w-20 h-20 min-h-[5rem] min-w-[5rem] rounded-full border border-darker-primary ${
                step === 1
                  ? "bg-darker-primary text-white"
                  : "hover:bg-darker-primary text-darker-primary hover:text-white"
              } flex items-center justify-center ml-11 mr-12 text-opacity-80`}
            >
              <span className="text-4xl text-center font-secondary font-medium">
                2
              </span>
            </div>
            <div>
              <h3
                className={`mb-1.5 text-2xl md:text-3xl text-black ${
                  step === 1 ? "dark:text-black" : "dark:text-white"
                } text-opacity-80`}
              >
                Deposit Funds
              </h3>
              <p
                className={`w-full md:w-[20.9375rem] text-black ${
                  step === 1 ? "dark:text-black" : "dark:text-white"
                } text-opacity-80`}
              >
                Choose preferred deposit option like bank transfer, credit/debit
                card or directly send digital assets.
              </p>
            </div>
          </div>
          <div
            className={`flex flex-row my-[1.875rem] py-8 pr-11 rounded-3xl items-start transition-all duration-500 ${
              step === 2 ? "bg-[#fcfcfc] shadow-2xl" : ""
            }`}
            style={{
              boxShadow: step === 2 ? "0 5px 40px rgb(0 0 0 / 8%)" : undefined,
            }}
            onMouseEnter={() => setStep(2)}
          >
            <div
              className={`w-20 h-20 min-h-[5rem] min-w-[5rem] rounded-full border border-darker-primary ${
                step === 2
                  ? "bg-darker-primary text-white"
                  : "hover:bg-darker-primary text-darker-primary hover:text-white"
              } flex items-center justify-center ml-11 mr-12 text-opacity-80`}
            >
              <span className="text-4xl text-center font-secondary font-medium">
                3
              </span>
            </div>
            <div>
              <h3
                className={`mb-1.5 text-2xl md:text-3xl text-black ${
                  step === 2 ? "dark:text-black" : "dark:text-white"
                } text-opacity-80`}
              >
                Watch your money Grow
              </h3>
              <p
                className={`w-full md:w-[20.9375rem] text-black ${
                  step === 2 ? "dark:text-black" : "dark:text-white"
                } text-opacity-80`}
              >
                Sit back and relax! Let your let your money work for you all
                day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Starting;
