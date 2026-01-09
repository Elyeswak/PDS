// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-01-15",
  devtools: { enabled: process.env.NODE_ENV === "development" },

  runtimeConfig: {
    // Private keys (server-side only - NEVER exposed to client)
    databaseUrl: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL, // ✅ Added for Prisma migrations
    calComApiKey: process.env.CAL_COM_API_KEY,
    calComWebhookSecret: process.env.CAL_COM_WEBHOOK_SECRET,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    adminEmail: process.env.ADMIN_EMAIL,

    // Public keys (exposed to client)
    public: {
      calComUsername: process.env.CAL_COM_USERNAME || "test145",
      calComEventSlug: process.env.CAL_COM_EVENT_SLUG || "car",
      siteUrl: process.env.SITE_URL || "http://localhost:3000",
    },
  },
    // Add this to disable SSR globally (simplest fix)
  ssr: false,
  
  // OR use route rules for specific pages only
  routeRules: {
    '/admin': { ssr: false },
    '/appointment': { ssr: false }
  },

  css: ["~/assets/css/main.css", "@mdi/font/css/materialdesignicons.css"],

  vite: {
    plugins: [tailwindcss()],
      server: {
    cors: true,
    allowedHosts: ['.ngrok-free.app'],
  }
  },

 nitro: {
    preset: "vercel",

    externals: {
      inline: [],
      external: ["@prisma/client", ".prisma/client"],
    },

    vercel: {
      functions: {
        maxDuration: 30,
      },
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
});
