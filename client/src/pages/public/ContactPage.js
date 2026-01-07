import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import contactHeroImg from '../../assets/images/hero-image.jpg';
import './ContactPage.css';

// We define the API URL directly here since it's a simple, one-off service
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/contact`, formData);
            toast.success(response.data.message);
            // Clear the form on success
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message.');
        } finally {
            setLoading(false);
        }
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
                                    <span className="text-sun">Sun</span><span className="text-square">Square</span>
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
                                <form onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                                        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                                    </div>
                                    <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                                    <textarea name="message" rows="6" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
                                    <button type="submit" className="btn-submit-form" disabled={loading}>
                                        {loading ? 'Sending...' : 'Send Message'}
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