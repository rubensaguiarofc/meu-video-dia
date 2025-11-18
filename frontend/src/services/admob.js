import { AdMob, RewardAdPluginEvents } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// IDs de teste do AdMob (você vai substituir pelos IDs reais depois)
const AD_IDS = {
  android: {
    // ID de teste do Google - substitua pelo seu ID real depois
    rewardedVideo: 'ca-app-pub-3940256099942544/5224354917', // ID de teste
    appOpen: 'ca-app-pub-5771833523730319/5292100565', // App Open real (Abertura do app)
  },
  ios: {
    rewardedVideo: 'ca-app-pub-3940256099942544/1712485313', // ID de teste
    appOpen: 'ca-app-pub-3940256099942544/5662855259', // App Open de teste iOS
  }
};

export class AdMobService {
  static isInitialized = false;
  static isNative = Capacitor.isNativePlatform();

  // Inicializar AdMob
  static async initialize() {
    if (!this.isNative || this.isInitialized) {
      return;
    }

    try {
      await AdMob.initialize({
        // Produção: não habilitar modo de teste
        initializeForTesting: false,
      });

      this.isInitialized = true;
      console.log('AdMob inicializado com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar AdMob:', error);
    }
  }

  // Exibir App Open Ad (anúncio de abertura)
  static async showAppOpenAd() {
    if (!this.isNative) {
      console.log('AdMob não disponível no navegador');
      return true;
    }

    try {
      await this.initialize();

      const platform = Capacitor.getPlatform();
      const adId = platform === 'android' ? AD_IDS.android.appOpen : AD_IDS.ios.appOpen;

      // Em algumas versões do plugin não é necessário preparar previamente
      // Mostra diretamente o App Open Ad
      await AdMob.showAppOpenAd({
        adId,
        isTesting: false,
      });

      return true;
    } catch (error) {
      console.error('Erro ao exibir App Open Ad:', error);
      return false;
    }
  }

  // Carregar e exibir App Open com callback
  static async loadAndShowAppOpenAd(onComplete) {
    const ok = await this.showAppOpenAd();
    if (onComplete) onComplete(ok);
  }

  // Exibir anúncio recompensado (30 segundos)
  static async showRewardedAd() {
    if (!this.isNative) {
      console.log('AdMob não disponível no navegador');
      return true; // Retorna true para não bloquear no navegador
    }

    try {
      await this.initialize();

      const platform = Capacitor.getPlatform();
      const adId = platform === 'android' ? AD_IDS.android.rewardedVideo : AD_IDS.ios.rewardedVideo;

      // Preparar o anúncio
      await AdMob.prepareRewardVideoAd({
        adId: adId,
        isTesting: false,
      });

      // Exibir o anúncio
      const result = await AdMob.showRewardVideoAd();
      
      return true; // Anúncio foi exibido com sucesso
    } catch (error) {
      console.error('Erro ao exibir anúncio:', error);
      return false; // Falha ao exibir anúncio
    }
  }

  // Carregar anúncio com eventos
  static async loadAndShowRewardedAd(onComplete) {
    if (!this.isNative) {
      console.log('Modo web - pulando anúncio');
      if (onComplete) onComplete(true);
      return;
    }

    try {
      await this.initialize();

      let adWatched = false;

      // Listener para quando o anúncio for completamente assistido
      AdMob.addListener(RewardAdPluginEvents.Rewarded, (reward) => {
        console.log('Anúncio recompensado assistido:', reward);
        adWatched = true;
      });

      // Listener para quando o anúncio for fechado
      AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
        console.log('Anúncio fechado');
        if (onComplete) onComplete(adWatched);
      });

      // Listener para quando o anúncio falhar
      AdMob.addListener(RewardAdPluginEvents.FailedToLoad, (error) => {
        console.error('Falha ao carregar anúncio:', error);
        if (onComplete) onComplete(false);
      });

      const platform = Capacitor.getPlatform();
      const adId = platform === 'android' ? AD_IDS.android.rewardedVideo : AD_IDS.ios.rewardedVideo;

      // Preparar e exibir
      await AdMob.prepareRewardVideoAd({
        adId: adId,
        isTesting: false,
      });

      await AdMob.showRewardVideoAd();

    } catch (error) {
      console.error('Erro ao carregar anúncio:', error);
      if (onComplete) onComplete(false);
    }
  }

  // Remover listeners
  static removeListeners() {
    if (this.isNative) {
      AdMob.removeAllListeners();
    }
  }
}
