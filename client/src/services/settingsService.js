import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Function to get the current settings
const getSettings = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.get(`${API_BASE_URL}/settings`, config);
};

// Function to update the settings
const updateSettings = (settingsData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.put(`${API_BASE_URL}/settings`, settingsData, config);
};

// Function to update the notice
const updateNotice = (noticeMessage) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.put(`${API_BASE_URL}/settings/notice`, { noticeMessage }, config);
};

const settingsService = {
  getSettings,
  updateSettings,
  updateNotice,
};

export default settingsService;