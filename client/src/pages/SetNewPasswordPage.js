import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { Alert } from 'react-bootstrap';
import '../styles/auth.css'; // Reuse auth styles

const SetNewPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await authService.setNewPassword(password);
      // Update local storage to remove the flag if you stored it, 
      // or just redirect to dashboard where the user is now fully active.
      // Ideally, we should update the user object in local storage to set resetRequired: false
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
          user.resetRequired = false;
          localStorage.setItem('user', JSON.stringify(user));
      }
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Set New Password</h2>
        <p className="auth-subtitle">Your password was reset by an admin. Please choose a new secure password.</p>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>New Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter new password"
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              placeholder="Confirm new password"
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Updating...' : 'Set Password & Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPasswordPage;
