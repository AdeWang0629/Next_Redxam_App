import type { NextPage } from "next";
import Navbar from "@components/global/Navbar";
import Hero from "@components/landing/Hero";
import WhyUs from "@components/landing/WhyUs";
import Starting from "@components/landing/Starting";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <WhyUs />
      <Starting />
    </>
  );
};

export default Home;
