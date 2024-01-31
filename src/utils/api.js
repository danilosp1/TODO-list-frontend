import axios from 'axios';

const API_URL = 'http://localhost:3001/api/';

export const loginUser = async (credentials) => {
    return axios({
        method: 'post',
        url: API_URL + 'users/login',
        headers: {},
        data: credentials
    })
};

export const registerUser = async (userData) => {
    return axios({
        method: 'post',
        url: API_URL + 'users/register',
        headers: {},
        data: userData,
    })
};

export const verifyToken = async (token) => {
    return axios({
        method: 'get',
        url: API_URL + 'users/verifyToken',
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
};

export const fetchTodoLists = async () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('authId');
    try {
        const response = await axios({
            method: 'get',
            url: API_URL + 'todolists/' + userId,
            headers: {
            },
        })
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as Todo Lists:", error);
        throw error;
    }
};

export const fetchTodoItem = async (itemId) => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('authId');
    try {
        const response = await axios({
            method: 'get',
            url: API_URL + 'todoitems/' + userId,
            headers: {
            },
        })
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as Todo Lists:", error);
        throw error;
    }
};

export const fetchTodoItemsAll = async (listId) => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('authId');
    try {
        const response = await axios({
            method: 'get',
            url: API_URL + 'todoitems/list/' + listId,
            headers: {
            },
        })
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as Todo Lists:", error);
        throw error;
    }
};

export const updateTodoList = async (listId, itemsData) => {
    try {
        const response = await axios({
            method: 'put',
            url: API_URL + 'todoitems/' + listId,
            headers: {
            },
            data: itemsData
        })
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as Todo Lists:", error);
        throw error;
    }
}

