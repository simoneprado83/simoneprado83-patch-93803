import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/simoneprado83-patch-93803/', // ✨ Comente esta linha
  plugins: [react()],
})