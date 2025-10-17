import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/admin/';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


// Function to get all users
const getAllUsers = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  return axios.get(`${API_BASE_URL}/admin/users`, config);
};

const addDeposit = (associateId, amount) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  // Send the associateId and amount in the request body
  return axios.post(`${API_BASE_URL}/admin/deposits`, { associateId, amount }, config);
};
const getDashboardStats = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.get(`${API_BASE_URL}/admin/dashboard`, config);
};

const getGenealogyTree = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.get(`${API_BASE_URL}/admin/genealogy`, config);
};

// Function to update a user's active status
const updateUserStatus = (userId, isActive) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.put(`${API_BASE_URL}/admin/users/${userId}/status`, { isActive }, config);
};

const addWithdrawal = (associateId, amount) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.post(`${API_BASE_URL}/admin/withdrawals`, { associateId, amount }, config);
};

const getTransactionHistory = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.get(`${API_BASE_URL}/admin/transactions`, config);
};


const adminService = {
  getAllUsers,
  addDeposit, // <-- Add the new function
  getDashboardStats,
  getGenealogyTree,
  updateUserStatus,
  addWithdrawal,
  getTransactionHistory,
};


export default adminService;