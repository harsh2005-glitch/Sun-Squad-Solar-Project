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

const addDeposit = (associateId, amount ,description) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  // Send the associateId and amount in the request body
  return axios.post(`${API_BASE_URL}/admin/deposits`, { associateId, amount , description}, config);
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

const addWithdrawal = (associateId, amount , description) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.post(`${API_BASE_URL}/admin/withdrawals`, { associateId, amount , description}, config);
};

const getTransactionHistory = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.get(`${API_BASE_URL}/admin/transactions`, config);
};

// Function to get a single user's full details
const getUserById = (userId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.get(`${API_BASE_URL}/admin/users/${userId}`, config);
};

const impersonateUser = (userId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  // Note: We use a POST request even though we're not sending a body,
  // as it's an action that changes the session state.
  return axios.post(`${API_BASE_URL}/admin/impersonate/${userId}`, null, config);
};

const resetUserPassword = (userId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.put(`${API_BASE_URL}/admin/users/${userId}/reset-password`, null, config);
};


const adminService = {
  getAllUsers,
  addDeposit, 
  getDashboardStats,
  getGenealogyTree,
  updateUserStatus,
  addWithdrawal,
  getTransactionHistory,
  getUserById,
  impersonateUser,
  resetUserPassword,
};


export default adminService;