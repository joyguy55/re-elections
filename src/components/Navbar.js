import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="home_icon">
        <Link to={`/`}>Histopia</Link>
      </div>
      <ul>
        <li>
          <Link to={`/about`}>About</Link>
        </li>
        {/* <li>
          <Link to={`/donate`}>Donate</Link>
        </li>
        <li>
          <Link to={`/contact`}>Contact</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Navbar;
