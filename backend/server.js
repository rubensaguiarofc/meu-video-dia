import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import videoRoutes from './routes/videos.js';
import paymentRoutes from './routes/payment.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL].filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // permitir requisições server-side/curl
    if (allowedOrigins.length === 0) return callback(null, true); // fallback se não configurado
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin not allowed by CORS')); 
  },
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Meu Vídeo do Dia - Funcionando!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
