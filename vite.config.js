import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        '/api': {
            target: 'http://localhost:6000', // Backend URL
            changeOrigin: true,             // Enable cross-origin
            rewrite: (path) => path.replace(/^\/api/, ''), // Remove `/api` prefix before forwarding
        },
    },
},
})
