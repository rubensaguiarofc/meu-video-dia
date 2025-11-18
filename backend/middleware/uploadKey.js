import dotenv from 'dotenv';
dotenv.config();

export default function uploadKey(req, res, next) {
  const key = req.header('x-upload-key');
  const expected = process.env.UPLOAD_KEY;
  if (!expected) {
    return res.status(500).json({ message: 'UPLOAD_KEY não configurada no servidor' });
  }
  if (!key || key !== expected) {
    return res.status(401).json({ message: 'Chave de upload inválida ou ausente' });
  }
  next();
}
