# Painel Admin (Upload Vídeo do Dia)

Projeto separado (Next.js) para realizar upload do vídeo diário sem expor a chave de upload ao cliente público.

## Fluxo
1. Usuário acessa `/` do painel.
2. Digita a senha (ver `NEXT_PUBLIC_ADMIN_PASSWORD`).
3. Faz upload do arquivo e opcionalmente define data (YYYY-MM-DD).
4. API interna `/api/upload` encaminha para backend (`/api/videos/upload`) adicionando o header `x-upload-key` usando `UPLOAD_KEY` do ambiente.

## Variáveis de Ambiente (Vercel)
- `UPLOAD_KEY` (mesma do backend)
- `BACKEND_URL` (ex: https://meu-video-dia.up.railway.app)
- `NEXT_PUBLIC_ADMIN_PASSWORD` (senha do gate simples)

## Instalação
```bash
cd admin
npm install
npm run dev
```

## Deploy Vercel
Crie novo projeto apontando para pasta `admin`. Adicione as variáveis acima em Project Settings.

## Segurança
- A chave real não vai para o bundle; fica em função serverless.
- Gate de senha no client é apenas camada extra leve; trocar periodicamente.
- Se precisar algo mais forte (2FA/IP allowlist), adicionar no futuro.

## Upload Manual via API
Ainda é possível usar `curl` diretamente se possuir a chave:
```bash
curl -X POST "$BACKEND_URL/api/videos/upload" -H "x-upload-key: $UPLOAD_KEY" -F "video=@video.mp4"
```

## Próximos passos sugeridos
- Basic Auth ao invés de senha em memória.
- Registro de audit (log de uploads) em coleção Mongo.
- Validação de duração/resolução do vídeo.
- Suporte a transcodificação e miniatura.
