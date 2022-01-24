import Members from "@components/about/Members";
import Navbar from "@components/general/Navbar";
import { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <Navbar title="About" />
      <div className="flex flex-col items-center pt-40 md:mx-28">
        <p className="max-w-lg px-3 text-center opacity-75 text-grayscale-400">
          To help humanity thrive by enabling all teams to work together
          effortlessly. To be Earth’s most customer-centric company, where
          customers can find and discover anything they might want to buy
          online, and endeavors to offer its customers the lowest possible
          prices.
        </p>
        <Members />
      </div>
    </>
  );
};

export default About;
