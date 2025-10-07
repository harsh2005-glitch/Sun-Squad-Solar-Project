import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './AuthPages.css';
function LoginPage() {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
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
      const response = await authService.login(formData.phone, formData.password);
      
      console.log('Login successful!', response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // --- NEW LOGIC HERE ---
      // Check the user's role from the response
      if (response.data.role === 'admin') {
        navigate('/admin/dashboard'); // Redirect admins
      } else if (response.data.onboardingRequired) {
        navigate('/onboarding');
      } else {
        navigate('/app/dashboard'); // Redirect associates
      }

    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
     <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
        {message && (
            <p className={`auth-message ${
                message.includes('successful') ? 'success' : 'error'
            }`}>
                {message}
            </p>
        )}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;