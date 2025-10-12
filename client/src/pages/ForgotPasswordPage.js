import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import logo from '../assets/images/logo.png';
import '../styles/auth.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Add the auth-page class to the body for the background
  React.useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Link to="/" className="auth-logo-link">
          <img src={logo} alt="Sun Squad Solar" className="auth-logo" />
        </Link>
        <h2>Forgot Password</h2>
        <p className="auth-subtitle">Enter your email address below to receive a reset link.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        {message && <p className="auth-message success">{message}</p>}
        
        <Link to="/login" className="forgot-password">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;