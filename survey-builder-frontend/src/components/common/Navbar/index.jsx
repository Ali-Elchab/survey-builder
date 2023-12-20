import React from "react";
import "./style.css";
import logoDark from "../../../assets/images/logo-dark.png";
const Navbar = ({ profile }) => {
  return (
    <div className="flex  full-width yellow-bg nav-bar">
      <div className="nav-logo">
        <a href="/home">
          <img src={logoDark} alt="" />
        </a>
      </div>
      <img className="flex center circular secondary-bg white-text profile-icon" src={profile} alt="" />
    </div>
  );
};

export default Navbar;
