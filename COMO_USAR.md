# 🎬 Como Usar o App - Meu Vídeo do Dia

## 🌐 URLs de Produção

- **Frontend (Vercel):** https://meu-video-dia.vercel.app
- **Painel Admin:** https://meu-video-dia.vercel.app/admin
- **Backend (Railway):** https://meu-video-dia-production.up.railway.app
- **GitHub:** https://github.com/rubensaguiarofc/meu-video-dia

---

## 👨‍💼 Para Você (Administrador)

### 📤 Fazer Upload de Vídeo Diário

1. Acesse: **https://meu-video-dia.vercel.app/admin**
2. Preencha:
   - **Título:** Nome do vídeo (ex: "Vídeo do Dia 18/11/2025")
   - **Descrição:** Breve descrição (opcional)
   - **Data:** Selecione a data (padrão: hoje)
3. Clique em **"Escolher Arquivo"**
4. Selecione o vídeo (MP4, AVI, MOV, WMV, MKV - até 500MB)
5. Clique em **"Enviar Vídeo"**
6. Aguarde o upload (pode levar alguns minutos)
7. ✅ Pronto! O vídeo está disponível para todos os usuários

### 📋 Dicas de Upload:

- **Formato recomendado:** MP4 (H.264)
- **Resolução:** 1080p (1920x1080) ou 720p (1280x720)
- **Tamanho máximo:** 500MB por vídeo
- **Upload diário:** Faça sempre antes de 00h para garantir que aparece no dia certo
- **Substituição:** Se fizer upload de outro vídeo no mesmo dia, o anterior é desativado automaticamente

### 🗓️ Agendamento

- Você pode fazer upload com **data futura**
- O vídeo só aparecerá para os usuários no dia configurado
- Upload com data passada também funciona (caso queira atualizar histórico)

---

## 📱 Para os Usuários (App Android)

### 🎥 Assistir o Vídeo do Dia

1. Abrir o app "Meu Vídeo do Dia"
2. O vídeo do dia aparece automaticamente
3. Apertar ▶️ Play para assistir
4. **GRÁTIS e SEM LOGIN** ✅

### 📥 Fazer Download (Paywall - Google Play)

1. Assistir o vídeo normalmente (grátis)
2. Para baixar, clicar no botão **"Baixar Vídeo"**
3. Aparece paywall: **"Assinar por R$ 1,99/mês"**
4. Assinar mensalmente via Google Play
5. Enquanto assinante, download ilimitado! 🎉

### 🔄 Restaurar Compra

Se o usuário:
- Reinstalou o app
- Trocou de celular
- Perdeu o acesso premium

Basta clicar em **"Restaurar Compras"** e o Google Play recupera automaticamente.

---

## 🛠️ Fluxo Técnico (Como Funciona)

### 1️⃣ Você faz upload do vídeo
```
Vercel Admin → Railway API → MongoDB Atlas
```

### 2️⃣ Vídeo é processado
- Arquivo salvo no Railway (storage temporário)
- Metadados salvos no MongoDB (título, descrição, data)
- Status: `isActive: true`

### 3️⃣ Usuário abre o app
```
Android App → Railway API → MongoDB
```
- App consulta: `GET /api/videos/today`
- Recebe: dados do vídeo + URL de streaming

### 4️⃣ Vídeo é reproduzido
```
Android Player → Railway API → Stream de vídeo
```
- Player faz: `GET /api/videos/stream/:id`
- Railway envia chunks do vídeo (streaming)

### 5️⃣ Download (se usuário tem premium)
```
Android → RevenueCat → Google Play
```
- Verifica se usuário comprou
- Se sim, libera download
- Se não, mostra paywall

---

## 📊 Estatísticas (Futuro)

O sistema já rastreia automaticamente:
- **Visualizações** (`views`) - cada vez que alguém assiste
- **Downloads** (`downloads`) - cada vez que alguém baixa

Você pode adicionar um dashboard para ver essas métricas! (posso te ajudar depois)

---

## 🚀 Publicar na Play Store

### 1️⃣ Configurar RevenueCat

Seguir: `GOOGLE_PLAY_BILLING.md`

### 2️⃣ Gerar APK Assinado

Seguir: `PUBLICAR_PLAY_STORE.md`

### 3️⃣ Enviar para Google Play Console

1. Criar app na Play Console
2. Upload do AAB
3. Preencher informações (descrição, screenshots)
4. Configurar produto In-App Purchase (R$ 9,90)
5. Enviar para revisão

---

## 💰 Modelo de Negócio

### Receita Potencial

**Exemplo com 1000 usuários:**
- 1000 usuários instalam (grátis)
- 100 assistem vídeos regularmente (grátis)
- 10 assinam premium (R$ 1,99/mês cada)
- **= R$ 19,90/mês de receita**

**Google Play fica com 15% (assinaturas):**
- Você recebe: **R$ 16,92/mês**

**Custos mensais:**
- Railway: Grátis (500h/mês)
- MongoDB: Grátis (512MB)
- Vercel: Grátis
- RevenueCat: Grátis (até $2.5k/mês)
- **= R$ 0,00** 🎉

**Lucro líquido: R$ 69,30/mês** (com apenas 10 compradores)

### Escalando

Com 10.000 usuários e 1% de conversão:
- 100 assinantes × R$ 1,99/mês = R$ 199,00/mês
- Depois de taxas (15%): **~R$ 169,15/mês**
- **Receita recorrente mensal!**

---

## 🔒 Segurança

### ✅ O que está protegido:
- Senhas no `.env` (não vai para GitHub)
- CORS configurado no backend
- HTTPS em produção (Railway + Vercel)
- Variáveis de ambiente separadas

### ⚠️ Próximos passos de segurança:
- Adicionar autenticação no painel admin (login)
- Rate limiting para evitar spam
- Compressão de vídeos automática
- CDN para servir vídeos (Cloudflare)

---

## 📞 Suporte

### Problemas Comuns

**Vídeo não aparece no app:**
- Verifique se Railway está online
- Veja logs no Railway Dashboard
- Confirme que o vídeo foi salvo (painel admin)

**Upload falha:**
- Vídeo maior que 500MB? Comprima antes
- Formato não suportado? Use MP4
- Internet lenta? Aguarde mais tempo

**App não conecta:**
- Celular tem internet?
- Railway está no ar?
- Firewall bloqueando?

### Contato

- **GitHub Issues:** https://github.com/rubensaguiarofc/meu-video-dia/issues
- **Email:** rubensaguiarcontato@gmail.com

---

## 🎯 Resumo Rápido

| Ação | URL | Frequência |
|------|-----|------------|
| 📤 Upload de vídeo | https://meu-video-dia.vercel.app/admin | Todo dia |
| 👀 Ver como usuário | https://meu-video-dia.vercel.app | Testar após upload |
| 📱 Testar Android | Android Studio → Run | Antes de publicar |
| 🚀 Ver logs | https://railway.app/ | Quando houver erro |

---

**Pronto para começar! Faça o primeiro upload e teste! 🎬**
