import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-md "
        style={{ backgroundColor: "#245953" }}
      >
        <div className="container ">
          <Link to={"/"} className="navbar-brand  fs-5 text-white">
            Library App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-5 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link text-white">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/categories"} className="nav-link text-white ms-3 ">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
