import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="grey_border" />
      <div className="footercon">
        <div className="flex1">
          <p>Questions? Call <a href="/">000-800-040-1843</a></p>
        </div>
        <ul className="list1">
          <li>
            <a href="/">FAQ</a>
          </li>
          <li>
            <a href="/">Investor Relation</a>
          </li>
          <li>
            <a href="/">Privacy</a>
          </li>
          <li>
            <a href="/">Speed Test</a>
          </li>
        </ul>
        <ul className="list1">
          <li>
            <a href="/">Help Centre</a>
          </li>
          <li>
            <a href="/">Jobs</a>
          </li>
          <li>
            <a href="/">Cookie Preferences</a>
          </li>
          <li>
            <a href="/">Legal Notices</a>
          </li>
        </ul>
        <ul className="list1">
          <li>
            <a href="/">Account</a>
          </li>
          <li>
            <a href="/">Ways to Watch</a>
          </li>
          <li>
            <a href="/">Corporate Information</a>
          </li>
          <li>
            <a href="/">Only on Netflix</a>
          </li>
        </ul>
        <ul className="list1">
          <li>
            <a href="/">Media Centre</a>
          </li>
          <li>
            <a href="/">Terms of Use</a>
          </li>
          <li>
            <a href="/">Contact Us</a>
          </li>
          <li>
            <a href="/">#</a>
          </li>
        </ul>
        <div className="end">
          <p>Netflix India</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
