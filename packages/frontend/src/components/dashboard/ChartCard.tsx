import { NextPage } from 'next';
import { useState, useContext } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';
import Card from './Card';
import { BalanceRecordsContext } from '@providers/BalanceRecords';

interface ChartProps {
  data: {
    time: number;
    value: number;
  }[];
}

const Chart: NextPage<ChartProps> = ({ data }) => {
  const [value, setValue] = useState(0);
  const { balanceRecords } = useContext(BalanceRecordsContext);

  return (
    <Card width="w-[440px]" height="h-[fit-content]">
      <div className="flex flex-col px-7 pt-7">
        <div className="flex">
          <div className="flex flex-col flex-1">
            <span className="font-secondary text-xs text-lighter-black">
              Performance
            </span>
            <span className="font-secondary text-2xl font-bold">
              <span className="text-[#61D404]">+</span>1.5% ($250.54)
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-secondary text-xs text-lighter-black">
              Portfolio
            </span>
            <span className="font-secondary text-2xl font-bold">Passive</span>
          </div>
        </div>
        <ResponsiveContainer
          width="99%"
          height="99%"
          aspect={3}
          className={'mt-7'}
        >
          <LineChart
            data={data}
            onMouseEnter={(e: any) =>
              setValue(e.activePayload[0].payload.value)
            }
            onMouseMove={(e: any) =>
              setValue(e?.activePayload?.[0]?.payload?.value || 0)
            }
            onMouseLeave={(e: any) => setValue(0)}
          >
            {/* @ts-ignore */}
            <Line type="monotone" dataKey="value" stroke="#61D404" dot={null} />
            <Tooltip content={<CustomTooltip />} position={{ y: 50 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button className="w-full text-center font-medium font-secondary text-base underline py-4 border-t">
        View Portfolio
      </button>
    </Card>
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
