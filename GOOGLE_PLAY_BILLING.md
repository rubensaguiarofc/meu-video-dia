# 💳 Configurar Pagamento In-App com Google Play

Este guia mostra como configurar compras dentro do app usando Google Play Billing.

## 🎯 Vantagens sobre Stripe/outros:

✅ **Confiança**: Usuários já confiam no Google Play  
✅ **Segurança**: Google gerencia todo o processo de pagamento  
✅ **Simples**: Usuários usam métodos salvos no Google Play  
✅ **Requerido**: Google Play exige usar o sistema deles (30% de taxa)  
✅ **Restauração**: Compras sincronizam entre dispositivos automaticamente  

## 📋 Passo 1: Criar Conta RevenueCat (Grátis)

RevenueCat simplifica a implementação de compras in-app.

1. **Acesse**: https://www.revenuecat.com/
2. **Sign Up** (é gratuito até 10k usuários/mês)
3. **Crie um novo projeto**
4. **Anote sua API Key**

## 📱 Passo 2: Configurar Produto na Play Console

### 2.1 Acessar Play Console
1. Vá em: https://play.google.com/console
2. Selecione seu app
3. **Monetize > Products > In-app products**

### 2.2 Criar Produto
1. Clique em **Create product**
2. Preencha:
   ```
   Product ID: premium_unlock
   Name: Acesso Premium
   Description: Desbloqueie downloads ilimitados de todos os vídeos
   ```

3. **Defina o preço**:
   - Default price: R$ 9,90 (BRL)
   - Marque "Use template" para outros países

4. **Ative o produto**

### 2.3 Configurar Service Account (API)

Para o RevenueCat se comunicar com Google Play:

1. **Google Cloud Console**: https://console.cloud.google.com
2. **IAM & Admin > Service Accounts**
3. **Create Service Account**:
   ```
   Name: RevenueCat Service
   Role: Pub/Sub Admin
   ```
4. **Create Key** (JSON) e baixe
5. No Play Console:
   - Setup > API access
   - Link o service account criado
   - Grant access com permissão: Admin (View app information and download reports)

## 🔧 Passo 3: Conectar RevenueCat ao Google Play

1. **No RevenueCat Dashboard**:
   - Project Settings > Google Play
2. **Upload do JSON** do service account
3. **Package name**: `com.meuvideo.app` (o mesmo do seu app)
4. **Salvar**

## 🛠️ Passo 4: Configurar Produtos no RevenueCat

1. **Products** no RevenueCat
2. **Add Product**:
   ```
   Store: Google Play
   Product ID: premium_unlock (mesmo da Play Console)
   ```

3. **Entitlements > Add Entitlement**:
   ```
   Identifier: premium
   Products: premium_unlock
   ```

4. **Offerings > Add Offering**:
   ```
   Identifier: default
   Packages: Add premium_unlock
   Package Identifier: $rc_lifetime ou lifetime
   ```

## 🔑 Passo 5: Adicionar API Key no App

Edite: `frontend/src/hooks/usePremium.js`

Linha 17, substitua:
```javascript
apiKey: 'SUA_API_KEY_REVENUECAT_AQUI',
```

Por:
```javascript
apiKey: 'sua_chave_real_aqui', // Ex: goog_AbCdEfGhIjKlMnOpQrSt
```

**Onde encontrar:** RevenueCat Dashboard > Project Settings > API Keys

## 📦 Passo 6: Build e Teste

### Build do App
```powershell
cd frontend
npm run build
npx cap sync android
npx cap open android
```

### No Android Studio
1. Build > Generate Signed Bundle/APK
2. Escolha APK ou AAB
3. Upload na Play Console (Internal Testing ou Production)

### Testar Compras

⚠️ **IMPORTANTE**: Compras in-app SÓ funcionam em apps baixados da Play Store!

**Opções de teste:**

#### A) Internal Testing (Recomendado)
1. Play Console > Testing > Internal testing
2. Upload do AAB
3. Adicione testadores (emails)
4. Compartilhe link de teste
5. Testadores baixam e testam compra

#### B) License Testing (Durante desenvolvimento)
1. Play Console > Setup > License testing
2. Adicione emails de testadores
3. Esses usuários podem testar sem pagar
4. Compras são processadas mas não cobradas

#### C) Usar conta de teste
- No emulador, adicione uma conta Google de teste
- Configure no Play Console > License testing

## 🧪 Como Testar

1. **Abra o app** baixado da Play Store (internal testing)
2. **Veja o vídeo do dia**
3. **Clique em "Desbloquear por R$ 9,90"**
4. **Fluxo esperado**:
   - Abre tela de pagamento do Google Play
   - Escolhe método de pagamento
   - Confirma compra
   - Retorna ao app com premium ativado
5. **Teste download** do vídeo

## 🔄 Restaurar Compras

Se o usuário:
- Reinstalar o app
- Trocar de dispositivo
- Perder o acesso premium

Basta clicar em **"Restaurar Compras"** e o RevenueCat busca as compras vinculadas à conta Google.

## 💰 Comissões

- **Google Play**: 30% dos primeiros US$ 1M/ano, depois 15%
- **RevenueCat**: Gratuito até 10k usuários/mês

Exemplo: Se vender por R$ 9,90
- Google fica: R$ 2,97 (30%)
- Você recebe: R$ 6,93 (70%)

## 📊 Monitorar Vendas

### No RevenueCat Dashboard:
- Receita total
- Usuários premium
- Taxa de conversão
- Gráficos de performance

### No Play Console:
- Relatórios financeiros
- Downloads vs compras
- Países com mais vendas

## 🐛 Troubleshooting

### Erro: "Product not found"
- Certifique-se que o produto está ATIVO na Play Console
- Aguarde até 24h após criar o produto
- Verifique se o Product ID está correto

### Erro: "This version of the application is not configured for billing"
- Upload de APK/AAB na Play Console é necessário
- Testando? Use Internal Testing track
- Aguarde algumas horas após upload

### Compra não ativa premium
- Verifique logs do RevenueCat
- Confirme que o Entitlement está configurado
- Teste "Restore Purchases"

### App não encontra produtos
- Service account está configurado?
- API Key do RevenueCat está correta?
- App foi baixado da Play Store (não sideload)?

## 🎯 Checklist Final

- [ ] Conta RevenueCat criada
- [ ] API Key do RevenueCat copiada
- [ ] Produto criado na Play Console
- [ ] Service account configurado
- [ ] RevenueCat conectado ao Google Play
- [ ] Produto e Entitlement configurados no RevenueCat
- [ ] API Key adicionada no código
- [ ] Build do app gerado
- [ ] Upload na Play Console (Internal Testing)
- [ ] Testadores adicionados
- [ ] Compra testada e funcionando
- [ ] Restauração de compras testada

## 📚 Recursos Úteis

- RevenueCat Docs: https://www.revenuecat.com/docs
- Google Play Billing: https://developer.android.com/google/play/billing
- RevenueCat Dashboard: https://app.revenuecat.com
- Play Console: https://play.google.com/console

## 💡 Dicas Importantes

1. **Sempre teste em Internal Testing** antes de publicar
2. **Configure emails de teste** para testar sem pagar
3. **Monitore o RevenueCat** para ver erros em tempo real
4. **Preços regionais**: RevenueCat ajusta automaticamente
5. **Política do Google**: Respeite os 30% de comissão
6. **Descontos**: Você pode criar produtos com preço promocional

Pronto! Seu app está configurado para receber pagamentos via Google Play! 💰
