import { defineConfig } from 'vite';

export default defineConfig({
  root: '../',
  server: {
    host: true, // Ensure the server listens on all addresses
    allowedHosts: ['shared-board-client.onrender.com']  // Add your Render domain
  }
});