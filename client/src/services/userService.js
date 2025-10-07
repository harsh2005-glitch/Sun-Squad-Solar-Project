import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/users/';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


// Function to get dashboard data
const getDashboardData = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  return axios.get(`${API_BASE_URL}/users/dashboard`, config);
};
const getDirects = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.get(`${API_BASE_URL}/users/directs`, config);
};

const getProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.get(`${API_BASE_URL}/users/profile`, config);
};

// Function to update user profile data
const updateProfile = (profileData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.put(`${API_BASE_URL}/users/profile`, profileData, config);
};

const getCommissions = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.get(`${API_BASE_URL}/users/commissions`, config);
};

const userService = {
  getDashboardData,
  getDirects,
  getProfile,
  updateProfile,
  getCommissions,
};

export default userService;