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

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      {/* <Particles
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
      /> */}
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
