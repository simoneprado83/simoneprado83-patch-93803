import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ base precisa ser o nome do repositório
export default defineConfig({
  plugins: [react()],
  base: '/simoneprado83-patch-93803/docs/',
})

