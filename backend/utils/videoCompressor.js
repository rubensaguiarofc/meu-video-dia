import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import path from 'path';
import fs from 'fs';

ffmpeg.setFfmpegPath(ffmpegPath.path);

/**
 * Comprime um vídeo para otimizar streaming
 * @param {string} inputPath - Caminho do vídeo original
 * @param {string} outputPath - Caminho do vídeo comprimido
 * @returns {Promise<string>} - Caminho do arquivo comprimido
 */
export function compressVideo(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-c:v libx264',           // Codec H.264
        '-preset fast',            // Preset de compressão rápida
        '-crf 28',                 // Quality (18-28 é bom, menor = melhor qualidade)
        '-vf scale=-2:720',        // Redimensiona para 720p (altura), mantém aspect ratio
        '-c:a aac',                // Codec de áudio AAC
        '-b:a 128k',               // Bitrate de áudio 128kbps
        '-movflags +faststart'     // Otimiza para streaming (metadata no início)
      ])
      .on('start', (cmd) => {
        console.log('Iniciando compressão:', cmd);
      })
      .on('progress', (progress) => {
        console.log(`Progresso: ${progress.percent ? progress.percent.toFixed(2) : 0}%`);
      })
      .on('end', () => {
        console.log('Compressão concluída:', outputPath);
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('Erro na compressão:', err);
        reject(err);
      })
      .save(outputPath);
  });
}

/**
 * Obtém informações do vídeo (duração, resolução, etc)
 */
export function getVideoInfo(filePath) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) return reject(err);
      resolve(metadata);
    });
  });
}
