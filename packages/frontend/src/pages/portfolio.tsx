import type { NextPage } from 'next';
import Navbar from '@components/global/Navbar';
import Footer from '@components/global/Footer';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

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

const Portfolio: NextPage = () => {
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 }
  ];

  return (
    <>
      <Navbar title="Portfolio" />
      <section className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-5xl font-secondary mb-10 font-bold text-lighter-black dark:text-gray-200 mt-36 leading-[1.2] text-center">
          Aggresive Portfolio
        </h1>
        <p className="text-black dark:text-white font-primary max-w-3xl mb-16 text-center text-opacity-80">
          Conservative plan puts 85% into stablecoins + 15% in a booming crypto
          company. UNI price has gone up to $40 and it’s currently around $26.
          Our advisers have picked it because of the great contributions to the
          community and their optimistic future.
        </p>
        <div className="flex justify-between max-w-3xl w-full">
          <div>
            <h4 className="mb-4 text-[1.0625rem] font-medium uppercase text-[#828282] ltr:tracking-[0.3em]">
              Stable Coins and How we earn
            </h4>
            <p className="font-medium text-black text-lg font-secondary">
              DAI - <span className="text-darker-primary">35% </span> on fulcrum
              earning <span className="text-darker-primary">7.79%</span>
            </p>
            <p className="font-medium text-black text-lg font-secondary my-2">
              USDT - <span className="text-darker-primary">25% </span>on harvest
              earning <span className="text-darker-primary">9.61%</span>
            </p>
            <p className="font-medium text-black text-lg font-secondary mb-2">
              USDC - <span className="text-darker-primary">25% </span>on AAVE
              earning <span className="text-darker-primary">13%</span>
            </p>
            <p className="font-medium text-black text-lg font-secondary">
              UNI token - <span className="text-darker-primary">15% </span>
              governance/stock for Uniswap
            </p>
          </div>
          <div>
            <ResponsiveContainer minWidth={200} minHeight={200}>
              <PieChart width={200} height={200}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius="100%"
                  fill="#8AE01C"
                  paddingAngle={2}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-10 flex justify-between items-center">
          <Link href="/portfolioDetails" passHref>
            <button className="font-primary text-[15px] text-darker-primary w-[15rem] py-3.5 font-bold text-center rounded-[30px] border-darker-primary border mr-6">
              Portafolio Details
            </button>
          </Link>
          <button className="font-primary text-[15px] w-[15rem] py-3.5 font-bold text-center rounded-[30px] bg-buttons-green">
            Change Portfolio
          </button>
        </div>
        <div />
      </section>

      <Footer />
    </>
  );
};

export default Portfolio;
