import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Ensure this path is correct

const PublicFooter = () => {
  return (
    <footer className="new-footer">
      <div className="container">
        <div className="row footer-top justify-content-between">
            {/* Column 1: Brand */}
            <div className="col-lg-3 col-md-6 mb-4">
                <div className="footer-brand">
                    <div className="d-flex align-items-center mb-3">
                        <img src={logo} alt="Sun Squad Solar" className="footer-logo me-2" style={{height: '40px'}} />
                        <div>
                            <h5 className="text-white mb-0 fw-bold">Sun Squad Solar</h5>
                        </div>
                    </div>
                    <p className="text-white-50 small mb-4">
                        Premium solar solutions for a sustainable future. Transforming India with clean, reliable energy.
                    </p>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/sunsquadsolar?igsh=M241aTQzcTNpa2k4" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://wa.me/9278450045" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-lg-2 col-md-6 mb-4">
                <h5 className="footer-title text-warning h6">Quick Links</h5>
                <ul className="footer-links small">
                    <li><Link to="/"><i className="fa-solid fa-angle-right me-2"></i>Home</Link></li>
                    <li><Link to="/about"><i className="fa-solid fa-angle-right me-2"></i>About Us</Link></li>
                    <li><Link to="/gallery"><i className="fa-solid fa-angle-right me-2"></i>Gallery</Link></li>
                    <li><Link to="/locations"><i className="fa-solid fa-angle-right me-2"></i>Projects</Link></li>
                    <li><Link to="/calculator"><i className="fa-solid fa-angle-right me-2"></i>Solar Calculator</Link></li>
                    <li><Link to="/Announcement"><i className="fa-solid fa-angle-right me-2"></i>Updates</Link></li>
                </ul>
            </div>

            {/* Column 3: Our Services */}
            <div className="col-lg-2 col-md-6 mb-4">
                <h5 className="footer-title text-warning h6">Services</h5>
                <ul className="footer-links small">
                    <li><a href="/#premium-services">Solar Installation</a></li>
                    <li><a href="/#premium-services">Battery Storage</a></li>
                    <li><a href="/#premium-services">Net Metering</a></li>
                    <li><a href="/#premium-services">Maintenance</a></li>
                </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className="col-lg-2 col-md-6 mb-4">
                <h5 className="footer-title text-warning h6">Contact</h5>
                <ul className="footer-contact small">
                    <li><i className="fa-regular fa-envelope text-success me-2"></i>sunsquadsolar4@gmail.com</li>
                    <li><i className="fa-solid fa-phone text-success me-2"></i>+91 92784 50045</li>
                    <li><i className="fa-solid fa-location-dot text-success me-2"></i>Varanasi, India</li>
                </ul>
            </div>

            {/* Column 5: Newsletter */}
            <div className="col-lg-3 col-md-12 mb-4">
                <h5 className="footer-title text-warning h6">Newsletter</h5>
                <p className="text-white-50 small mb-3">Subscribe to get solar tips, subsidy updates & exclusive offers.</p>
                <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}>
                    <div className="input-group mb-2">
                        <input type="email" className="form-control form-control-sm" placeholder="Your Email" required />
                        <button className="btn btn-success btn-sm" type="submit"><i className="fa-regular fa-paper-plane"></i></button>
                    </div>
                    <small className="text-white-50" style={{fontSize: '0.7em'}}>We respect your privacy.</small>
                </form>
            </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-4 text-center text-md-start">
                    <p className="mb-0 text-white">&copy; 2026 Sun Squad Solar. All rights reserved.</p>
                </div>
                <div className="col-md-4 text-center">
                    <div className="legal-links-footer">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <span className="mx-2 text-white-50">|</span>
                        <Link to="/terms-of-service">Terms</Link>
                        <span className="mx-2 text-white-50">|</span>
                        <Link to="/refund-policy">Refunds</Link>
                    </div>
                </div>
                <div className="col-md-4 text-center text-md-end">
                    <p className="mb-0 text-white">Crafted with <i className="fa-solid fa-heart text-danger"></i> by Harshit</p>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;