import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:9999', // <- match functions:serve port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
