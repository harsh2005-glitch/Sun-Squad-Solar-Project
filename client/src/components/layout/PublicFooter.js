import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Ensure this path is correct

const PublicFooter = () => {
  return (
    <footer className="new-footer">
      <div className="container">
        <div className="row footer-top">
            {/* Column 1: Brand */}
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="footer-brand">
                    <div className="d-flex align-items-center mb-3">
                        <img src={logo} alt="Sun Squad Solar" className="footer-logo me-2" style={{height: '50px'}} />
                        <div>
                            <h4 className="text-white mb-0 fw-bold">Sun Squad Solar</h4>
                            <small className="text-muted">Energy Solutions</small>
                        </div>
                    </div>
                    <p className="text-muted mb-4">
                        Premium solar solutions for a sustainable future. Transforming India with clean, reliable energy.
                    </p>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/sunsquadsolar?igsh=M241aTQzcTNpa2k4" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://wa.me/9278450045" target="_blank" rel="noreferrer"><i class="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-lg-2 col-md-6 mb-4">
                <h5 className="footer-title text-warning"><i className="fa-regular fa-paper-plane me-2"></i>Quick Links</h5>
                <ul className="footer-links">
                    <li><Link to="/"><i className="fa-solid fa-house me-2"></i>Home</Link></li>
                    <li><Link to="/about"><i className="fa-solid fa-circle-info me-2"></i>About Us</Link></li>
                    <li><Link to="/gallery"><i className="fa-solid fa-border-all me-2"></i>Gallery</Link></li>
                    <li><Link to="/locations"><i className="fa-solid fa-image me-2"></i>Projects</Link></li>
                    <li><Link to="/Announcement"><i className="fa-regular fa-comment me-2"></i>Announcements</Link></li>
                </ul>
            </div>

            {/* Column 3: Our Services */}
            <div className="col-lg-3 col-md-6 mb-4">
                <h5 className="footer-title text-warning"><i className="fa-solid fa-bolt me-2"></i>Our Services</h5>
                <ul className="footer-links">
                    <li><Link to="/services"><i className="fa-regular fa-sun me-2"></i>Solar Panel Installation</Link></li>
                    <li><Link to="/services"><i className="fa-solid fa-battery-full me-2"></i>Battery Storage Systems</Link></li>
                    <li><Link to="/services"><i className="fa-solid fa-plug me-2"></i>Net Metering Setup</Link></li>
                    <li><Link to="/services"><i className="fa-solid fa-screwdriver-wrench me-2"></i>Maintenance & Monitoring</Link></li>
                </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className="col-lg-3 col-md-6 mb-4">
                <h5 className="footer-title text-warning"><i className="fa-solid fa-phone-volume me-2"></i>Contact Info</h5>
                <ul className="footer-contact">
                    <li><i className="fa-regular fa-envelope text-success"></i> sunsquadsolar4@gmail.com</li>
                    <li><i className="fa-solid fa-phone text-success"></i> +91 92784 50045</li>
                    <li><i className="fa-solid fa-location-dot text-success"></i> Varanasi, India</li>
                    <li><i className="fa-regular fa-clock text-success"></i> 24/7 Support Available</li>
                </ul>
            </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6 text-center text-md-start">
                    <p className="mb-0 text-muted">&copy; 2025 Sun Squad Solar. All rights reserved.</p>
                </div>
                <div className="col-md-6 text-center text-md-end">
                    <p className="mb-0 text-muted">Crafted with <i className="fa-solid fa-heart text-danger"></i> by Quinn</p>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;