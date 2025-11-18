import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('admin_ok') === '1') setAuthed(true);
  }, []);

  const submitPassword = () => {
    if (pwd === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_ok', '1');
      setAuthed(true);
    } else {
      alert('Senha incorreta');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setStatus('Enviando...');
    const form = new FormData();
    form.append('video', file);
    if (date) form.append('date', date);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erro');
      setStatus('OK: ' + data.video?.id);
    } catch (err) {
      setStatus('Falhou: ' + err.message);
    }
  };

  if (!authed) {
    return (
      <div style={{ maxWidth: 320, margin: '40px auto', fontFamily: 'sans-serif' }}>
        <h2>Admin Login</h2>
        <input type="password" placeholder="Senha" value={pwd} onChange={e => setPwd(e.target.value)} />
        <button onClick={submitPassword} style={{ display: 'block', marginTop: 12 }}>Entrar</button>
        <p style={{ fontSize: 12, opacity: 0.7 }}>Uso restrito. Não compartilhe.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: '30px auto', fontFamily: 'sans-serif' }}>
      <h1>Upload Vídeo do Dia</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="video/*" onChange={e => setFile(e.target.files?.[0])} />
        <br /><br />
        <label>Data (opcional): </label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <br /><br />
        <button type="submit">Enviar</button>
      </form>
      <p>{status}</p>
    </div>
  );
}
