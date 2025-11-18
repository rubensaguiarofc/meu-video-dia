# 📺 Configuração AdMob - Anúncio de 30 Segundos

Este guia explica como configurar os anúncios em vídeo (Rewarded Video Ads) que aparecem ao abrir o app.

## 🎯 Como Funciona

1. **Usuário abre o app** → Tela de splash aparece
2. **Anúncio de 30 segundos** é carregado e exibido automaticamente
3. **Após assistir** → App libera acesso ao vídeo do dia

## 📋 Passo 1: Criar Conta no Google AdMob

1. Acesse: **https://admob.google.com/**
2. Faça login com sua conta Google
3. Clique em **"Get Started"**
4. Aceite os termos e condições

## 📱 Passo 2: Criar o App no AdMob

1. No painel do AdMob, clique em **"Apps"** → **"Add App"**
2. Escolha:
   - **Plataforma**: Android
   - **Nome do app**: Video +18
   - **Já está na Play Store?**: Não (ou Sim, se já publicou)
3. Se não estiver na Play Store:
   - Preencha o Package Name: `com.meuvideo.app`
4. Clique em **"Add App"**

## 🎬 Passo 3: Criar Unidade de Anúncio (Rewarded Video)

1. No painel, vá em **"Apps"** → Selecione seu app
2. Clique em **"Ad units"** → **"Add ad unit"**
3. Escolha **"Rewarded"** (Anúncio recompensado)
4. Configure:
   ```
   Nome: Video Inicial 30s
   Recompensa: acesso ao app
   Valor: 1
   ```
5. Clique em **"Create ad unit"**
6. **ANOTE O AD UNIT ID** (formato: `ca-app-pub-XXXXXXXX/YYYYYYYYYY`)

## 🔑 Passo 4: Adicionar IDs no Código

### 4.1 App ID no AndroidManifest.xml

Arquivo: `frontend/android/app/src/main/AndroidManifest.xml`

Substitua a linha:
```xml
android:value="ca-app-pub-3940256099942544~3347511713"/>
```

Por:
```xml
android:value="ca-app-pub-XXXXXXXX~YYYYYYYYYY"/>
```
*(Use o **App ID** que você copiou do AdMob)*

### 4.2 Ad Unit ID no código

Arquivo: `frontend/src/services/admob.js`

Linha 6, substitua:
```javascript
rewardedVideo: 'ca-app-pub-3940256099942544/5224354917', // ID de teste
```

Por:
```javascript
rewardedVideo: 'ca-app-pub-XXXXXXXX/YYYYYYYYYY', // Seu ID real
```

### 4.3 Desabilitar modo de teste

No mesmo arquivo `admob.js`:

**Linha 22**, mude:
```javascript
initializeForTesting: true, // Mude para false em produção
```
Para:
```javascript
initializeForTesting: false, // Produção
```

**Linha 58**, mude:
```javascript
isTesting: true, // Mude para false em produção
```
Para:
```javascript
isTesting: false, // Produção
```

**Linha 106**, mude:
```javascript
isTesting: true, // Mude para false em produção
```
Para:
```javascript
isTesting: false, // Produção
```

## 🧪 Passo 5: Testar os Anúncios

### Teste com ID de Teste (Recomendado)

1. Mantenha os IDs de teste no código
2. Build e instale o app no celular:
   ```powershell
   cd frontend
   npm run build
   npx cap sync android
   npx cap open android
   ```
3. No Android Studio, clique em **Run**
4. O anúncio de teste deve aparecer ao abrir o app

### Teste com ID Real (Cuidado!)

⚠️ **IMPORTANTE**: Não clique nos seus próprios anúncios reais! Isso pode banir sua conta.

1. Adicione seu dispositivo como teste:
   - No AdMob: **Settings** → **Test Devices**
   - Adicione o **Device ID** do seu celular
2. No código `admob.js` linha 20:
   ```javascript
   testingDevices: ['SEU_DEVICE_ID_AQUI'],
   ```

## 💰 Passo 6: Configurar Pagamentos

1. No AdMob, vá em **"Payments"**
2. Preencha suas informações fiscais:
   - CPF/CNPJ
   - Endereço
   - Dados bancários
3. Defina o limite de pagamento (mínimo $100)
4. Aceite os termos

## 📊 Monitoramento

No painel do AdMob você verá:
- **Impressões**: Quantos anúncios foram exibidos
- **Receita estimada**: Quanto você ganhou
- **eCPM**: Quanto ganha por 1000 impressões
- **Taxa de preenchimento**: % de vezes que há anúncio disponível

## 🎯 Dicas para Maximizar Receita

1. **Localização**: Configure anúncios para o Brasil (maior valor)
2. **Mediação**: Adicione outras redes além do AdMob (Unity Ads, etc)
3. **Otimização**: Use o recurso "Optimize" do AdMob
4. **Frequência**: Não abuse - 1 anúncio por abertura é ideal

## ⚠️ Regras Importantes

1. **Não clique** nos seus próprios anúncios
2. **Não peça** para usuários clicarem
3. **Não force** fechamento do anúncio antes de 30s
4. **Respeite** as políticas do Google AdMob
5. **Tenha conteúdo** adequado (sem pirataria, nudez, violência)

## 🚀 Checklist de Produção

Antes de publicar na Play Store:

- [ ] App ID real adicionado no AndroidManifest.xml
- [ ] Ad Unit ID real no código (admob.js)
- [ ] `initializeForTesting: false`
- [ ] `isTesting: false` em todas as chamadas
- [ ] Testado com ID de teste primeiro
- [ ] Dados fiscais preenchidos no AdMob
- [ ] App publicado na Play Store
- [ ] Esperado 24-48h para anúncios reais aparecerem

## 💡 Estimativa de Receita

**Estimativa conservadora (Brasil):**
- CPM médio: R$ 2-5 por 1000 visualizações
- 1000 usuários/dia = R$ 2-5/dia
- 10.000 usuários/dia = R$ 20-50/dia = R$ 600-1500/mês

**Valores podem variar conforme:**
- Localização dos usuários
- Tipo de conteúdo
- Taxa de conclusão do anúncio
- Época do ano (dezembro tem CPM maior)

## 🆘 Solução de Problemas

**Anúncio não aparece:**
- Verifique se tem internet
- Aguarde 24-48h após criar conta
- Use IDs de teste primeiro
- Veja o logcat no Android Studio

**App baniu/suspendeu:**
- Revise políticas do AdMob
- Não clique nos próprios anúncios
- Tenha conteúdo apropriado

**Receita muito baixa:**
- Verifique CPM da sua região
- Aumente retenção de usuários
- Configure mediação com outras redes

---

**Precisa de ajuda?** Entre em contato com o suporte do Google AdMob.
