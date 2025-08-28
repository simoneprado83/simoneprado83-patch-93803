import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// troque pelo nome do SEU repositório no GitHub
const repoName = "simoneprado83-patch-93803";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`, // 👈 base correta para GitHub Pages
});
