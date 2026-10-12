import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  root: path.resolve(process.cwd(), "artifacts/bacchus-marsh-taxi"),
  server: {
    hmr: false,
  },
  esbuild: {
    target: "es2022",
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
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
});
