const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processColorPhoto() {
  const publicDir = path.join(__dirname, '../public');
  const sourceJpg = path.join(publicDir, 'Profile_Pic.jpg');

  if (!fs.existsSync(sourceJpg)) {
    console.error('Source image not found at', sourceJpg);
    process.exit(1);
  }

  const meta = await sharp(sourceJpg).metadata();
  console.log(`Source image dimensions: ${meta.width}x${meta.height}`);

  // 3:4 portrait crop for 1024x1024 source:
  // Width 555, Height 740 (3:4 ratio)
  // Left: (1024 - 555) / 2 = 234. Face centered horizontally.
  // Top: 20. Eyes at ~255 (~31.7% down).
  // Bottom: 20 + 740 = 760. Shoulders visible, crops out watermark at y > 920.
  const passportCrop = {
    left: 234,
    top: 20,
    width: 555,
    height: 740,
  };

  console.log('Generating 480x640 color passport-style profile.jpeg and profile.webp...');

  // Export profile.webp (color, 480x640, under 80 KB)
  await sharp(sourceJpg)
    .extract(passportCrop)
    .resize(480, 640)
    .webp({ quality: 85 })
    .toFile(path.join(publicDir, 'profile.webp'));

  // Export profile.jpeg (color, 480x640, under 80 KB)
  await sharp(sourceJpg)
    .extract(passportCrop)
    .resize(480, 640)
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(path.join(publicDir, 'profile.jpeg'));

  const webpStats = fs.statSync(path.join(publicDir, 'profile.webp'));
  const jpegStats = fs.statSync(path.join(publicDir, 'profile.jpeg'));
  console.log(`profile.webp size: ${(webpStats.size / 1024).toFixed(2)} KB (target: < 80 KB)`);
  console.log(`profile.jpeg size: ${(jpegStats.size / 1024).toFixed(2)} KB (target: < 80 KB)`);

  // Favicons: tight face crop
  const faceCrop = {
    left: 252,
    top: 100,
    width: 520,
    height: 520,
  };

  console.log('Generating color favicons...');

  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  fs.copyFileSync(path.join(publicDir, 'icon-192.png'), path.join(publicDir, 'icon.png'));

  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon-48.png'));

  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32.png'));

  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16.png'));

  fs.copyFileSync(path.join(publicDir, 'favicon-32.png'), path.join(publicDir, 'favicon.ico'));

  console.log('Color photo and favicon processing completed successfully!');
}

processColorPhoto().catch(console.error);
