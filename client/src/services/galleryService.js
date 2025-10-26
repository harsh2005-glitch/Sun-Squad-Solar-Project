import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// --- PUBLIC FUNCTION ---
// Fetches all items for the public-facing gallery page
const getPublicGallery = () => {
    return axios.get(`${API_BASE_URL}/gallery`);
};

// --- ADMIN FUNCTIONS ---
// Fetches all items for the admin management page
const getAdminGallery = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    return axios.get(`${API_BASE_URL}/admin/gallery`, config);
};

// Adds a new gallery item
const addGalleryItem = (formData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
        },
    };
    return axios.post(`${API_BASE_URL}/admin/gallery`, formData, config);
};

// Deletes a gallery item by its ID
const deleteGalleryItem = (itemId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    return axios.delete(`${API_BASE_URL}/admin/gallery/${itemId}`, config);
};


const galleryService = {
    getPublicGallery,
    getAdminGallery,
    addGalleryItem,
    deleteGalleryItem,
};

export default galleryService;