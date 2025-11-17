# 🚀 Guia de Publicação na Play Store

## Preparação do App para Produção

### 1. Configure o Backend em Produção

#### Opção A: Usar Railway (Recomendado - Gratuito)

1. **Crie conta em**: https://railway.app
2. **Deploy do backend**:
   - Conecte seu repositório GitHub
   - Ou use Railway CLI:
   ```powershell
   npm i -g @railway/cli
   railway login
   railway init
   railway up
   ```

3. **Configure variáveis de ambiente no Railway**:
   ```
   MONGODB_URI=sua_connection_string_atlas
   PORT=5000
   JWT_SECRET=seu_secret
   ```

4. **Anote a URL do backend** (ex: `https://seu-app.railway.app`)

#### Opção B: Usar Render (Gratuito)

1. Acesse: https://render.com
2. New > Web Service
3. Conecte o repositório
4. Configure as variáveis de ambiente
5. Deploy

### 2. Configure MongoDB Atlas (Banco na Nuvem)

1. Acesse: https://www.mongodb.com/cloud/atlas
2. Crie um cluster gratuito (M0)
3. Database Access > Add New User
4. Network Access > Add IP Address > Allow from Anywhere (0.0.0.0/0)
5. Copie a connection string
6. Atualize no Railway/Render

### 3. Atualize a URL do Backend no App

Edite: `frontend/src/config.js`
```javascript
export const API_BASE_URL = 'https://seu-app.railway.app';
```

### 4. Personalize o App

#### Alterar Nome e ID do App

Edite: `frontend/capacitor.config.json`
```json
{
  "appId": "com.seudominio.meuvideododia",
  "appName": "Meu Vídeo do Dia",
  "webDir": "dist",
  "server": {
    "androidScheme": "https"
  }
}
```

#### Criar Ícones do App

1. **Crie um ícone 1024x1024 px** (PNG com fundo)
   - Ferramentas: Canva, Figma, Photoshop

2. **Gere os ícones adaptáveis**:
   ```powershell
   npm install -g @capacitor/assets
   cd frontend
   npx capacitor-assets generate --android
   ```

   Ou manualmente, coloque seus ícones em:
   ```
   frontend/android/app/src/main/res/
   ├── mipmap-hdpi/ic_launcher.png (72x72)
   ├── mipmap-mdpi/ic_launcher.png (48x48)
   ├── mipmap-xhdpi/ic_launcher.png (96x96)
   ├── mipmap-xxhdpi/ic_launcher.png (144x144)
   └── mipmap-xxxhdpi/ic_launcher.png (192x192)
   ```

### 5. Configurar Versão e Build

Edite: `frontend/android/app/build.gradle`

```gradle
android {
    defaultConfig {
        applicationId "com.seudominio.meuvideododia"
        minSdkVersion 22
        targetSdkVersion 34
        versionCode 1       // Incrementar a cada versão
        versionName "1.0.0" // Versão visível
    }
}
```

### 6. Gerar Keystore (Assinatura do App)

```powershell
cd frontend/android
keytool -genkey -v -keystore meuvideo-release.keystore -alias meuvideo -keyalg RSA -keysize 2048 -validity 10000
```

**IMPORTANTE:** Guarde a senha em local seguro! Você vai precisar para todas as atualizações.

### 7. Configurar Assinatura

Crie: `frontend/android/key.properties`
```properties
storePassword=SUA_SENHA
keyPassword=SUA_SENHA
keyAlias=meuvideo
storeFile=meuvideo-release.keystore
```

Edite: `frontend/android/app/build.gradle`

