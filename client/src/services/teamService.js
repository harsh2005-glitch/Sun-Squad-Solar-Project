import axios from 'axios';

// Automatically choose the correct URL based on the environment (Development vs Production)
const API_URL = process.env.REACT_APP_API_URL || 
    (process.env.NODE_ENV === 'production' 
        ? 'https://sun-squad-solar.vercel.app/api' 
        : 'http://localhost:5000/api');

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

const getTeamMembers = async () => {
    const response = await api.get('/team');
    return response.data;
};

const addTeamMember = async (formData) => {
    // Note: formData should be an instance of FormData for file uploads
    const response = await api.post('/team', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

const deleteTeamMember = async (id) => {
    const response = await api.delete(`/team/${id}`);
    return response.data;
};

const teamService = {
    getTeamMembers,
    addTeamMember,
    deleteTeamMember
};

export default teamService;
