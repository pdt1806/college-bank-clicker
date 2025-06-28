import reactScan from "@react-scan/vite-plugin-react-scan";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    reactScan({
      enable: false,
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "College Bank Clicker",
        short_name: "CB Clicker",
        description: "A parody clicker game about the College Board AP exams",
        theme_color: "#2f2542",
        display: "standalone",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
        ],
      },
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  preview: {
    allowedHosts: ["localhost", "preview-vite.bennynguyen.dev"],
  },
  server: {
    allowedHosts: ["localhost", "dev-vite.bennynguyen.dev"],
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
          if (id.includes("node_modules")) {
            if (id.includes("@tabler/icons-react")) return "tabler-icons-vendor";
            if (id.includes("@mantine")) return "mantine-vendor";
            // if (id.includes("@mantine/hooks")) return "mantine-hooks-vendor";
            // if (id.includes("@mantine/notifications")) return "mantine-notifications-vendor";
            return "vendor";
          }
        },
      },
    },
  },
});
