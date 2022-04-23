import type { NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@components/dashboard/Card';
import Navbar from '@components/global/Navbar';
import Footer from '@components/global/Footer';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

// Tokens Icons
import usdt from '@public/tokens/usdt.png';
import zec from '@public/tokens/zec.png';
import pac from '@public/tokens/pac.png';
import smartCash from '@public/tokens/smartCash.png';
import xpc from '@public/tokens/xpc.png';
import btc from '@public/tokens/btc.png';
import leoCoin from '@public/tokens/leoCoin.png';

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
        'login',
        'dashboard'
      ]))
    }
  };
};

const Portfolio: NextPage = () => {
  const { t } = useTranslation('dashboard');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState(0);
  const performanceData = [
    { time: 0, value: 0 },
    { time: 1, value: 10 },
    { time: 2, value: 5 },
    { time: 3, value: 2 }
  ];

  const prices = [
    {
      label: 'Opening',
      value: '$234.923'
    },
    {
      label: 'Closing',
      value: '$234.923'
    },
    {
      label: 'Volume',
      value: '$234.923'
    },
    {
      label: 'Year return',
      value: '$234.923'
    }
  ];

  const tokens = [
    { name: 'USDT', icon: usdt },
    { name: 'ZEC', icon: zec },
    { name: '$PAC', icon: pac },
    { name: 'Smart Cash', icon: smartCash },
    { name: 'Smart Cash', icon: smartCash },
    { name: '$XPC', icon: xpc },
    { name: 'BTC', icon: btc },
    { name: 'Leo Coin', icon: leoCoin }
  ];

  return (
    <>
      <Navbar title="Portfolio" />
      <section className="flex flex-col pt-36 pb-6 bg-[#fbfbfb]">
        <div className="max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto">
          <div
            className="border-[3px] border-white rounded-[30px] backdrop-blur px-10 py-5"
            style={{ background: 'rgba(255, 255, 255, 0.6)' }}
          >
            <h1 className="text-5xl font-secondary mb-10 font-bold text-lighter-black dark:text-gray-200 leading-[1.2]">
              Aggresive Portfolio
            </h1>
            <p className="text-black dark:text-white font-primary max-w-3xl mb-16 text-left text-opacity-80">
              Conservative plan puts 85% into stablecoins + 15% in a booming
              crypto company. UNI price has gone up to $40 and it’s currently
              around $26. Our advisers have picked it because of the great
              contributions to the community and their optimistic future.
            </p>
          </div>

          <div
            className="border-[3px] border-white rounded-[30px] backdrop-blur px-10 py-5 flex my-6"
            style={{ background: 'rgba(255, 255, 255, 0.6)' }}
          >
            <div className="font-secondary">
              <p className="font-medium text-xl mb-2">
                Current Price:
                <span className="text-darker-primary"> $241.30</span>
              </p>
              <Card width="md:w-[440px]" height="h-[300px] mt-6 md:mt-0">
                <div className="flex flex-col px-7 pt-7">
                  <div className="flex">
                    <div className="flex flex-col flex-1">
                      <span className="font-secondary text-xs text-lighter-black">
                        {t('performance')}
                      </span>

                      <span className="font-secondary text-2xl font-medium">
                        <span className="text-[#61D404]">+</span>
                        1.5% ($250.54)
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-secondary text-xs text-lighter-black">
                        {t('portfolio')}
                      </span>
                      <span className="font-secondary text-2xl font-medium">
                        <Link href="https://redxam.medium.com/passive-plan-bbf8c58e2f7d">
                          <a>Aggresive</a>
                        </Link>
                      </span>
                    </div>
                  </div>
                  <ResponsiveContainer
                    width="99%"
                    height="99%"
                    aspect={3}
                    className="mt-7"
                  >
                    <LineChart
                      data={performanceData}
                      onMouseEnter={(e: any) => {
                        if (e.activePayload) {
                          setValue(e.activePayload[0].payload.value);
                        }
                      }}
                      onMouseMove={(e: any) =>
                        setValue(e?.activePayload?.[0]?.payload?.value || 0)
                      }
                      onMouseLeave={() => setValue(0)}
                    >
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#61D404"
                        dot={undefined}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        position={{ y: 50 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            <div
              className="font-secondary text-lighter-black ml-7 border-l-[#3a434d50] pl-7"
              style={{ borderLeftWidth: '0.2px' }}
            >
              <p className="mb-[45px] font-medium text-lg uppercase tracking-[0.3em]">
                Prices
              </p>
              <div className="w-[300px]">
                {prices.map((price, i) => (
                  <div
                    key={i}
                    className={`flex justify-between ${
                      i === 1 ? 'my-4' : i === 2 && 'mb-4'
                    }`}
                  >
                    <p>{price.label}</p>
                    <p className="font-bold">{price.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="border-[3px] border-white rounded-[30px] backdrop-blur
            px-10 py-5 mb-6 grid grid-cols-4"
            style={{ background: 'rgba(255, 255, 255, 0.6)' }}
          >
            {tokens.map((token, i) => (
              <div
                key={i}
                className={`flex flex-col justify-center items-center px-[40px] py-[40px] ${
                  i <= 3 && 'border-b-[#3a434d50] border-b'
                } ${
                  i < 3
                    ? 'border-r-[#3a434d50] border-r'
                    : i > 3 && i !== 7 && 'border-r-[#3a434d50] border-r'
                } `}
              >
                <Image
                  src={token.icon}
                  alt={token.name}
                  height="60"
                  width="60"
                />
                <p className="font-medium font-secondary text-lg text-black mt-4">
                  {token.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any;
}

const CustomTooltip: NextPage<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-black bg-opacity-70 text-white rounded-xl py-2 px-4">
        <span>{new Date(payload[0].payload.time).toLocaleDateString()}</span>
      </div>
    );
  }

  return null;
};

export default Portfolio;
