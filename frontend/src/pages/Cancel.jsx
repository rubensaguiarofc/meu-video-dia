import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Pagamento Cancelado</h1>
        <p className="text-gray-600 mb-6">
          Você cancelou o processo de pagamento. Não se preocupe, você ainda pode tentar novamente!
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Voltar para a Página Inicial
        </button>
      </div>
    </div>
  );
};

export default Cancel;
