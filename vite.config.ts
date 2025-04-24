import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';
import path from 'path'; // ✅ needed for alias

export default defineConfig({
  plugins: [
    react(),
    wasm(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ add this line
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
