import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Assuming you want to use the logo here too

const AppNavbar = () => { // Renamed to avoid confusion with the library
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/app/dashboard">
          <img src={logo} height="40" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="app-navbar-nav" />
        <Navbar.Collapse id="app-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/app/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/app/network/directs">Network</Nav.Link>
            <Nav.Link as={Link} to="/app/payout/income">Payout / Income</Nav.Link>
            <Nav.Link as={Link} to="/app/profile">My Profile</Nav.Link>
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;