/**
 * Hostinger Node.js Application Startup File
 *
 * This file serves as the main entry point when hosting on Hostinger
 * (Hostinger hPanel Node.js Application Manager, cPanel Passenger, or Hostinger VPS / PM2).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure PORT is assigned (Hostinger sets process.env.PORT automatically)
if (!process.env.PORT) {
  process.env.PORT = "3000";
}

const compiledServer = path.join(__dirname, "dist", "server.cjs");

if (fs.existsSync(compiledServer)) {
  await import(`file://${compiledServer}`);
} else {
  console.log("[Hostinger] dist/server.cjs not found. Running build step...");
  try {
    const { execSync } = await import("node:child_process");
    execSync("npm run build", { stdio: "inherit", cwd: __dirname });
    await import(`file://${compiledServer}`);
  } catch (err) {
    console.error("[Hostinger] Auto-build failed. Please run 'npm run build' via SSH or Hostinger Terminal.", err);
    process.exit(1);
  }
}
