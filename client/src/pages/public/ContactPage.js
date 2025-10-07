import React from 'react';

const ContactPage = () => {
  // We will add form handling logic here later
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!"); // Placeholder
  };

  return (
    // Add the className to the body tag in your main App or index file if needed
    // For now, we'll wrap it in a div that can be styled
    <div className="contact-page-bg">
      <main>
        <section className="contact-section">
          <div className="container">
            <h2 className="section-title">Get In Touch</h2>
            <div className="title-underline"></div>
            <p className="section-subtitle">Have a question? We'd love to hear from you. Contact us, and we’ll get back to you shortly.</p>

            <div className="contact-content-wrapper">
              <div className="contact-info-block">
                <div className="info-card">
                  <i className="fa-solid fa-location-dot"></i>
                  <div>
                    <h3>Our Office</h3>
                    <p>Sant Nagar Colony, Baraipur, Chitaipur<br />Varanasi, 221106</p>
                  </div>
                </div>
                {/* ... other info cards ... */}
              </div>

              <div className="contact-form-block">
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                  </div>
                  <input type="text" name="subject" placeholder="Subject" required />
                  <textarea name="message" rows="6" placeholder="Your Message" required></textarea>
                  <button type="submit" className="btn-submit-form">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="map-section">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.206116901794!2d82.96070707516577!3d25.26365087766825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e332fdf328f73%3A0x1a5c35f7c55c3ffa!2sSUN%20SQUAD%20SOLAR!5e0!3m2!1sen!2sin!4v1759347768628!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;