/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import tdbankIcon from '@public/icons/banks/tdbank200.png';
import bankofamericaIcon from '@public/icons/banks/boa200.png';
import bankIcon from '@public/icons/bank.svg';

interface CustomSelectProps {
  accounts: [
    {
      _id: string;
      id: string;
      name: string;
      logo?: string | undefined;
      type: string;
    }
  ];
  value: {
    _id: string;
    id: string;
    name: string;
    logo?: string | undefined;
    type: string;
  };
  setValue: (newValue: any) => void;
}

const CustomSelect: NextPage<CustomSelectProps> = ({
  accounts,
  value,
  setValue
}) => {
  const [showOptions, setShowOptions] = useState(false);

  function handleOptionClick(account: {
    _id: string;
    id: string;
    name: string;
    logo?: string | undefined;
    type: string;
  }) {
    setValue(account);
    setShowOptions(prevState => !prevState);
  }

  return (
    <div>
      <div onClick={() => setShowOptions(prevState => !prevState)} role="list">
        <div className="flex flex-col rounded-3xl border px-6 pt-6 pb-3 min-w-[15.0625rem]">
          <div className="flex cursor-pointer">
            <Image
              src={
                value.name.includes('TD')
                  ? tdbankIcon
                  : value.name.includes('America')
                  ? bankofamericaIcon
                  : bankIcon || `data:image/png;base64,${value?.logo}`
              }
              className="rounded-full"
              width="40px"
              height="40px"
            />
            <div className="flex flex-col justify-center ml-5">
              <h2 className="font-secondary text-sm font-medium">
                {value.name}
              </h2>
              <h3 className="font-secondary text-xs mt-1.5 text-palette-gray first-letter:uppercase">
                {value.type}
              </h3>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center cursor-pointer">
            <span className="font-secondary italic text-[#98A3AA] text-xs">
              Click to select bank account
            </span>
            <FontAwesomeIcon
              icon={faChevronDown as IconProp}
              className="ml-2 text-[#98A3AA] w-[15px]"
            />
          </div>
        </div>
      </div>
      {showOptions && (
        <div
          className="flex flex-col overflow-y-auto overflow-x-hidden rounded-3xl absolute z-50 bg-light-gray"
          id="deposit-banks-list"
          style={{ boxShadow: '0px 12px 60px rgba(0, 0, 0, 0.12)' }}
        >
          <button
            className="border-b flex items-center justify-center underline py-3 font-secondary"
            onClick={() => setShowOptions(false)}
          >
            Cancel
          </button>
          {accounts.map(account => (
            <div
              className="flex border-b p-6 min-w-[15.0625rem] cursor-pointer"
              key={account._id}
              onClick={() => handleOptionClick(account)}
              role="listitem"
            >
              <Image
                src={
                  account.name.includes('TD')
                    ? tdbankIcon
                    : value.name.includes('America')
                    ? bankofamericaIcon
                    : bankIcon || `data:image/png;base64,${account?.logo}`
                }
                className="rounded-full"
                width="40px"
                height="40px"
              />
              <div className="flex flex-col justify-center ml-5">
                <h2 className="font-secondary text-sm font-medium">
                  {account.name}
                </h2>
                <h3 className="font-secondary text-xs mt-1.5 text-palette-gray first-letter:uppercase">
                  {account.type}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
