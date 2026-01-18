import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import './LegalPages.css';

const TermsServicePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page-container">
            <div className="legal-header">
                <Container>
                    <h1 className="fw-bold text-white">Terms of Service</h1>
                    <p className="text-white-50">Last Updated: January 2026</p>
                </Container>
            </div>
            
            <Container className="py-5">
                <Card className="border-0 shadow-sm p-4 p-md-5">
                    <div className="legal-content">
                        <section className="mb-4">
                            <h2>1. Acceptance of Terms</h2>
                            <p>By accessing and using the Sun Squad Solar website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                        </section>

                        <section className="mb-4">
                            <h2>2. Services Description</h2>
                            <p>Sun Squad Solar provides solar energy solutions, installation services, and consultation ("Services"). We reserve the right to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>
                        </section>

                        <section className="mb-4">
                            <h2>3. User Responsibilities</h2>
                            <p>When inquiring about our services or submitting data for calculations:</p>
                            <ul>
                                <li>You agree to provide accurate, current, and complete information.</li>
                                <li>You are responsible for maintaining the confidentiality of any account information if applicable.</li>
                                <li>You agree not to use the service for any illegal or unauthorized purpose.</li>
                            </ul>
                        </section>

                        <section className="mb-4">
                            <h2>4. Intellectual Property</h2>
                            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Sun Squad Solar and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Sun Squad Solar.</p>
                        </section>

                        <section className="mb-4">
                            <h2>5. Limitation of Liability</h2>
                            <p>In no event shall Sun Squad Solar, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
                        </section>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default TermsServicePage;
