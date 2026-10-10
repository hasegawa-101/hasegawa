import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from "./src/constants/site";

export default defineConfig({
  site: SITE_URL,
  // Preserve the HTML whitespace behavior used before Astro 7.
  compressHTML: true,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => page !== `${SITE_URL}/cv/`,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Bundle Astro's cookie dependency in the prerender environment.
      noExternal: ["cookie"],
    },
  },
});
