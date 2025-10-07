import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Import the logo image

// Note: The enquiry modal logic will be passed in as a prop later
const PublicHeader = ({ onEnquiryClick }) => {
  return (
    <header id="main-header">
      <div className="top-bar">
        <div className="contact-info">
          <span>sunsquadsolar4@gmail.com</span> | <span>+91 9278450045</span>
        </div>
        <div className="social-media">
          <a href="https://wa.me/919278450045" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
          <a href="https://www.instagram.com/sunsquadsolar/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
        </div>
      </div>
      <nav className="main-nav">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Company Logo" /></Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/locations">Our Project Location</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/announcements">Announcement</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
        <div className="nav-buttons">
          <button onClick={onEnquiryClick} className="btn btn-enquiry">GET AN ENQUIRY</button>
          {/* This now links to our React login page */}
          <Link to="/login" className="btn btn-login">LOGIN</Link>
        </div>
      </nav>
    </header>
  );
};

export default PublicHeader;