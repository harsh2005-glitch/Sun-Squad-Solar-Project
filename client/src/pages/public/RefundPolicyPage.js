import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import './LegalPages.css';

const RefundPolicyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page-container">
            <div className="legal-header">
                <Container>
                    <h1 className="fw-bold text-white">Refund & Cancellation Policy</h1>
                    <p className="text-white-50">Last Updated: January 2026</p>
                </Container>
            </div>
            
            <Container className="py-5">
                <Card className="border-0 shadow-sm p-4 p-md-5">
                    <div className="legal-content">
                        <section className="mb-4">
                            <h2>1. Booking & Deposits</h2>
                            <p>We may require a booking amount or deposit to schedule a site visit or initiate the procurement process for your solar installation project. This deposit marks your commitment to the project.</p>
                        </section>

                        <section className="mb-4">
                            <h2>2. Cancellation by Customer</h2>
                            <ul>
                                <li><strong>Before Site Visit/Procurement:</strong> If you cancel your order within 48 hours of booking and before any site visit or material procurement has begun, you may be eligible for a full refund of the deposit, minus a nominal processing fee.</li>
                                <li><strong>After Procurement Initiated:</strong> Once materials have been ordered or customized for your site, deposits are generally non-refundable to cover the costs incurred.</li>
                            </ul>
                        </section>

                        <section className="mb-4">
                            <h2>3. Refund Process</h2>
                            <p>If a refund is approved, it will be processed within 7-10 working days to the original method of payment. You will receive a confirmation email once the refund has been initiated.</p>
                        </section>

                        <section className="mb-4">
                            <h2>4. Warranty Claims</h2>
                            <p>Refunds are not applicable for installed systems. Issues with installed equipment are covered under the manufacturer's warranty and our service guarantee. Please refer to your installation contract for specific warranty terms.</p>
                        </section>
                        
                        <section className="mb-4">
                            <h2>5. Contact for Cancellations</h2>
                            <p>To request a cancellation or refund, please contact our support team immediately at sunsquadsolar4@gmail.com with your order details.</p>
                        </section>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default RefundPolicyPage;