Adicione antes de `android {`:
```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Dentro de `android {`, adicione:
```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
        storePassword keystoreProperties['storePassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### 8. Build do AAB (Android App Bundle)

```powershell
cd frontend
npm run build
npx cap sync android
npx cap open android
```

No Android Studio:
1. Build > Generate Signed Bundle / APK
2. Escolha **Android App Bundle**
3. Selecione o keystore criado
4. Preencha as senhas
5. Build Variant: **release**
6. Click em **Finish**

O AAB estará em: `frontend/android/app/release/app-release.aab`

### 9. Criar Conta de Desenvolvedor Google Play

1. Acesse: https://play.google.com/console
2. Pague a taxa única de $25 USD
3. Complete o cadastro

### 10. Criar o App na Play Store

1. **Criar App**:
   - All apps > Create app
   - Nome do app
   - Idioma padrão: Português (Brasil)
   - Tipo: App

2. **Dashboard > Configurar**:

   #### Privacidade:
   - Política de privacidade (criar uma página web simples)
   - Categorias do app
   - Informações de contato

   #### Classificação de conteúdo:
   - Responder questionário
   - Geralmente será: Livre (PEGI 3)

   #### Público-alvo:
   - Faixa etária principal
   - Se é voltado para crianças

   #### Segurança de dados:
   - Declarar quais dados coleta (se houver)
   - Como os dados são usados

3. **Produção > Criar nova versão**:
   - Upload do AAB
   - Nome da versão: 1.0.0
   - Notas de versão:
     ```
     - Lançamento inicial
     - Reprodução de vídeos diários
     - Download gratuito de vídeos
     ```

4. **Adicionar Recursos**:
   - **Screenshots** (mínimo 2, máximo 8):
     - 16:9 (ex: 1920x1080)
     - Captura da tela do app funcionando
   
   - **Ícone de feature** (512x512 px):
     - Ícone quadrado do app
   
   - **Descrição curta** (80 caracteres):
     ```
     Um vídeo novo todo dia. Assista e baixe gratuitamente!
     ```
   
   - **Descrição completa** (4000 caracteres):
     ```
     🎬 Meu Vídeo do Dia
     
     Receba um vídeo exclusivo todos os dias, diretamente no seu celular!
     
     ✨ RECURSOS:
     • Um vídeo novo por dia
     • Download gratuito
     • Reprodução offline
     • Interface simples e intuitiva
     • Sem propagandas
     
     📱 COMO FUNCIONA:
     1. Abra o app
     2. Assista o vídeo do dia
     3. Baixe gratuitamente se quiser assistir offline
     
     💡 PERFEITO PARA:
     • Conteúdo diário
     • Entretenimento
     • Aprendizado
     • Motivação
     
     🆓 TOTALMENTE GRÁTIS
     Sem taxas, sem assinaturas, sem pegadinhas.
     
     Baixe agora e comece a assistir!
     ```

5. **Enviar para Revisão**:
   - Review e envie para análise
   - Aguarde aprovação (geralmente 1-3 dias)

### 11. Atualizar o App (Versões Futuras)

1. Incremente a versão em `build.gradle`:
   ```gradle
   versionCode 2       // Era 1
   versionName "1.0.1" // Era 1.0.0
   ```

2. Gere novo AAB assinado

3. Play Console > Produção > Criar nova versão

4. Upload do novo AAB

5. Adicione as notas da versão (o que mudou)

6. Enviar para revisão

## 📊 Monitoramento e Manutenção

### Estatísticas no Play Console:
- Downloads
- Avaliações
- Relatórios de crashes
- Métricas de desempenho

### Atualizar Vídeos Diariamente:
1. Acesse: https://seu-backend.railway.app/admin
2. Faça upload do vídeo do dia
3. Automaticamente disponível para todos os usuários

### Backup do Keystore:
⚠️ **MUITO IMPORTANTE**: Faça backup do arquivo `.keystore`
- Sem ele, você não pode atualizar o app!
- Guarde em local seguro (Google Drive, Dropbox, etc.)

## 🔐 Segurança

**NÃO commite no Git:**
- `key.properties`
- `*.keystore`
- `.env`

Adicione ao `.gitignore`:
```
*.keystore
key.properties
.env
```

## 🎯 Checklist Final

- [ ] Backend em produção funcionando
- [ ] MongoDB Atlas configurado
- [ ] URL do backend atualizada no app
- [ ] Ícones personalizados
- [ ] Keystore criado e guardado
- [ ] AAB assinado gerado
- [ ] Screenshots capturados
- [ ] Descrições escritas
- [ ] Política de privacidade criada
- [ ] Conta na Play Console criada
- [ ] App enviado para revisão

## 💡 Dicas Importantes

1. **Teste muito antes de publicar** no emulador e dispositivos reais
2. **Screenshots atraentes** aumentam downloads
3. **Descrição clara** do propósito do app
4. **Responda reviews** dos usuários
5. **Atualize regularmente** com melhorias
6. **Faça backup** do keystore!

## 🆘 Troubleshooting

### App rejeitado na Play Store:
- Leia o feedback cuidadosamente
- Corrija os problemas apontados
- Reenvie para revisão

### Erro de assinatura:
- Verifique senhas no `key.properties`
- Confirme que o keystore existe

### Build falha:
- Limpe: `cd android && ./gradlew clean`
- Sincronize: `npx cap sync android`
- Tente novamente

Boa sorte com a publicação! 🚀
