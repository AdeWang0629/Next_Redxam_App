import type { NextPage } from 'next';
import { useEffect, useRef, ReactNode } from 'react';
import IconButton from '@components/dashboard/IconButton';

import TimesIcon from '@public/icons/times.svg';

interface KYCModelProps {
  isOpened: boolean;
  setOpened: (isOpened: boolean) => void;
  children: ReactNode;
}

const KYCModel: NextPage<KYCModelProps> = ({
  isOpened,
  setOpened,
  children
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
            Complete KYC Verification
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
        <div className="flex flex-col max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default KYCModel;
