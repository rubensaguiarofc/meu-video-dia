import { useState } from 'react';
import axios from 'axios';

export default function AdminUpload() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [file, setFile] = useState(null);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const checkPassword = () => {
    // Senha hardcoded (trocar depois para env var se quiser)
    if (password === 'qF8#Lz2!Yp6@Rw3$Td') {
      setAuthed(true);
      sessionStorage.setItem('admin_auth', '1');
    } else {
      alert('Senha incorreta');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setStatus('Enviando...');
    
    const formData = new FormData();
    formData.append('video', file);
    if (date) formData.append('date', date);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://meu-video-dia-production.up.railway.app';
      const uploadKey = import.meta.env.VITE_UPLOAD_KEY;
      
      const res = await axios.post(`${backendUrl}/api/videos/upload`, formData, {
        headers: {
          'x-upload-key': uploadKey
        }
      });
      
      setStatus('✅ Upload OK: ' + res.data.video?.id);
      setFile(null);
      setDate('');
    } catch (err) {
      setStatus('❌ Erro: ' + (err.response?.data?.message || err.message));
    }
  };

  if (!authed && sessionStorage.getItem('admin_auth') !== '1') {
    return (
      <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, fontFamily: 'sans-serif' }}>
        <h2>Admin Upload</h2>
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button onClick={checkPassword} style={{ padding: '8px 16px' }}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '30px auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Upload Vídeo do Dia</h1>
      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          accept="video/*" 
          onChange={e => setFile(e.target.files?.[0])}
          style={{ display: 'block', marginBottom: 10 }}
        />
        <label>Data (opcional): </label>
        <input 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)}
          style={{ marginLeft: 10, marginBottom: 10 }}
        />
        <br />
        <button type="submit" style={{ padding: '8px 16px', marginTop: 10 }}>Enviar</button>
      </form>
      <p style={{ marginTop: 20 }}>{status}</p>
    </div>
  );
}
