import { defineConfig } from 'vite';

export default defineConfig({
  root: '../',
  server: {
    allowedHosts: ['shared-board-client.onrender.com']  // Add your Render domain
  }
});