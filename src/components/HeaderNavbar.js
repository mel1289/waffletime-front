import React from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeaderNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          WaffleTime
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Nos produits
            </Nav.Link>
            <Nav.Link as={Link} to="/comment-ça-marche">
              Comment ça marche ?
            </Nav.Link>
          </Nav>
          <Button as={Link} to="ma-commande" variant="outline-dark">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
            Mon panier
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
