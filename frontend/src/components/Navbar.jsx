import { useNavigate } from 'react-router-dom';
import { Video, Settings } from 'lucide-react';

const Navbar = ({ showAdmin = false }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <Video className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Meu Vídeo do Dia</h1>
          </div>
          
          {showAdmin && (
            <button
              onClick={() => navigate(showAdmin === 'home' ? '/admin' : '/')}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
            >
              <Settings className="w-5 h-5" />
              <span>{showAdmin === 'home' ? 'Admin' : 'Início'}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
