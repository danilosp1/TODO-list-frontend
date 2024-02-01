import { useAuth } from '../hooks/useAuth';
import { useNavigate  } from "react-router-dom";

const Header = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        console.log('Usuário deslogado.');
        navigate('/');
    };

    return (
        <div className="top-0 bg-tertiary-400 w-full h-32 flex items-center justify-between">
            <div className="text-quaternary-400 font-bold text-4xl ml-4">
                Suas To Do Lists
            </div>
            <button onClick={handleLogout} className="mr-4 py-4 px-8 hover:cursor-pointer text-xl bg-secondary-400 text-quaternary-400 rounded-3xl transition-all hover:rounded-xl hover:bg-secondary-200">Sair</button>
        </div>
    )
}

export default Header;