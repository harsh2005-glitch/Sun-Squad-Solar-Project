import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingElements.css';
import WhatsAppWidget from './WhatsAppWidget';
import QuoteModal from './QuoteModal';

const FloatingActions = () => {
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            {/* The Sticky Side Button (Desktop mainly) */}
            <div className="sticky-quote-side-tab d-none d-md-block">
                <button className="side-quote-btn" onClick={() => setShowQuoteModal(true)}>
                    <i className="fa-solid fa-file-invoice-dollar"></i>
                    GET QUOTE
                </button>
            </div>

            {/* Bottom Right Floating Container */}
            <div className="floating-actions-container">
                
                {/* 1. Solar Calculator Floating Button */}
                <button 
                    className="floating-action-btn calculator-btn mb-2" 
                    onClick={() => navigate('/calculator')}
                    title="Calculate Cost"
                >
                    <i className="fa-solid fa-calculator"></i>
                     <span className="tooltip-text">Calculator</span>
                </button>

                 {/* 2. Mobile Look "Get Quote" Button (Hidden on Desktop) */}
                 <button 
                    className="floating-action-btn quote-mobile-btn d-md-none mb-2" 
                    onClick={() => setShowQuoteModal(true)}
                    title="Get a Quote"
                >
                    <i className="fa-solid fa-file-invoice-dollar"></i>
                </button>

                {/* 3. WhatsApp Widget */}
                <WhatsAppWidget />
            </div>

            {/* The Quote Modal */}
            <QuoteModal show={showQuoteModal} handleClose={() => setShowQuoteModal(false)} />
        </>
    );
};

export default FloatingActions;
