import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import contactHeroImg from '../../assets/images/contactpage-image.jpg';
import './ContactPage.css';

// We define the API URL directly here since it's a simple, one-off service
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const companyWhatsAppNumber = '919278450045';
        const message = `*New Contact Enquiry*
---------------------
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*City:* ${formData.city}
*Message:* ${formData.message}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://api.whatsapp.com/send?phone=${companyWhatsAppNumber}&text=${encodedMessage}`;
        
        window.open(whatsappURL, '_blank');
        
        setFormData({ name: '', email: '', phone: '', city: '', message: '' });
    };

    return (
        <div className="contact-page-bg">
            <main>
                <section className="contact-hero-wrapper">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <span className="contact-badge">Get In Touch</span>
                                <h1 className="contact-hero-title display-4 fw-bold">
                                    Contact <br />
                                    <span className="text-sun">Sun</span><span className="text-square">Squad Solar</span>
                                </h1>
                                <p className="contact-hero-description">
                                    Ready to transform your energy future? Get in touch for a free consultation, site assessment, or any questions about our premium solar solutions.
                                </p>
                                <div className="d-flex flex-wrap gap-3">
                                    <button 
                                        onClick={() => document.querySelector('.contact-form-block').scrollIntoView({ behavior: 'smooth' })} 
                                        className="btn-send-message"
                                    >
                                        <i className="fa-regular fa-paper-plane btn-icon"></i> Send Message
                                    </button>
                                    <a href="tel:+919278450045" className="btn-call-now">
                                        <i className="fa-solid fa-phone btn-icon"></i> Call Now
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="contact-image-container">
                                    <div className="contact-image-wrapper">
                                        <img src={contactHeroImg} alt="Contact SunSquare" className="contact-hero-img" />
                                    </div>

                                    <div className="hero-float-card card-top-right">
                                        <div className="icon-box bg-green">
                                            <i className="fa-regular fa-clock"></i>
                                        </div>
                                        <div className="card-content">
                                            <h4 className="text-green">24/7</h4>
                                            <p>Support Available</p>
                                        </div>
                                    </div>

                                    <div className="hero-float-card card-bottom-left">
                                        <div className="icon-box bg-orange">
                                            <i className="fa-solid fa-bolt"></i>
                                        </div>
                                        <div className="card-content">
                                            <h4>Free</h4>
                                            <p>Site Assessment</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="contact-section">
                    <div className="container">
                        <h2 className="section-title">Send Us a Message</h2>
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
                                <div className="info-card">
                                    <i className="fa-solid fa-envelope"></i>
                                    <div>
                                        <h3>Email Us</h3>
                                        <p>sunsquadsolar4@gmail.com</p>
                                    </div>
                                </div>
                                <div className="info-card">
                                    <i className="fa-solid fa-phone"></i>
                                    <div>
                                        <h3>Call Us</h3>
                                        <p>+91 9278450045</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-form-block">
                                <form onSubmit={handleSubmit} className="p-4 bg-white rounded-4 shadow-sm">
                                    <div className="row mb-3">
                                        <div className="col-md-6 mb-3 mb-md-0">
                                            <label className="form-label fw-bold small text-success"><i className="fa-regular fa-user me-2"></i>Full Name</label>
                                            <input type="text" name="name" className="form-control form-control-lg bg-light border-0" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-success"><i className="fa-regular fa-envelope me-2"></i>Email Address</label>
                                            <input type="email" name="email" className="form-control form-control-lg bg-light border-0" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6 mb-3 mb-md-0">
                                            <label className="form-label fw-bold small text-success"><i className="fa-solid fa-phone me-2"></i>Phone Number</label>
                                            <input type="tel" name="phone" className="form-control form-control-lg bg-light border-0" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-success"><i className="fa-solid fa-location-dot me-2"></i>City</label>
                                            <input type="text" name="city" className="form-control form-control-lg bg-light border-0" placeholder="Your city" value={formData.city} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold small text-success"><i className="fa-regular fa-comment-dots me-2"></i>Your Message</label>
                                        <textarea name="message" className="form-control form-control-lg bg-light border-0" rows="5" placeholder="Tell us about your property, energy needs..." value={formData.message} onChange={handleChange} required></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-success w-100 py-3 fw-bold rounded-3">
                                        <i className="fa-regular fa-paper-plane me-2"></i> Send Message & Get Free Quote
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <section className="map-section">
                    <iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </section> */}
            </main>
        </div>
    );
};

export default ContactPage;