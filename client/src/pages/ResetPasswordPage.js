import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import logo from '../assets/images/logo.png';
import '../styles/auth.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { token } = useParams(); // <-- Gets the token from the URL (e.g., /resetpassword/THIS_PART)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        setLoading(false);
        return;
    }

    try {
      const response = await authService.resetPassword(token, password);
      setMessage(response.data.message);
      // Redirect to login after a short delay
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
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
        <Link to="/" className="auth-logo-link">
          <img src={logo} alt="Sun Squad Solar" className="auth-logo" />
        </Link>
        <h2>Reset Your Password</h2>
        <p className="auth-subtitle">Enter your new password below.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        
        {message && <p className="auth-message success">{message}</p>}
        {error && <p className="auth-message error">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;