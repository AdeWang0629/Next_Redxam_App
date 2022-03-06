import type { NextPage } from 'next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useLocale } from '@utils/hooks';

import redxamLogo from '@public/images/redxam-logo.svg';
import bankChase from '@public/images/bank-chase.png';
import bankBofa from '@public/images/bank-bofa2.png';
import bankTD from '@public/images/bank-td.png';

// UAE BANKS
import bankRAK from '@public/images/banks/uae/rak.png';
import bankFAB from '@public/images/banks/uae/fab.png';
import bankENBD from '@public/images/banks/uae/enbd.png';
import bankADCB from '@public/images/banks/uae/adcb.png';

const Banks: NextPage = () => {
  const { t } = useTranslation('banks');
  const locale = useLocale();

  const localeToCountry = new Map();

  localeToCountry.set('en', 'US');
  localeToCountry.set('es', 'ES');

  const country: string = localeToCountry.get(locale) || 'UAE';

  const americanBanks = (
    <>
      <Bank image={bankChase} name="Chase" rate="0.01" />
      <Bank image={bankBofa} name="BofA" rate="0.01" />
      <Bank image={bankTD} name="TD Bank" rate="0.01" />
    </>
  );
  const uaeBanks = (
    <>
      <Bank image={bankRAK} name="RAKBANK" rate="0.25" />
      <Bank image={bankFAB} name="First Abu Dhabi Bank" rate="0.02" />
      <Bank image={bankADCB} name="ADCB" rate="0.1" />
      <Bank image={bankENBD} name="Emirates NBD" rate="0.2" />
    </>
  );

  return (
    <section className="max-w-7xl mx-auto flex flex-col mt-24 mb-48">
      <h2 className="text-4xl w-full md:w-[39rem] mx-auto mb-24 text-center text-black dark:text-gray-200 font-bold leading-[-0.03em]">
        {t('banks-title')}
      </h2>
      <div className="flex flex-col md:flex-row justify-around space-y-12 md:space-y-0">
        <Bank image={redxamLogo} name="redxam" rate="5" />
        {country === 'US' ? americanBanks : uaeBanks}
      </div>
    </section>
  );
};

interface BankProps {
  image: StaticImageData;
  name: string;
  rate: string;
}

const Bank: NextPage<BankProps> = ({ image, name, rate }) => (
  <div className="flex flex-col items-center">
    <Image src={image} alt={name} width="60" height="60" />
    <div className="flex flex-col items-center">
      <span className="font-semibold text-2xl leading-7 text-black text-opacity-80 my-4 font-secondary dark:text-white">
        {name}
      </span>
      <span className="text-4xl leading-10 text-lighter-black dark:text-gray-200 tracking-[-0.04em] text-opacity-60 font-secondary font-medium">
        {rate}%
      </span>
    </div>
  </div>
);

export default Banks;
