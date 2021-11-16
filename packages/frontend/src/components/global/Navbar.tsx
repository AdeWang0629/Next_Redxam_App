import type { NextComponentType } from "next";
import Image from "next/image";
import Link from "next/link";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from "@public/logo.svg";

const Navbar: NextComponentType = () => {
  return (
    <nav
      className="py-6 z-10 bg-white fixed w-full top-0"
      style={{
        boxShadow: "0 2px 2px -2px rgb(0 0 0 / 20%)",
      }}
    >
      <div className="flex flex-row max-w-7xl mx-auto items-center">
        <div className="flex flex-1">
          <Image src={Logo} alt="redxam logo" />
          <h2 className="ml-4 font-medium text-2xl text-lighter-black">
            redxam
          </h2>
        </div>
        <div className="flex justify-end items-center flex-[2]">
          <ul className="flex font-primary text-black text-[15px]">
            <li className="mr-[50px]">
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li className="mr-[50px]">
              <Link href="/#benefits">
                <a>Benefits</a>
              </Link>
            </li>
            <li className="mr-[50px]">
              <Link href="/#security">
                <a>Security</a>
              </Link>
            </li>
            <li className="mr-[50px]">
              <button>Login</button>
            </li>
          </ul>
          <button className="font-primary text-[15px] px-16 py-4 font-bold text-center rounded-[30px] bg-buttons-green">
            Join Waitlist!
          </button>
          <button className="flex items-center justify-center ml-[50px]">
            <FontAwesomeIcon icon={faMoon} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
