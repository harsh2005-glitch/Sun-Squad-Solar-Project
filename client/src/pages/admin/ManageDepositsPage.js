import React, { useState } from 'react';
import adminService from '../../services/adminService';
import '../../styles/PageLayout.css';

function ManageDepositsPage() {
  const [formData, setFormData] = useState({
    associateId: '',
    amount: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!formData.associateId || !formData.amount) {
        setError('Both fields are required.');
        return;
    }

    try {
      const response = await adminService.addDeposit(formData.associateId, formData.amount);
      setMessage(response.data.message);
      // Clear form on success
      setFormData({ associateId: '', amount: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add deposit.');
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Manage Deposits</h1>
      <div className="content-box">
        <p style={{ marginBottom: '1.5rem', color: '#555' }}>
          Add a new deposit record for an associate. This will automatically update their business numbers and calculate commissions.
        </p>
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
          <div className="form-group">
            <label>Associate ID:</label>
            <input
              type="text"
              name="associateId"
              value={formData.associateId}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Deposit Amount (Rs.):</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="form-button" style={{ marginTop: '1rem' }}>Add Deposit</button>
          
          {message && <p className="form-message" style={{ color: 'green' }}>{message}</p>}
          {error && <p className="form-message" style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default ManageDepositsPage;