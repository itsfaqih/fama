import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const srcPath = (directory: string) => fileURLToPath(new URL(`./src/${directory}`, import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      assets: srcPath('assets'),
      components: srcPath('components'),
      contexts: srcPath('contexts'),
      data: srcPath('data'),
      localization: srcPath('localization'),
      pages: srcPath('pages'),
    },
  },
});
