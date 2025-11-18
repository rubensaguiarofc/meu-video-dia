# Meu Vídeo do Dia

![GitHub repo size](https://img.shields.io/github/repo-size/rubensaguiarofc/meu-video-dia?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/rubensaguiarofc/meu-video-dia?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/rubensaguiarofc/meu-video-dia?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/rubensaguiarofc/meu-video-dia?style=for-the-badge)

**🎬 App de vídeos diários para todos os usuários**

Um vídeo novo todo dia. Todos os usuários veem o mesmo conteúdo. Download gratuito. Pronto para publicar na Play Store!

## 🎯 Conceito do App

- 📹 **Um vídeo por dia** para TODOS os usuários
- 🌍 **Mesmo conteúdo** para todos
- 📥 **Download gratuito** sem restrições
- 👨‍💼 **Você atualiza diariamente** via painel admin
- 📱 **Android pronto** com Capacitor
- 🚀 **Sem login** - acesso direto

## 📁 Estrutura do Projeto

- **backend/** - API Node.js com Express
- **frontend/** - React com Vite + Capacitor
- **android/** - Projeto Android nativo (gerado pelo Capacitor)

## 🛠️ Tecnologias

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-7.4-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-Deploy-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)

- Frontend: React, Vite, TailwindCSS, Capacitor
- Backend: Node.js, Express, MongoDB
- Mobile: Capacitor (Android)
- Pagamento: Google Play Billing (RevenueCat)

## 🚀 Instalação Rápida

### Backend
```powershell
cd backend
npm install
Copy-Item .env.example .env
# Edite o .env com suas configurações
npm run dev
```

### Frontend
```powershell
cd frontend
npm install
npm run dev
```

O app estará disponível em: http://localhost:5173

## 📱 Build para Android

```powershell
cd frontend
npm run android:build    # Build e sincroniza
npm run android:open     # Abre no Android Studio
npm run android:run      # Build e roda no dispositivo
```

Veja o guia completo em **[ANDROID.md](ANDROID.md)**

## ⚙️ Variáveis de Ambiente

Criar arquivo `.env` no backend:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/meu-video-dia
JWT_SECRET=seu_secret_key_aqui
STRIPE_SECRET_KEY=sk_test_sua_chave_stripe
FRONTEND_URL=http://localhost:5173
```

## 📝 Como Usar

### Como Administrador:
1. Acesse `http://localhost:5173/admin`
2. Faça upload de um vídeo
3. Defina título, descrição e data

### Como Usuário:
1. Acesse `http://localhost:5173`
2. Assista o vídeo do dia
3. Clique em "Desbloquear Downloads" para comprar acesso (R$ 29,90)
4. Após o pagamento, baixe os vídeos

## 🎨 Melhorias desta Versão

✅ **Removido sistema de login** - Acesso mais simples e direto  
✅ **Capacitor integrado** - Pronto para gerar app Android/iOS  
✅ **Interface otimizada** - Mais limpa e responsiva  
✅ **Scripts automatizados** - Build Android com um comando  

## 📚 Documentação Adicional

- **[INSTALACAO.md](INSTALACAO.md)** - Guia completo de instalação
- **[ANDROID.md](ANDROID.md)** - Como gerar o app Android

## 🔧 Scripts Disponíveis

### Backend
- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm start` - Inicia servidor em produção

### Frontend
- `npm run dev` - Inicia Vite dev server
- `npm run build` - Build para produção
- `npm run android:build` - Build e prepara para Android
- `npm run android:open` - Abre projeto no Android Studio
- `npm run android:run` - Build e executa no Android

## 🐛 Troubleshooting

### Backend não conecta ao MongoDB
- Instale o MongoDB Community Server
- Ou use MongoDB Atlas (cloud gratuito)
- Verifique a string de conexão no `.env`

### Frontend não carrega vídeos
- Certifique-se que o backend está rodando na porta 5000
- Verifique o console do navegador para erros

### Android não conecta ao backend
- Use o IP local da sua máquina (não localhost)
- Configure CORS no backend para aceitar conexões externas
- Veja detalhes em [ANDROID.md](ANDROID.md)

## 🚀 Próximos Passos

- [ ] Adicionar notificações push quando novo vídeo for postado
- [ ] Implementar cache offline com Service Worker
- [ ] Adicionar compartilhamento de vídeos
- [ ] Histórico de vídeos anteriores
- [ ] Sistema de favoritos

## 📄 Licença

MIT
