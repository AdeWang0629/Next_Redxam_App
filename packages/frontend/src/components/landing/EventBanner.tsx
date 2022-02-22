import type { NextComponentType } from 'next';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const EventBanner: NextComponentType = () => {
  const timestamp = 1647414000000;
  const defaultRemainingTime = {
    seconds: 0,
    minutes: 0,
  };
  const [remainingTime, setRemainingTime] =
    useState<{ seconds: number; minutes: number }>(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(timestamp);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timestamp]);

  const updateRemainingTime = (
    newTimestamp: string | number | Date | dayjs.Dayjs | null | undefined,
  ) => {
    const timestampDayJs = dayjs(newTimestamp);
    const nowDayJs = dayjs();
    const seconds = timestampDayJs.diff(nowDayJs, 'seconds') % 60;
    const minutes = timestampDayJs.diff(nowDayJs, 'minutes') % 60;
    setRemainingTime({ seconds, minutes });
  };

  return (
    <>
      <section className="md:w-1/2 px-16 md:px-0 mx-auto flex justify-center items-center mt-40 flex-col md:flex-row">
        <div
          className="w-full md:w-[70%] p-4 md:p-5 uppercase font-primary font-black text-[24px] font-bold text-center rounded-full bg-buttons-green mb-6 md:mb-0 md:mr-6"
          style={{ fontFamily: 'Montserrat' }}
        >
          1pm podcast on clubhouse 👋!
        </div>
        <div className="text-center flex flex-col items-center justify-center">
          <div className="flex font-black" style={{ fontFamily: 'Montserrat' }}>
            <div className="mx-2 flex flex-col">
              <span className="text-2xl">0</span>
              <span className="text-sm">DAYS</span>
            </div>
            <div className="mx-2 flex flex-col">
              <span className="text-2xl">0</span>
              <span className="text-sm">HOURS</span>
            </div>
            <div className="mx-2 flex flex-col">
              <span className="text-2xl">{remainingTime.minutes}</span>
              <span className="text-sm">MINUTES</span>
            </div>
            <div className="mx-2 flex flex-col">
              <span className="text-2xl">{remainingTime.seconds}</span>
              <span className="text-sm">SECONDS</span>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center text-2xl font-bold text-[#000] mt-6 hover:text-[#ACE96B] ease-in-out duration-150">
        <a
          href="https://www.clubhouse.com/room/xLB7kzBW?utm_medium=ch_event&utm_campaign=HzRavtHkM8dwZC_1Ne5PBg-66524"
          target="_blank"
          rel="noreferrer"
        >
          - CLICK HERE TO JOIN -
        </a>
      </div>
    </>
  );
};

export default EventBanner;
