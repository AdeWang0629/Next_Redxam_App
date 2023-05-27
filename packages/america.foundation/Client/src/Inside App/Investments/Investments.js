import React from "react";
import Agriculture from "./Agriculture";
import Funds from "./Funds";
import "./Investments.css";

function Invesments() {
  return (
    <div className="invesments" style={{ paddingTop: "100px" }}>
      <h1 className="investments_title">Invesments</h1>

      <div className="invesments_container">
        <Agriculture />
        <Funds />
      </div>
    </div>
  );
}

export default Invesments;
