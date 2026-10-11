const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImages() {
  const publicDir = path.join(__dirname, '../public');
  const uploadedPng = path.join(publicDir, 'profile.jpg.png');
  const sourceJpg = path.join(publicDir, 'Profile_Pic.jpg');

  // If profile.jpg.png exists, copy it to Profile_Pic.jpg as our clean source
  if (fs.existsSync(uploadedPng)) {
    fs.copyFileSync(uploadedPng, sourceJpg);
    fs.unlinkSync(uploadedPng);
    console.log('Saved source to Profile_Pic.jpg and cleaned up profile.jpg.png');
  }

  if (!fs.existsSync(sourceJpg)) {
    console.error('Source image not found at', sourceJpg);
    process.exit(1);
  }

  // Inspect source dimensions
  const meta = await sharp(sourceJpg).metadata();
  console.log(`Source image dimensions: ${meta.width}x${meta.height}`);

  // Passport 3:4 portrait crop:
  // In 1024x1024:
  // Width 555, Height 740 (3:4 ratio)
  // Left: (1024 - 555) / 2 = 234. Face centered horizontally.
  // Top: 20. Eyes at ~255 (so (255 - 20) / 740 = 31.7% ~ one third down).
  // Bottom: 20 + 740 = 760. Shoulders clearly visible, completely crops out watermark at y > 920.
  const passportCrop = {
    left: 234,
    top: 20,
    width: 555,
    height: 740,
  };

  console.log('Generating 480x640 passport-style profile.webp and profile.jpg...');

  // Export profile.webp (480x640, under 60 KB)
  await sharp(sourceJpg)
    .extract(passportCrop)
    .resize(480, 640)
    .grayscale()
    .linear(1.12, -10)
    .webp({ quality: 80 })
    .toFile(path.join(publicDir, 'profile.webp'));

  // Export profile.jpg (480x640, under 60 KB)
  await sharp(sourceJpg)
    .extract(passportCrop)
    .resize(480, 640)
    .grayscale()
    .linear(1.12, -10)
    .jpeg({ quality: 80 })
    .toFile(path.join(publicDir, 'profile.jpg'));

  const webpStats = fs.statSync(path.join(publicDir, 'profile.webp'));
  const jpgStats = fs.statSync(path.join(publicDir, 'profile.jpg'));
  console.log(`profile.webp size: ${(webpStats.size / 1024).toFixed(2)} KB (target: < 60 KB)`);
  console.log(`profile.jpg size: ${(jpgStats.size / 1024).toFixed(2)} KB (target: < 60 KB)`);

  // 2. Favicons: tight crop on face (forehead to beard, cheeks)
  // In 1024x1024:
  // Face center is around x=512, y=360
  // Crop square: 520x520, left: 252, top: 100
  const faceCrop = {
    left: 252,
    top: 100,
    width: 520,
    height: 520,
  };

  console.log('Generating tight face-cropped grayscale favicons...');

  // icon-192.png
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(192, 192)
    .grayscale()
    .linear(1.15, -12)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  // icon-512.png
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(512, 512)
    .grayscale()
    .linear(1.15, -12)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  // icon.png (192x192)
  fs.copyFileSync(path.join(publicDir, 'icon-192.png'), path.join(publicDir, 'icon.png'));

  // apple-touch-icon.png (180x180)
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(180, 180)
    .grayscale()
    .linear(1.15, -12)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // favicon-48.png
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(48, 48)
    .grayscale()
    .linear(1.2, -15)
    .png()
    .toFile(path.join(publicDir, 'favicon-48.png'));

  // favicon-32.png
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(32, 32)
    .grayscale()
    .linear(1.2, -15)
    .png()
    .toFile(path.join(publicDir, 'favicon-32.png'));

  // favicon-16.png
  await sharp(sourceJpg)
    .extract(faceCrop)
    .resize(16, 16)
    .grayscale()
    .linear(1.2, -15)
    .png()
    .toFile(path.join(publicDir, 'favicon-16.png'));

  // favicon.ico from 32x32 PNG
  fs.copyFileSync(path.join(publicDir, 'favicon-32.png'), path.join(publicDir, 'favicon.ico'));

  console.log('Image and favicon processing completed successfully!');
}

processImages().catch(console.error);
