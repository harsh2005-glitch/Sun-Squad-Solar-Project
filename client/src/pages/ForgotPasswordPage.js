import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import logo from '../assets/images/logo.png';
import '../styles/auth.css';
import { Alert } from 'react-bootstrap';

const ForgotPasswordPage = () => {
  const [associateId, setAssociateId] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await authService.requestPasswordReset(associateId, phone);
      setMessage('Your request has been sent to the admin. Please wait for approval.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send request. Please check your details.');
    } finally {
      setLoading(false);
    }
  };
  
  // Add the auth-page class to the body
  React.useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Link to="/" className="auth-logo-link"><img src={logo} alt="Logo" className="auth-logo" /></Link>
        <h2>Request Password Reset</h2>
        <p className="auth-subtitle">Enter your Associate ID and Phone Number to request a password reset from the admin.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="associateId">Associate ID</label>
            <input 
              type="text" 
              id="associateId" 
              value={associateId} 
              onChange={(e) => setAssociateId(e.target.value)} 
              required 
              placeholder="Enter your Associate ID"
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="text" 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
              placeholder="Enter your registered phone number"
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Sending Request...' : 'Send Request'}
          </button>
        </form>
        {message && <Alert variant="success" className="mt-3">{message}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        <Link to="/login" className="forgot-password">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;