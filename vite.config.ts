import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  resolve: {
    alias: {
      // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("images")) return "images";
          if (id.includes("node_modules")) {
            if (id.includes("@tabler/icons-react")) return "tabler-icons-vendor";
            if (id.includes("@mantine/core")) return "mantine-core-vendor";
            if (id.includes("@mantine/hooks")) return "mantine-hooks-vendor";
            return "vendor";
          }
        },
      },
    },
  },
});
