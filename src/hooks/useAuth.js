import { useState, useEffect, useContext, createContext } from 'react';
import * as api from '../utils/api';

const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await api.loginUser({ email, password });
            const { token, user } = response.data;
            localStorage.setItem('authToken', token); // Armazenando o token JWT
            setUser(user);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken'); // Removendo o token JWT
        setUser(null);
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                await api.verifyToken(token);
                setUser({ token });
            } catch (error) {
                localStorage.removeItem('authToken');
                setUser(null);
            }
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return {
        user,
        login,
        logout
    };
};

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
