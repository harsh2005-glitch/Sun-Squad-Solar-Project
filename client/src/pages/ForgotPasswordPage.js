import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Import the Firebase auth instance and the specific function we need
import { auth } from '../firebase/config';
import { sendPasswordResetEmail } from "firebase/auth";

import logo from '../assets/images/logo.png';
import '../styles/auth.css';
import { Alert } from 'react-bootstrap';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      // --- THIS IS THE CORE FIREBASE LOGIC ---
      await sendPasswordResetEmail(auth, email);
      
      setMessage('A password reset link has been sent to your email address. Please check your inbox (and spam folder).');
    } catch (err) {
      // Handle common Firebase errors
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
      console.error("Firebase Password Reset Error:", err);
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
        <h2>Forgot Password</h2>
        <p className="auth-subtitle">Enter your registered email address to receive a reset link.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
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