import type { NextPage } from "next";
import { useTranslation } from "next-i18next";

const Plan: NextPage = () => {
  const { t } = useTranslation("plan");

  return (
    <section className="max-w-7xl mx-auto flex flex-col mt-24 mb-48 p-6 md:p-0">
      <div className="flex flex-col bg-calculator-bg px-8 md:px-40 py-8 md:py-[7.5rem] rounded-[30px]">
        <h2 className="text-3xl md:text-5xl leading-normal font-bold tracking-[-0.03em] text-lighter-black capitalize">
          {t("first-title")}
          <br />
          {t("second-title")}
        </h2>
        <div className="flex items-center justify-center mt-24">
          <div
            className="w-full md:w-[20.625rem] min-h-[24.6875rem] flex flex-col items-center text-center mx-auto rounded-[20px] bg-white border-[0.3px] border-[#AAACAE] py-9"
            style={{ boxShadow: "0px 50px 70px rgb(30 88 25 / 5%)" }}
          >
            <span className="font-primary text-lg tracking-[-0.562737px] text-[#696871] leading-[1.8] text-opacity-80">
              {t("plans")}
            </span>
            <span className="font-primary font-medium text-4xl my-8 leading-[1.8] tracking-[-0.04em] text-[#1D293F] text-opacity-80">
              {t("passive")}
            </span>
            <ul className="list-none">
              <li className="mb-6 font-secondary font-medium tracking-[-0.531474px] text-[#696871]">
                USDC -{" "}
                <span className="font-bold leading-[-0.02em] text-lighter-black">
                  33%
                </span>
              </li>
              <li className="mb-6 font-secondary font-medium tracking-[-0.531474px] text-[#696871]">
                USDT -{" "}
                <span className="font-bold leading-[-0.02em] text-lighter-black">
                  33%
                </span>
              </li>
              <li className="mb-6 font-secondary font-medium tracking-[-0.531474px] text-[#696871]">
                DAI -{" "}
                <span className="font-bold leading-[-0.02em] text-lighter-black">
                  33%
                </span>
              </li>
            </ul>
            <a
              href="https://medium.com/p/bbf8c58e2f7d"
              target="_blank"
              rel="noreferrer noopener"
              className="font-primary text-[15px] px-16 py-5 leading-[-0.02em] font-bold text-center rounded-[30px] text-lighter-black mt-2.5 bg-buttons-green"
            >
              {t("read")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plan;
