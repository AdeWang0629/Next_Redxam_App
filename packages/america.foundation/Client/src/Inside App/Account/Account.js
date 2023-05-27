import React from "react";
import Account_Header from "./Account_Header";
import "./Account.css";
import { Outlet } from "react-router-dom";

function Account() {
  return (
    <div className="account" style={{ paddingTop: "65px" }}>
      {/* App Header */}
      <div className="account_outer_header">
        <div className="account_header">
          <Account_Header />
        </div>
      </div>
      {/* App Body */}
      <div className="account_body">
        <Outlet />
      </div>
    </div>
  );
}

export default Account;
