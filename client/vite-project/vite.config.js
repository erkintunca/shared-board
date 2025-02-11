import { defineConfig } from 'vite';

export default defineConfig({
  root: '../',
  server: {
    cors: {
			origin: ['https://shared-board-client.onrender.com', 'http://localhost:5173'],
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type']
		},
    allowedHosts: ['https://shared-board-client.onrender.com']  // Add your Render domain
  }
});