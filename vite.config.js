import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/registration": {
        // Keep "/registration" in frontend
        target: "http://localhost:6559", // Change to match your backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/registration/, "/register"), // ✅ Corrects path
      },
    },
  },
  plugins: [react()],
  base: "./", // ✅ Fix for GitHub Pages & relative paths
});
