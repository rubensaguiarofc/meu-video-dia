/*
 * Simple icon generation script using sharp.
 * Provide a base square PNG (>=1024x1024) at assets/icon-base.png
 * Generates Android mipmap sizes and splash foreground asset.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const basePath = path.resolve(__dirname, '../assets');
const inputIcon = path.join(basePath, 'icon-base.png');

if (!fs.existsSync(inputIcon)) {
  console.error('Base icon not found at assets/icon-base.png');
  process.exit(1);
}

const androidRes = path.resolve(__dirname, '../android/app/src/main/res');

const densities = [
  { dir: 'mipmap-mdpi', size: 48 },
  { dir: 'mipmap-hdpi', size: 72 },
  { dir: 'mipmap-xhdpi', size: 96 },
  { dir: 'mipmap-xxhdpi', size: 144 },
  { dir: 'mipmap-xxxhdpi', size: 192 }
];

(async () => {
  for (const d of densities) {
    const outDir = path.join(androidRes, d.dir);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'ic_launcher_foreground.png');
    await sharp(inputIcon)
      .resize(d.size, d.size, { fit: 'contain' })
      .png()
      .toFile(outFile);
    console.log('Generated', outFile);
  }

  // Splash logo centered asset (512px) to drawable
  const drawableDir = path.join(androidRes, 'drawable');
  if (!fs.existsSync(drawableDir)) fs.mkdirSync(drawableDir, { recursive: true });
  const splashLogo = path.join(drawableDir, 'splash_logo.png');
  await sharp(inputIcon).resize(512, 512, { fit: 'contain' }).png().toFile(splashLogo);
  console.log('Generated', splashLogo);
})();
