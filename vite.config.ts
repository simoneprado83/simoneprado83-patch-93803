import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ coloque exatamente o nome do repositório do GitHub Pages aqui
export default defineConfig({
  plugins: [react()],
  base: '/simoneprado83-patch-93803/',
})

