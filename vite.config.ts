import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';
import { fileURLToPath } from 'url'
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    wasm(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url))
    },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        worker:
          'node_modules/@webzjs/webz-wallet/snippets/wasm-bindgen-rayon-3e04391371ad0a8e/src/workerHelpers.worker.js',
      },
    },
    manifest: true,
  },
});
