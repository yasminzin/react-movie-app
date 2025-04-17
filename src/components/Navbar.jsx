import React from "react";
import styles from "../styles/Navbar.module.css";
import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/slices/languageSlice";
import Form from "react-bootstrap/Form";
// import "../styles/global.css";
import Dropdown from "react-bootstrap/Dropdown";
import TVshowswishlist from "../pages/TVshowsWishlist";

export default function Navbar() {
  const MoviesWishlist = useSelector((state) =>
    state.wishlist.value.filter((item) => item.type == "movie")
  );
  const ShowsWishlist = useSelector((state) =>
    state.wishlist.value.filter((item) => item.type == "show")
  );

  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.languages);

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg text-center ${styles.navbar}`}>
        <div className="container">
          <Link className="navbar-brand fw-bold ms-4" to={"/"}>
            Movie App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${styles.collapse}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto me-4">
              <li className="nav-item mx-1">
                <NavLink className="nav-link fw-semibold " to="/" end>
                  Movies
                </NavLink>
              </li>
              <li className="nav-item mx-1">
                <NavLink className="nav-link fw-semibold " to="/tv" end>
                  TV Shows
                </NavLink>
              </li>
              <Dropdown>
                <Dropdown.Toggle
                  variant="transparent"
                  id="dropdown-basic"
                  className="text-muted"
                >
                  <i className="fa-solid fa-heart me-1 fs-5"></i> Wishlist
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <NavLink
                      to="/movies/wishlist"
                      className="text-decoration-none text-dark"
                    >
                      <span>
                        Movies
                        <sup className="ms-1 bg-light py-1 px-2 rounded-2">
                          {MoviesWishlist.length}
                        </sup>
                      </span>
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink
                      to="/tv/wishlist"
                      className="text-decoration-none text-dark"
                    >
                      <span>
                        TV Shows
                        <sup className="ms-1 bg-light py-1 px-2 rounded-2">
                          {ShowsWishlist.length}
                        </sup>
                      </span>
                    </NavLink>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          <Form.Group>
            <Form.Select
              value={language}
              onChange={handleLanguageChange}
              className={styles.languageSelect}
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">Français</option>
              <option value="zh">中文</option>
            </Form.Select>
          </Form.Group>
          </div>
        </div>
      </nav>
    </>
  );
}
