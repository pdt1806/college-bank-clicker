import preact from "@preact/preset-vite";
import reactScan from "@react-scan/vite-plugin-react-scan";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import autoPreload from "vite-plugin-auto-preload";
import { VitePWA } from "vite-plugin-pwa";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [
      autoPreload(),
      visualizer({ open: true }),
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      isProd ? preact() : react(),
      reactScan(),
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
        ...(isProd
          ? {
              react: "preact/compat",
              "react-dom": "preact/compat",
              "react-dom/client": "preact/compat",
            }
          : {}),
      },
    },
    build: {
      manifest: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;

            const match = vendorPackages.find((pkg) => id.includes(pkg));
            if (match) return match.replace("@", "").replace(/[@/]/g, "-");

            return "vendor";
          },
        },
      },
    },
  };
});

const vendorPackages = [
  "@mantine/core/esm/core",
  "@mantine/core/esm/components",
  "@mantine/hooks",
  "@mantine/notifications",
  "@mantine",
  "@tabler/icons-react",
  "howler",
  "react-number-format",
  "@tanstack/react-router",
  "@tanstack/router-core",
  "@floating-ui",
  "preact",
];
