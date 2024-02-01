import { useState, useEffect, useContext, createContext } from 'react';
import * as api from '../utils/api';

const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    // Responsável pelo login do usuário
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

    // Responsável pelo logout do usuário
    const logout = () => {
        localStorage.removeItem('authToken'); // Removendo o token JWT
        localStorage.removeItem('authId'); // Removendo o token JWT
        setUser(null);
    };

    // Responsável por chegar o token de autorização
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
