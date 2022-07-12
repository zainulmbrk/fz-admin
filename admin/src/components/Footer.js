import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="row-footer">
        <div className="footer-logo">
          <img src="logoTickitz.svg" />
          <p className="tagline">
            Stop waiting in line. Buy tickets <br />
            conveniently, watch movies quietly
          </p>
        </div>
        <div className="footer-page">
          <div className="title">
            <h4>Explore</h4>
          </div>
          <div className="link">
            <div className="home-link">
              <Link style={{ textDecoration: "none" }} to="/">
                Home
              </Link>
            </div>
            <div className="movie-link">
              <Link style={{ textDecoration: "none" }} to="/">
                List Movie
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-sponsor">
          <div className="title">
            <h4>Our Sponsor</h4>
          </div>
          <div className="sponsor-list">
            <div className="ebv">
              <Link to="#">
                <img src="ebv.svg" />
              </Link>
            </div>
            <div className="cineone">
              <Link to="#">
                <img src="cineone21.svg" />
              </Link>
            </div>
            <div className="hiflix">
              <Link to="#">
                <img src="hiflix.svg" />
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-social-media">
          <div className="title">
            <h4>Follow Us</h4>
          </div>
          <div className="card-social-media">
            <div className="social-media-list">
              <div className="facebook">
                <Link to="#">
                  <img src="facebook.png" />
                </Link>
              </div>
              <div className="instagram">
                <Link to="#">
                  <img src="instagram.png" />
                </Link>
              </div>
              <div className="twitter">
                <Link to="#">
                  <img src="twitter.png" />
                </Link>
              </div>
              <div className="youtube">
                <Link to="#">
                  <img src="youtube.png" />
                </Link>
              </div>
            </div>
            <div className="social-media-link">
              <div className="link">
                <Link style={{ textDecoration: "none" }} to="#">
                  Tickitz Cinema id
                </Link>
              </div>
              <div className="link">
                <Link style={{ textDecoration: "none" }} to="#">
                  tickitz.id
                </Link>
              </div>
              <div className="link">
                <Link style={{ textDecoration: "none" }} to="#">
                  tickitz.id
                </Link>
              </div>
              <div className="link">
                <Link style={{ textDecoration: "none" }} to="#">
                  Tickitz Cinema id
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright">
        <p>&copy; 2020 Tickitz. All Rights Reserved.</p>
      </div>
    </>
  );
};

export default Footer;
