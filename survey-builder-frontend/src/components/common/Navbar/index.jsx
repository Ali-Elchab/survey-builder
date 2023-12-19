import React from "react";
import "./style.css";
const Navbar = () => {
  return (
    <div className="flex  full-width primary-bg nav-bar">
      <div className="nav-elements">
        <ul className="flex row">
          <li className="secondary-text nav-button">Home</li>
          <li className="secondary-text nav-button">Posts</li>
          <li className="secondary-text nav-button">Profile</li>
        </ul>
      </div>
      <div className="flex center circular secondary-bg white-text profile-icon">T</div>
    </div>
  );
};

export default Navbar;
