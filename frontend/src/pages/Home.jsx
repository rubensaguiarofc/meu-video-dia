import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import AdSplashScreen from '../components/AdSplashScreen';
import { Download, Eye, Lock, CreditCard, RefreshCw, X } from 'lucide-react';
import { API_BASE_URL } from '../config';
import { usePremium } from '../hooks/usePremium';

const Home = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showAdSplash, setShowAdSplash] = useState(true);
  
  const { hasPremium, loading: premiumLoading, purchasePremium, restorePurchases, isNative } = usePremium();

  useEffect(() => {
    // Só carrega o vídeo depois que o anúncio for exibido
    if (!showAdSplash) {
      axios.defaults.baseURL = API_BASE_URL;
      fetchTodayVideo();
    }
  }, [showAdSplash]);

  const fetchTodayVideo = async () => {
    try {
      const response = await axios.get('/api/videos/today');
      setVideo(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Nenhum vídeo disponível hoje');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!hasPremium) {
      setShowPaywall(true);
      return;
    }

    setDownloading(true);
    try {
      const response = await axios.get(`/api/videos/download/${video.id}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${video.title}.mp4`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      alert('✅ Vídeo baixado com sucesso!');
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao baixar vídeo');
    } finally {
      setDownloading(false);
    }
  };

  const handlePurchase = async () => {
    const success = await purchasePremium();
    if (success) {
      alert('✅ Compra realizada com sucesso! Agora você pode baixar todos os vídeos.');
      setShowPaywall(false);
    }
  };

  // Mostrar splash screen com anúncio primeiro
  if (showAdSplash) {
    return <AdSplashScreen onComplete={() => setShowAdSplash(false)} />;
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">😔 Ops!</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Cabeçalho do Vídeo */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <h2 className="text-3xl font-bold mb-2">{video.title}</h2>
              <p className="text-blue-100">{video.description}</p>
              <div className="flex items-center space-x-6 mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>{video.views} visualizações</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>{video.downloads} downloads</span>
                </div>
              </div>
            </div>

            {/* Reprodutor de Vídeo */}
            <div className="bg-black">
              <video
                controls
                className="w-full"
                style={{ maxHeight: '600px' }}
                poster="/video-placeholder.png"
              >
                <source src={video.videoUrl} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>

            {/* Botão de Download */}
            <div className="p-6">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Download className="w-6 h-6" />
                <span>{downloading ? 'Baixando...' : '📥 Baixar Vídeo'}</span>
              </button>
              {hasPremium && (
                <p className="text-center text-sm text-green-600 mt-2">
                  ✅ Você tem acesso premium!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Paywall */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-fadeIn">
            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl relative">
              <button
                onClick={() => setShowPaywall(false)}
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center justify-center mb-2">
                <Lock className="w-12 h-12" />
              </div>
              <h3 className="text-center text-2xl font-bold">
                Desbloqueie os Downloads
              </h3>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-4">
              <p className="text-center text-gray-600">
                Assista online gratuitamente ou desbloqueie downloads ilimitados:
              </p>
              
              <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                <span className="text-4xl font-bold text-blue-600">R$ 1,99</span>
                <span className="text-gray-500 ml-2">por mês</span>
              </div>

              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="mr-2">✅</span> Downloads ilimitados de todos os vídeos
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✅</span> Acesso offline enquanto assinante
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✅</span> Cancele quando quiser
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✅</span> Suporte prioritário
                </li>
              </ul>

              <button
                onClick={handlePurchase}
                disabled={premiumLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition flex items-center justify-center space-x-2 transform hover:scale-105 disabled:opacity-50"
              >
                <CreditCard className="w-6 h-6" />
                <span>{premiumLoading ? 'Carregando...' : `Assinar por R$ 1,99/mês${isNative ? ' (Google Play)' : ''}`}</span>
              </button>

              {isNative && (
                <button
                  onClick={restorePurchases}
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Restaurar Compras</span>
                </button>
              )}

              <p className="text-center text-xs text-gray-500">
                {isNative ? 'Pagamento seguro via Google Play' : 'Use o app Android para comprar'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
