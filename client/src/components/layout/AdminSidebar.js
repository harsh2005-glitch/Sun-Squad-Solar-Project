import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import logo from '../../assets/images/logo.png'; // Assuming you have a logo

// `onLinkClick` is a new prop to close the sidebar on mobile after clicking a link
const AdminSidebar = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="admin-sidebar d-flex flex-column p-3">
      <div className="sidebar-header">
        <img src={logo} height="40" alt="Logo" />
      </div>
      
      <Nav variant="pills" className="flex-column my-4">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/admin/dashboard" onClick={onLinkClick}>Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/admin/users" onClick={onLinkClick}>Manage Users</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/admin/deposits" onClick={onLinkClick}>Manage Deposits</Nav.Link>
        </Nav.Item>
      </Nav>
      
      <Button variant="outline-danger" onClick={handleLogout} className="mt-auto">
        Logout
      </Button>
    </div>
  );
};

export default AdminSidebar;