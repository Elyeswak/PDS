// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false }, // Disable in production
  runtimeConfig: {
    // Private keys (server-side only)
    databaseUrl: process.env.DATABASE_URL,
    calComApiKey: process.env.CAL_COM_API_KEY,
    calComWebhookSecret: process.env.CAL_COM_WEBHOOK_SECRET,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    adminEmail: process.env.ADMIN_EMAIL,
    
    // Public keys (exposed to client)
    public: {
      calComUsername: process.env.CAL_COM_USERNAME || 'your-username',
      calComEventSlug: process.env.CAL_COM_EVENT_SLUG || 'consultation',
      siteUrl: process.env.SITE_URL || 'https://your-app.vercel.app'
    }
  },
  css: ["~/assets/css/main.css", "@mdi/font/css/materialdesignicons.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  // Vercel-specific optimizations
  nitro: {
    preset: 'vercel',
    // Optional: Configure serverless function regions
    vercel: {
      regions: ['iad1'] // US East
    }
  },
  // Build optimizations
  build: {
    transpile: [] // Add any packages that need transpilation
  }
});
