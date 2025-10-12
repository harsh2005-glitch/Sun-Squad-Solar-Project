import React from 'react';
import { Link } from 'react-router-dom';

const PublicFooter = () => {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-column about-column">
          <h3>Corporate Office:</h3>
          <p><strong>Address:</strong> Sant Nagar Colony , Chitaipur , U.P., India. 211002</p>
          <h3>Reg Office:</h3>
          <p><strong>Address:</strong> Sant Nagar Colony , Chitaipur , U.P., India. 211002</p>
          <p><strong>Email:</strong> sunsquadsolar4@gmail.com</p>
          <p><strong>Call:</strong> +91 9278450045</p>
        </div>

        <div className="footer-column links-column">
          <h3>Useful Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/locations">Our Project</Link></li>
            <li><Link to="/gallery">Media Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-column map-column">
          <h3>Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.206116901794!2d82.96070707516577!3d25.26365087766825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e332fdf328f73%3A0x1a5c35f7c55c3ffa!2sSUN%20SQUAD%20SOLAR!5e0!3m2!1sen!2sin!4v1759347768628!5m2!1sen!2sin"
            width="100%" 
            height="250" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Sun Squad Solar Location Map"
          ></iframe>
        </div>
      </div>

      <div className="footer-sub">
        <div className="copyright">
          <p>2025 @ Sun Squad Solar</p>
        </div>
        <div className="footer-socials">
            <a href="https://wa.me/919278450045" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
            <a href="https://www.instagram.com/sunsquadsolar/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;