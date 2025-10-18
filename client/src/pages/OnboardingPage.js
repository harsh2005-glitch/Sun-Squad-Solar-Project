import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './AuthPages.css';

function OnboardingPage() {
  const [formData, setFormData] = useState({
    sponsorId: '',
    address: '',
    // bankName: '',
    // accountNumber: '',
    // ifscCode: '',
      aadharNumber: '',
    panNumber: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await authService.completeOnboarding(formData);
      setMessage(response.data.message);
      
      // Onboarding complete, redirect to the main app dashboard
      setTimeout(() => {
        // We will build this page in the next phase
        navigate('/app/dashboard');
      }, 2000);

    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="auth-container">
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Complete Your Profile</h2>
      <p style={{textAlign: 'center', marginBottom: '1.5rem', color: '#555'}}>
          Provide your details to activate your account.
      </p>
        <div className="form-group">
          <label>Sponsor ID:</label>
          <input
            type="text"
            name="sponsorId"
            value={formData.sponsorId}
            onChange={handleChange}
            required
          />
        </div>
         <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
         {/* <div className="form-group">
          <label>Bank Name:</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            required
          />
        </div>
         <div className="form-group">
          <label>Account Number:</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
         <div className="form-group">
          <label>IFSC Code:</label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="form-group">
                <label>Aadhar Card Number:</label>
                <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>PAN Card Number:</label>
                <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} required />
            </div>
        <button type="submit" className="auth-button">Complete Profile</button>
        {message && (
              <p className={`auth-message ${
                  message.includes('successful') ? 'success' : 'error'
              }`}>
                  {message}
              </p>
          )}
      </form>
      
    </div>
  );
}

export default OnboardingPage;