import React from "react";
import { Container, Navbar } from "react-bootstrap";

export const Nav = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="logo"
            src="/favicon.ico"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          React Bootstrap
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
