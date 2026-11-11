import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:3010" },
  },
  // ikki sahifa: bosh sahifa va /kvant/
  build: {
    rollupOptions: {
      input: { main: "index.html", kvant: "kvant/index.html" },
    },
  },
});
