import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: "https://hayatohasegawa.com",
  integrations: [tailwind({ nesting: true }), mdx()],
});
