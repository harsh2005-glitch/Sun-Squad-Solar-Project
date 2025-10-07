import React from 'react';
// Import Link from react-router-dom to handle internal navigation
import { Link } from 'react-router-dom';
// Import Bootstrap components
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

const PublicHeader = ({ onEnquiryClick }) => {
  return (
    // `sticky="top"` makes the navbar stay at the top when scrolling
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            height="50"
            className="d-inline-block align-top"
            alt="Sun Squad Solar Logo"
          />
        </Navbar.Brand>

        {/* Hamburger Menu Toggle Button (appears on mobile) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible section */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* `ms-auto` pushes the nav links to the right */}
          <Nav className="ms-auto align-items-center">
            {/* Use `as={Link}` to make Nav.Link behave like a React Router Link */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/locations">Our Project Location</Nav.Link>
            <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
            <Nav.Link as={Link} to="/announcements">Announcement</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>

            {/* Buttons */}
            <Button variant="outline-primary" onClick={onEnquiryClick} className="mx-2 my-2 my-lg-0">
              GET AN ENQUIRY
            </Button>
            <Button as={Link} to="/login" variant="dark">
              LOGIN
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicHeader;