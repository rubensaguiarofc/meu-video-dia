import { useEffect, useState } from 'react';
import { Purchases } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

export const usePremium = () => {
  const [hasPremium, setHasPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    if (isNative) {
      initializePurchases();
    } else {
      // No web, usar localStorage
      const premium = localStorage.getItem('hasPremium') === 'true';
      setHasPremium(premium);
      setLoading(false);
    }
  }, []);

  const initializePurchases = async () => {
    try {
      // Configurar RevenueCat
      await Purchases.configure({
        apiKey: 'sk_fVwhVLMkhMbNljlGpEFZkiXrIXkGH',
      });

      // Verificar status atual
      const customerInfo = await Purchases.getCustomerInfo();
      const isPremium = customerInfo.customerInfo.entitlements.active['premium'] !== undefined;
      setHasPremium(isPremium);

      // Buscar produtos disponíveis
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
        setProducts(offerings.current.availablePackages);
      }
    } catch (error) {
      console.error('Erro ao inicializar purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const purchasePremium = async () => {
    if (!isNative) {
      // No web, simular compra (você pode integrar Stripe aqui)
      alert('Para comprar, use o app Android na Play Store!');
      return false;
    }

    try {
      setLoading(true);
      
      // Fazer a compra
      const purchaseResult = await Purchases.purchasePackage({
        aPackage: products[0], // Primeiro produto (premium)
      });

      // Verificar se tem acesso premium
      const isPremium = purchaseResult.customerInfo.entitlements.active['premium'] !== undefined;
      setHasPremium(isPremium);
      
      return isPremium;
    } catch (error) {
      if (error.code === 'PURCHASE_CANCELLED_ERROR') {
        console.log('Compra cancelada pelo usuário');
      } else {
        console.error('Erro na compra:', error);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const restorePurchases = async () => {
    if (!isNative) return;

    try {
      setLoading(true);
      const customerInfo = await Purchases.restorePurchases();
      const isPremium = customerInfo.customerInfo.entitlements.active['premium'] !== undefined;
      setHasPremium(isPremium);
      
      if (isPremium) {
        alert('✅ Compras restauradas com sucesso!');
      } else {
        alert('ℹ️ Nenhuma compra encontrada para restaurar.');
      }
    } catch (error) {
      console.error('Erro ao restaurar compras:', error);
      alert('❌ Erro ao restaurar compras. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    hasPremium,
    loading,
    products,
    purchasePremium,
    restorePurchases,
    isNative,
  };
};
