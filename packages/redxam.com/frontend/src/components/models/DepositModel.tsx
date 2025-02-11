/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/naming-convention */
import type { NextPage } from 'next';
import {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useContext
} from 'react';
import Image from 'next/image';
import api from '@utils/api';
import { usePlaidLink } from 'react-plaid-link';
import { UserContext } from '@providers/User';
import { getCookie } from 'cookies-next';

import IconButton from '@components/dashboard/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomSelect from '@components/dashboard/CustomSelect';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TimesIcon from '@public/icons/times.svg';
import RedxamLogo from '@public/images/circular-white-redxam-logo.svg';

interface DepositModelProps {
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
  reloadDeposits: () => Promise<void>;
}

const DepositModel: NextPage<DepositModelProps> = ({
  isOpened,
  setOpened,
  accounts,
  paymentApi,
  reloadDeposits
}) => {
  const { user, setUser } = useContext(UserContext);

  let userId = '';
  if (user) {
    userId = user._id;
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
  const [depositLoading, setDepositLoading] = useState<boolean>(false);
  const [updateToken, setUpdateToken] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isOpened) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = 'auto';
  }, [isOpened]);

  const currentEnvironment =
    typeof window !== 'undefined'
      ? (getCookie('environment') as string) || 'production'
      : 'production';

  function handleOutsideClick(event: any) {
    if (outsideContainerRef.current === event.target) {
      setOpened(false);
      document.body.style.overflow = 'auto';
    }
  }

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const deposit = async () => {
    setDepositLoading(true);

    switch (paymentApi) {
      case 'TELLER':
        const {
          data: {
            data: { tellerPayment }
          }
        } = await api.tellerPayment(
          selectedAccount.id,
          value,
          selectedAccount.name,
          userId
        );

        if (tellerPayment.connect_token) {
          // @ts-ignore typescript does not recognize CDN script types
          const setup = window.TellerConnect.setup({
            environment:
              currentEnvironment === 'production' ? 'production' : 'sandbox',
            connectToken: tellerPayment.connect_token,
            applicationId: 'app_nu123i0nvg249720i8000',
            async onSuccess({ payment: { id } }: any) {
              await api.tellerPaymentVerified(
                id,
                value,
                selectedAccount.name,
                userId
              );
              await reloadDeposits();
              const userData = await api.getUserData();

              setUser(userData.data.user[0]);
            }
          });
          setup.open();
        } else {
          const userData = await api.getUserData();
          setUser(userData.data.data.user[0]);
          await reloadDeposits();
        }
        break;
      case 'LEAN':
        const res = await api.createPaymentIntent(user?._id as string, value);
        const payment_intent_id =
          res.data.data.createPaymentIntent.paymentIntentId;
        // @ts-ignore typescript does not recognize CDN script types
        window.Lean.pay({
          app_token: '94e54b49-973c-47c8-8b11-f0d9bba2c6d5',
          payment_intent_id,
          sandbox: 'true'
        });
        break;
      case 'APPLEPAY': // TODO(max): Add Apple Pay
        break;
      default:
        break;
    }

    setOpened(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
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
                Deposit
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
                {paymentApi !== 'LEAN' && (
                  <>
                    <CustomSelect
                      accounts={accounts}
                      value={selectedAccount}
                      setValue={setSelectedAccount}
                    />
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="my-4 xl:my-0 xl:mx-8 w-[20px]"
                    />
                  </>
                )}

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
              </div>

              <div className="bg-[#fafafa] rounded-3xl p-8 flex flex-col items-center w-full mt-8">
                <div className="flex flex-row font-secondary font-bold text-[2.625rem] px-auto">
                  <span className="text-card-button">$</span>
                  <input
                    className="font-secondary font-bold bg-transparent text-center appearance-none border-none outline-none"
                    value={`${numberWithCommas(value)}`}
                    style={{ width: `${value.toString().length}ch` }}
                    onChange={({ target }) => {
                      const newValue = +target.value.replace(/[^0-9]/g, '');
                      setValue(newValue);
                    }}
                  />
                  <span>.00</span>
                </div>
                <span className="font-secondary text-sm text-[#95989B]">
                  Enter amount you want to deposit of $20 or greater
                </span>
              </div>

              <button
                className="w-2/3 mx-auto bg-card-button rounded-[50px] py-4 px-16 mt-10 font-secondary font-medium text-white transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  boxShadow:
                    '0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)'
                }}
                disabled={value < 20 || depositLoading}
                onClick={deposit}
              >
                {depositLoading ? 'Processing' : 'Deposit'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {updateToken?.length ? (
        <PlaidUpdate
          token={updateToken}
          setToken={setUpdateToken}
          // eslint-disable-next-line react/jsx-no-bind
          deposit={deposit}
        />
      ) : null}
    </>
  );
};
interface PlaidUpdateProps {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  deposit: () => void;
}

const PlaidUpdate: NextPage<PlaidUpdateProps> = ({
  token,
  setToken,
  deposit
}) => {
  const { open } = usePlaidLink({
    onSuccess: () => {
      setToken('');
      deposit();
    },
    token,
    countryCodes: ['US', 'CA', 'GB', 'IE', 'FR', 'ES', 'NL'],
    env: process.env.NODE_ENV === 'development' ? 'sandbox' : 'development'
  });

  if (token.length) open();

  return null;
};

export default DepositModel;
