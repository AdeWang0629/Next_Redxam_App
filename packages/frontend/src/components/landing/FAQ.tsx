import { useState, FC } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NodataImage from "@public/images/no-data.jpg";
import QuestionsImage from "@public/images/questions-img.png";

interface InterfaceFAQList {
  title: string;
  body: string;
}
interface InterfaceFAQ {
  filteredQuestionsList?: InterfaceFAQList[];
  isInputSearchEmpty?: boolean;
  isSearchFilterRequired: boolean;
}

const FAQ: FC<InterfaceFAQ> = (props) => {
  const [activeQuestion, setActiveQuestion] = useState(-1);

  const { locale } = useRouter();

  const { t } = useTranslation("faq");

  let questions = [
    {
      title: t("first-question-title"),
      body: t("first-question-body"),
    },
    {
      title: t("second-question-title"),
      body: t("second-question-body"),
    },
    {
      title: t("third-question-title"),
      body: t("third-question-body"),
    },
    {
      title: t("fourth-question-title"),
      body: t("fourth-question-body"),
    },
    {
      title: t("fifth-question-title"),
      body: t("fifth-question-body"),
    },
  ];

  /**
   * JSX For Header of FAQ.
   */
  const FaqHeading = (
    <>
      <h4 className="mb-7 text-[1.0625rem] font-medium uppercase text-[#828282] tracking-[0.3em]">
        {t("subtitle")}
      </h4>
      <h2 className="w-full md:w-[600px] self-start text-left text-[2.8125rem] leading-normal text-lighter-black dark:text-gray-200 font-secondary font-bold mb-36">
        {t("first-title")}
        <br /> {t("second-title")}
      </h2>
    </>
  );

  /**
   * Method returns the Question Answer block.
   *
   * @param question
   * @param idx
   * @returns {JSX}
   */
  const FaqWrapper = (question: InterfaceFAQList, idx: number) => {
    return (
      <div
        className="flex flex-col w-full md:w-[63.75rem] py-8 px-8 md:px-16 bg-[#F6F6FA] rounded-[30px] mb-8 transition-all duration-500"
        key={"question" + idx}
      >
        <div
          className="flex flex-row justify-between items-center cursor-pointer transition-all duration-500"
          onClick={() => setActiveQuestion((prev) => (prev === idx ? -1 : idx))}
        >
          <span className="text-2xl md:text-4xl leading-10 w-auto font-primary font-medium text-black text-opacity-50 tracking-[-0.04em]">
            {question.title}
          </span>
          <FontAwesomeIcon
            className={`text-4xl text-black text-opacity-50 ml-1 ${
              activeQuestion === idx ? "animate-flip transform rotate-180" : ""
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
    );
  };

  /**
   * Constant holds the no data JSX.
   */
  const faqSearchNotFound = (
    <>
      <div className="w-full text-center">
        <Image src={NodataImage} alt="" width={250} height={250} />
      </div>
      <h3 className="text-4xl w-full md:w-[39rem] mx-auto mb-24 text-center text-black dark:text-gray-200 font-bold leading-[-0.03em]">
        Ooops ! No Results Found.
      </h3>
    </>
  );

  /**
   * Method to render FAQs for support page.
   *
   * @returns {JSX}
   */
  const faqForSupportPage = () => {
    return (
      <>
        {!props?.filteredQuestionsList?.length
          ? faqSearchNotFound
          : props.filteredQuestionsList?.map((question, idx) =>
              FaqWrapper(question, idx)
            ) || []}
      </>
    );
  };

  /**
   * Method to render FAQs for index page.
   *
   * @returns {JSX}
   */
  const faqForIndexPage = () => {
    return (
      <>{questions?.map((question, idx) => FaqWrapper(question, idx)) || []}</>
    );
  };

  /**
   * Method to render faq background image.
   *
   * @returns {JSX}
   */
  const faqBackgoundImage = () => {
    return (
      <>
        <div
          className="self-end"
          style={locale == "ar" ? { transform: "scaleX(-1)" } : {}}
        >
          <Image src={QuestionsImage} alt="" placeholder="blur" />
        </div>
      </>
    );
  };

  return (
    <section className="flex flex-col-reverse md:flex-row mt-24 relative">
      <div className="max-w-4xl mx-auto flex flex-col p-4 md:p-0">
        {props.isInputSearchEmpty || !props.isSearchFilterRequired ? (
          FaqHeading
        ) : (
          <></>
        )}
        <div className="flex flex-col">
          {props.isSearchFilterRequired
            ? faqForSupportPage()
            : faqForIndexPage()}
        </div>
      </div>

      {props.isSearchFilterRequired ? <></> : faqBackgoundImage()}
    </section>
  );
};

export default FAQ;
