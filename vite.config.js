import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  build: {
    // Same output folder as before, so the Vercel project keeps working.
    outDir: 'build',
  },
});
