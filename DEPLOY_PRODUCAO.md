# 🚀 Como Publicar na Play Store (Produção)

## ⚠️ IMPORTANTE: Não publique com IP local!

O IP `192.168.1.53` só funciona na sua rede local. Para publicar na Play Store, você precisa de um servidor na internet.

## Passo a Passo para Produção

### 1️⃣ Hospedar o Backend (Node.js) na Internet

Escolha uma opção **GRATUITA**:

#### Opção A: Railway (Recomendado - Fácil)
1. Acesse: https://railway.app/
2. Faça login com GitHub
3. Clique em **New Project** → **Deploy from GitHub repo**
4. Selecione a pasta `backend`
5. Railway detecta automaticamente Node.js
6. Adicione as variáveis de ambiente:
   ```
   MONGODB_URI=mongodb+srv://<USER>:<PASSWORD>@meuvideocluster.vvqpsen.mongodb.net/meu-video-dia
   PORT=5000
   ```
7. Copie a URL gerada (exemplo: `https://seu-app.railway.app`)

#### Opção B: Render
1. Acesse: https://render.com/
2. **New** → **Web Service**
3. Conecte o GitHub e selecione o repositório
4. Configure:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables: mesmas do Railway
5. Copie a URL gerada

#### Opção C: Heroku
1. Acesse: https://heroku.com/
2. Crie um novo app
3. Conecte o GitHub
4. Configure as variáveis de ambiente
5. Deploy automático

### 2️⃣ Atualizar o Config do Frontend

Abra `frontend/src/config.js` e **substitua**:

```javascript
export const API_BASE_URL = isProduction
  ? 'https://SEU-APP.railway.app'  // ✅ Cole a URL do Railway/Render/Heroku aqui
  : 'http://192.168.1.53:5000';
```

### 3️⃣ Gerar o APK/AAB para Play Store

```powershell
# 1. Build de produção com a URL do servidor
cd frontend
npm run build

# 2. Sincronizar com Android
npx cap sync android

# 3. Abrir no Android Studio
npx cap open android

# 4. No Android Studio:
# Build → Generate Signed Bundle/APK
# Escolha: Android App Bundle (.aab)
# Siga o assistente para criar keystore
```

### 4️⃣ Publicar na Play Store

1. Acesse: https://play.google.com/console
2. **Create app** → Preencha informações
3. Faça upload do arquivo `.aab`
4. Configure:
   - Screenshots do app
   - Descrição
   - Ícone
   - Classificação etária
5. Envie para revisão (leva 1-3 dias)

## 🔒 Segurança

### ✅ Seguro para desenvolvimento (agora)
- `192.168.1.53` é rede local privada
- Só você e dispositivos na sua rede podem acessar
- Ideal para testes

### ⚠️ NÃO SEGURO para produção
- Não funciona fora da sua rede
- Usuários da Play Store não conseguiriam usar
- Precisa de servidor na internet com HTTPS

## 💰 Custos

### Grátis (para começar)
- **Railway**: 500h/mês grátis
- **Render**: 750h/mês grátis
- **MongoDB Atlas**: 512MB grátis ✅ (já configurado)
- **RevenueCat**: Grátis até $2.5k de receita/mês

### Quando crescer
- Railway: ~$5-10/mês
- Render: ~$7/mês
- MongoDB Atlas: ~$9/mês (quando passar de 512MB)

## 📝 Checklist Final

Antes de publicar na Play Store:

- [ ] Backend hospedado na internet (Railway/Render/Heroku)
- [ ] `frontend/src/config.js` atualizado com URL de produção
- [ ] MongoDB Atlas funcionando ✅
- [ ] RevenueCat configurado com produto do Google Play
- [ ] APK/AAB assinado gerado
- [ ] Testado em dispositivo real
- [ ] Screenshots e descrição prontos
- [ ] Política de privacidade (obrigatório na Play Store)

## 🆘 Precisa de Ajuda?

Me avise quando estiver pronto para publicar e eu te ajudo com:
- Configurar Railway/Render
- Gerar APK assinado
- Configurar Google Play Console
- Criar política de privacidade
