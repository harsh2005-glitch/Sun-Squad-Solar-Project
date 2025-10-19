import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

const PublicHeader = ({ onEnquiryClick }) => {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        {/* Logo (unchanged) */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            height="50"
            className="d-inline-block align-top"
            alt="Sun Squad Solar Logo"
          />
        </Navbar.Brand>
        
        {/* --- NEW: Mobile-only Login Button --- */}
        {/* `d-lg-none` means "display: none on large screens and up" -> visible only on mobile/tablet */}
        <Link to="/login" className="btn btn-dark d-lg-none ms-auto me-2">LOGIN</Link>

        {/* Hamburger Menu Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible section */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* `ms-auto` pushes nav items to the right on desktop */}
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/locations">Our Project Location</Nav.Link>
            <Nav.Link as={Link} to="/gallery">Gallery</Nav.Link>
            <Nav.Link as={Link} to="/announcements">Announcement</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>

            {/* --- DESKTOP Buttons --- */}
            {/* `d-none d-lg-inline-block` means "display: none by default, but inline-block on large screens" */}
            <Button variant="outline-primary" onClick={onEnquiryClick} className="d-none d-lg-inline-block mx-2">
              GET AN ENQUIRY
            </Button>
            <Button as={Link} to="/login" variant="dark" className="d-none d-lg-inline-block">
              LOGIN
            </Button>
            
            {/* --- MOBILE Buttons (Inside the collapsed menu) --- */}
            {/* `d-lg-none` makes these visible only when the menu is collapsed */}
            <div className="d-lg-none mt-3">
                <Button variant="outline-primary" onClick={onEnquiryClick} className="w-100 mb-2">
                  GET AN ENQUIRY
                </Button>
                <Button as={Link} to="/login" variant="dark" className="w-100">
                  LOGIN
                </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicHeader;