import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      // Marcar como premium no localStorage
      localStorage.setItem('hasPremium', 'true');
      setVerified(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Pagamento Confirmado! 🎉</h1>
        <p className="text-gray-600 mb-6">
          {verified ? (
            <>
              Seu acesso premium foi ativado! Agora você pode baixar todos os vídeos gratuitamente.
            </>
          ) : (
            'Processando seu pagamento...'
          )}
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Começar a Baixar Vídeos
        </button>
      </div>
    </div>
  );
};

export default Success;
