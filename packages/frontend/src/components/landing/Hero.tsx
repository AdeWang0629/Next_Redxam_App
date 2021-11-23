import type { NextComponentType } from "next";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WaitlistModel from "@components/models/WaitlistModel";

import MouseIcon from "@public/icons/mouse.svg";
import HeroImage from "@public/images/hero.svg";

const Hero: NextComponentType = () => {
  const [waitlistModelOpened, setWaitlistModelOpened] = useState(false);

  return (
    <>
      <section className="max-w-7xl px-16 md:px-0 mx-auto flex flex-col items-center mt-40 mb-72">
        <h1 className="text-5xl md:text-7xl leading-tight mb-10 text-center font-bold text-lighter-black">
          Your Personal Crypto Investment Assistant. Worry-Free Crypto Holdings.
        </h1>
        <p className="font-primary text-[1.0625rem] max-w-[43.0625rem] mb-[1.875rem] text-center text-black text-opacity-80">
          redxam is changing the way the world moves and embraces
          cryptocurrencies, a gateway to more and better business creating a
          financial solutions platform to make cryptocurrency purchases simple
          and user-friendly.
        </p>
        <button className="font-primary text-[15px] w-[15rem] py-3.5 font-bold text-center rounded-[30px] mb-10 bg-buttons-green" onClick={() => setWaitlistModelOpened(true)}>
          Join the Waitlist
        </button>
        <Link href="/#benefits" shallow scroll>
          <Image src={MouseIcon} alt="scroll" />
        </Link>
        <Image src={HeroImage} alt="screenshots from the app" />
      </section>
      {waitlistModelOpened && (
        <WaitlistModel
          isOpened={waitlistModelOpened}
          setOpened={setWaitlistModelOpened}
        />
      )}
    </>
  );
};

export default Hero;
