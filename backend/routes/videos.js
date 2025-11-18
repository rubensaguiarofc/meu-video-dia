import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Video from '../models/Video.js';
import uploadKey from '../middleware/uploadKey.js';
import { compressVideo } from '../utils/videoCompressor.js';
// Removido: authenticate, isAdmin - app sem login

const router = express.Router();

// Configuração do Multer para upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/videos';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp4|avi|mov|wmv|mkv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Apenas arquivos de vídeo são permitidos!'));
  }
});

// Upload de vídeo (SEM AUTENTICAÇÃO - app sem login)
router.post('/upload', uploadKey, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum vídeo foi enviado' });
    }

    const { title, description, date } = req.body;

    // Normaliza a data para UTC e garante apenas um vídeo ativo por dia
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setUTCHours(0, 0, 0, 0);
    const nextDate = new Date(targetDate);
    nextDate.setUTCDate(nextDate.getUTCDate() + 1);

    await Video.updateMany(
      {
        date: {
          $gte: targetDate,
          $lt: nextDate
        },
        isActive: true
      },
      { isActive: false }
    );

    // Comprimir vídeo para otimizar streaming
    const compressedFilename = 'compressed-' + req.file.filename;
    const compressedPath = path.join('uploads/videos', compressedFilename);
    
    console.log('Comprimindo vídeo:', req.file.filename);
    
    try {
      await compressVideo(req.file.path, compressedPath);
      
      // Remove o vídeo original após compressão bem-sucedida
      fs.unlinkSync(req.file.path);
      
      const video = new Video({
        title: title || 'Vídeo do Dia',
        description: description || '',
        filename: compressedFilename,
        filepath: compressedPath,
        date: targetDate,
        isActive: true
      });

      await video.save();

      res.status(201).json({
        message: 'Vídeo enviado e comprimido com sucesso',
        video: {
          id: video._id,
          title: video.title,
          description: video.description,
          date: video.date
        }
      });
    } catch (compressionError) {
      console.error('Erro na compressão, usando vídeo original:', compressionError);
      
      // Se falhar, usa o vídeo original
      const video = new Video({
        title: title || 'Vídeo do Dia',
        description: description || '',
        filename: req.file.filename,
        filepath: req.file.path,
        date: targetDate,
        isActive: true
      });

      await video.save();

      res.status(201).json({
        message: 'Vídeo enviado com sucesso (sem compressão)',
        video: {
          id: video._id,
          title: video.title,
          description: video.description,
          date: video.date
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao enviar vídeo', error: error.message });
  }
});

// Rota de streaming de vídeo com suporte a Range Requests
router.get('/stream/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Vídeo não encontrado' });
    }

    const videoPath = video.filepath;
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao transmitir vídeo', error: error.message });
  }
});

// Obter vídeo do dia (sem autenticação)
router.get('/today', async (req, res) => {
  try {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    let video = await Video.findOne({
      date: { $gte: today, $lt: tomorrow },
      isActive: true
    });

    if (!video) {
      // Fallback: retorna o último vídeo ativo disponível
      video = await Video.findOne({ isActive: true }).sort({ date: -1, createdAt: -1 });
    }

    if (!video) {
      // Último recurso: retorna o último vídeo cadastrado
      video = await Video.findOne().sort({ date: -1, createdAt: -1 });
    }

    if (!video) {
      return res.status(404).json({ message: 'Nenhum vídeo disponível hoje' });
    }

    // Incrementar views
    video.views += 1;
    await video.save();

    res.json({
      id: video._id,
      title: video.title,
      description: video.description,
      date: video.date,
      views: video.views,
      downloads: video.downloads,
      videoUrl: `${req.protocol}://${req.get('host')}/api/videos/stream/${video._id}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar vídeo', error: error.message });
  }
});

// Listar todos os vídeos (SEM AUTENTICAÇÃO - para debug)
router.get('/all', async (req, res) => {
  try {
    const videos = await Video.find().sort({ date: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar vídeos', error: error.message });
  }
});

// Download de vídeo (livre para todos)
router.get('/download/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Vídeo não encontrado' });
    }

    // Incrementar downloads
    video.downloads += 1;
    await video.save();

    res.download(video.filepath, video.filename);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao baixar vídeo', error: error.message });
  }
});

// Deletar vídeo (SEM AUTENTICAÇÃO - app sem login)
router.delete('/:id', uploadKey, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({ message: 'Vídeo não encontrado' });
    }

    // Deletar arquivo
    if (fs.existsSync(video.filepath)) {
      fs.unlinkSync(video.filepath);
    }

    await Video.deleteOne({ _id: req.params.id });
    res.json({ message: 'Vídeo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar vídeo', error: error.message });
  }
});

export default router;
