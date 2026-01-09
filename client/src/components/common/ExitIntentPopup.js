import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './FloatingElements.css';

const ExitIntentPopup = () => {
    const [show, setShow] = useState(false);
    const [hasShown, setHasShown] = useState(false); // Ensure it only shows once per session

    const handleClose = () => setShow(false);

    useEffect(() => {
        const onMouseLeave = (e) => {
            if (e.clientY < 0 && !hasShown) {
                // User moved mouse towards the top (URL bar/tabs)
                setShow(true);
                setHasShown(true);
                localStorage.setItem('exitIntentShown', 'true'); // Persist across refreshes
            }
        };

        // Check local storage to see if we already showed it this session/ever
        const alreadyShown = localStorage.getItem('exitIntentShown');

        if (!alreadyShown) {
            document.addEventListener('mouseleave', onMouseLeave);
        }

        return () => {
            document.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [hasShown]);

    // Optional: Reset logic for testing or if you want it to show again after X days
    // For now, simple "once per user" logic.

    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className="exit-intent-modal">
            <Modal.Body className="p-0">
                <div className="exit-intent-overlay text-center d-flex flex-column justify-content-center align-items-center">
                    <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-3" onClick={handleClose} aria-label="Close"></button>
                    
                    <h2 className="display-5 fw-bold text-white mb-3">Wait! Don't leave yet.</h2>
                    <h4 className="text-white mb-4">Did you know you can reduce your electricity bill by <span className="exit-highlight-text">90%</span>?</h4>
                    
                    <p className="text-white-50 fs-5 mb-5" style={{maxWidth: '600px'}}>
                        Get a <strong>Free Site Survey</strong> worth ₹2,000 today. No obligation. Just clear savings.
                    </p>

                    <div className="d-flex gap-3 flex-wrap justify-content-center">
                        <Button variant="warning" size="lg" className="fw-bold px-5 py-3 rounded-pill shadow-lg" onClick={() => window.location.href = '/contact'}>
                            CLAIM FREE SURVEY
                        </Button>
                        <Button variant="outline-light" size="lg" className="px-4 py-3 rounded-pill" onClick={handleClose}>
                            No thanks, I hate savings
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ExitIntentPopup;
