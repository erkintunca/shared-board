import { defineConfig } from 'vite';

export default defineConfig({
  root: '../',
  server: {
    allowedHosts: [
      'https://shared-board-client.onrender.com', 
      'https://shared-board-y6cp.onrender.com']  // Add your Render domain
  }
});