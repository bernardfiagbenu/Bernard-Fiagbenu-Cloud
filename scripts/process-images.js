const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImages() {
  const publicDir = path.join(__dirname, '../public');
  const sourceJpg = path.join(publicDir, 'Profile_Pic.jpg');

  if (!fs.existsSync(sourceJpg)) {
    console.error('Source image not found at', sourceJpg);
    process.exit(1);
  }

  const meta = await sharp(sourceJpg).metadata();
  console.log(`Source image dimensions: ${meta.width}x${meta.height}`);

  // 1. Passport 3:4 portrait crop (IN FULL COLOUR - ONLY COLOURED ELEMENT ON SITE)
  // In 1024x1024 source:
  // Width: 555, Height: 740 (3:4 aspect ratio)
  // Left: (1024 - 555) / 2 = 234 (face horizontally centered)
  // Top: 20 (eyes at y ~ 255 -> (255 - 20) / 740 = 235 / 740 ≈ 31.7% ~ one-third down)
  // Bottom: 20 + 740 = 760 (shoulders clearly visible, completely crops out sparkle watermark at y > 920)
  const passportCrop = {
    left: 234,
    top: 20,
    width: 555,
    height: 740,
  };

  console.log('Generating 480x640 COLOUR passport-style profile.jpeg, profile.webp, and bernard-fiagbenu-portrait.jpg...');

  // Export profile.webp (COLOUR, 480x640, high quality, under 80 KB)
  await sharp(sourceJpg)
    .extract(passportCrop)
    .resize(480, 640)
    .webp({ quality: 84 })
    .toFile(path.join(publicDir, 'profile.webp'));

  // Export profile.jpeg (COLOUR, 480x640, high quality, mozjpeg, under 80 KB)
  await sharp(sourceJpg)
    .extract(passportCrop)
    .resize(480, 640)
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(publicDir, 'profile.jpeg'));

  // Also maintain profile.jpg fallback
  fs.copyFileSync(path.join(publicDir, 'profile.jpeg'), path.join(publicDir, 'profile.jpg'));

  // And bernard-fiagbenu-portrait.jpg for descriptive SEO file naming
  fs.copyFileSync(path.join(publicDir, 'profile.jpeg'), path.join(publicDir, 'bernard-fiagbenu-portrait.jpg'));

  const webpStats = fs.statSync(path.join(publicDir, 'profile.webp'));
  const jpegStats = fs.statSync(path.join(publicDir, 'profile.jpeg'));
  console.log(`profile.webp size: ${(webpStats.size / 1024).toFixed(2)} KB (target: < 80 KB)`);
  console.log(`profile.jpeg size: ${(jpegStats.size / 1024).toFixed(2)} KB (target: < 80 KB)`);

  // 2. Favicons: tight crop on face (forehead to beard/cheeks, in colour)
  const faceCrop = {
    left: 252,
    top: 100,
    width: 520,
    height: 520,
  };

  console.log('Generating tight face-cropped favicons...');

  // icon-192.png
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  // icon-512.png
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  // icon.png (192x192)
  fs.copyFileSync(path.join(publicDir, 'icon-192.png'), path.join(publicDir, 'icon.png'));

  // apple-touch-icon.png (180x180)
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // favicon-48.png
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon-48.png'));

  // favicon-32.png
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32.png'));

  // favicon-16.png
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16.png'));

  // favicon.ico from 32x32 PNG
  fs.copyFileSync(path.join(publicDir, 'favicon-32.png'), path.join(publicDir, 'favicon.ico'));

  console.log('Colour photo processing and favicons generated successfully!');
}

processImages().catch(console.error);
