import type { NextPage } from "next";
import Image from "next/image";

import ListBullet from "@public/images/list-bullet.svg";
import RelaxLogo from "@public/images/relax-redxam-logo.png";
import RelaxImage from "@public/images/relax.png";

const Relax: NextPage = () => {
  return (
    <section
      className="max-w-7xl mx-auto flex flex-col pt-24 pb-48 px-4 md:px-0"
      id="security"
    >
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex flex-col flex-1">
          <h2 className="w-full md:w-[600px] self-start text-left tracking-[-0.03em] text-3xl md:text-[2.8125rem] leading-normal text-lighter-black dark:text-gray-200 font-secondary font-bold mb-[3.125rem]">
            Relax while your
            <br /> Money grows with <br />
            Top security
          </h2>
          <div className="flex flex-row items-center mb-8">
            <div>
              <Image src={ListBullet} alt="" />
            </div>
            <div className="flex-1 ml-10">
              <h3 className="mb-2.5 text-4xl text-black dark:text-white text-opacity-80">
                Bank grade security
              </h3>
              <p className="w-full md:w-[390px] text-black dark:text-white text-opacity-80">
                Our payment processors are compliant to ensure optimum security
                of your data
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center mb-8">
            <div>
              <Image src={ListBullet} alt="" />
            </div>
            <div className="flex-1 ml-10">
              <h3 className="mb-2.5 text-4xl text-black dark:text-white text-opacity-80">
                Best in class investment
              </h3>
              <p className="w-full md:w-[390px] text-black dark:text-white text-opacity-80">
                We invest in low risk fixed income securities which include
                treasury bills government bonds, and professionally managed
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <div>
              <Image src={ListBullet} alt="" />
            </div>
            <div className="flex-1 ml-10">
              <h3 className="mb-2.5 text-4xl text-black dark:text-white text-opacity-80">
                Industry best practices
              </h3>
              <p className="w-full md:w-[390px] text-black dark:text-white text-opacity-80">
                We supports a variety of the most popular digital currencies
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={RelaxLogo}
            alt=""
            layout="fixed"
            width="306px"
            height="177px"
          />
          <Image
            src={RelaxImage}
            alt=""
            layout="fixed"
            width="306px"
            height="311px"
          />
        </div>
      </div>
    </section>
  );
};

export default Relax;
