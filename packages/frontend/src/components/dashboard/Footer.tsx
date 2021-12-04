import type { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";

import AnimatedLogo from "@public/images/dashboard/footer-logo2.gif";
import Logo from "@public/images/dashboard/gray-logo.svg";

const Footer: NextPage = () => {
  let [isAnimating, setIsAnimating] = useState(false);

  return (
    <footer className="flex flex-col items-center justify-center p-2">
      <div
        className="flex flex-col justify-center items-center group"
        onMouseEnter={() => setIsAnimating(true)}
        onMouseLeave={() => setIsAnimating(false)}
      >
        <Image
          src={isAnimating ? AnimatedLogo : Logo}
          width={isAnimating ? "22px" : "20px"}
          height={"17.5px"}
          alt="redxam Animated Logo"
        />
        <span className="text-palette-gray group-hover:text-buttons-green font-secondary text-xs mt-1.5">
          redxam
        </span>
      </div>
    </footer>
  );
};

export default Footer;
