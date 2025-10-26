import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, NavDropdown ,Offcanvas } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import './AppNavbar.css'; 
// import ThemeToggleButton from '../common/ThemeToggleButton'; 

const AppNavbar = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
   const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleLogout = () => {
    setShowOffcanvas(false);
    localStorage.removeItem('user');
    navigate('/login');
  };

  // --- THIS IS THE FIX ---
  // A simple function to explicitly close the menu.
  const handleNavCollapse = () => {
    setExpanded(false);
  };

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <Navbar bg="light" expand="lg" className="app-navbar shadow-sm" sticky="top">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/app/dashboard">
          <img src={logo} height="40" alt="Logo" />
        </Navbar.Brand>

        {/* Hamburger Menu Toggle (will control the Offcanvas) */}
        <Navbar.Toggle aria-controls="offcanvas-navbar-nav" onClick={handleShow} />

        {/* Offcanvas Component: The slide-out menu for mobile */}
        <Navbar.Offcanvas
          id="offcanvas-navbar-nav"
          aria-labelledby="offcanvas-navbar-label"
          placement="end" // Slides in from the right
          className="navbar-offcanvas"
           show={showOffcanvas}
           onHide={handleClose} 
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvas-navbar-label">Menu</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            {/* `ms-auto` pushes nav to the right on desktop, `me-auto` is the default */}
            {/* On mobile (in offcanvas), it will be a vertical list */}
            <Nav className="mx-auto flex-grow-1 pe-3">
              <Nav.Link as={NavLink} to="/app/dashboard" onClick={handleClose}>Dashboard</Nav.Link>

              <NavDropdown title="Network" id="network-dropdown">
                <NavDropdown.Item as={NavLink} to="/app/network/directs" onClick={handleClose}>My Directs</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/app/network/genealogy" onClick={handleClose}>Genealogy Tree</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={NavLink} to="/app/payout/income" onClick={handleClose}>Payout / Income</Nav.Link>
              <Nav.Link as={NavLink} to="/app/documents" onClick={handleClose}>Upload Documents</Nav.Link>
              
               <NavDropdown title="My Profile" id="profile-dropdown">
                <NavDropdown.Item as={NavLink} to="/app/profile" onClick={handleClose}>Update Profile</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/app/profile/changepassword" onClick={handleClose}>Change Password</NavDropdown.Item>
              </NavDropdown>
            </Nav>
  

            {/* Logout button appears separately in the offcanvas body */}
            <Button variant="outline-danger" onClick={handleLogout} className="mt-3 d-lg-none">
              Logout
            </Button>
            {/* A separate logout button for desktop view */}
            <Button variant="outline-danger" onClick={handleLogout} className="d-none d-lg-block">
              Logout
            </Button>

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;