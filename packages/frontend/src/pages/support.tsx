import { useState, ChangeEvent } from "react";

import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FAQ from "@components/landing/FAQ";
import Navbar from "@components/global/Navbar";
import Footer from "@components/global/Footer";

import ContactFormModel from "@components/models/ContactFormModel";

interface InterfaceTQuestions {
  title: string;
  body: string;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return { props: {} };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "navbar",
        "waitlist",
        "login",
        "hero",
        "whyus",
        "starting",
        "relax",
        "calculate",
        "banks",
        "plan",
        "faq",
        "newsletter",
        "footer",
        "contact",
      ])),
    },
  };
};

const Support: NextPage = () => {
  const { t } = useTranslation("faq");

  let questions: InterfaceTQuestions[] = [
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

  const [filteredQuestionsList, applyFilterInQuestionList] = useState(
    questions
  );
  const [inputSearch, updateInputSearch] = useState("");

  const isInputSearchEmpty = !inputSearch || inputSearch?.length === 0;

  const [contactFormOpened, setContactFormOpened] = useState(false);

  /**
   * Method to filter faq list as per text entered.
   *
   * @param event
   */
  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateInputSearch(event.target.value);

    const suggestedFAQ = [
      ...(questions?.filter((question) => {
        const suggestionName = question?.title?.toLowerCase();
        const searchName = event.target.value?.toLowerCase()?.trim();

        return suggestionName.includes(searchName);
      }) || []),
    ];

    applyFilterInQuestionList(suggestedFAQ);
  };

  return (
    <>
      <Navbar title="Support" />
      <div className="py-24">
        <div className="bg-buttons-green/80 flex flex-col items-center">
          <div className="font-medium text-2xl  text-lighter-black pt-12">
            How can we help?
          </div>
          <div className="mt-5 faq-input w-1/2 pb-16">
            <input
              type="email"
              className="font-secondary w-full py-4 px-3"
              required
              id="email"
              placeholder="Search for Your Query Here"
              onChange={onInputValueChange}
            />
          </div>
        </div>

        <div>
          <div className="faq-wrapper">
            <FAQ
              isSearchFilterRequired={true}
              filteredQuestionsList={filteredQuestionsList}
              isInputSearchEmpty={isInputSearchEmpty}
            />
          </div>

          <div className="flex flex-col items-center mt-28">
            <h3 className="text-4xl w-full md:w-[39rem] mx-auto mb-24 text-center text-black dark:text-gray-200 font-bold leading-[-0.03em]">
              Still have questions? Click here to contact us.
            </h3>

            <button
              className="font-primary text-[15px] w-[15rem] py-3.5 font-bold text-center rounded-[30px] mb-20 bg-buttons-green"
              onClick={() => setContactFormOpened(true)}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {contactFormOpened && (
        <ContactFormModel
          isOpened={contactFormOpened}
          setOpened={setContactFormOpened}
        />
      )}
    </>
  );
};

export default Support;
