import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate  } from "react-router-dom";

function LoginForm() {
    const auth = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Handler para login do usuário
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await auth.login(username, password);
            console.log('Usuário logado!');
            navigate("/todo");
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    // Handler para logout do usuário
    const handleLogout = () => {
        auth.logout();
        console.log('Usuário deslogado.');
    };

    return (
        <div className='w-full flex items-center justify-center'>
            {auth.user ? (
                <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='text-xl'>
                        Você já está logado!
                    </div>
                    <a href="/todo" className='p-4 text-xl bg-secondary-400 text-quaternary-400 rounded-3xl transition-all hover:rounded-xl hover:bg-secondary-200'>Acessar Todo Lists</a>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center gap-4 text-quaternary-400'>
                    <div className='text-text-50 font-bold text-xl mb-4'>
                        Faça login para acessar as suas listas
                    </div>
                    <form onSubmit={handleLogin} className='flex flex-col items-center justify-center gap-4'>
                        <div className='w-[100%]'>
                            <div className='text-text-50 font-bold'>Usuário</div>
                            <input onChange={(e) => setUsername(e.target.value)} value={username} className='p-3 rounded-2xl focus:rounded-lg transition-all outline-none' type="text" />
                        </div>

                        <div className='w-[100%]'>
                            <div className='text-text-50 font-bold'>Senha</div>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className='p-3 rounded-2xl focus:rounded-lg transition-all outline-none'  type="password" />
                        </div>

                        <input type="submit" value="Login" className='mt-6 py-4 px-8 hover:cursor-pointer text-xl bg-secondary-400 text-quaternary-400 rounded-3xl transition-all hover:rounded-xl hover:bg-secondary-200' />
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginForm;