import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function spaFallbackPlugin() {
  return {
    name: "spa-fallback-for-gh-pages",
    closeBundle() {
      const distIndex = join(process.cwd(), "dist", "index.html");
      const dist404 = join(process.cwd(), "dist", "404.html");
      if (existsSync(distIndex)) cpSync(distIndex, dist404);
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallbackPlugin()],
  base: "/Sheltery_App/"
});
