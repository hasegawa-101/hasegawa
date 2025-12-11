import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: "https://hayatohasegawa.com",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => page !== "https://hayatohasegawa.com/cv/",
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
