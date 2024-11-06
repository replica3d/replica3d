import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { generateStaticHtml } from './src/utils/htmlGenerator';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'generate-html-files',
      async writeBundle() {
        const template = fs.readFileSync(path.resolve('dist/index.html'), 'utf-8');
        await generateStaticHtml(template);
      }
    }
  ],
  server: {
    port: 3000,
    strictPort: true,
    historyApiFallback: {
      disableDotRule: true
    }
  },
  preview: {
    port: 3000,
    strictPort: true,
    historyApiFallback: {
      disableDotRule: true
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});