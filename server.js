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
  console.warn("[Hostinger] dist/server.cjs not found. Starting recovery listener to avoid 503 error...");
  const http = require("http");
  const port = process.env.PORT || 3000;
  const server = http.createServer((_req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!DOCTYPE html><html><head><title>Melton & Bacchus Marsh Taxi - Initializing</title><meta http-equiv="refresh" content="3"><style>body{background:#0d1117;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;flex-direction:column}h1{color:#f97316;margin-bottom:8px}</style></head><body><h1>MELTON TAXI & BACCHUS MARSH</h1><p>Building application bundle... Refreshing automatically.</p></body></html>`);
  });
  if (isNaN(Number(port)) || String(port).startsWith("/") || String(port).startsWith("\\\\.\\")) {
    server.listen(port, () => console.log(`[Hostinger] Recovery server listening on socket: ${port}`));
  } else {
    server.listen(Number(port), "0.0.0.0", () => console.log(`[Hostinger] Recovery server listening on port: ${port}`));
  }
}
