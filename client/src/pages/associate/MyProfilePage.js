import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import '../../styles/PageLayout.css';
function MyProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    // These fields are not editable but good to display
    associateId: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();
        setProfile(response.data);
      } catch (error) {
        setMessage('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Updating...');
    try {
      const response = await userService.updateProfile(profile);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Update failed.');
    }
  };

  if (loading) return <div>Loading Profile...</div>;

  return (
    <div className="page-container">
      <h1 className="page-header">Update Profile</h1>
      <div className="content-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Associate's ID:</label>
            <input type="text" value={profile.associateId || ''} readOnly disabled />
          </div>
          <div className="form-group">
            <label>Mobile No:</label>
            <input type="text" value={profile.phone || ''} readOnly disabled />
          </div>
          <div className="form-group">
            <label>Associate's Name:</label>
            <input type="text" name="name" value={profile.name || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={profile.email || ''} onChange={handleChange} />
          </div>
          <div className="form-group form-full-width">
            <label>Address:</label>
            <input type="text" name="address" value={profile.address || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Bank's Name:</label>
            <input type="text" name="bankName" value={profile.bankName || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>A/c No:</label>
            <input type="text" name="accountNumber" value={profile.accountNumber || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>IFSC Code:</label>
            <input type="text" name="ifscCode" value={profile.ifscCode || ''} onChange={handleChange} />
          </div>

          <button type="submit" className="form-button">Submit Changes</button>
          
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
export default MyProfilePage;