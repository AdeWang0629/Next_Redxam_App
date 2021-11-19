import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@components/global/Navbar";
import Footer from "@components/global/Footer";
import Switcher from "@components/global/Switcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import MouseIcon from "@public/icons/mouse.svg";

import HeroImage1 from "@public/images/careers/hero-img1.png";
import HeroImage2 from "@public/images/careers/hero-img2.png";
import HeroImage3 from "@public/images/careers/hero-img3.png";
import HeroImage4 from "@public/images/careers/hero-img4.png";
import MissionImage from "@public/images/careers/mission-img.png";

const Careers: NextPage = () => {
  let [activeGreenBox, setActiveGreenBox] = useState(0);
  let [activeJob, setActiveJob] = useState(-1);

  let greenBoxes = [
    {
      id: 1,
      title: "Customer\nCommitment",
      content:
        "we develop long lasting relationships that make a positive difference in our customers’ lives and their financial statements.",
    },
    {
      id: 2,
      title: "Quality",
      content:
        "we provide outstanding products and unsurpassed service that, together, deliver premium value to our customers.",
    },
    {
      id: 3,
      title: "Integrity",
      content:
        "we uphold the highest standards of integrity in all of our actions.",
    },
    {
      id: 4,
      title: "Team Work",
      content:
        "we work together, across boundaries, to meet the needs of our customer and to help the company win.",
    },
  ];

  let openJobs = [
    {
      title: "Product Designers",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi necessitatibus excepturi, optio laudantium ab tempora ipsa. Harum dolores molestiae nam doloremque atque fuga reiciendis, neque suscipit, officiis perferendis cumque ducimus?",
    },
    {
      title: "Front end developer",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi necessitatibus excepturi, optio laudantium ab tempora ipsa. Harum dolores molestiae nam doloremque atque fuga reiciendis, neque suscipit, officiis perferendis cumque ducimus?",
    },
    {
      title: "Back end developer",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi necessitatibus excepturi, optio laudantium ab tempora ipsa. Harum dolores molestiae nam doloremque atque fuga reiciendis, neque suscipit, officiis perferendis cumque ducimus?",
    },
    {
      title: "Graphics guy",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi necessitatibus excepturi, optio laudantium ab tempora ipsa. Harum dolores molestiae nam doloremque atque fuga reiciendis, neque suscipit, officiis perferendis cumque ducimus?",
    },
  ];

  return (
    <>
      <Navbar />
      <Switcher activePage="careers" />
      <section className="flex flex-col items-center justify-center max-w-7xl mx-auto h-full px-4 md:px-0 mb-8">
        <h1 className="text-5xl md:text-7xl tracking-[-0.05em] font-secondary mb-10 font-bold text-lighter-black mt-16 leading-[1.2] text-center w-full md:max-w-[62.5rem]">
          We&apos;re on a mission to make Investing comfortable for everyone.
        </h1>

        <p className="text-black font-primary text-[1.0625rem] max-w-[43.0625rem] mb-[1.875rem] text-center text-opacity-80">
          Redxam is changing the way the world moves and embraces
          cryptocurrencies, a gateway to more and better business creating a
          financial solutions platform to make cryptocurrencies purchase simple
          and user-friendly.
        </p>

        <Link href="/careers#jobs" shallow scroll>
          <a className="bg-buttons-green py-5 px-16 rounded-full font-secondary mb-10">
            View Job Opening
          </a>
        </Link>
        <Link href="/careers#mission" shallow scroll>
          <Image src={MouseIcon} alt="Scroll Down" />
        </Link>
      </section>
      <section
        className="grid grid-cols-3 grid-rows-2 gap-8 my-8 px-4 md:px-0"
        style={{
          gridTemplateRows: "301px 179px",
        }}
      >
        <div className="row-span-2 h-full flex careers-image">
          <Image
            src={HeroImage1}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="col-span-2 h-full w-full flex careers-image">
          <Image
            src={HeroImage2}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <Image src={HeroImage3} alt="" className="object-cover w-full h-full" />
        <Image src={HeroImage4} alt="" className="object-cover w-full h-full" />
      </section>
      <section
        className="pt-48 pb-72 flex flex-col md:flex-row justify-center items-start max-w-7xl mx-auto px-4 md:px-0"
        id="mission"
      >
        <div className="mr-24 w-full">
          <Image src={MissionImage} alt="" />
        </div>
        <div className="max-w-[26.875rem] mt-12 md:mt-0">
          <h2 className="mb-4 text-center md:text-left text-3xl md:text-5xl leading-normal font-bold tracking-[-0.03em] text-lighter-black self-start font-secondary">
            Our Mission
          </h2>
          <p className="text-black font-primary text-[0.9375rem] max-w-[43.0625rem] mb-5 text-left text-opacity-80">
            Redxam is changing the way the world moves and embraces
            cryptocurrencies, a gateway to more and better business creating a
            financial solutions platform to make cryptocurrencies purchase
            simple and user-friendly.
          </p>
          <p className="text-black font-primary text-[0.9375rem] max-w-[43.0625rem] mb-5 text-left text-opacity-80">
            With redxam you have the certainty of being in good hands. Our
            technological platform presents a clear, transparent set of rules
            because your peace of mind is our peace of mind.
          </p>
          <p className="text-black font-primary text-[0.9375rem] max-w-[43.0625rem] mb-5 text-left text-opacity-80">
            You can count on an experienced support team that assists you
            instantly because we want you to feel that we are there for you, and
            to advise you well is our greatest desire.
          </p>
          <p className="text-black font-primary text-[0.9375rem] max-w-[43.0625rem] mb-5 text-left text-opacity-80">
            Move your money around the world in a simple and fast way, without
            complications, always looking for a customized solution. Your
            journey to financial freedom awaits with redxam.
          </p>
        </div>
      </section>
      <section className="flex flex-col max-w-7xl mx-auto px-4 md:px-0">
        <h4 className="mb-7 text-[1.0625rem] font-medium uppercase text-[#828282] tracking-[0.3em]">
          MISSION AND VISION
        </h4>
        <h2 className="w-full md:w-[22.875rem] self-start text-left text-3xl md:text-[2.8125rem] leading-normal text-lighter-black font-secondary font-bold mb-3.5">
          We call it the Green Box Values
        </h2>
        <p className="font-primary text-lg w-full md:w-[64.0625rem] text-black text-opacity-80 leading-[1.8] mb-5">
          Our mission is to provide financial freedom so that people can save,
          send and receive money without hassle, even in countries where
          disposing of your hard-earned money is difficult.
        </p>
        <p className="font-primary text-lg w-full md:w-[64.0625rem] text-black text-opacity-80 leading-[1.8]">
          We also add value with active portfolio management while maximizing
          our client’s ROI. because we understand that ROI is King. Bottom
          line!... We use the best minds to create smart algorithms that
          maximize your ROI. Together we accomplish your long-term financial
          goals. never available before in such fashion.
        </p>

        <div className="flex flex-col md:flex-row space-x-0 md:space-x-6 space-y-6 md:space-y-0 mt-16">
          {greenBoxes.map((greenBox) => (
            <div
              key={`greenBox${greenBox.id}`}
              className="flex flex-col group hover:scale-110 justify-center bg-white hover:bg-darker-primary border border-[#333333] hover:border-darker-primary rounded-[30px] py-10 px-8 opacity-50 hover:opacity-100 h-full md:h-[21.0625rem] transition-all duration-500"
              onMouseEnter={() => setActiveGreenBox(greenBox.id)}
              onMouseLeave={() => setActiveGreenBox(0)}
            >
              <span
                className="text-4xl font-medium font-primary mb-3 text-white group-hover:text-darker-primary text-opacity-80"
                style={{
                  WebkitTextStroke:
                    activeGreenBox === greenBox.id ? "1px #fff" : "1px #000",
                }}
              >
                {greenBox.id}
              </span>
              <h3 className="text-4xl leading-10 tracking-[-0.04em] font-medium mb-3 text-[#333333] group-hover:text-white font-secondary">
                {greenBox.title}
              </h3>
              <p className="font-primary text-[0.9375rem] leading-normal text-[#333333] group-hover:text-white w-[14.75rem] font-normal text-opacity-80">
                {greenBox.content}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="flex flex-col items-center px-4 md:px-0 max-w-7xl mx-auto pt-24 pb-48"
        id="jobs"
      >
        <h2 className="mb-[6.25rem] text-center text-3xl md:text-5xl leading-normal font-bold tracking-[-0.03em] text-lighter-black font-secondary">
          Job openings at redxam
        </h2>

        <div className="flex flex-col items-center w-full">
          {openJobs.map((job, idx) => (
            <div
              className="flex flex-col w-full md:w-[63.75rem] py-4 px-4 md:px-16 bg-[#F6F6FA] rounded-[30px] mb-8 transition-all duration-500"
              key={"job" + idx}
            >
              <div
                className="flex flex-row justify-between items-center cursor-pointer transition-all duration-500"
                onClick={() =>
                  setActiveJob((prev) => (prev === idx ? -1 : idx))
                }
              >
                <span className="text-2xl leading-10 w-auto font-primary font-medium text-black text-opacity-50 tracking-[-0.04em]">
                  {job.title}
                </span>
                <FontAwesomeIcon
                  className={`text-4xl text-black text-opacity-50 ml-1 ${
                    activeJob === idx ? "animate-flip transform rotate-180" : ""
                  }`}
                  icon={faAngleDown}
                />
              </div>
              <p
                className={`leading-[1.8] font-primary text-black text-opacity-80 pt-7 ${
                  activeJob === idx ? "animate-fade-in-down" : "hidden"
                }`}
              >
                {job.content}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Careers;
