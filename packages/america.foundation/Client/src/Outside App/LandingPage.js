import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import WhiteLogo from "../americafoundation_map_black.svg";
import { Link } from "react-router-dom";
import Footer from "./LandingPage/Footer";

function LandingPage() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="landing_page">
      {showDropdown && (
        <div className="wwo_dropdown_list">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </div>
      )}
      <div className="landing_page_header">
        <div className="landing_page_header_container">
          <div className="landing_page_header_logo_container">
            <div className="landing_page_header_logo">
              <h2>America Foundation</h2>
              <img src={WhiteLogo} />
            </div>
            <div className="landing_header_item">
              <div
                className="landing_header_wwo_option"
                onClick={toggleDropdown}
              >
                What we offer
              </div>
              <div className="landing_wwo_svg">
                <svg height="6" width="10" viewBox="-1 1 13 5">
                  <path d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z" />
                </svg>
              </div>
            </div>
            <div className="landing_header_item">
              <div className="landing_header_option">Learn</div>
            </div>
            <div className="landing_header_item">
              <div className="landing_header_option">Support</div>
            </div>
          </div>

          <div className="landing_page_header_entry">
            <div className="landing_page_login">
              <Link to="/LogIn">Log in</Link>
            </div>
            <div className="entry_space"></div>
            <div className="landing_page_signup">
              <Link to="/SignUp">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="landing_page_body" style={{ paddingTop: "65px" }}>
        <div className="landing_page_body_container">
          <h1 className="verification_h1">
            This is a Page in Development for verification please access our old
            Website
          </h1>
          <a
            href="https://luciaqb8.wixsite.com/newaf
"
            style={{ fontSize: "50px" }}
          >
            Click here!
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
