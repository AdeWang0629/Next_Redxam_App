import type { NextComponentType } from "next";
import Image from "next/image";
import Link from "next/link";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import Logo from "@public/logo.svg";

const Navbar: NextComponentType = () => {
  let [navMobile, setNavMobile] = useState(false);
  return (
    <nav
      className="py-6 z-10 bg-white fixed w-full top-0"
      style={{
        boxShadow: "0 2px 2px -2px rgb(0 0 0 / 20%)",
      }}
    >
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto items-center">
        <div className="flex items-center justify-between flex-1 w-full px-8 md:px-0">
          <div className="flex items-center md:flex-1">
            <Image src={Logo} alt="redxam logo" />
            <h2 className="ml-4 font-medium text-2xl text-lighter-black">
              redxam
            </h2>
          </div>
          <div className="md:hidden md:flex-1 flex relative justify-center items-center w-5 h-5 cursor-pointer transition-all duration-500 ease-in-out">
            <button
              className={`w-5 h-5 rounded-md transition-all duration-500 ease-in-out before:absolute before:w-5 before:h-[2px] before:bg-black before:rounded-md before:transition-all before:duration-500 before:ease-in-out after:absolute after:w-5 after:h-[2px] after:bg-black after:rounded-md after:transition-all after:duration-500 after:ease-in-out before:transform before:translate-y-[-6px] after:transform after:translate-y-[6px] ${
                navMobile
                  ? "transform bg-transparent before:transform before:rotate-45 after:transform after:-rotate-45 before:translate-x-[0px] before:translate-y-[0px] after:translate-x-[0px] after:translate-y-[0px]"
                  : ""
              }`}
              onClick={() => setNavMobile((prev) => !prev)}
            ></button>
          </div>
        </div>
        <div
          className={`flex flex-row justify-end items-center flex-[2] ${
            !navMobile
              ? "hidden md:flex"
              : "flex-col items-center justify-center"
          }`}
        >
          <ul className="flex flex-col md:flex-row text-center font-primary text-black text-[15px]">
            <li className="mt-[25px] md:mt-0 md:mr-[50px]">
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li className="mt-[25px] md:mt-0 md:mr-[50px]">
              <Link href="/#benefits">
                <a>Benefits</a>
              </Link>
            </li>
            <li className="mt-[25px] md:mt-0 md:mr-[50px]">
              <Link href="/#security">
                <a>Security</a>
              </Link>
            </li>
            <li className="mt-[25px] md:mt-0 md:mr-[50px]">
              <button>Login</button>
            </li>
          </ul>
          <button className="font-primary text-[15px] px-16 py-4 font-bold text-center rounded-[30px] bg-buttons-green order-first md:order-none mt-[25px] md:mt-0">
            Join Waitlist!
          </button>
          <button className="flex items-center justify-center md:ml-[50px] order-first md:order-none mt-[25px] md:mt-0">
            <FontAwesomeIcon icon={faMoon} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
