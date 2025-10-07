import axios from 'axios';

// The base URL of our backend API
// const API_URL = 'http://localhost:5000/api/auth/';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// Function to handle user signup
const signup = (name, email, phone, password) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, { name, email, phone, password });
};

// Function to handle user login
const login = (phone, password) => {
  return axios.post(`${API_BASE_URL}/auth/login`, { phone, password });
};

const completeOnboarding = (onboardingData) => {
  // 1. Get the user object (with the token) from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // 2. Create the request configuration, including the authorization header
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`, // This is how we send the token
    },
  };

  // 3. Make the protected API call
  return axios.post(`${API_BASE_URL}/auth/complete-onboarding`, onboardingData, config);
};
// We create an object to export all our functions
const authService = {
  signup,
  login,
  completeOnboarding,
};

export default authService;