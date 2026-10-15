import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => ({
  mode: mode || "production",
  root: path.resolve(process.cwd(), "artifacts/bacchus-marsh-taxi"),
  server: {
    hmr: false,
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode === "production" ? "production" : "development"),
  },
  esbuild: {
    target: "es2022",
    legalComments: "none",
    supported: {
      destructuring: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022",
      supported: {
        destructuring: true,
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "artifacts/bacchus-marsh-taxi/src"),
      "@workspace/api-client-react": path.resolve(process.cwd(), "lib/api-client-react/src"),
      "@workspace/api-zod": path.resolve(process.cwd(), "lib/api-zod/src"),
      "@workspace/db": path.resolve(process.cwd(), "lib/db/src"),
      "@assets": path.resolve(process.cwd(), "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    target: "es2022",
    outDir: path.resolve(process.cwd(), "dist"),
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: "esbuild",
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            if (id.includes("leaflet")) {
              return "vendor-leaflet";
            }
            if (id.includes("@googlemaps") || id.includes("react-google-maps")) {
              return "vendor-maps";
            }
            if (id.includes("embla-carousel")) {
              return "vendor-carousel";
            }
            if (id.includes("date-fns") || id.includes("day-picker")) {
              return "vendor-date";
            }
            if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("/zod/")) {
              return "vendor-form";
            }
            if (id.includes("class-variance-authority")) {
              return "vendor-cva";
            }
            if (id.includes("@radix-ui") || id.includes("cmdk")) {
              return "vendor-radix";
            }
            if (id.includes("@tanstack")) {
              return "vendor-query";
            }
            if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id)) {
              return "vendor-react";
            }
          }
        },
      },
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
}));
