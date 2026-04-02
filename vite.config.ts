import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://api:3001',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', () => {
            // Allows local non-Docker use by falling back to localhost in the frontend fetch layer.
          });
        }
      }
    }
  },
  test: {
    environment: 'jsdom',
    exclude: ['tests/integration/**', 'node_modules/**']
  }
});
