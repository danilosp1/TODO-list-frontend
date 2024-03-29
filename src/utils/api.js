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
                Authorization: `Bearer ${token}`
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
            url: API_URL + 'todoitems/' + itemId,
            headers: {
                Authorization: `Bearer ${token}`
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
                Authorization: `Bearer ${token}`
            },
        })
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar os Todo Items:", error);
        throw error;
    }
};

export const fetchTodoList = async (listId) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios({
            method: 'get',
            url: API_URL + 'todoitems/' + listId + '/unique/',
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        return response.data
    } catch (error) {
        console.error("Erro ao buscar a Todo List:", error);
        throw error;
    }
}

export const updateTodoList = async (listId, itemsData) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios({
            method: 'put',
            url: API_URL + 'todolists/' + listId,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: itemsData
        })
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as Todo Lists:", error);
        throw error;
    }
}

export const createTodoList = async (listData) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios({
            method: 'post',
            url: API_URL + 'todolists/',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: listData
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateTodoitem = async (listId, itemsData) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios({
            method: 'put',
            url: API_URL + 'todoitems/' + listId,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: itemsData
        })
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar as Todo Lists:", error);
        throw error;
    }
}

export const updateTodoListOrder = async (listId, itemIds) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios({
            method: 'post',
            url: API_URL + 'todolists/' + listId + '/updateOrder',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: itemIds
        })
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTodoList = async (listId) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios({
            method: 'delete',
            url: API_URL + 'todolists/' + listId,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        throw error;
    }
}

export const deleteTodoTask = async (itemId) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios({
            method: 'delete',
            url: API_URL + 'todoitems/' + itemId,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createTodoTask = async (itemsData) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios({
            method: 'post',
            url: API_URL + 'todoitems/',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: itemsData
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}