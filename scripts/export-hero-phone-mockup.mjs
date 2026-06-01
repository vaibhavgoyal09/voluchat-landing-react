import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const DEFAULT_SOURCE = 'public/hero_demo.mp4';
const DEFAULT_OUTPUT = 'public/hero_demo_phone_mockup.mp4';

const round = (value) => Math.round(value);

const roundedRectPath = ({ x, y, width, height, radius }) => {
  const right = x + width;
  const bottom = y + height;

  return [
    `M ${x + radius} ${y}`,
    `H ${right - radius}`,
    `A ${radius} ${radius} 0 0 1 ${right} ${y + radius}`,
    `V ${bottom - radius}`,
    `A ${radius} ${radius} 0 0 1 ${right - radius} ${bottom}`,
    `H ${x + radius}`,
    `A ${radius} ${radius} 0 0 1 ${x} ${bottom - radius}`,
    `V ${y + radius}`,
    `A ${radius} ${radius} 0 0 1 ${x + radius} ${y}`,
    'Z',
  ].join(' ');
};

export const createMockupGeometry = ({ width, height }) => {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error('Video width and height must be positive numbers.');
  }

  const scale = width / 540;
  const whitePadding = round(25 * scale);
  const blackPadding = round(17 * scale);
  const border = Math.max(1, round(2 * scale));
  const shadowMargin = round(84 * scale);
  const outerRadius = round(68 * scale);
  const bezelRadius = round(56 * scale);
  const screenRadius = round(46 * scale);

  const outer = {
    x: shadowMargin,
    y: shadowMargin,
    width: width + 2 * (whitePadding + blackPadding + border),
    height: height + 2 * (whitePadding + blackPadding + border),
    radius: outerRadius,
  };

  const bezel = {
    x: outer.x + border + whitePadding,
    y: outer.y + border + whitePadding,
    width: width + 2 * blackPadding,
    height: height + 2 * blackPadding,
    radius: bezelRadius,
  };

  const screen = {
    x: bezel.x + blackPadding,
    y: bezel.y + blackPadding,
    width,
    height,
    radius: screenRadius,
  };

  const notch = {
    width: round(202 * scale),
    height: round(42 * scale),
    x: screen.x + round((screen.width - round(202 * scale)) / 2),
    y: screen.y + round(17 * scale),
    radius: round(21 * scale),
  };

  return {
    canvas: {
      width: outer.width + 2 * shadowMargin,
      height: outer.height + 2 * shadowMargin,
    },
    outer,
    bezel,
    screen,
    notch,
  };
};

export const renderBackgroundSvg = (geometry) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${geometry.canvas.width}" height="${geometry.canvas.height}" viewBox="0 0 ${geometry.canvas.width} ${geometry.canvas.height}">
  <defs>
    <filter id="phoneShadow" x="-30%" y="-20%" width="160%" height="150%">
      <feDropShadow dx="0" dy="${round(58 * geometry.screen.width / 540)}" stdDeviation="${round(45 * geometry.screen.width / 540)}" flood-color="#1c1917" flood-opacity="0.16"/>
    </filter>
    <filter id="roseGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="${round(54 * geometry.screen.width / 540)}"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <rect x="${geometry.outer.x - round(42 * geometry.screen.width / 540)}" y="${geometry.outer.y - round(42 * geometry.screen.width / 540)}" width="${geometry.outer.width + round(84 * geometry.screen.width / 540)}" height="${geometry.outer.height + round(84 * geometry.screen.width / 540)}" rx="${geometry.outer.radius + round(16 * geometry.screen.width / 540)}" fill="#ffe4e6" opacity="0.55" filter="url(#roseGlow)"/>
  <rect x="${geometry.outer.x}" y="${geometry.outer.y}" width="${geometry.outer.width}" height="${geometry.outer.height}" rx="${geometry.outer.radius}" fill="#ffffff" filter="url(#phoneShadow)"/>
</svg>
`;

export const renderFrameSvg = (geometry) => {
  const outerPath = roundedRectPath(geometry.outer);
  const bezelPath = roundedRectPath(geometry.bezel);
  const screenPath = roundedRectPath(geometry.screen);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${geometry.canvas.width}" height="${geometry.canvas.height}" viewBox="0 0 ${geometry.canvas.width} ${geometry.canvas.height}">
  <path d="${outerPath} ${bezelPath}" fill="#ffffff" fill-rule="evenodd"/>
  <rect x="${geometry.outer.x}" y="${geometry.outer.y}" width="${geometry.outer.width}" height="${geometry.outer.height}" rx="${geometry.outer.radius}" fill="none" stroke="#e7e5e4" stroke-width="${Math.max(1, round(1.5 * geometry.screen.width / 540))}"/>
  <path d="${bezelPath} ${screenPath}" fill="#0c0a09" fill-rule="evenodd"/>
  <rect x="${geometry.screen.x}" y="${geometry.screen.y}" width="${geometry.screen.width}" height="${geometry.screen.height}" rx="${geometry.screen.radius}" fill="none" stroke="#1c1917" stroke-opacity="0.22" stroke-width="${Math.max(1, round(1.5 * geometry.screen.width / 540))}"/>
  <rect x="${geometry.notch.x}" y="${geometry.notch.y}" width="${geometry.notch.width}" height="${geometry.notch.height}" rx="${geometry.notch.radius}" fill="#0c0a09" opacity="0.86"/>
</svg>
`;
};

