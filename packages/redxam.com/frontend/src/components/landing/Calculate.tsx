import type { NextPage } from 'next';
import Image from 'next/image';
import { BaseSyntheticEvent, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';

import ConservativePlan from '@public/images/investmentPlans/conservative-plan.svg';
import RegularBanks from '@public/images/investmentPlans/regular-banks.svg';

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Calculate: NextPage = () => {
  const { t } = useTranslation('calculate');
  const averageRedxam = 0.05;
  const averageRedxamStaking = 0.15;
  const reforestationAPY = 0.1714;

  const rates = useMemo(
    () => [
      {
        id: 1,
        name: t('regular-banks'),
        interest: 0.0001,
        icon: RegularBanks
      },
      {
        id: 2,
        name: t('passive-plan'),
        interest: averageRedxam,
        icon: ConservativePlan
      },
      {
        id: 3,
        name: t('passive-plan-with-staking'),
        interest: averageRedxamStaking,
        icon: ConservativePlan
      },
      {
        id: 4,
        name: 'Amazonic Reforestation plan',
        interest: reforestationAPY,
        icon: ConservativePlan
      }
    ],
    [t]
  );

  const [plan, setPlan] = useState(rates[0].id);

  const [interestRate, setInterestRate] = useState(rates[0]);
  const [value, setValue] = useState(3000);
  const [total, setTotal] = useState(3000 * interestRate.interest);

  const handleValueChange = (e: BaseSyntheticEvent) => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const val = +e.target?.value;

    handleManualNumber(
      // eslint-disable-next-line no-nested-ternary
      val === 5 ? val * 100 : val <= 49 ? val * 200 : 10000 + 1800 * (val - 50)
    );
  };

  const handleManualNumber = (val: number) => {
    setValue(val);
    setTotal(val * interestRate.interest);
  };

  const handleAsset = (rate: {
    interest: number;
    id: number;
    name: string;
    icon: string;
  }) => {
    setInterestRate(rate);
    setTotal(value * rate.interest);

    setPlan(rate.id);
  };

  return (
    <section className="max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto flex flex-col items-center justify-center mt-24 mb-48 p-4 md:p-0">
      <h2 className="mb-[6.25rem] text-3xl md:text-[2.8125rem] leading-[1.5] font-bold font-secondary text-lighter-black dark:text-gray-200">
        {t('title')}
      </h2>
      <div
        className="flex flex-col md:flex-row w-full md:w-[46.0625rem] h-full md:h-[24.5625rem] py-8 md:py-[1.875rem] px-8 md:px-[4.375rem] bg-calculator-bg backdrop-filter backdrop-blur-[30px] border-2 border-white rounded-[30px] mb-5"
        style={{
          boxShadow: '0 4px 30px 0 rgb(0 0 0 / 5%)'
        }}
      >
        <div className="py-5 flex-[2]">
          <h4 className="mb-8 text-[15px] font-medium ltr:tracking-[0.3em] uppercase text-[#828282] dark:text-black">
            {t('plan')}
          </h4>
          <div className="flex space-8">
            {rates.map(rate => (
              <CalculateAsset
                image={rate.icon}
                name={rate.name}
                isActive={plan === rate.id}
                onClick={() => handleAsset(rate)}
                key={`rate${rate.id}`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col border-t md:border-t-0 ltr:md:border-l rtl:md:border-r border-white ltr:md:pl-7 rtl:md:pr-7 flex-1 pt-5">
          <h4 className="mb-12 text-[15px] font-medium ltr:tracking-[0.3em] uppercase text-[#828282] dark:text-black">
            {t('amount')}
          </h4>
          <input
            className="font-primary text-[2.8125rem] font-bold text-[#4f4f4f] dark:text-black mb-6 rounded-[20px] tracking-[-0.05em] border border-white backdrop-filter backdrop-blur-[10px] px-3.5 w-full md:w-[16.25rem]"
            style={{
              backgroundColor: 'rgba(234, 234, 234, 0.7)'
            }}
            value={`$${numberWithCommas(value)}`}
            onChange={({ target }) => {
              const newValue = +target.value.replace(/[^0-9]/g, '');
              handleManualNumber(newValue);
            }}
          />
          <input
            type="range"
            defaultValue={10}
            step={5}
            max={100}
            min={5}
            className="w-full md:w-[16.25rem]"
            onChange={handleValueChange}
          />
          <p className="leading-[1.5] text-[#828282] dark:text-black mt-5 text-opacity-80">
            {t('capital')}
          </p>
        </div>
      </div>
      <div
        className="flex flex-col w-full md:w-[46.0625rem] h-[9.375rem] items-center justify-center py-[1.875rem] px-[4.375rem] bg-calculator-bg backdrop-filter backdrop-blur-[30px] border-2 border-white rounded-[30px] mb-5"
        style={{
          boxShadow: '0 4px 30px 0 rgb(0 0 0 / 5%)'
        }}
      >
        <h4 className="font-medium font-secondary ltr:tracking-[0.3em] uppercase text-[#828282] dark:text-black mb-4">
          {t('paid')}
        </h4>
        <p className="text-4xl text-[#BDBDBD] dark:text-black tracking-[-0.04em] font-secondary font-medium">
          <span className="text-5xl font-bold text-darker-primary">
            {`$${Number(total).toFixed(2)}`}
          </span>
          /{t('year')}
        </p>
      </div>
    </section>
  );
};

interface CalculateAssetProps {
  image: string;
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const CalculateAsset: NextPage<CalculateAssetProps> = ({
  image,
  name,
  isActive,
  onClick
}) => (
  <div className="flex flex-col">
    <button
      className={`flex items-center justify-center rounded-full ${
        isActive ? 'border-2 border-[#27ae60]' : ''
      } w-20 h-20 mb-2.5`}
      onClick={onClick}
    >
      <Image src={image} alt={name} />
    </button>
    <span className="font-primary tracking-[-0.02em] text-darker-primary text-center w-16 mx-auto text-xs">
      {name}
    </span>
  </div>
);

export default Calculate;
