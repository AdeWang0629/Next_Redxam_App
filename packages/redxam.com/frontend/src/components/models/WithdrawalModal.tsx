/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/naming-convention */
import type { NextPage } from 'next';
import { useRef, useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import api from '@utils/api';
import { UserContext } from '@providers/User';

import IconButton from '@components/dashboard/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomSelect from '@components/dashboard/CustomSelect';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TimesIcon from '@public/icons/times.svg';
import RedxamLogo from '@public/images/circular-white-redxam-logo.svg';

interface WithdrawalModelProps {
  isOpened: boolean;
  setOpened: (isOpened: boolean) => void;
  accounts: [
    {
      _id: string;
      id: string;
      name: string;
      logo?: string | undefined;
      type: string;
    }
  ];
  paymentApi: string;
}

const WithdrawalModel: NextPage<WithdrawalModelProps> = ({
  isOpened,
  setOpened,
  accounts,
  paymentApi
}) => {
  const { user } = useContext(UserContext);

  let userId = '';
  let userBalance = 0;
  if (user) {
    userId = user._id;
    userBalance = user.balance;
  }

  const outsideContainerRef = useRef(null);
  const [selectedAccount, setSelectedAccount] = useState<{
    _id: string;
    id: string;
    name: string;
    logo?: string | undefined;
    type: string;
  }>(accounts[0]);
  const [value, setValue] = useState<number>(0);
  const [withdrawalLoading, setWithdrawalLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isOpened) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = 'auto';
  }, [isOpened]);

  function handleOutsideClick(event: any) {
    if (outsideContainerRef.current === event.target) {
      setOpened(false);
      document.body.style.overflow = 'auto';
    }
  }

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const withdrawal = async () => {
    setWithdrawalLoading(true);

    switch (paymentApi) {
      case 'TELLER':
        // alert('withdraw request');
        await api.requestWithdrawal(userId, 'hello@redxam.com', value);
        break;
      default:
        break;
    }

    setOpened(false);
  };

  return (
    <div className="bg-black bg-opacity-75 absolute top-0 left-0 h-[200%] w-screen z-50">
      <div
        className="flex flex-col justify-center items-center h-screen w-screen"
        ref={outsideContainerRef}
        onClick={handleOutsideClick}
        role="dialog"
      >
        <div className="flex flex-col justify-center bg-white rounded-[30px] w-[92%] md:w-1/2 pb-8">
          <div className="flex items-center justify-between p-8">
            <h1 className="font-secondary font-medium text-black text-lg">
              Withdrawal
            </h1>
            <button
              onClick={() => {
                setOpened(false);
                document.body.style.overflow = 'auto';
              }}
            >
              <IconButton buttonText="" buttonIcon={TimesIcon} />
            </button>
          </div>
          <hr />

          <div className="flex flex-col items-center pt-10 xl:px-32">
            <div className="flex flex-col xl:flex-row items-center">
              <div className="flex rounded-3xl border p-6 min-w-[15.0625rem]">
                <Image
                  src={RedxamLogo}
                  className="rounded-full"
                  width="40px"
                  height="40px"
                />
                <div className="flex flex-col justify-center ml-5">
                  <h2 className="font-secondary text-sm font-medium text-card-button">
                    Redxam Wallet
                  </h2>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="my-4 xl:my-0 xl:mx-8 w-[20px]"
              />
              <CustomSelect
                accounts={accounts}
                value={selectedAccount}
                setValue={setSelectedAccount}
              />
            </div>

            <div className="bg-[#fafafa] rounded-3xl p-8 flex flex-col items-center w-full mt-8">
              <div className="flex flex-row font-secondary font-bold text-[2.625rem] px-auto">
                <span className="text-card-button">$</span>
                <input
                  className="font-secondary font-bold bg-transparent text-center appearance-none border-none outline-none"
                  value={`${numberWithCommas(value)}`}
                  style={{ width: `${value.toString().length}ch` }}
                  onChange={({ target }) => {
                    let newValue = +target.value.replace(/[^0-9]/g, '');
                    const limit = userBalance;
                    if (newValue > limit) newValue = limit;
                    setValue(newValue);
                  }}
                />
                <span>.00</span>
              </div>
              <span className="font-secondary text-sm text-[#95989B]">
                Enter amount you want to withdrawal of $20 or greater
              </span>
            </div>

            <button
              className="w-2/3 mx-auto bg-card-button rounded-[50px] py-4 px-16 mt-10 font-secondary font-medium text-white transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                boxShadow:
                  '0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)'
              }}
              disabled={value < 20 || withdrawalLoading}
              onClick={withdrawal}
            >
              {withdrawalLoading ? 'Processing' : 'Withdraw'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModel;
