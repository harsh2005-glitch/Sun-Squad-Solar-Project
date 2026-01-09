import React, { useState } from 'react';
import { Modal, Button, Form, ProgressBar, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './EligibilityModal.css';

const EligibilityModal = ({ show, handleClose }) => {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({
        roofType: '',
        ownership: '',
        avgBill: ''
    });
    
    // Total steps = 3 questions + 1 result
    const totalSteps = 4;

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleSelect = (key, value) => {
        setAnswers({ ...answers, [key]: value });
        // Auto advance after slight delay for better UX
        setTimeout(() => {
            handleNext();
        }, 300);
    };

    const resetQuiz = () => {
        setStep(1);
        setAnswers({ roofType: '', ownership: '', avgBill: '' });
    };

    const renderStep1 = () => (
        <div className="quiz-step animate__animated animate__fadeIn">
            <h4 className="fw-bold text-center mb-4">What type of roof do you have?</h4>
            <div className="d-grid gap-3">
                <Button variant="outline-dark" size="lg" className="quiz-option" onClick={() => handleSelect('roofType', 'Concrete/Flat')}>
                    <i className="fa-solid fa-layer-group me-2"></i> Concrete / Flat Roof
                </Button>
                <Button variant="outline-dark" size="lg" className="quiz-option" onClick={() => handleSelect('roofType', 'Slanted/Metal')}>
                    <i className="fa-solid fa-house-chimney-window me-2"></i> Slanted / Metal Shed
                </Button>
                <Button variant="outline-dark" size="lg" className="quiz-option" onClick={() => handleSelect('roofType', 'No Roof')}>
                     <i className="fa-solid fa-building me-2"></i> Apartment / No Roof Access
                </Button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="quiz-step animate__animated animate__fadeIn">
             <h4 className="fw-bold text-center mb-4">Do you own the property?</h4>
             <div className="d-grid gap-3">
                <Button variant="outline-dark" size="lg" className="quiz-option" onClick={() => handleSelect('ownership', 'Owned')}>
                    <i className="fa-solid fa-key me-2"></i> Yes, I own it
                </Button>
                <Button variant="outline-dark" size="lg" className="quiz-option" onClick={() => handleSelect('ownership', 'Rented')}>
                    <i className="fa-solid fa-file-contract me-2"></i> No, I rent it
                </Button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="quiz-step animate__animated animate__fadeIn">
            <h4 className="fw-bold text-center mb-4">What's your average monthly electricity bill?</h4>
            <div className="d-grid gap-3">
                <Button variant="outline-dark" size="lg" className="quiz-option" onClick={() => handleSelect('avgBill', 'Less than 1500')}>
                    Less than ₹1,500
                </Button>
                <Button variant="outline-dark" size="lg" className="quiz-option" onClick={() => handleSelect('avgBill', '1500-4000')}>
                    ₹1,500 - ₹4,000
                </Button>
                 <Button variant="outline-dark" size="lg" className="quiz-option" onClick={() => handleSelect('avgBill', '4000+')}>
                    More than ₹4,000
                </Button>
            </div>
        </div>
    );

    const renderResult = () => {
        let isEligible = true;
        let message = "Your home is a great candidate for solar! You could save significantly on your electricity bills.";

        if (answers.roofType === 'No Roof') {
            isEligible = false;
            message = "Since you don't have roof access, rooftop solar might not be feasible directly. However, you might assume community solar options.";
        } else if (answers.ownership === 'Rented') {
            isEligible = false; // Usually need owner permission
            message = "As a renter, you'll need your landlord's permission to install solar panels. We can help you pitch it to them!";
        } else if (answers.avgBill === 'Less than 1500') {
             // Eligible but low ROI
             message = "You are eligible! However, since your bill is low, your savings might be smaller. A smaller off-grid system might be suitable.";
        }

        return (
            <div className="text-center animate__animated animate__zoomIn">
                <div className="mb-3">
                    {isEligible ? (
                        <div className="result-icon-wrapper bg-success text-white mx-auto shadow">
                            <i className="fa-solid fa-check"></i>
                        </div>
                    ) : (
                         <div className="result-icon-wrapper bg-warning text-white mx-auto shadow">
                            <i className="fa-solid fa-exclamation"></i>
                        </div>
                    )}
                </div>
                
                <h3 className="fw-bold mb-3">{isEligible ? "You're Eligible!" : "It Might Be Tricky"}</h3>
                <p className="text-muted mb-4 px-4">{message}</p>

                <div className="d-grid gap-2">
                    <Button as={Link} to="/contact" variant="success" size="lg" onClick={handleClose}>
                        Get Your Free Quote
                    </Button>
                    <Button as={Link} to="/calculator" variant="outline-primary" onClick={handleClose}>
                        Calculate Exact Savings
                    </Button>
                </div>
                <div className="mt-3">
                     <Button variant="link" className="text-muted text-decoration-none small" onClick={resetQuiz}>Start Over</Button>
                </div>
            </div>
        );
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="md" className="eligibility-modal">
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-bold w-100 text-center ps-4">
                     {step < 4 && "Check Your Eligibility"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4 p-md-5">
                {step < 4 && (
                    <div className="mb-4">
                        <ProgressBar 
                            now={(step / 3) * 100} 
                            variant="success" 
                            style={{height: '6px', borderRadius: '10px'}} 
                        />
                        <div className="text-end small text-muted mt-1">Step {step} of 3</div>
                    </div>
                )}

                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderResult()}

            </Modal.Body>
        </Modal>
    );
};

export default EligibilityModal;
