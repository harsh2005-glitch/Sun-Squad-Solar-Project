import React from 'react';

const WhatsAppWidget = () => {
    // Your company's WhatsApp number (international format without +)
    const phoneNumber = '919278450045'; 
    const defaultMessage = "Hi! I have a question about solar subsidies.";

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

    return (
        <a 
            href={whatsappURL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="whatsapp-widget-btn"
            aria-label="Chat on WhatsApp"
        >
            <i className="fa-brands fa-whatsapp"></i>
            <span className="whatsapp-tooltip">Chat with us!</span>
        </a>
    );
};

export default WhatsAppWidget;
