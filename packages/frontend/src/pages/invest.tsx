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
  let goal = '1,500,000';
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
        className="flex flex-col lg:flex-row justify-center items-center space-y-10 lg:space-y-0 space-x-0 lg:space-x-10 pt-44 lg:pt-44 pb-20 border-b border-b-white"
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
            className="rounded-2xl w-full lg:w-[593px] h-[215px] lg:h-[334px] mx-auto"
          ></iframe>
        </div>
        <div className="flex flex-col px-4 lg:px-0">
          <h1 className="text-[2rem] tracking-[-0.05em] font-secondary font-bold text-lighter-black dark:text-gray-200 leading-[3rem] w-full lg:max-w-[28.125rem]">
            Redxam: Your Personal Crypto Investment Assistant. Worry-Free Crypto
            Holdings!
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

          <a
            className="primary text-[15px] px-16 py-4 font-bold text-center rounded-[30px] bg-buttons-green mt-12"
            href={`mailto:investments@redxam.com?subject=Hi%20I%20would%20like%20to%20invest%20in%20redxam!&body=Hi%20redxam%20team%20%F0%9F%91%8B%2C%0D%0A%0D%0AMy%20name%20is%20________%20!I'm%20really%20interested%20in%20the%20project%20and%20I%20would%20like%20to%20be%20part%20of%20the%20seed%20investment%20round%20and%20get%20early%20into%20the%20token%20sale%20at%20%240.01%20per%20token!%0D%0A%0D%0AI%20would%20like%20to%20invest%20%24____%20towards%20your%20round%20and%20get%20the%20correspondent%20tokens%20to%20my%20cash%20amount.%0D%0A%0D%0A%23%23%23%20Please%20select%20the%20one%20that%20doesn't%20apply%20to%20you%20%23%23%23%0D%0A%5B%20%5D%20I%20have%20invested%20in%20a%20startup%20before%20and%20I'm%20ready%20to%20sign%0D%0A%5B%20%5D%20This%20will%20be%20my%20first%20time%20investing%20and%20I%20would%20like%20to%20learn%20about%20the%20process.%0D%0A%0D%0AThanks%20for%20your%20interest%20in%20us%2C%20a%20warm%20welcome!%0D%0A-%20the%20redxam.com%20family`}
          >
            Invest in the redxam project!
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
              <span
                className="font-secondary font-medium text-2xl leading-9 text-lighter-black text-transparent"
                style={{ textShadow: '0 0 8px rgba(0,0,0,0.5)' }}
              >
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
