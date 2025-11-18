import { useState, useEffect } from 'react';
import { AdMobService } from '../services/admob';
import { Video } from 'lucide-react';

const AdSplashScreen = ({ onComplete }) => {
  const [status, setStatus] = useState('loading'); // loading, watching, error
  const [message, setMessage] = useState('Carregando anúncio...');

  useEffect(() => {
    loadAd();
    
    // Cleanup listeners ao desmontar
    return () => {
      AdMobService.removeListeners();
    };
  }, []);

  const loadAd = async () => {
    setStatus('loading');
    setMessage('Preparando anúncio...');

    // Pequeno delay para mostrar a tela de loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    setStatus('watching');
    setMessage('Exibindo anúncio de abertura...');

    // Carregar e exibir App Open Ad
    AdMobService.loadAndShowAppOpenAd((success) => {
      if (success) {
        setMessage('Anúncio concluído! Abrindo app...');
        setTimeout(() => onComplete(), 1000);
      } else {
        // Se falhar, permite continuar mesmo assim
        setStatus('error');
        setMessage('Não foi possível carregar o anúncio');
        setTimeout(() => onComplete(), 2000);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center z-50">
      <div className="text-center text-white px-8">
        {/* Logo/Ícone */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 animate-pulse">
            <Video className="w-16 h-16" />
          </div>
        </div>

        {/* Nome do App */}
        <h1 className="text-4xl font-bold mb-4">Video +18</h1>

        {/* Status Message */}
        <p className="text-xl mb-6">{message}</p>

        {/* Loading Spinner */}
        {status === 'loading' && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {/* Watching Indicator */}
        {status === 'watching' && (
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-sm text-white/80">Aguarde 30 segundos</p>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div>
            <p className="text-sm text-white/80">Continuando sem anúncio...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdSplashScreen;
