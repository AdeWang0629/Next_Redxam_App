import type { NextPage } from "next";
import Script from "next/script";
import Particles from "react-particles-js";
import Navbar from "@components/global/Navbar";
import Hero from "@components/landing/Hero";
import WhyUs from "@components/landing/WhyUs";
import Starting from "@components/landing/Starting";
import Relax from "@components/landing/Relax";
import Calculate from "@components/landing/Calculate";
import Banks from "@components/landing/Banks";
import Plan from "@components/landing/Plan";
import FAQ from "@components/landing/FAQ";
import Newsletter from "@components/landing/Newsletter";
import Footer from "@components/global/Footer";
import { GetStaticProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    return { props: {} };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "hero",
        "whyus",
        "starting",
        "relax",
        "calculate",
        "banks",
        "plan",
        "faq",
      ])),
    },
  };
};

const Home: NextPage = () => {
  return (
    <>
      <Navbar title="Your Personal Crypto Investment Assistant" />
      <Particles
        params={{
          particles: {
            number: {
              value: 8,
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
          zIndex: -100,
          position: "fixed",
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
      <FAQ />
      <Newsletter />
      <Footer />
      <Script id="tawk">
        {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/61b7abd780b2296cfdd182fe/1fmqnegga';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();`}
      </Script>
    </>
  );
};

export default Home;
