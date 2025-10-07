import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import logo from '../assets/images/logo.png';
import '../styles/auth.css'; // Ensure the new auth styles are imported

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      await authService.signup(formData.name, formData.email, formData.phone, formData.password);
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    document.body.classList.add('auth-page');
    return () => document.body.classList.remove('auth-page');
  }, []);

  return (
    <div className="auth-container">
      {/* Use the simpler 'auth-card' class for the container */}
      <div className="auth-card"> 
        <Link to="/" className="auth-logo-link">
          <img src={logo} alt="Sun Squad Solar" className="auth-logo" />
        </Link>
        <h2>New Associate Registration</h2>
        <p className="auth-subtitle">Create your account to get started.</p>
        
        <form onSubmit={handleSubmit}>
          {/* --- NEW SIMPLIFIED STRUCTURE --- */}
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Create Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        {message && <p className={`auth-message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
      </div>

      <div className="top-right-link">
        {/* --- Changed btn-login-alt to btn-register for consistency --- */}
        <Link to="/login" className="btn-register">Already Registered? Login</Link>
      </div>
    </div>
  );
};

export default SignupPage;