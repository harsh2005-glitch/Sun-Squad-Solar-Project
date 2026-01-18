import React from 'react';
import './PartnersStrip.css';

const PartnersStrip = () => {
    // Partner names to display
    const partners = [
        "TATA POWER",
        "LUMINOUS",
        "HAVELLS",
        "ADANI SOLAR",
        "VIKRAM SOLAR",
        "MICROTEK",
        "UTL SOLAR"
    ];

    // Duplicate the list 3 times to ensure smooth infinite scrolling even on large screens
    const loopPartners = [...partners, ...partners, ...partners];

    return (
        <div className="partners-strip-container">
            <h5>Trusted By Industry Leaders</h5>
            <div className="partners-track">
                {loopPartners.map((partner, index) => (
                    <div className="partners-logo-item" key={index}>
                        {/* 
                          Ideally, replacing this text with <img> tags would be the next step.
                          For now, we use high-quality typography placeholders.
                        */}
                        {partner}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnersStrip;
