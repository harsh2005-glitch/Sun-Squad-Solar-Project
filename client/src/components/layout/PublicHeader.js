import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Use NavLink for active styles
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
// import ThemeToggleButton from '../common/ThemeToggleButton'; 

const PublicHeader = ({ onEnquiryClick }) => {
  const [expanded, setExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state to true if user scrolls past 50px, otherwise false
      setIsScrolled(window.scrollY > 50);
    };

    // Add event listener on mount
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty array ensures this effect runs only once

  const handleNavCollapse = () => setExpanded(false);
  const handleEnquiryAndClose = () => {
    onEnquiryClick();
    handleNavCollapse();
  };

  return (
    // Add 'public-navbar' and the conditional 'scrolled' class
    <Navbar
      variant={isScrolled ? 'light' : 'dark'} // Helps with text color inversion
      expand="lg"
      fixed="top" // Changed from sticky to fixed for better transparency effect
      className={`public-navbar ${isScrolled ? 'scrolled' : ''}`}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleNavCollapse}>
          <img
            src={logo}
            height="50"
            className="d-inline-block align-top"
            alt="Sun Squad Solar Logo"
          />
        </Navbar.Brand>
        
        <Link to="/login" className="btn btn-dark d-lg-none ms-auto me-2">LOGIN</Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" onClick={handleNavCollapse}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about" onClick={handleNavCollapse}>About Us</Nav.Link>
            <Nav.Link as={NavLink} to="/locations" onClick={handleNavCollapse}>Our Project Location</Nav.Link>
            <Nav.Link as={NavLink} to="/gallery" onClick={handleNavCollapse}>Gallery</Nav.Link>
            <Nav.Link as={NavLink} to="/announcements" onClick={handleNavCollapse}>Announcement</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={handleNavCollapse}>Contact Us</Nav.Link>

            {/* Desktop Buttons */}
            <Button variant="outline-primary" onClick={onEnquiryClick} className="d-none d-lg-inline-block mx-2">
              GET AN ENQUIRY
            </Button>
            <Button as={Link} to="/login" variant="dark" className="d-none d-lg-inline-block">
              LOGIN
            </Button>

             
            
            {/* Mobile Buttons (Inside the collapsed menu) */}
            <div className="d-lg-none mt-3">
                <Button variant="outline-primary" onClick={handleEnquiryAndClose} className="w-100 mb-2">
                  GET AN ENQUIRY
                </Button>
                <Button as={Link} to="/login" variant="dark" className="w-100" onClick={handleNavCollapse}>
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