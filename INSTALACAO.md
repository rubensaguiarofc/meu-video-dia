# Guia de Instalação e Configuração

## Pré-requisitos

- Node.js (v18 ou superior)
- MongoDB (instalado localmente ou conta no MongoDB Atlas)
- Conta no Stripe (para pagamentos)

## Passo 1: Instalar MongoDB

### Windows:
1. Baixe o MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Execute o instalador
3. Inicie o MongoDB:
```powershell
net start MongoDB
```

### Ou use MongoDB Atlas (Cloud):
1. Crie uma conta em https://www.mongodb.com/cloud/atlas
2. Crie um cluster gratuito
3. Obtenha a string de conexão

## Passo 2: Configurar Backend

1. Abra o PowerShell e navegue até a pasta backend:
```powershell
cd "C:\Users\A6.INC019\Desktop\Aplicativos\Meu video do dia\backend"
```

2. Instale as dependências:
```powershell
npm install
```

3. Copie o arquivo de ambiente:
```powershell
Copy-Item .env.example .env
```

4. Edite o arquivo `.env` e configure:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/meu-video-dia
JWT_SECRET=seu_secret_key_muito_seguro_aqui_12345
STRIPE_SECRET_KEY=sk_test_sua_chave_stripe_aqui
FRONTEND_URL=http://localhost:5173
```

Para obter a chave do Stripe:
- Acesse https://dashboard.stripe.com/register
- Crie uma conta
- Vá em "Developers" > "API keys"
- Copie a "Secret key" (começa com sk_test_)

5. Inicie o servidor:
```powershell
npm run dev
```

O backend estará rodando em: http://localhost:5000

## Passo 3: Configurar Frontend

1. Abra outro terminal PowerShell e navegue até a pasta frontend:
```powershell
cd "C:\Users\A6.INC019\Desktop\Aplicativos\Meu video do dia\frontend"
```

2. Instale as dependências:
```powershell
npm install
```

3. No arquivo `src/pages/Home.jsx`, linha 7, substitua a chave publicável do Stripe:
```javascript
const stripePromise = loadStripe('pk_test_sua_chave_publicavel_aqui');
```

Para obter a chave publicável:
- No Stripe Dashboard, vá em "Developers" > "API keys"
- Copie a "Publishable key" (começa com pk_test_)

4. Inicie o aplicativo:
```powershell
npm run dev
```

O frontend estará rodando em: http://localhost:5173

## Passo 4: Criar Usuário Administrador

1. Acesse http://localhost:5173
2. Clique em "Cadastre-se"
3. Crie um usuário

4. Para tornar este usuário admin, abra o MongoDB Compass ou use o mongo shell:
```javascript
use meu-video-dia
db.users.updateOne(
  { email: "seu@email.com" },
  { $set: { role: "admin" } }
)
```

5. Faça logout e login novamente

## Passo 5: Testar o Aplicativo

1. **Como Admin:**
   - Acesse http://localhost:5173/admin
   - Faça upload de um vídeo de teste
   - Configure o título e a data

2. **Como Usuário:**
   - Volte para a página inicial (http://localhost:5173)
   - Assista o vídeo do dia
   - Teste o botão de download (vai pedir pagamento)

3. **Testar Pagamento:**
   - Use o cartão de teste do Stripe: `4242 4242 4242 4242`
   - Data: qualquer data futura
   - CVC: qualquer 3 dígitos
   - CEP: qualquer 5 dígitos

## Estrutura de Pastas

```
Meu video do dia/
├── backend/
│   ├── models/          # Modelos do MongoDB
│   ├── routes/          # Rotas da API
│   ├── middleware/      # Autenticação e validação
│   ├── uploads/         # Vídeos enviados
│   └── server.js        # Servidor principal
│
├── frontend/
│   └── src/
│       ├── components/  # Componentes reutilizáveis
│       ├── context/     # Context API (autenticação)
│       ├── pages/       # Páginas do aplicativo
│       └── App.jsx      # Componente principal
│
└── README.md
```

## Solução de Problemas

### Erro ao conectar ao MongoDB:
- Verifique se o MongoDB está rodando
- Confirme a string de conexão no arquivo `.env`

### Erro ao fazer upload de vídeo:
- Verifique se a pasta `backend/uploads/videos` existe
- O tamanho máximo é 500MB

### Erro de autenticação:
- Limpe o localStorage do navegador
- Faça logout e login novamente

### Stripe não funciona:
- Verifique se as chaves (secret e publishable) estão corretas
- Use o modo de teste do Stripe

## Próximos Passos

- Configure o webhook do Stripe para produção
- Adicione mais recursos (histórico de vídeos, perfil do usuário)
- Configure SSL/HTTPS para produção
- Faça deploy (Vercel, Heroku, AWS, etc.)
