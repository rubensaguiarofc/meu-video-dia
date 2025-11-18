import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AdSplashScreen from '../components/AdSplashScreen';
// Usando Material Icons no layout; sem ícones externos aqui
import { API_BASE_URL } from '../config';
import { usePremium } from '../hooks/usePremium';

const Home = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showAdSplash, setShowAdSplash] = useState(true);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerContainerRef = useRef(null);
  
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

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const onLoadedMetadata = () => {
    const el = videoRef.current;
    if (!el) return;
    setDuration(el.duration || 0);
  };

  const onTimeUpdate = () => {
    const el = videoRef.current;
    if (!el) return;
    setCurrentTime(el.currentTime || 0);
  };

  const handleFullscreen = async () => {
    try {
      const el = playerContainerRef.current || videoRef.current;
      if (!el) return;
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (el.requestFullscreen) {
        await el.requestFullscreen();
      }
    } catch (e) {
      console.warn('Fullscreen não suportado:', e);
    }
  };

  const fmt = (s) => {
    const mm = Math.floor(s / 60).toString().padStart(1, '0');
    const ss = Math.floor(s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const todayStr = () => {
    const d = new Date();
    return d.toLocaleDateString('pt-BR', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
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
      {/* Header fixo estilo conceito */}
      <header className="fixed top-0 left-0 right-0 z-10 mx-auto max-w-sm flex justify-between items-center p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
        <button className="text-gray-800 dark:text-gray-200">
          <span className="material-icons">arrow_back_ios_new</span>
        </button>
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path></svg>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Video +18</span>
        </div>
        <button className="text-gray-800 dark:text-gray-200">
          <span className="material-icons">person_outline</span>
        </button>
      </header>

      <main className="pt-20 pb-28">
        <div className="mx-auto max-w-sm">
          <div className="px-4">
            {/* Player com overlay */}
            <div ref={playerContainerRef} className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg bg-black">
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                poster="/video-placeholder.png"
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
                src={video.videoUrl}
                controls={false}
                onClick={togglePlay}
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <button className="group" onClick={togglePlay}>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/70 backdrop-blur-sm transition-all duration-300 group-hover:bg-primary">
                      <span className="material-icons text-white !text-4xl">play_arrow</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Barra de status abaixo do vídeo */}
            <div className="mt-3 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <span className="material-icons !text-2xl text-gray-800 dark:text-gray-200">volume_up</span>
                <span>{`${fmt(currentTime)} / ${fmt(duration || 0)}`}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-icons !text-xl">closed_caption</span>
                <button className="text-left" onClick={togglePlay}><span className="material-icons !text-xl">{isPlaying ? 'pause' : 'play_arrow'}</span></button>
                <button className="text-left" onClick={handleFullscreen}><span className="material-icons !text-xl">fullscreen</span></button>
              </div>
            </div>
          </div>

          {/* Título e data */}
          <div className="mt-6 space-y-6 px-4">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{video.title || 'DAILY ADVENTURE'}</h1>
                <span className="rounded-md bg-red-500 px-3 py-1 text-sm font-semibold text-white">+18</span>
              </div>
              <p className="mt-1 text-gray-500 dark:text-gray-400">{todayStr()}</p>
            </div>

            {/* Métricas */}
            <div className="rounded-lg bg-white/50 p-4 dark:bg-white/10">
              <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="material-icons !text-xl text-primary">visibility</span>
                  <span>{video.views} Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons !text-xl text-primary">download</span>
                  <span>{video.downloads} Downloads</span>
                </div>
              </div>
            </div>

            {/* Botão de download */}
              <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary py-4 text-lg font-semibold text-white shadow-lg shadow-primary/30 transition-transform duration-200 active:scale-95 disabled:opacity-60"
            >
              <span className="material-icons">download</span>
              {downloading ? 'Baixando...' : 'Download Video'}
            </button>

            {/* Sobre */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sobre este vídeo</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {video.description || 'Assista ao vídeo do dia. Novos conteúdos diariamente.'}
              </p>
            </div>
          </div>
        </div>
      </main>

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
                <span className="material-icons">close</span>
              </button>
              <div className="flex items-center justify-center mb-2">
                <span className="material-icons !text-5xl">lock</span>
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
                <span className="material-icons">credit_card</span>
                <span>{premiumLoading ? 'Carregando...' : `Assinar por R$ 1,99/mês${isNative ? ' (Google Play)' : ''}`}</span>
              </button>

              {isNative && (
                <button
                  onClick={restorePurchases}
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center space-x-2"
                >
                  <span className="material-icons">refresh</span>
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
