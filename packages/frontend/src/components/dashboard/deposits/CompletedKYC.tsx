import { NextPage } from 'next';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import StartKYCImage from '@public/images/dashboard/deposits/startkyc.svg';
import Card from '../Card';

interface CompletedKYCProps {
  setShowKYC: Dispatch<SetStateAction<boolean>>;
}

const CompletedKYC: NextPage<CompletedKYCProps> = ({ setShowKYC }) => (
  <Card
    otherClasses="flex flex-col items-center justify-center bg-white mb-8"
    px="px-4"
    py="py-14"
  >
    <Image src={StartKYCImage} alt="" />
    <p className="mt-6 text-lighter-black text-sm text-center max-w-sm">
      Your KYC verification is done, click the button below to check the
      status.
    </p>
    <button
      className="bg-card-button rounded-[50px] py-4 px-16 mt-14 font-secondary font-medium text-white transition-opacity duration-300 hover:opacity-70"
      onClick={() => setShowKYC(true)}
      style={{
        boxShadow:
            '0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)'
      }}
    >
      Check KYC status
    </button>
  </Card>
);

export default CompletedKYC;
