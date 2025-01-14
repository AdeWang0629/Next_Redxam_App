import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@components/global/Navbar';
import Footer from '@components/global/Footer';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Imgs
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import cards from '@public/images/card/cards.png';
import phone from '@public/images/card/phone.png';
import playstore from '@public/images/card/playstore.svg';
import appstore from '@public/images/card/appstore.svg';
import check from '../../public/images/card/check.svg';
import video from '../../public/images/card/video.png';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return { props: {} };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'navbar',
        'footer',
        'waitlist',
        'login'
      ]))
    }
  };
};

const Cards: NextPage = () => {
  const [activeQuestion, setActiveQuestion] = useState(-1);

  const questions = [
    {
      title: '¿Who can apply for the credit card?',
      body: 'Currently any US Citizen and Resident with a Social Security Number is able to sign up for the debit card.'
    },
    {
      title: '¿Does the card offer rewards?',
      body: 'We offer 3.5% rewards on the crypto of your choice!'
    },
    {
      title: '¿Do I have to have a good credit score to apply?',
      body: 'This is a debit card and no credit check will be done.'
    },
    {
      title: '¿Can I use it anywhere, what are the limits?',
      body: 'The redxam card has no limits! You can use it anywhere around the world where Mastercard is accepted.'
    },
    {
      title: '¿How many times can I change my rewards currency?',
      body: 'You can change the cryptocurrency of the rewards once a week.'
    }
  ];

  return (
    <>
      <Navbar />
      <Head>
        <title>redxam - Cards</title>
      </Head>
      <div className="max-w-[87rem] mx-auto my-0">
        <section className="px-16 md:px-0 mx-auto flex flex-col-reverse md:flex-row justify-between items-center mt-40">
          <div>
            <p className="text-[#95989B] font-bold text-base mb-8">
              Magic Card
            </p>
            <h1 className="text-5xl md:text-7xl leading-tight font-bold text-lighter-black mb-16">
              Easy <br />
              <span className="text-[#ACE96B]">rewards</span>
              <br /> on purchase
            </h1>
            <p className="font-primary text-sm text-[#6A6E73] max-w-sm leading-6 mb-8">
              Earn unlimited 1.5% back in crypto on every purchase with the
              BlockFi Rewards Mastercard Signature Credit Crad. See if you’re
              pre approved with no impact to your credit score.
            </p>
            <button className="font-primary text-[15px] w-[15rem] py-3.5 font-bold text-center rounded-[30px] mb-10 bg-buttons-green">
              Get Your Card
            </button>
          </div>
          <div className="w-full md:flex md:justify-end">
            <Image src={cards} alt="redxam Cards" />
          </div>
        </section>
        <section className="flex flex-col md:flex-row justify-between items-center">
          <Image src={phone} alt="Phone With redxam Card" />
          <div className="md:w-[26rem]">
            <h2 className="text-3xl md:text-[2.8125rem] leading-normal text-lighter-black font-secondary font-bold mb-10">
              One Card. <br /> More Crypto.
            </h2>
            <ul className="mb-8 relative">
              <li className="flex items-center mb-2">
                <Image
                  src={check}
                  alt="List Check"
                  width="23.29px"
                  height="23.29px"
                />
                <p className="font-primary text-sm text-[#6A6E73] max-w-sm leading-6 ml-2">
                  No annual fee. No foreign transaction fees.
                </p>
              </li>
              <li className="flex items-center mb-2">
                <Image
                  src={check}
                  alt="List Check"
                  width="23.29px"
                  height="23.29px"
                />
                <p className="font-primary text-sm text-[#6A6E73] max-w-sm leading-6 ml-2">
                  Earn 3.5% back in crypto during your first 3 months.
                </p>
              </li>
              <li className="flex items-center mb-2">
                <Image
                  src={check}
                  alt="List Check"
                  width="23.29px"
                  height="23.29px"
                />
                <p className="font-primary text-sm text-[#6A6E73] max-w-sm leading-6 ml-2">
                  Earn 2% back in crypto on every purchase over $50,000 of
                  annual spend.
                </p>
              </li>
              <li className="flex items-center">
                <Image
                  src={check}
                  alt="List Check"
                  width="23.29px"
                  height="23.29px"
                />
                <p className="font-primary text-sm text-[#6A6E73] max-w-sm leading-6 ml-2">
                  Refer a friend and get $30 in Bitcoin.
                </p>
              </li>
            </ul>
            <div className="flex justify-between items-center">
              <button className="font-primary text-[15px] w-[12rem] py-3.5 font-bold text-center rounded-[30px] bg-buttons-green">
                Get Started
              </button>
              <a href="">
                <Image
                  src={playstore}
                  alt="Google PlayStore Logo"
                  width="27.36px"
                  height="29.98px"
                />
              </a>
              <a href="">
                <Image
                  src={appstore}
                  alt="Apple AppStore Logo"
                  width="33.33px"
                  height="33.33px"
                />
              </a>
            </div>
          </div>
        </section>
        <section className="flex justify-center">
          <Image src={video} alt="redxam Card Video" />
        </section>
        <section>
          <h2 className="text-3xl md:text-[2.8125rem] leading-normal text-lighter-black font-secondary font-bold mb-10">
            FAQs
          </h2>
          <div className="flex flex-col">
            {questions.map((question, idx) => (
              <div
                className="w-full flex flex-col py-8 px-8 md:px-16 bg-[#F6F6FA] rounded-[30px] mb-8 transition-all duration-500"
                key={`question${idx}`}
              >
                <div
                  className="flex flex-row justify-between items-center cursor-pointer transition-all duration-500"
                  onClick={() =>
                    setActiveQuestion(prev => (prev === idx ? -1 : idx))
                  }
                  role="article"
                >
                  <span className="text-2xl md:text-4xl leading-10 w-auto font-primary font-medium text-black text-opacity-50 tracking-[-0.04em]">
                    {question.title}
                  </span>
                  <FontAwesomeIcon
                    className={`text-4xl text-black text-opacity-50 ml-1 ${
                      activeQuestion === idx
                        ? 'animate-flip transform rotate-180'
                        : ''
                    }`}
                    icon={faAngleDown}
                  />
                </div>
                <p
                  className={`leading-[1.8] font-primary text-black text-opacity-80 pt-7 ${
                    activeQuestion === idx ? 'animate-fade-in-down' : 'hidden'
                  }`}
                >
                  {question.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer card />
    </>
  );
};

export default Cards;
