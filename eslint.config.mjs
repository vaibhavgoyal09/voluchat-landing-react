import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist/**', '.astro/**', '.vercel/**', 'node_modules/**', 'scripts/**', 'convert_images.js']),
  js.configs.recommended,
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
      },
    },
  },
  {
    files: ['astro.config.mjs', 'eslint.config.mjs', 'test/**/*.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },
]);
