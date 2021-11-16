import type { NextPage } from "next";
import Particles from "react-particles-js";
import Navbar from "@components/global/Navbar";
import Hero from "@components/landing/Hero";
import WhyUs from "@components/landing/WhyUs";
import Starting from "@components/landing/Starting";
import Relax from "@components/landing/Relax";
import Calculate from "@components/landing/Calculate";
import Banks from "@components/landing/Banks";
import Plan from "@components/landing/Plan";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Particles
        params={{
          particles: {
            number: {
              value: 12,
            },
            color: {
              value: ["#219653", "#CA7795", "#A0DDFF", "#ACE96B"],
            },
            opacity: {
              value: 0.9,
            },
            size: {
              value: 10,
              random: false,
            },
            line_linked: {
              enable: false,
            },
            move: {
              speed: 0.6,
            },
          },
        }}
        style={{
          zIndex: 0,
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
        }}
      />
      <Hero />
      <WhyUs />
      <Starting />
      <Relax />
      <Calculate />
      <Banks />
      <Plan />
    </>
  );
};

export default Home;
