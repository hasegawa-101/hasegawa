import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://hayatohasegawa.com",
  integrations: [tailwind({ nesting: true })],
});
