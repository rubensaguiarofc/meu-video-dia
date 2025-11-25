// Configuração de ambiente
// Sempre usa Railway em produção (Vercel) e localmente
export const API_BASE_URL = 'https://meu-video-dia-production.up.railway.app';

// Versão do app (frontend)
export const APP_VERSION = process.env.REACT_APP_VERSION || '1.0';
export const APP_BUILD = process.env.REACT_APP_BUILD || '1';

export default {
  API_BASE_URL,
  APP_VERSION
};
