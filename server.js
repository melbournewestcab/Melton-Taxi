/**
 * Hostinger Node.js Application Startup File
 *
 * This file serves as the main entry point when hosting on Hostinger
 * (Hostinger hPanel Node.js Application Manager, cPanel Passenger, or Hostinger VPS / PM2).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Ensure PORT is assigned if missing (Hostinger or local fallback)
if (!process.env.PORT) {
  process.env.PORT = "3000";
}

const compiledServer = path.join(__dirname, "dist", "server.cjs");

if (fs.existsSync(compiledServer)) {
  require(compiledServer);
} else {
  console.error("[Hostinger] dist/server.cjs not found. Please ensure 'npm run build' has been executed.");
  process.exit(1);
}
