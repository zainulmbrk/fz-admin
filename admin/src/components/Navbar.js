import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="row-navbar">
        <div className="card-left">
          <div className="logo-navbar">
            <img src="logoTickitz.svg" alt="logo"/>
          </div>
          <div className="home-link">
            <Link style={{ textDecoration: "none" }} to="/">
              Home
            </Link>
          </div>
          <div className="movie-link">
            <Link style={{ textDecoration: "none" }} to="/movies">
              List Movies
            </Link>
          </div>
        </div>
        <div className="card-right">
          <img src="profile.svg" alt="profile"/>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
