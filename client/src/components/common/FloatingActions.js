import React, { useState } from 'react';
import './FloatingElements.css';
import WhatsAppWidget from './WhatsAppWidget';
import QuoteModal from './QuoteModal';

const FloatingActions = () => {
    const [showQuoteModal, setShowQuoteModal] = useState(false);

    return (
        <>
            {/* The Sticky Side Button (Desktop mainly) */}
            <div className="sticky-quote-side-tab d-none d-md-block">
                <button className="side-quote-btn" onClick={() => setShowQuoteModal(true)}>
                    <i className="fa-solid fa-calculator"></i>
                    GET A FREE QUOTE
                </button>
            </div>

            {/* Bottom Right Floating Container */}
            <div className="floating-actions-container">
                {/* Mobile "Get Quote" Floating Button (Above WhatsApp) */}
                <button 
                    className="whatsapp-widget-btn bg-warning border-0 d-md-none mb-2 text-dark" 
                    onClick={() => setShowQuoteModal(true)}
                    style={{width: '50px', height: '50px'}}
                >
                    <i className="fa-solid fa-file-invoice-dollar fs-5"></i>
                </button>

                {/* WhatsApp Widget */}
                <WhatsAppWidget />
            </div>

            {/* The Quote Modal */}
            <QuoteModal show={showQuoteModal} handleClose={() => setShowQuoteModal(false)} />
        </>
    );
};

export default FloatingActions;
