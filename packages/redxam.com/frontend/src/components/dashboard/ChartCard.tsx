import { NextPage } from 'next';
import { useState, useContext, useEffect } from 'react';
import ReactPlaceholder from 'react-placeholder';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { HomeContext } from '@providers/Home';
import { BalanceRecordsContext } from '@providers/BalanceRecords';
import { useTranslation } from 'next-i18next';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import Image from 'next/image';
import Card from './Card';

interface ChartProps {
  data: {
    time: number;
    value: number;
  }[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Chart: NextPage<ChartProps> = ({ data }) => {
  const { t } = useTranslation('dashboard');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [dolarChange, setDolarChange] = useState(0);
  const { home, loading } = useContext(HomeContext);
  const { balanceRecords } = useContext(BalanceRecordsContext);

  let performanceData = [
    { time: 0, value: 0 },
    { time: 0, value: 0 }
  ];

  useEffect(() => {
    if (home?.percentChange && home?.dolarChange) {
      setPercentChange(home?.percentChange);
      setDolarChange(home?.dolarChange);
    }
  }, [home]);

  if (balanceRecords) {
    performanceData = balanceRecords.map(balanceRecord => ({
      time: balanceRecord.timestamp,
      value: balanceRecord.balance
    }));
  }

  return (
    <div>
      <Card width="md:w-[440px]" height="h-[fit-content] mt-6 md:mt-0">
        <div className="flex flex-col px-7 pt-7">
          <div className="flex">
            <div className="flex flex-col flex-1">
              <span className="font-secondary text-xs text-lighter-black">
                {t('performance')}
              </span>
              <ReactPlaceholder
                showLoadingAnimation
                type="textRow"
                ready={!loading}
                style={{ height: 32, marginTop: 0, width: '80%' }}
              >
                <span className="font-secondary text-2xl font-bold">
                  <span className="text-[#61D404]">+</span>
                  {`${percentChange.toFixed(2)}% ($${dolarChange.toFixed(2)})`}
                </span>
              </ReactPlaceholder>
            </div>
            <div className="flex flex-col">
              <span className="font-secondary text-xs text-lighter-black">
                {t('portfolio')}
              </span>
              <span className="font-secondary text-2xl font-bold">
                <Link href="https://redxam.medium.com/passive-plan-bbf8c58e2f7d">
                  <a>{t('passive')}</a>
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
              <Tooltip content={<CustomTooltip />} position={{ y: 50 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <Tippy content="Coming soon">
          <button className="w-full text-center font-medium font-secondary text-base underline py-4 border-t">
            {t('viewPortfolio')}
          </button>
        </Tippy>
      </Card>
      <Card width="md:w-[440px]" height="h-[fit-content] mt-6 md:mt-6">
        <div className="flex flex-col px-7 pt-7">
          <div className="flex">
            <div className="flex flex-col flex-1">
              <span className="font-secondary text-xs text-lighter-black">
                Crypto Wallets
              </span>
              <ReactPlaceholder
                showLoadingAnimation
                type="textRow"
                ready={!loading}
                style={{ height: 32, marginTop: 0, width: '80%' }}
              >
                <div className="align-middle flex">
                  <Image
                    src="/icons/dogecoin.svg"
                    className="rounded-full"
                    width="30px"
                    height="30px"
                  />
                  <span className="font-secondary text-2xl font-bold pl-2">
                    Dogecoin
                  </span>
                </div>
              </ReactPlaceholder>
            </div>
            <div className="flex flex-col">
              <a
                href="https://coinmarketcap.com/currencies/dogecoin/"
                target="_blank"
                className="font-secondary text-xs text-lighter-black underline"
                rel="noreferrer"
              >
                See $USD value
              </a>
              <span className="font-secondary text-2xl font-bold">
                <a>100 DC</a>
              </span>
            </div>
          </div>
        </div>
        <Tippy content="Coming soon">
          <button className="mt-5 w-full text-center font-medium font-secondary text-base text-slate-500 py-4 border-t">
            Send
          </button>
        </Tippy>
      </Card>
    </div>
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

export default Chart;
