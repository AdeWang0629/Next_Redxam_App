import React, { useEffect } from "react";
import TextHero from "./Landing/TextHero";
import hero1 from "./Landing/heros/second-hero1.svg";

import "./Learn.css";

export default function Learn({ title }) {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <>
      <div className="learn-page">
        <div className="learn-title">
          <span>Investing basics</span>
        </div>
        <TextHero
          img={hero1}
          bgColor="rgb(225, 235, 220)"
          title=""
          titleColor="black"
          titleExtended="The building blocks of your financial journey"
          titleExtendedColor="black"
          description="What you need to know about investing from the get-go."
          link=""
          second
        />
      </div>
      <div className="investing-section">
        <p className="title">Investing 101</p>
        <p className="tagline">
          A good place to start. Get the low-down before you dive in.
        </p>
        <div className="invest-questions-section">
          <div className="card">
            <p className="card-title"></p>
          </div>
          <div className="card">
            <p className="card-title"></p>
          </div>
          <div className="card">
            <p className="card-title"></p>
          </div>
        </div>

        <div className="articles">
          <p className="second-title">There's more to learn</p>
          <div className="question">
            Three things to do before you start investing
          </div>
          <div className="question">
            Picking an investment: How to approach analyzing a stock
          </div>
          <div className="btns">
            <div className="btn">See Investing Articles</div>
            <div className="btn">Investor's Guild</div>
          </div>
        </div>
        <div className="invest-questions-section">
          <div className="card">
            <p className="card-title"></p>
          </div>
          <div className="card">
            <p className="card-title"></p>
          </div>
          <div className="card">
            <p className="card-title"></p>
          </div>
        </div>

        <div className="articles">
          <p className="second-title">There's more to learn</p>
          <div className="question">
            Three things to do before you start investing
          </div>
          <div className="question">
            Picking an investment: How to approach analyzing a stock
          </div>
          <div className="btns">
            <div className="btn">See Investing Articles</div>
            <div className="btn">Investor's Guild</div>
          </div>
        </div>
      </div>
      <div className="library-section">
        <div className="library-title">The library</div>
        <div className="library-tagline">
          There’s always more to learn when it comes to investing. Check out our
          entire library.
        </div>
        <div className="library-items">
          <div className="library-item"></div>
          <div className="library-item"></div>
          <div className="library-item"></div>
          <div className="library-item"></div>
        </div>
        <div className="btn">See Library</div>
      </div>
    </>
  );
}
