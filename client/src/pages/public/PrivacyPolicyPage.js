import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './LegalPages.css';

const PrivacyPolicyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page-container">
            <div className="legal-header">
                <Container>
                    <h1 className="fw-bold text-white">Privacy Policy</h1>
                    <p className="text-white-50">Last Updated: January 2026</p>
                </Container>
            </div>
            
            <Container className="py-5">
                <Card className="border-0 shadow-sm p-4 p-md-5">
                    <div className="legal-content">
                        <section className="mb-4">
                            <h2>1. Introduction</h2>
                            <p>Welcome to Sun Squad Solar ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                        </section>

                        <section className="mb-4">
                            <h2>2. Information We Collect</h2>
                            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                            <ul>
                                <li><strong>Identity Data:</strong> includes first name, last name, and title.</li>
                                <li><strong>Contact Data:</strong> includes email address, telephone number, and installation address.</li>
                                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, and operating system.</li>
                                <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
                            </ul>
                        </section>

                        <section className="mb-4">
                            <h2>3. How We Use Your Data</h2>
                            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                            <ul>
                                <li>To process your inquiry for solar installation.</li>
                                <li>To manage our relationship with you.</li>
                                <li>To improve our website, products/services, marketing or customer relationships.</li>
                                <li>To verify eligibility for government subsidies (e.g., PM Surya Ghar Yojana).</li>
                            </ul>
                        </section>

                        <section className="mb-4">
                            <h2>4. Data Security</h2>
                            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors who have a business need to know.</p>
                        </section>

                        <section className="mb-4">
                            <h2>5. Contact Us</h2>
                            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                            <p className="mb-0"><strong>Sun Squad Solar</strong></p>
                            <p className="mb-0">Email: sunsquadsolar4@gmail.com</p>
                            <p>Phone: +91 92784 50045</p>
                        </section>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default PrivacyPolicyPage;
