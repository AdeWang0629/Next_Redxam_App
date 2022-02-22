import { NextPage } from 'next';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import FailedKYCImage from '@public/images/dashboard/deposits/failedkyc.svg';
import Card from '../Card';

interface FailedKYCProps {
  setShowKYC: Dispatch<SetStateAction<boolean>>;
}

const FailedKYC: NextPage<FailedKYCProps> = ({ setShowKYC }) => (
  <Card
    otherClasses="flex flex-col items-center justify-center bg-white mb-8"
    px="px-4"
    py="py-14"
  >
    <Image src={FailedKYCImage} alt="" />
    <p className="mt-6 text-lighter-black text-sm text-center max-w-sm">
      There is some issue completing your KYC, please click below to know
      about the problem.
    </p>
    <button
      className="bg-card-button rounded-[50px] py-4 px-16 mt-14 font-secondary font-medium text-white transition-opacity duration-300 hover:opacity-70"
      onClick={() => setShowKYC(true)}
      style={{
        boxShadow:
            '0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)',
      }}
    >
      Check KYC Status
    </button>
  </Card>
);

export default FailedKYC;
