import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// --- PUBLIC FUNCTION ---
const getPublicAnnouncements = () => {
    return axios.get(`${API_BASE_URL}/announcements`);
};

// --- ADMIN FUNCTIONS ---
const getAdminAnnouncements = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    return axios.get(`${API_BASE_URL}/admin/announcements`, config);
};

const createAnnouncement = (formData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
        },
    };
    return axios.post(`${API_BASE_URL}/admin/announcements`, formData, config);
};

const deleteAnnouncement = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    return axios.delete(`${API_BASE_URL}/admin/announcements/${id}`, config);
};

// Note: The update function is more complex and can be added later if needed.
// For now, the admin can delete and re-create.

const announcementService = {
    getPublicAnnouncements,
    getAdminAnnouncements,
    createAnnouncement,
    deleteAnnouncement,
};

export default announcementService;