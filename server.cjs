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
  console.log("[Hostinger] dist/server.cjs not found. Triggering build...");
  try {
    const { execSync } = require("child_process");
    execSync("npm run build", { stdio: "inherit", cwd: __dirname });
    require(compiledServer);
  } catch (err) {
    console.error("[Hostinger] Failed to automatically build:", err);
    process.exit(1);
  }
}
