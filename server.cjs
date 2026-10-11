/**
 * Hostinger CommonJS Entry Point (server.cjs)
 *
 * For environments where Hostinger's Application Manager expects CommonJS.
 */
const fs = require("fs");
const path = require("path");

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
