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
        // Create a minimal template for the initial build
        const template = `<!DOCTYPE html>
<html lang="pl">
  <head></head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
        
        // Generate all HTML files using our template
        await generateStaticHtml(template);
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace']
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[hash][extname]',
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js'
      }
    }
  },
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
  }
});