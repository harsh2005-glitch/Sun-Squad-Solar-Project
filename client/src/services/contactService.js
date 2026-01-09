import axios from 'axios';

// Create an instance of axios with the base URL
// Modify the baseURL based on your environment (dev/prod)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, formData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server Error');
  }
};

const contactService = {
  submitContactForm,
};

export default contactService;
