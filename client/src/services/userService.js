import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/users/';
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
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

// Function to upload a new profile picture
const uploadProfilePicture = (imageFile) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const formData = new FormData();
    formData.append('profileImage', imageFile);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
        },
    };

    // Use the correctly defined base URL here
    return axios.put(`${API_BASE_URL}/users/profile/picture`, formData, config);
};

// Function to upload bank document
const uploadBankDocument = (file) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user.token}`,
    },
  };
  const formData = new FormData();
  formData.append('bankDocument', file); // The name must match the backend route
  return axios.put(`${API_BASE_URL}/users/profile/bank-document`, formData, config);
};
const uploadAadharCard = (file) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user.token}`,
    },
     };
    const formData = new FormData();
    formData.append('aadharCard', file); // Name must match backend
    return axios.put(`${API_BASE_URL}/users/profile/aadhar-card`, formData, config);
};

const uploadPanCard = (file) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user.token}`,
    },
    };
    const formData = new FormData();
    formData.append('panCard', file); // Name must match backend
    return axios.put(`${API_BASE_URL}/users/profile/pan-card`, formData, config);
};

// Function to get the logged-in user's genealogy tree
const getGenealogyTree = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = { headers: { Authorization: `Bearer ${user.token}` } };
  return axios.get(`${API_BASE_URL}/users/genealogy`, config);
};

const getPayoutDetails = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    return axios.get(`${API_BASE_URL}/users/payout-details`, config);
};

const changePassword = (oldPassword, newPassword) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    return axios.put(`${API_BASE_URL}/users/profile/changepassword`, { oldPassword, newPassword }, config);
};

const getIncomeChartData = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    return axios.get(`${API_BASE_URL}/users/charts/income`, config);
};

const getTeamContributionData = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    return axios.get(`${API_BASE_URL}/users/charts/team-contribution`, config);
};


const userService = {
  getDashboardData,
  getDirects,
  getProfile,
  updateProfile,
  getCommissions,
  uploadProfilePicture,
  uploadBankDocument,
  uploadAadharCard,
  uploadPanCard,
  getGenealogyTree,
  getPayoutDetails,
  changePassword,
   getIncomeChartData,
  getTeamContributionData,
};

export default userService;