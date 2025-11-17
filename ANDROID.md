# 📱 Guia de Build para Android

Este guia explica como compilar e rodar o aplicativo no Android.

## Pré-requisitos

### 1. Instalar Android Studio
- Baixe: https://developer.android.com/studio
- Instale com as configurações padrão
- Abra o Android Studio e aguarde a instalação dos componentes

### 2. Configurar Variáveis de Ambiente

Adicione ao PATH do Windows:
```
ANDROID_HOME=C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk
```

E adicione também:
```
C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk\platform-tools
C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk\tools
```

### 3. Instalar JDK 17
- Baixe: https://adoptium.net/
- Instale o JDK 17 (LTS)
- Configure JAVA_HOME

## Comandos Disponíveis

### Build para Android
```powershell
cd frontend
npm run android:build
```
Este comando:
1. Faz o build do projeto Vite
2. Sincroniza os arquivos com o Capacitor
3. Prepara o projeto Android

### Abrir no Android Studio
```powershell
cd frontend
npm run android:open
```
Abre o projeto no Android Studio para você:
- Rodar em emulador
- Rodar em dispositivo físico
- Fazer debug
- Gerar APK/AAB

### Build e Executar (tudo de uma vez)
```powershell
cd frontend
npm run android:run
```
Faz build, sincroniza e roda no dispositivo/emulador conectado.

## Testando no Emulador

1. **Criar Emulador no Android Studio:**
   - Tools > Device Manager
   - Create Virtual Device
   - Escolha um dispositivo (ex: Pixel 6)
   - Escolha uma imagem do sistema (ex: Android 13)
   - Finish

2. **Iniciar o emulador:**
   - Abra o Device Manager
   - Clique no play no dispositivo criado

3. **Rodar o app:**
   ```powershell
   npm run android:run
   ```

## Testando em Dispositivo Físico

1. **Ativar modo desenvolvedor no celular:**
   - Configurações > Sobre o telefone
   - Toque 7 vezes em "Número da versão"
   
2. **Ativar depuração USB:**
   - Configurações > Opções do desenvolvedor
   - Ative "Depuração USB"

3. **Conectar o celular no PC via USB**

4. **Rodar o app:**
   ```powershell
   npm run android:run
   ```

## Gerar APK para Distribuição

### APK de Debug (para testes)
1. Abra o projeto no Android Studio:
   ```powershell
   npm run android:open
   ```

2. Build > Build Bundle(s) / APK(s) > Build APK(s)

3. O APK estará em: `android/app/build/outputs/apk/debug/`

### APK/AAB de Release (para publicação)

1. **Criar keystore (primeira vez):**
   ```powershell
   keytool -genkey -v -keystore meu-video.keystore -alias meuvideo -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Configurar assinatura no Android Studio:**
   - Build > Generate Signed Bundle / APK
   - Escolha APK ou AAB
   - Selecione o keystore criado
   - Preencha as senhas
   - Build

3. O arquivo estará em: `android/app/release/`

## Configurações Importantes

### Permissões (android/app/src/main/AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### Ícone do App
Substitua os ícones em:
```
android/app/src/main/res/mipmap-*/ic_launcher.png
```

### Nome do App
Edite: `android/app/src/main/res/values/strings.xml`
```xml
<string name="app_name">Meu Vídeo do Dia</string>
```

## Conectar ao Backend Local

Para que o app Android acesse o backend rodando no seu PC:

1. **Descubra seu IP local:**
   ```powershell
   ipconfig
   ```
   Procure por "Endereço IPv4" (ex: 192.168.1.100)

2. **Atualize a URL no código:**
   Edite `frontend/src/pages/Home.jsx` e `AdminDashboard.jsx`
   ```javascript
   axios.defaults.baseURL = 'http://192.168.1.100:5000';
   ```

3. **No backend, permita conexões externas:**
   No `backend/server.js`, configure CORS:
   ```javascript
   app.use(cors({
     origin: '*', // ou especifique o IP
     credentials: true
   }));
   ```

## Troubleshooting

### Erro: "SDK location not found"
- Defina ANDROID_HOME corretamente
- Reinicie o terminal/VS Code

### Erro: "No connected devices"
- Verifique se o emulador está rodando
- Verifique se o celular está conectado: `adb devices`

### Erro de build
- Limpe o projeto: `cd android && ./gradlew clean`
- Invalide cache no Android Studio: File > Invalidate Caches / Restart

### App não conecta ao backend
- Verifique o IP do PC
- Confirme que o firewall permite conexões na porta 5000
- Use `http://` não `https://` para desenvolvimento local

## Publicar na Google Play Store

1. Gere um AAB (Android App Bundle) assinado
2. Crie uma conta de desenvolvedor: https://play.google.com/console
3. Crie um novo app
4. Faça upload do AAB
5. Preencha as informações obrigatórias
6. Submeta para revisão

## Estrutura do Projeto Android

```
frontend/
├── android/                  # Projeto Android nativo
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── res/         # Recursos (ícones, strings)
│   │   │   └── java/        # Código Java/Kotlin (se necessário)
│   └── build.gradle
├── capacitor.config.json    # Configurações do Capacitor
└── dist/                    # Build do Vite (copiado para Android)
```

## Recursos Úteis

- [Documentação Capacitor](https://capacitorjs.com/docs)
- [Documentação Android](https://developer.android.com/docs)
- [Capacitor Android](https://capacitorjs.com/docs/android)
