import React, { useState } from "react";
import "./Account_Settings_AppAppearance.css";

function AppAppearance(props) {
  return (
    <div className="app_appearance">
      <h1>App Appearance</h1>
      <div className="theme_container">
        <div className="theme">Theme</div>
        <div className="mode">
          <button
            onClick={(e) => {
              e.preventDefault();
              // console.log(props);
              props.setTheme("light");
            }}
            className="mode_button"
          >
            <span className="light">Dark</span>
            <span className="dark">Light</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppAppearance;
