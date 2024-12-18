import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["@wagmi/vue/nuxt", "@nuxtjs/tailwindcss"],
  compatibilityDate: "2024-12-18",
});
