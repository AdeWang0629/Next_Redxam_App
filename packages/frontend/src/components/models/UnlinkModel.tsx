import type { NextPage } from 'next';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

import IconButton from '@components/dashboard/IconButton';

import TimesIcon from '@public/icons/times.svg';
import UnlinkImage from '@public/images/dashboard/deposits/unlink.svg';
import api from '@utils/api';

interface UnlinkModelProps {
  isOpened: boolean;
  setOpened: (isOpened: boolean) => void;
  accounts:
    | []
    | [
        {
          _id: string;
          id: string;
          name: string;
          logo?: string | undefined;
          type: string;
        }
      ];
  IDs: [] | [string];
  fetchAccounts: () => void;
}

const UnlinkModel: NextPage<UnlinkModelProps> = ({
  isOpened,
  setOpened,
  accounts,
  IDs,
  fetchAccounts
}) => {
  const outsideContainerRef = useRef(null);

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

  function unlinkAccounts() {
    const bankAccountsToDeleteIDs = accounts
      // @ts-ignore
      .filter(acc => IDs.includes(acc._id))
      .map(acc => acc.id) as [string];

    api.deleteBankAccounts(bankAccountsToDeleteIDs).then(() => {
      alert('Account(s) unlinked successfully!');
      setOpened(false);
      document.body.style.overflow = 'auto';
      fetchAccounts();
    });
  }

  return (
    <div
      className="flex flex-col justify-center items-center bg-black bg-opacity-75 absolute top-0 left-0 h-full w-full z-50"
      ref={outsideContainerRef}
      onClick={handleOutsideClick}
      role="dialog"
    >
      <div className="flex flex-col justify-center bg-white rounded-[30px] w-3/4 md:w-1/2 pb-8">
        <div className="flex items-center justify-between p-8">
          <h1 className="font-secondary font-medium text-black text-lg">
            Unlink Bank
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
        <div className="flex flex-col items-center py-10 px-32">
          <Image src={UnlinkImage} alt="Unlink" width="324px" />
          <p className="font-secondary text-sm text-lighter-black text-center mt-6">
            Are you sure you want to remove{' '}
            <b>
              {accounts
                // @ts-ignore
                .filter(acc => IDs.includes(acc._id))
                .map(acc => acc.name)
                .join(', ')}
            </b>{' '}
            from your list of added banks?
          </p>
          <button
            className="bg-[#FE4D8D] py-4 px-24 font-secondary text-sm font-medium mt-12 rounded-[50px] text-white transition-opacity duration-300 hover:opacity-70"
            onClick={unlinkAccounts}
          >
            Unlink Bank
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnlinkModel;
