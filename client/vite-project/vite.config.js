import { defineConfig } from 'vite';

export default defineConfig({
  root: '../',
  server: {
    allowedHosts: ['https://shared-board-client.onrender.com', "http://localhost:5173/"]  // Add your Render domain
  }
});