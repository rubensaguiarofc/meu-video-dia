#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

// Usage: node scripts/upload-today.js <filePathOrURL> [YYYY-MM-DD]
// If <filePathOrURL> is a URL (http/https) it will be downloaded to a temp file.
// Env vars required: BACKEND_URL (e.g. https://seu-backend.up.railway.app), UPLOAD_KEY

async function resolveSource(src) {
  if (/^https?:\/\//i.test(src)) {
    const resp = await axios.get(src, { responseType: 'arraybuffer' });
    const tmpPath = path.join(process.cwd(), `tmp-video-${Date.now()}.mp4`);
    fs.writeFileSync(tmpPath, resp.data);
    return { filePath: tmpPath, cleanup: () => fs.unlinkSync(tmpPath) };
  }
  const abs = path.resolve(src);
  if (!fs.existsSync(abs)) throw new Error('Arquivo não encontrado: ' + abs);
  return { filePath: abs, cleanup: () => {} };
}

async function main() {
  const [src, dateArg] = process.argv.slice(2);
  if (!src) {
    console.error('Uso: node scripts/upload-today.js <arquivo_ou_URL> [YYYY-MM-DD]');
    process.exit(1);
  }
  const BACKEND_URL = process.env.BACKEND_URL;
  const UPLOAD_KEY = process.env.UPLOAD_KEY;
  if (!BACKEND_URL) {
    console.error('Defina BACKEND_URL no .env');
    process.exit(1);
  }
  if (!UPLOAD_KEY) {
    console.error('Defina UPLOAD_KEY no .env');
    process.exit(1);
  }

  const { filePath, cleanup } = await resolveSource(src);

  try {
    const form = new FormData();
    form.append('video', fs.createReadStream(filePath));
    if (dateArg) form.append('date', dateArg);

    const res = await axios.post(`${BACKEND_URL}/api/videos/upload`, form, {
      headers: {
        ...form.getHeaders(),
        'x-upload-key': UPLOAD_KEY
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity
    });

    console.log('Upload OK:', res.data);
  } catch (err) {
    if (err.response) {
      console.error('Erro:', err.response.status, err.response.data);
    } else {
      console.error('Erro:', err.message);
    }
    process.exit(1);
  } finally {
    cleanup();
  }
}

main();
