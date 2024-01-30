import React from 'react';
import { useAuth } from '../hooks/useAuth';

function LoginForm() {
    const auth = useAuth();

    const handleLogin = async () => {
        try {
            await auth.login('username', 'password');
            console.log('Usuário logado!');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    const handleLogout = () => {
        auth.logout();
        console.log('Usuário deslogado.');
    };

    console.log(auth)

    return (
        <div>
            {auth.user ? (
                <div>
                    <p>Usuário logado!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
}

export default LoginForm;