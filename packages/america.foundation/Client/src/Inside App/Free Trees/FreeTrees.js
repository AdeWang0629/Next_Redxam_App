import React from "react";
import Reward_Description from "./Reward_Description";
import Reward_Referral from "./Reward_Referral";

function FreeTrees() {
  return (
    <div className="app_body" style={{ paddingTop: "65px" }}>
      <div className="app_container">
        <Reward_Description />

        <Reward_Referral />
      </div>
    </div>
  );
}

export default FreeTrees;
