import React, { useEffect } from "react";
import Hero from "./Landing/Hero";
import "./Landing.css";

import hero1 from "./Landing/heros/hero1.png";
import hero2 from "./Landing/heros/hero2.png";
import hero3 from "./Landing/heros/hero3.png";

import investorImg from "./Landing/investor.png";

import preFooterBg from "./Landing/pre-footer-bg.png";

import TextHero from "./Landing/TextHero";

export default function Landing({ title }) {
  let output = []
  let pattern = "100"
  
const numbers = inputData.map(Number)
  if (pattern.test.(numbers)) {

  }
  if (numbers.length !== 0) {
      numbers.replace(pattern,"")

}else {
output.push("yes")
}

  useEffect(() => {
    document.title = title;
  }, []);
  return (
    <>
      <Hero />
      <div className="latest">
        <div className="latest-container">
          <span className="latest-title">Check out our latest</span>
          <div className="article-list">
            <div className="article"></div>
          </div>
        </div>
      </div>
      <TextHero
        img={hero1}
        bgColor="rgb(195, 245, 60)"
        title="Investing"
        titleColor="rgb(0, 200, 5)"
        titleExtended="Build your portfolio starting with just $10"
        titleExtendedColor="black"
        description="Hero description 1"
        link=""
      />
      <TextHero
        img={hero2}
        bgColor="rgb(24, 17, 45)"
        title="Crypto"
        titleColor="rgb(255, 90, 135)"
        titleExtended="Dive right in without the commission fees"
        titleExtendedColor="white"
        description="Hero description 2"
        link=""
      />
      <TextHero
        img={hero3}
        bgColor="rgb(0, 44, 21)"
        title="Retirement"
        titleColor="rgb(195, 245, 60)"
        titleExtended="The only IRA with a match."
        titleExtendedColor="white"
        description="Hero description 3"
        link=""
      />
      <div className="guarantee-section">
        <span className="section-title">AF Protection Guarantee</span>
        <div className="items">
          <div className="item">
            <div className="img"></div>
            <span className="text">
              We work hard to keep your data safe and secure.
            </span>
          </div>
          <div className="item">
            <div className="img"></div>
            <span className="text">
              We work hard to keep your data safe and secure.
            </span>
          </div>
          <div className="item">
            <div className="img"></div>
            <span className="text">
              We work hard to keep your data safe and secure.
            </span>
          </div>
          <div className="item">
            <div className="img"></div>
            <span className="text">
              We work hard to keep your data safe and secure.
            </span>
          </div>
        </div>
      </div>
      <div className="investor-section">
        <span className="section-title">
          Become a better investor on the go, right in the app
        </span>
        <p>Here’s a preview of the things you can learn when you sign up.</p>
        <img className="investor-img" src={investorImg} />
      </div>
      <div
        style={{ background: `url(${preFooterBg})`, backgroundSize: "cover" }}
        className="pre-footer-section"
      >
        <span className="section-title">
          Join a new generation of investors
        </span>
      </div>
    </>
  );
}
