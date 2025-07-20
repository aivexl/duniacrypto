import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/cryptopanic': {
        target: 'https://cryptopanic.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cryptopanic/, ''),
      },
      '/coinstats': {
        target: 'https://api.coinstats.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/coinstats/, ''),
      },
      '/coingecko': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/coingecko/, ''),
      },
      '/gnews': {
        target: 'https://gnews.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gnews(\/api)?/, '/api'),
      },
    },
  },
}); 