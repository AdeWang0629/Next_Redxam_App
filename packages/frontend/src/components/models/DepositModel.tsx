import type { NextPage } from "next";
import { useRef, useEffect, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import api from "@utils/api";
import { usePlaidLink } from "react-plaid-link";

import IconButton from "@components/dashboard/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomSelect from "@components/dashboard/CustomSelect";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import TimesIcon from "@public/icons/times.svg";
import RedxamLogo from "@public/images/circular-white-redxam-logo.svg";

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
}

const DepositModel: NextPage<DepositModelProps> = ({
  isOpened,
  setOpened,
  accounts,
}) => {
  const outsideContainerRef = useRef(null);
  const [selectedAccount, setSelectedAccount] = useState<{
    _id: string;
    id: string;
    name: string;
    logo?: string | undefined;
    type: string;
  }>(accounts[0]);
  const [value, setValue] = useState<number>(10);
  const [depositLoading, setDepositLoading] = useState<boolean>(false);
  const [updateToken, setUpdateToken] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpened) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
      console.log("hi");
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";
  }, [isOpened]);

  function handleOutsideClick(event: any) {
    if (outsideContainerRef.current == event.target) {
      setOpened(false);
      document.body.style.overflow = "auto";
    }
  }

  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function deposit() {
    let confirmation = confirm(
      `Are you sure you want to deposit $${value} from ${selectedAccount.name}?`
    );
    if (!confirmation) return;

    setDepositLoading(true);

    api
      .deposit(selectedAccount.id, value)
      .then((res) => {
        if (res?.data?.type === "UPDATE_REQUIRED") {
          return setUpdateToken(res.data.token);
        } else {
          alert("Deposit successful!");
          setOpened(false);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error?.response?.data?.message || "An error occurred!");
      })
      .finally(() => setDepositLoading(false));
  }

  return (
    <>
      <div
        className="flex flex-col justify-center items-center bg-black bg-opacity-75 absolute top-0 left-0 h-full w-full z-50"
        ref={outsideContainerRef}
        onClick={handleOutsideClick}
      >
        <div className="flex flex-col justify-center bg-white rounded-[30px] w-3/4 md:w-1/2 pb-8">
          <div className="flex items-center justify-between p-8">
            <h1 className="font-secondary font-medium text-black text-lg">
              Deposit
            </h1>
            <button
              onClick={() => {
                setOpened(false);
                document.body.style.overflow = "auto";
              }}
            >
              <IconButton buttonText="" buttonIcon={TimesIcon} />
            </button>
          </div>
          <hr />

          <div className="flex flex-col items-center pt-10 px-32">
            <div className="flex items-center">
              <CustomSelect
                accounts={accounts}
                value={selectedAccount}
                setValue={setSelectedAccount}
              />
              <FontAwesomeIcon icon={faArrowRight} className="mx-8" />
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
                  style={{ width: value.toString().length + "ch" }}
                  onChange={({ target }) => {
                    const value = +target.value.replace(/[^0-9]/g, "");
                    setValue(value);
                  }}
                />
                <span>.00</span>
              </div>
              <span className="font-secondary text-sm text-[#95989B]">
                Enter amount you want to deposit
              </span>
            </div>

            <button
              className="w-2/3 mx-auto bg-card-button rounded-[50px] py-4 px-16 mt-10 font-secondary font-medium text-white transition-opacity duration-300 hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                boxShadow:
                  "0px 20px 13px rgba(56, 176, 0, 0.1), 0px 8.14815px 6.51852px rgba(56, 176, 0, 0.05), 0px 1.85185px 3.14815px rgba(56, 176, 0, 0.025)",
              }}
              disabled={value < 10 || depositLoading}
              onClick={deposit}
            >
              Deposit
            </button>
          </div>
        </div>
      </div>
      {updateToken?.length ? (
        <PlaidUpdate
          token={updateToken}
          setToken={setUpdateToken}
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
  deposit,
}) => {
  const { open } = usePlaidLink({
    onSuccess: () => {
      setToken("");
      deposit();
    },
    token,
    countryCodes: ["US", "CA", "GB", "IE", "FR", "ES", "NL"],
    env: process.env.NODE_ENV === "development" ? "sandbox" : "development",
  });

  if (token.length) open();

  return null;
};

export default DepositModel;