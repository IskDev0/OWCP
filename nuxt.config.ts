export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
      "nuxt-vuefire",
      "@pinia/nuxt",
      "nuxt-headlessui",
      "@nuxtjs/tailwindcss",
      "nuxt-icon"
  ],
    vuefire: {
        config: {
            apiKey: process.env.NUXT_API_KEY,
            authDomain: process.env.NUXT_API_DOMAIN,
            projectId: process.env.NUXT_PROJECT_ID,
            storageBucket:process.env.NUXT_STORAGE_BUCKET,
            appId: process.env.NUXT_APP_ID,
        },
        auth: {
            enabled: true
        },
    },
    ssr: true,
    runtimeConfig: {
        NUXT_API_KEY: process.env.NUXT_API_KEY,
        NUXT_API_DOMAIN: process.env.NUXT_API_DOMAIN,
        NUXT_PROJECT_ID: process.env.NUXT_PROJECT_ID,
        NUXT_STORAGE_BUCKET:process.env.NUXT_STORAGE_BUCKET,
        NUXT_APP_ID: process.env.NUXT_APP_ID,
        GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        public: {
            NUXT_API_KEY: process.env.NUXT_API_KEY,
            NUXT_API_DOMAIN: process.env.NUXT_API_DOMAIN,
            NUXT_STORAGE_BUCKET:process.env.NUXT_STORAGE_BUCKET,
            NUXT_PROJECT_ID: process.env.NUXT_PROJECT_ID,
            NUXT_APP_ID: process.env.NUXT_APP_ID,
            GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        }
    }
})
