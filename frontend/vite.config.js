import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/fitness-website/", // BURASI ÇOK ÖNEMLİ: GitHub deponun adını buraya ekliyoruz
});
