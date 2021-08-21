import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex align-content-end">
        <Navbar.Brand href="/">
          <img
            alt="logo"
            src="/favicon.ico"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          React Bootstrap
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <NavLink
            to="/"
            className="menuNavBar"
            activeClassName="activeMenuNavBar"
          >
            Products
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
