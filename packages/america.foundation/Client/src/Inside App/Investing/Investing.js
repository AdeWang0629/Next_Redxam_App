import React, { useState } from "react";
import Newsfeed from "./Newsfeed";
import Stats from "./Stats";

function Investing() {
  const { render, agriculture_doc } = Newsfeed();

  return (
    <div className="app_body" style={{ paddingTop: "65px" }}>
      <div className="app_container">
        {render}

        <Stats {...{ agriculture_doc }} />
      </div>
    </div>
  );
}

export default Investing;
