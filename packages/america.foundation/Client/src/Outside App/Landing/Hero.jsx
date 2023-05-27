import React from "react";
import HeroVideo from "./videos/hero-video.mp4";
import { Link } from "react-router-dom";

import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <video
        width="100%"
        autoPlay
        controlslist="nodownload nofullscreen noremoteplayback"
        muted
        playsinline
        preload="auto"
      >
        <source src={HeroVideo} />
      </video>
      <div className="hero-video-title">Earn up to 50% APY</div>
      <div className="learn-more">
        <Link className="learn-more-item" to="/learn">
          Learn more
        </Link>
      </div>
    </div>
  );
}
