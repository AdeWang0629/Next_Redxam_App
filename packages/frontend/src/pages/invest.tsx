import type { GetStaticProps, NextPage } from 'next';
import Navbar from '@components/global/Navbar';
import Footer from '@components/global/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { numberWithCommas } from '@utils/helpers';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return { props: {} };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'navbar',
        'waitlist',
        'login',
        'footer'
      ]))
    }
  };
};

const Invest: NextPage = () => {
  let goal = '100,000';
  let previousInvestors = [
    {
      name: 'Salem',
      value: '60k'
    },
    {
      name: 'Sultan',
      value: '30k'
    }
  ];

  let raised = previousInvestors.reduce((acc, curr) => {
    return (
      acc +
      (curr.value.includes('k')
        ? +curr.value.replace('k', '') * 1000
        : +curr.value)
    );
  }, 0);

  let progress = (raised / +goal.replace(/\,/gm, '')) * 100;

  return (
    <>
      <Navbar title="Your Personal Crypto Investment Assistant" />
      <div
        className="flex flex-col lg:flex-row justify-center items-center space-y-10 lg:space-y-0 space-x-0 lg:space-x-10 pt-44 lg:pt-64 pb-20 border-b border-b-white"
        style={{
          boxShadow:
            '0px 6px 6px -6px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div className="flex w-full lg:w-auto px-4 lg:px-0">
          <iframe
            src="https://www.youtube-nocookie.com/embed/videoseries?controls=0&rel=0&amp;list=PL96gMb3QuolgSAlo1Q7YYaf9Qa-FZmJoS"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-2xl w-full lg:w-[593px] h-[215px] lg:h-[421px] mx-auto"
          ></iframe>
        </div>
        <div className="flex flex-col px-4 lg:px-0">
          <h1 className="text-[2rem] tracking-[-0.05em] font-secondary font-bold text-lighter-black dark:text-gray-200 leading-[3rem] w-full lg:max-w-[28.125rem]">
            Redxam: Your Personal Crypto Investment Assistant. Worry-Free Crypto
            Holdings
          </h1>

          <div className="w-full h-5 bg-[#E5FEE1] rounded-[2rem] mt-8">
            <div
              className="h-5 bg-[#ACE96B] rounded-l-[2rem]"
              style={{ width: progress + '%' }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-x-14 mt-14">
            <div className="flex flex-col">
              <span className="font-secondary font-medium text-lighter-black text-opacity-50 text-sm leading-5 mb-2">
                FUNDS RAISED
              </span>
              <span className="font-secondary font-bold text-lighter-black text-[2rem] leading-[3rem]">
                ${numberWithCommas(raised)}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-secondary font-medium text-lighter-black text-opacity-50 text-sm leading-5 mb-2">
                FUNDS GOAL
              </span>
              <span className="font-secondary font-bold text-lighter-black text-[2rem] leading-[3rem]">
                ${goal}
              </span>
            </div>
          </div>

          <a className="primary text-[15px] px-16 py-4 font-bold text-center rounded-[30px] bg-buttons-green mt-12">
            Back this project
          </a>
        </div>
      </div>
      <div className="flex flex-col mt-[2.875rem] max-w-7xl mx-auto pb-20 px-4 lg:px-0">
        <h2 className="font-secondary font-medium text-lighter-black text-opacity-50 text-sm leading-5 mb-2">
          PREVIOUS INVESTORS
        </h2>
        <div className="flex flex-col mt-7 space-y-2">
          {previousInvestors.map((investor, index) => (
            <div
              className="bg-[#f5f5f5] px-8 py-4 flex items-center space-x-12 rounded-2xl"
              key={`previous-investor-${index}`}
            >
              <span className="font-secondary font-medium text-2xl leading-9 text-lighter-black">
                {investor.name}
              </span>
              <span className="font-secondary font-bold text-2xl leading-9 text-lighter-black">
                ${investor.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Invest;
