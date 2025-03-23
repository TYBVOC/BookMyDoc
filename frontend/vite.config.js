import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,  // Set to a higher value (in KB)
  },
  rollupOptions: {
    output: {
      manualChunks(id) {
        // Split vendor libraries into a separate chunk
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      }
    }
  },
})