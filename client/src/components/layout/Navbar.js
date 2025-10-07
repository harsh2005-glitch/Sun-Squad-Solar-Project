import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // <-- IMPORT THE CSS

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/app/dashboard">Dashboard</Link>
        <Link to="/app/network/directs">Network</Link>
        <Link to="/app/payout/income">Payout / Income</Link>
        <Link to="/app/profile">My Profile</Link>
      </div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </nav>
  );
}

export default Navbar;