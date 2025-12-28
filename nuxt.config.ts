import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    // Private keys (server-side only) - never exposed to client
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
      calComUsername: process.env.CAL_COM_USERNAME,
      calComEventSlug: process.env.CAL_COM_EVENT_SLUG || 'consultation'
    }
  },
  css: ["~/assets/css/main.css", "@mdi/font/css/materialdesignicons.css"],
  vite: {
    plugins: [tailwindcss()],
    server: {
     allowedHosts: true
    },
  },
});
