// Configuração de ambiente
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// DESENVOLVIMENTO: usa IP local da sua rede
// PRODUÇÃO: usa servidor na internet (você vai configurar depois)
export const API_BASE_URL = isProduction
  ? 'https://SEU-SERVIDOR-PRODUCAO.com/api'  // ⚠️ Trocar antes de publicar na Play Store
  : 'http://192.168.1.53:5000';  // Seguro: só funciona na sua rede local

export default {
  API_BASE_URL
};
