import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const publicDir = path.join(process.cwd(), 'public');

// Ensure sharp is installed
try {
  console.log('Checking for "sharp" image processing library...');
  import.meta.resolve ? await import('sharp') : await import(path.join(process.cwd(), 'node_modules', 'sharp'));
} catch (e) {
  console.log('"sharp" not found. Installing now to convert images...');
  try {
    execSync('npm install sharp --no-save', { stdio: 'inherit' });
  } catch (err) {
    console.error('Failed to install sharp. Please run: npm install sharp');
    process.exit(1);
  }
}

const { default: sharp } = await import('sharp');

const filesToConvert = [
  'about_hero.png',
  'mission_collaboration.png',
  'contact_support.png',
  'white_runner_thumb.png',
  'grey_runner_thumb.png',
  'black_trainer_thumb.png',
  'linen_coord_thumb.png',
  'satin_kurta_thumb.png',
  'denim_overshirt_thumb.png',
  'buyer_avatar.png',
  'og-image.png'
];

console.log('\n--- Starting WebP Conversion & Compression ---');
console.log(`Searching directory: ${publicDir}\n`);

const results = [];

for (const fileName of filesToConvert) {
  const inputPath = path.join(publicDir, fileName);
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Skipped: ${fileName} (File not found)`);
    continue;
  }

  const baseName = path.basename(fileName, path.extname(fileName));
  const outputFileName = `${baseName}.webp`;
  const outputPath = path.join(publicDir, outputFileName);

  const origStats = fs.statSync(inputPath);
  const origSizeKB = (origStats.size / 1024).toFixed(2);

  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    const compStats = fs.statSync(outputPath);
    const compSizeKB = (compStats.size / 1024).toFixed(2);
    const savingPct = (((origStats.size - compStats.size) / origStats.size) * 100).toFixed(1);

    results.push({
      file: fileName,
      output: outputFileName,
      original: `${origSizeKB} KB`,
      compressed: `${compSizeKB} KB`,
      savings: `${savingPct}%`
    });

    console.log(`✅ Converted: ${fileName} -> ${outputFileName} (${savingPct}% size reduction)`);
  } catch (err) {
    console.error(`❌ Error converting ${fileName}:`, err.message);
  }
}

if (results.length > 0) {
  console.log('\n--- Compression Optimization Report ---');
  console.table(results);
  console.log('----------------------------------------');
  console.log('All target PNGs have been compressed and converted to WebP in your public/ directory!\n');
} else {
  console.log('\nNo files were converted. Ensure you have the PNG files in your public/ directory.');
}
