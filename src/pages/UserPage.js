import { useState } from 'react';
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useAuth } from '../hooks/useAuth';

const User = () => {
    const auth = useAuth();
    const [typeLogin, setTypeLogin] = useState(true)

    function handleLogin() {
        setTypeLogin(!typeLogin)
    }

    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen bg-primary-400 text-text-50'>
            <div className='flex flex-col items-center justify-center bg-quaternary-400 p-8 md:p-20 rounded-3xl'>
                <div className="text-6xl font-bold pb-5">
                    Todo List
                </div>
                <div className='text-xl'>
                    Crie suas listas e organize o seu dia
                </div>

            </div>

            <div className='border-2 rounded-2xl p-4 mt-10 min-w-96'>
                {
                    typeLogin ?
                        (<LoginForm></LoginForm>)
                        :
                        (<RegisterForm></RegisterForm>)
                }
            </div>


            {!auth.user ? (
                <button onClick={handleLogin} className='mt-6 p-4 text-xl bg-tertiary-400 text-quaternary-400 rounded-3xl transition-all hover:rounded-xl hover:bg-tertiary-200'>
                    {
                        typeLogin ?
                            ("Cadastrar")
                            :
                            ("Fazer Login")
                    }
                </button>
            ) : (
                <div></div>
            )}


        </div>
    )
}

export default User;


