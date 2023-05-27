import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "./logo_map_black.svg";
import "./Menu.css";

export default function Menu() {
  return (
    <div className="app">
      <div className="menu">
        <div className="menu-container">
          <ul className="menu-list">
            <li className="menu-list-item-logo">
              <Link to="/en">
                America Foundation
                <Logo width="30px" />
              </Link>
            </li>

            <li className="menu-list-item border-left">
              <Link onClick="">What We Offer</Link>
            </li>
            <li className="menu-list-item">
              <Link to="/Learn">Learn</Link>
            </li>
            <li className="menu-list-item">
              <Link to="/support">Support</Link>
            </li>
          </ul>
          <ul className="user-menu">
            <li className="landing_page_login">
              <Link to="/LogIn">Log in</Link>
            </li>
            <li className="landing_page_signup">
              <Link to="/SignUp">Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
