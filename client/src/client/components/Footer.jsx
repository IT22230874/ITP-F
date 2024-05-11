import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Footer() {
  return (
    <footer>
      <p className="heading">
        <span className="left">Shan</span>
        <span className="right">Constructions</span>
      </p>
      <nav>
        <p className="titile">
          <span className="left">Shan</span>
          <span className="right">Construction</span>
        </p>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/packages">Packages</Link>
          </li>
          <li>
            <Link to="/tenders">Tenders</Link>
          </li>
          <li>
            <Link to="/rents">Rents</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <button type="button">
          <Link to="/contact">Contact</Link>
        </button>
      </nav>
      <p className="copyrights">@2024 ShanConstructions allrights reserved</p>
    </footer>
  );
}

export default Footer;
