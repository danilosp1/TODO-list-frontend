import axios from 'axios';

const API_URL = 'http://localhost:3001/api/';

export const loginUser = async (credentials) => {
    return axios.post(`${API_URL}users/login`, credentials);
};

export const registerUser = async (userData) => {
    return axios.post(`${API_URL}users/register`, userData);
};

export const verifyToken = async (token) => {
    return axios.get(`${API_URL}users/verifyToken`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
