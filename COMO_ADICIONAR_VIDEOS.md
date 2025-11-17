# 🎬 Como Adicionar e Distribuir Vídeos

Este guia explica como adicionar vídeos e fazê-los aparecer nos aplicativos.

## 📤 Método 1: Upload via Painel Admin (Recomendado)

### Passo a Passo:

1. **Inicie o backend** (se ainda não estiver rodando):
```powershell
cd backend
npm run dev
```

2. **Inicie o frontend**:
```powershell
cd frontend
npm run dev
```

3. **Acesse o painel admin**: 
   - Web: http://localhost:5173/admin
   - Android: No app, clique no botão "Admin"

4. **Faça o upload**:
   - Preencha o título (ex: "Vídeo do Dia - 14/11/2025")
   - Adicione descrição (opcional)
   - Selecione a data (hoje por padrão)
   - Clique em "Clique para selecionar um vídeo"
   - Escolha seu arquivo de vídeo (até 500MB)
   - Clique em "Fazer Upload do Vídeo"

5. **Pronto!** O vídeo estará disponível instantaneamente em:
   - ✅ App Web (http://localhost:5173)
   - ✅ App Android (se conectado ao backend)

## 📱 Configuração para Android

### Durante Desenvolvimento (testando no celular/emulador):

#### 1. Descubra o IP do seu PC:
```powershell
ipconfig
```
Exemplo de saída:
```
Endereço IPv4: 192.168.1.100
```

#### 2. Atualize o arquivo de configuração:

Edite: `frontend/src/config.js`
```javascript
export const API_BASE_URL = 'http://192.168.1.100:5000'; // Use SEU IP aqui
```

#### 3. Configure o backend para aceitar conexões externas:

Edite: `backend/.env`
```env
FRONTEND_URL=*
```

E em `backend/server.js`, o CORS já está configurado para aceitar qualquer origem durante desenvolvimento.

#### 4. Configure o firewall do Windows:

```powershell
# Permitir conexões na porta 5000
New-NetFirewallRule -DisplayName "Node Backend" -Direction Inbound -LocalPort 5000 -Protocol TCP -Action Allow
```

#### 5. Build e teste:
```powershell
cd frontend
npm run android:build
npm run android:run
```

## 🌐 Configuração para Produção

### Opção A: Backend na Nuvem (Recomendado)

1. **Deploy do Backend** em serviços como:
   - Heroku: https://www.heroku.com
   - Railway: https://railway.app
   - Render: https://render.com
   - AWS/Azure/Google Cloud

2. **Atualize a configuração**:
```javascript
// frontend/src/config.js
export const API_BASE_URL = 'https://seu-backend.herokuapp.com';
```

3. **Configure MongoDB Atlas** (banco na nuvem):
   - https://www.mongodb.com/cloud/atlas
   - Copie a connection string
   - Atualize no `.env` do backend

4. **Build final do Android**:
```powershell
npm run android:build
npm run android:open
# No Android Studio: Build > Generate Signed Bundle/APK
```

### Opção B: Vídeos via CDN/Storage

Para melhor performance, hospede os vídeos em:
- AWS S3
- Google Cloud Storage
- Cloudinary
- Vimeo API

## 🔄 Fluxo Completo de Distribuição

```
1. Admin faz upload do vídeo
   ↓
2. Backend salva o arquivo e registra no MongoDB
   ↓
3. API retorna as informações do vídeo
   ↓
4. App Web/Android busca o vídeo do dia
   ↓
5. Reprodutor exibe o vídeo
   ↓
6. Usuário pode comprar acesso para download
```

## 📁 Estrutura de Armazenamento

```
backend/
└── uploads/
    └── videos/
        ├── video-1699900000-123456789.mp4
        ├── video-1699901000-987654321.mp4
        └── ...
```

Cada vídeo é salvo com nome único para evitar conflitos.

## 🎯 Testando o Fluxo Completo

### No Computador (Web):

1. Acesse: http://localhost:5173/admin
2. Faça upload de um vídeo de teste
3. Acesse: http://localhost:5173
4. Veja o vídeo sendo reproduzido

### No Android (Emulador/Dispositivo):

1. **Configure o IP** no `config.js`
2. **Build**: `npm run android:build`
3. **Abra no Android Studio**: `npm run android:open`
4. **Run**: Clique no botão Play (▶️)
5. O app abrirá no emulador/dispositivo
6. O vídeo do dia será carregado automaticamente

## 🐛 Troubleshooting

### ❌ "Nenhum vídeo disponível hoje"
- Verifique se fez upload de um vídeo para hoje
- Confirme que o backend está rodando
- Cheque o console do navegador para erros

### ❌ Android não carrega vídeo
- Confirme que está usando o IP correto (não `localhost`)
- Verifique se o backend está acessível na rede
- Teste no navegador do celular: `http://SEU_IP:5000/api/videos/today`
- Verifique se o firewall está permitindo conexões

### ❌ Vídeo não reproduz
- Confirme que o formato é suportado (MP4 é o mais compatível)
- Verifique o tamanho (máx. 500MB)
- Tente outro codec (H.264 + AAC é recomendado)

### ❌ Erro de CORS no Android
- Verifique as configurações de CORS no `backend/server.js`
- Confirme que a URL no `config.js` está correta

## 📊 Monitoramento

Para ver estatísticas dos vídeos, você pode:

1. **No MongoDB Compass** ou shell:
```javascript
db.videos.find().sort({ date: -1 })
```

2. **Criar uma rota de admin** para listar todos:
   - Já existe: `GET /api/videos/all` (requer admin)

## 💡 Dicas

- ✅ Use vídeos em MP4 (H.264) para melhor compatibilidade
- ✅ Comprima vídeos antes do upload (HandBrake é ótimo)
- ✅ Mantenha vídeos entre 50-200MB para streaming
- ✅ Teste sempre no Android após mudanças no backend
- ✅ Use MongoDB Atlas para produção (gratuito até 512MB)

## 🚀 Automação Futura

Você pode automatizar uploads:
- Criar script que faz upload via API
- Integrar com Google Drive/Dropbox
- Usar CRON jobs para publicação agendada
