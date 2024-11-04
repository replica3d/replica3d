import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { generateStaticHtml } from './src/utils/htmlGenerator';

export default defineConfig({
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
  server: { historyApiFallback: true },
  preview: { historyApiFallback: true }
});