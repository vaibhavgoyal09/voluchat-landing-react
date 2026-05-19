const fs = require('fs');
const path = require('path');

const srcDir = '/home/vaibhav/.gemini/antigravity/brain/8fc3df8a-361f-4b39-b414-a6103f98e55e';
const destDir = '/home/vaibhav/voluchat-landing-react/public';

const files = [
  { src: 'white_runner_thumb_1779199566108.png', dest: 'white_runner_thumb.png' },
  { src: 'grey_runner_thumb_1779199585002.png', dest: 'grey_runner_thumb.png' },
  { src: 'black_trainer_thumb_1779199608114.png', dest: 'black_trainer_thumb.png' }
];

files.forEach(file => {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } else {
    console.error(`Source not found: ${srcPath}`);
  }
});
