import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap'],
          // Note: three/@react-three/* are intentionally NOT forced into a
          // manual chunk here. Scene3D.tsx lazy-loads them via dynamic
          // import(), and Rollup's automatic code-splitting keeps that as a
          // real async chunk (not modulepreloaded on first paint). Forcing
          // them into a manual vendor chunk makes Vite treat it as always
          // needed and defeats the lazy-load.
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true
  }
})
