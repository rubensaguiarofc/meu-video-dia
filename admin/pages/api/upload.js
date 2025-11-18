import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método não permitido' });

  const uploadKey = process.env.UPLOAD_KEY;
  const backendUrl = process.env.BACKEND_URL;
  if (!uploadKey || !backendUrl) return res.status(500).json({ message: 'Configuração ausente' });

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ message: 'Erro parse form', error: err.message });
    const file = files.video;
    if (!file) return res.status(400).json({ message: 'Arquivo de vídeo não enviado' });

    try {
      // Reenviar para backend
      const fetch = (await import('node-fetch')).default;
      const FormData = (await import('form-data')).default;
      const formData = new FormData();
      formData.append('video', fs.createReadStream(file.filepath), file.originalFilename);
      if (fields.date) formData.append('date', fields.date);

      const response = await fetch(`${backendUrl}/api/videos/upload`, {
        method: 'POST',
        headers: { 'x-upload-key': uploadKey },
        body: formData,
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (e) {
      return res.status(500).json({ message: 'Erro ao enviar para backend', error: e.message });
    }
  });
}
