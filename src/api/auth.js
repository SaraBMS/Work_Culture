import axios from 'axios';

const API_URL = 'http://localhost:3200/api/auth';

export const register = async (email, password) => {
    return await axios.post(`${API_URL}/register`, { email, password });
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data.token;
};