export const buildFfmpegArgs = ({ source, output, background, frame, geometry }) => {
  const filter = [
    `[0:v]scale=${geometry.screen.width}:${geometry.screen.height}:flags=lanczos,format=rgba[phonevideo]`,
    '[1:v]fps=30,format=rgba[background]',
    '[2:v]fps=30,format=rgba[frame]',
    `[background][phonevideo]overlay=${geometry.screen.x}:${geometry.screen.y}:shortest=1[base]`,
    '[base][frame]overlay=0:0:shortest=1,fps=30,format=yuv420p[v]',
  ].join(';');

  return [
    '-y',
    '-i',
    source,
    '-framerate',
    '30',
    '-loop',
    '1',
    '-i',
    background,
    '-framerate',
    '30',
    '-loop',
    '1',
    '-i',
    frame,
    '-filter_complex',
    filter,
    '-map',
    '[v]',
    '-map',
    '0:a?',
    '-c:v',
    'libx264',
    '-crf',
    '18',
    '-preset',
    'medium',
    '-pix_fmt',
    'yuv420p',
    '-c:a',
    'copy',
    '-movflags',
    '+faststart',
    '-shortest',
    output,
  ];
};

const probeVideo = (source) => {
  const result = spawnSync('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'stream=width,height',
    '-of',
    'json',
    source,
  ], { encoding: 'utf8' });

  if (result.status !== 0 || !result.stdout) {
    throw new Error(result.stderr || result.error?.message || `Could not probe ${source}.`);
  }

  const output = result.stdout;
  const [stream] = JSON.parse(output).streams ?? [];

  if (!stream?.width || !stream?.height) {
    throw new Error(`Could not read video dimensions from ${source}.`);
  }

  return { width: stream.width, height: stream.height };
};

const runFfmpeg = (args, options = {}) => {
  const result = spawnSync('ffmpeg', args, options);

  if (result.status !== 0) {
    throw new Error(result.stderr?.toString() || result.error?.message || `ffmpeg exited with status ${result.status ?? 'unknown'}.`);
  }

  return result;
};

const renderSvgToPng = (source, output) => {
  runFfmpeg([
    '-y',
    '-i',
    source,
    '-frames:v',
    '1',
    '-update',
    '1',
    output,
  ], { encoding: 'utf8' });
};

const parseArgs = (argv) => {
  const options = {
    source: DEFAULT_SOURCE,
    output: DEFAULT_OUTPUT,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === '--source' && next) {
      options.source = next;
      index += 1;
    } else if (arg === '--output' && next) {
      options.output = next;
      index += 1;
    } else if (arg === '--help') {
      options.help = true;
    } else {
      throw new Error(`Unknown or incomplete argument: ${arg}`);
    }
  }

  return options;
};

const printHelp = () => {
  console.log(`Usage: node scripts/export-hero-phone-mockup.mjs [--source public/hero_demo.mp4] [--output public/hero_demo_phone_mockup.mp4]

Exports the hero demo video inside the same phone mockup used by src/components/HeroAutomationScene.astro.
Requires ffmpeg and ffprobe on PATH.`);
};

export const exportHeroPhoneMockup = ({ source = DEFAULT_SOURCE, output = DEFAULT_OUTPUT } = {}) => {
  const dimensions = probeVideo(source);
  const geometry = createMockupGeometry(dimensions);
  const tempDir = mkdtempSync(join(tmpdir(), 'voluchat-hero-phone-'));
  const backgroundSvg = join(tempDir, 'background.svg');
  const frameSvg = join(tempDir, 'frame.svg');
  const background = join(tempDir, 'background.png');
  const frame = join(tempDir, 'frame.png');

  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(backgroundSvg, renderBackgroundSvg(geometry));
  writeFileSync(frameSvg, renderFrameSvg(geometry));
  renderSvgToPng(backgroundSvg, background);
  renderSvgToPng(frameSvg, frame);

  runFfmpeg(buildFfmpegArgs({
    source,
    output,
    background,
    frame,
    geometry,
  }), { stdio: 'inherit' });

  rmSync(tempDir, { recursive: true, force: true });

  return { output, geometry };
};

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
  } else {
    const { output, geometry } = exportHeroPhoneMockup(options);
    console.log(`Exported ${output} (${geometry.canvas.width}x${geometry.canvas.height}).`);
  }
}
