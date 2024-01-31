import { useState, useEffect, useContext, createContext } from 'react';
import * as api from '../utils/api';

const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const login = async (usuario, pass) => {
        try {
            const response = await api.loginUser({ username: usuario, password: pass });
            const { token, id } = response.data;
            localStorage.setItem('authToken', token); // Armazenando o token JWT
            localStorage.setItem('authId', id); // Armazenando o token JWT
            setUser("logged");
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken'); // Removendo o token JWT
        localStorage.removeItem('authId'); // Removendo o token JWT
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
