import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "@mdi/font/css/materialdesignicons.css"],
  vite: {
    plugins: [tailwindcss()],
    server: {
     allowedHosts: true
    },
  },
});
