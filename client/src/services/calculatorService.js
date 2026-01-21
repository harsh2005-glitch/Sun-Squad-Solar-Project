import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE_URL}/calculator`;

// Admin Methods
const getItems = async (type) => { // type: 'panel', 'inverter', 'battery', 'wire', 'installation'
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/${type}`, {
        headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
};

const addItem = async (type, itemData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post(`${API_URL}/${type}`, itemData, {
        headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
};

const updateItem = async (type, id, itemData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.put(`${API_URL}/${type}/${id}`, itemData, {
        headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
};

const deleteItem = async (type, id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.delete(`${API_URL}/${type}/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
};

// Public Methods
const getActiveComponents = async () => {
    const response = await axios.get(`${API_URL}/public/data`);
    return response.data;
};

const calculatorService = {
    getItems,
    addItem,
    updateItem,
    deleteItem,
    getActiveComponents
};

export default calculatorService;
