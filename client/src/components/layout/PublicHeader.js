import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom'; // <-- IMPORTANT: Use NavLink for active styles
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

const PublicHeader = ({ onEnquiryClick }) => {
  const [scrolled, setScrolled] = useState(false);

  // This effect runs when the component mounts
  useEffect(() => {
    const handleScroll = () => {
      // If the user scrolls more than 50px, set scrolled to true
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add the event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty array means this runs only once

  return (
    // --- Add the 'navbar-scrolled' class based on the 'scrolled' state ---
    <Navbar bg="light" expand="lg" sticky="top" className={`shadow-sm ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} height="50" className="d-inline-block align-top" alt="Sun Squad Solar Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* --- IMPORTANT: Use NavLink for the active class to work --- */}
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About Us</Nav.Link>
            <Nav.Link as={NavLink} to="/locations">Our Project Location</Nav.Link>
            <Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
            <Nav.Link as={NavLink} to="/announcements">Announcement</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>

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