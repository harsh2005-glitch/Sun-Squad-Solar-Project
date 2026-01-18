import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('sunsquad_cookie_consent');
        if (!consent) {
            // Show after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('sunsquad_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('sunsquad_cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-banner">
            <div className="cookie-content">
                <div className="cookie-icon">
                    <i className="fa-solid fa-cookie-bite"></i>
                </div>
                <div className="cookie-text">
                    <h5>We use cookies</h5>
                    <p>
                        We simplify your experience by using cookies and similar technologies. 
                        By continuing to use our site, you agree to our <Link to="/privacy-policy" className="cookie-link">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
            <div className="cookie-actions">
                <Button variant="outline-light" size="sm" className="me-2" onClick={handleDecline}>
                    Decline
                </Button>
                <Button variant="warning" size="sm" className="fw-bold" onClick={handleAccept}>
                    Accept
                </Button>
            </div>
        </div>
    );
};

export default CookieConsent;
