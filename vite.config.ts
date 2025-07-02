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
      visualizer({ open: false }),
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      isProd ? preact() : react(),
      reactScan({
        enable: false,
      }),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*"],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
          navigateFallback: "/index.html",
          cleanupOutdatedCaches: true,
          clientsClaim: true,
        },
        devOptions: {
          enabled: false,
          suppressWarnings: true,
          navigateFallback: "/",
          navigateFallbackAllowlist: [/^\/$/],
          type: "module",
        },
        manifest: {
          id: "https://collegebank.click/",
          start_url: "/",
          name: "College Bank Clicker",
          short_name: "CB Clicker",
          description: "A parody clicker game about the College Board AP exams.",
          theme_color: "#2f2542",
          background_color: "#2f2542",
          display: "fullscreen",
          display_override: ["window-controls-overlay"],
          edge_side_panel: {
            preferred_width: 400,
          },
          launch_handler: {
            client_mode: "navigate-new",
          },
          orientation: "any",
          // screenshots: [],
          categories: ["game", "education", "entertainment"],
          lang: "en-US",
          dir: "ltr",
          icons: [192, 256, 384, 512].flatMap((size) => [
            {
              src: `pwa-${size}x${size}.png`,
              sizes: `${size}x${size}`,
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: `favicon-${size}x${size}.png`,
              sizes: `${size}x${size}`,
              type: "image/png",
              purpose: "any",
            },
          ]),
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
