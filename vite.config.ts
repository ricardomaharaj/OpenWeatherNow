import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'OpenWeatherNow',
        short_name: 'OW-Now',
        icons: [
          {
            src: 'logo16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: 'logo32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#000000'
      },
      registerType: 'autoUpdate'
    })
  ]
})
