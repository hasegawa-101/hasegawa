import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://hasegawa-101.github.io/hasegawa/",
  integrations: [tailwind({ nesting: true })],
});
