import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/authService';
import logo from '../assets/images/logo.png';
import '../styles/auth.css';
import { Button } from 'react-bootstrap';

const LoginPage = () => {
  const [formData, setFormData] = useState({ phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login(formData.phone, formData.password);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      if (response.data.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (response.data.onboardingRequired) {
        navigate('/onboarding');
      } else {
        navigate('/app/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during login.');
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
      <div className="auth-card">
        <Link to="/" className="auth-logo-link">
          <img src={logo} alt="Sun Squad Solar" className="auth-logo" />
        </Link>
        <h2>Customer Login</h2>
        <p className="auth-subtitle">Login with your phone number and password below.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="phone">User ID (Phone)</label>
            <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <Button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Continue'}
          </Button>
        </form>
        
        <Link to="/forgot-password" className="forgot-password">Forgot Password</Link>
      </div>
      
      <div className="top-right-link">
        <Link to="/signup" className="btn-register">New Registration</Link>
      </div>
    </div>
  );
};

export default LoginPage;