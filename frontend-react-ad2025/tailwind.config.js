/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        proyecto: {
          primary: '#2563EB',   // Azul corporativo principal
          secondary: '#1E293B', // Azul oscuro para contraste
          accent: '#22C55E',    // Verde acento (botones o indicadores)
          neutral: '#111827',   // Color base para textos y navbar
          'base-100': '#FFFFFF', // Fondo base principal
          'base-200': '#F3F4F6', // Fondo alternativo
          info: '#0EA5E9',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
      'light',
      'dark',
    ],
  },
}