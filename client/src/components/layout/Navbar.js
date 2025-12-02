import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, NavDropdown, Offcanvas, Image } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';
import './AppNavbar.css'; 

const AppNavbar = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setShowOffcanvas(false);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <Navbar bg="white" expand="lg" className="app-navbar sticky-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/app/dashboard" className="d-flex align-items-center">
          <img src={logo} height="45" alt="Sun Squad Solar" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvas-navbar-nav" onClick={handleShow} className="ms-auto" />

        <Navbar.Offcanvas
          id="offcanvas-navbar-nav"
          aria-labelledby="offcanvas-navbar-label"
          placement="end"
          className="navbar-offcanvas"
          show={showOffcanvas}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvas-navbar-label" className="fw-bold text-primary">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="mx-auto align-items-lg-center">
              <Nav.Link as={NavLink} to="/app/dashboard" onClick={handleClose}>
                <i className="fa-solid fa-house me-2 d-lg-none"></i>Dashboard
              </Nav.Link>

              <NavDropdown 
                title={
                    <span>
                        <i className="fa-solid fa-network-wired me-2 text-primary"></i>
                        Network
                    </span>
                } 
                id="network-dropdown"
                className="mx-2"
              >
                <NavDropdown.Item as={NavLink} to="/app/network/directs" onClick={handleClose}>
                    <i className="fa-solid fa-users me-2 text-muted"></i>My Directs
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/app/network/genealogy" onClick={handleClose}>
                    <i className="fa-solid fa-sitemap me-2 text-muted"></i>Genealogy Tree
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={NavLink} to="/app/payout/income" onClick={handleClose} className="mx-2">
                <i className="fa-solid fa-wallet me-2 text-success"></i>Payout / Income
              </Nav.Link>
              <Nav.Link as={NavLink} to="/app/documents" onClick={handleClose} className="mx-2">
                <i className="fa-solid fa-file-upload me-2 text-info"></i>Upload Documents
              </Nav.Link>
            </Nav>

            {/* User Profile Section (Desktop) */}
            <Nav className="align-items-lg-center ms-lg-3">
              {user && (
                <NavDropdown 
                  title={
                    <div className="user-nav-profile">
                      <Image 
                        src={user.profilePicture || 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'} 
                        className="user-nav-avatar" 
                        roundedCircle 
                      />
                      <span className="user-nav-name d-none d-lg-block">{user.name?.split(' ')[0]}</span>
                    </div>
                  } 
                  id="profile-dropdown" 
                  align="end"
                  className="profile-dropdown-container"
                >
                  <div className="px-3 py-2 d-none d-lg-block border-bottom mb-2">
                    <small className="text-muted d-block text-uppercase" style={{fontSize: '0.7rem', letterSpacing: '1px'}}>Signed in as</small>
                    <div className="fw-bold text-dark text-truncate" style={{maxWidth: '200px'}}>{user.name}</div>
                  </div>
                  
                  <NavDropdown.Item as={NavLink} to="/app/profile" onClick={handleClose}>
                    <i className="fa-solid fa-user-gear me-2 text-primary"></i>Update Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/app/profile/changepassword" onClick={handleClose}>
                    <i className="fa-solid fa-key me-2 text-warning"></i>Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger fw-bold">
                    <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;