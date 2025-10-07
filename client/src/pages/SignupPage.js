import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To redirect the user
import authService from '../services/authService'; // Import our service
import './AuthPages.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [message, setMessage] = useState(''); // To display success/error messages
  const navigate = useNavigate();

  // This function updates the state when the user types in an input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // This function is called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from reloading
    setMessage(''); // Clear any previous messages

    try {
      const response = await authService.signup(
        formData.name,
        formData.email,
        formData.phone,
        formData.password
      );
      setMessage(response.data.message);
      // If signup is successful, automatically redirect to the login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      // If the API returns an error, display it
      setMessage(error.response?.data?.message || 'An error occurred during signup.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      {/* Display messages to the user here */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignupPage;