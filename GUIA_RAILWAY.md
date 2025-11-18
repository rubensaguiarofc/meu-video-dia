# 🚀 Deploy no Railway - Guia Passo a Passo

## ✅ Arquivos preparados para deploy
- `railway.json` - Configuração do Railway
- `Procfile` - Comando de inicialização
- `server.js` - Ajustado para aceitar conexões externas

## 📋 Passo a Passo

### 1️⃣ Criar Conta no Railway

1. Acesse: **https://railway.app/**
2. Clique em **"Login"** no canto superior direito
3. Escolha **"Login with GitHub"**
4. Autorize o Railway a acessar suas informações

### 2️⃣ Criar Projeto no Railway

1. Na página inicial, clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Se for a primeira vez, clique em **"Configure GitHub App"**
4. Autorize o Railway a acessar seus repositórios

### 3️⃣ Opção A - Se você JÁ tem o código no GitHub

**Pular para o Passo 4** ✅

### 3️⃣ Opção B - Se NÃO tem o código no GitHub ainda

Abra o PowerShell na pasta do projeto:

```powershell
cd "C:\Users\A6.INC019\Desktop\Aplicativos\Meu video do dia"

# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Deploy inicial - Backend Meu Video do Dia"

# Criar repositório no GitHub (você precisa criar manualmente no site)
# Depois vincular:
git remote add origin https://github.com/SEU-USUARIO/meu-video-dia.git
git branch -M main
git push -u origin main
```

**OU use a interface do GitHub Desktop:**
1. Baixe: https://desktop.github.com/
2. File → Add Local Repository
3. Selecione a pasta do projeto
4. Clique em "Publish repository"

### 4️⃣ Fazer Deploy no Railway

1. No Railway, clique em **"New Project"**
2. Escolha **"Deploy from GitHub repo"**
3. Selecione o repositório **"meu-video-dia"**
4. Railway detectará automaticamente que é um projeto Node.js
5. Aguarde o build (leva ~2-3 minutos)

### 5️⃣ Configurar Variáveis de Ambiente

No painel do Railway:

1. Clique no seu projeto
2. Na aba **"Variables"**, adicione:

```
MONGODB_URI=mongodb+srv://<USER>:<PASSWORD>@meuvideocluster.vvqpsen.mongodb.net/meu-video-dia?retryWrites=true&w=majority
PORT=5000
NODE_ENV=production
JWT_SECRET=seu_secret_key_aqui_muito_seguro
FRONTEND_URL=*
```

3. Clique em **"Add"** para cada variável
4. Railway fará redeploy automático

### 6️⃣ Obter a URL do Backend

1. Na aba **"Settings"** do projeto
2. Clique em **"Generate Domain"**
3. Railway criará uma URL tipo: `https://seu-app-production.up.railway.app`
4. **Copie essa URL** - você vai precisar dela!

### 7️⃣ Testar o Backend

Abra no navegador a URL gerada, exemplo:
```
https://seu-app-production.up.railway.app
```

Você deve ver:
```json
{"message": "API Meu Vídeo do Dia - Funcionando!"}
```

Teste também:
```
https://seu-app-production.up.railway.app/api/videos/today
```

### 8️⃣ Atualizar o Frontend

Abra o arquivo: `frontend/src/config.js`

Substitua:
```javascript
export const API_BASE_URL = isProduction
  ? 'https://SEU-SERVIDOR-PRODUCAO.com/api'  // ⚠️ Trocar
  : 'http://192.168.1.53:5000';
```

Por:
```javascript
export const API_BASE_URL = isProduction
  ? 'https://seu-app-production.up.railway.app'  // ✅ Cole SUA URL aqui
  : 'http://192.168.1.53:5000';
```

### 9️⃣ Gerar Build de Produção

No PowerShell:

```powershell
cd "C:\Users\A6.INC019\Desktop\Aplicativos\Meu video do dia\frontend"

# Build de produção
npm run build

# Sincronizar com Android
npx cap sync android

# Abrir no Android Studio
npx cap open android
```

### 🔟 Testar no Android

1. No Android Studio, clique em **▶️ Run**
2. O app agora usará o servidor na internet
3. Funciona em **qualquer rede Wi-Fi** e **4G/5G**

## 🎯 Resultado Final

✅ Backend rodando 24/7 na internet  
✅ HTTPS automático (seguro)  
✅ MongoDB Atlas conectado  
✅ App Android funcionando em qualquer lugar  
✅ Pronto para publicar na Play Store  

## 📊 Monitoramento

No painel do Railway você pode ver:
- **Logs em tempo real** - Erros e requisições
- **Uso de recursos** - CPU, RAM, Rede
- **Métricas** - Tempo de resposta, uptime
- **Deploys** - Histórico de atualizações

## 💰 Plano Gratuito

- **500 horas/mês** de execução
- **100GB de banda/mês**
- **512MB RAM**
- **1GB de disco**

Suficiente para:
- ~100-500 usuários ativos/dia
- ~1000 visualizações de vídeo/dia

## 🔄 Atualizar o Backend

Sempre que alterar o código do backend:

```powershell
git add .
git commit -m "Atualização: descrição da mudança"
git push
```

Railway fará **deploy automático** em ~2 minutos!

## 🆘 Problemas Comuns

### ❌ "Application failed to respond"
- Verifique se as variáveis de ambiente estão corretas
- Veja os logs no Railway (aba "Deployments")

### ❌ "Cannot connect to MongoDB"
- Confirme que MONGODB_URI está correto
- Verifique se MongoDB Atlas permite conexões de qualquer IP

### ❌ "CORS error" no app
- Certifique-se que `FRONTEND_URL=*` está configurado
- Veja se o backend tem `cors({ origin: '*' })`

## 📞 Precisa de Ajuda?

Me avise:
1. Qual passo deu problema
2. Print do erro
3. Logs do Railway (se tiver)

Vou te ajudar a resolver! 🚀
