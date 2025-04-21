import React from "react";
import styles from "../styles/Navbar.module.css";
import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/slices/languageSlice";
import Form from "react-bootstrap/Form";
// import "../styles/global.css";
import Dropdown from "react-bootstrap/Dropdown";
import TVshowswishlist from "../pages/TVshowsWishlist";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavbarComp() {
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
      <Navbar expand="lg" className={`${styles.navbar}`}>
        <Container>
          <Navbar.Brand href="/" className="fw-bold">
            Movie App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className={`${styles.collapse} p-1`}
          >
            <Nav className="ms-auto">
              <Nav.Link className="mx-2 fw-semibold" as={NavLink} to="/" end>
                Movies
              </Nav.Link>
              <Nav.Link className="mx-2 fw-semibold" as={NavLink} to="/tv" end>
                TV Shows
              </Nav.Link>
              <NavDropdown
                title="❤ Wishlist"
                id="basic-nav-dropdown"
                className="mx-2 px-1"
              >
                <NavDropdown.Item
                  className={`fw-semibold ${styles.dropdownActive}`}
                  as={Link}
                  to="/movies/wishlist"
                >
                  <span>
                    Movies
                    <sup className="ms-1 bg-light py-1 px-2 rounded-2">
                      {MoviesWishlist.length}
                    </sup>
                  </span>
                </NavDropdown.Item>
                <NavDropdown.Item
                  className={`fw-semibold ${styles.dropdownActive}`}
                  as={Link}
                  to="/tv/wishlist"
                >
                  <span>
                    TV Shows
                    <sup className="ms-1 bg-light py-1 px-2 rounded-2">
                      {ShowsWishlist.length}
                    </sup>
                  </span>
                </NavDropdown.Item>
              </NavDropdown>
              <Form.Group className="mx-2">
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
