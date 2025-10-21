import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,           // Puedes cambiarlo si lo necesitas
    open: true,           // Abre automáticamente en el navegador
  },
  define: {
    'process.env': {}     // Evita errores con librerías que usan process.env
  },
  resolve: {
    alias: {
      '@': '/src',        // Para importar con @/ en lugar de rutas largas
    },
  },
})