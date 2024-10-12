import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';
import fs from 'fs';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert'), 
    },
  },
  resolve: {
    alias: {
      process: 'process/browser',
    },
  },
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'), 
      HTTPS: JSON.stringify(process.env.HTTPS || 'false'),
    },
    process: {
      env: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        HTTPS: JSON.stringify(process.env.HTTPS || 'false'),
      },
    },
  },
});
