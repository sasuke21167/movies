import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Header.scss";

Header.propTypes = {};

function Header(props) {
  return (
    <Navbar className="header" bg="light" expand="lg">
      <Container>
        <NavLink
          className={(navData) =>
            navData.isActive
              ? "header__link header__link--active"
              : "header__link"
          }
          end
          to="movie"
        >
          Movie
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive
              ? "header__link header__link--active"
              : "header__link"
          }
          to="movie/now-playing"
        >
          Now Playing
        </NavLink>
        <NavLink
          className={(navData) =>
            navData.isActive
              ? "header__link header__link--active"
              : "header__link"
          }
          to="movie/top-rated"
        >
          Top Rated
        </NavLink>
      </Container>
    </Navbar>
  );
}

export default Header;
