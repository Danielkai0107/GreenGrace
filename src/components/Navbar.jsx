// Navbar.js
import React, { memo }from 'react';
import { Link, useLocation } from 'react-router-dom';


function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar" >
      <ul>
        <li className="navbar-logo">
          <figure></figure>
          <Link className="nav-item" to="/" >GreenGrace</Link>
        </li>
        <li className="navbar-options">
          <Link className={`navbar-options-main ${location.pathname === "/" ? "active" : ""}`} to="/">首頁</Link>
          <Link className={`navbar-options-main ${location.pathname === "/GreenDeco" ? "active" : ""}`} to="/GreenDeco">植栽佈置</Link>
          {/* <Link className={`navbar-options-main ${location.pathname === "/WeddingDeco" ? "active" : ""}`} to="/WeddingDeco">婚禮佈置</Link> */}
          {/* <Link className={`navbar-options-main ${location.pathname === "/About" ? "active" : ""}`} to="/About">聯絡我們</Link> */}

        </li>
      </ul>
    </nav>
  )
}

export default memo(Navbar);
