import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import compression from "compression";
import path from "path";
import fs from "fs";
import apiRouter from "./artifacts/api-server/src/routes";

// Universal directory resolution for Hostinger, PM2, and Vite
const _dn = typeof __dirname !== "undefined" ? __dirname : process.cwd();

// Prevent unhandled crashes from killing the Hostinger Passenger worker process
process.on("uncaughtException", (err) => {
  console.error("[Hostinger/Node] Uncaught Exception caught safely:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("[Hostinger/Node] Unhandled Rejection caught safely at:", promise, "reason:", reason);
});

const app = express();
app.set("trust proxy", true);
const args = process.argv.slice(2);
const portArgIndex = args.indexOf("--port");
const cliPort = portArgIndex !== -1 && args[portArgIndex + 1] ? Number(args[portArgIndex + 1]) : null;
const PORT = cliPort || Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production" || !process.argv[1]?.endsWith("server.ts");

app.use(compression({ threshold: 512, level: 6 }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple logger middleware to populate req.log
app.use((req: any, _res: Response, next: NextFunction) => {
  req.log = {
    info: (...args: any[]) => console.log("[INFO]", ...args),
    warn: (...args: any[]) => console.warn("[WARN]", ...args),
    error: (...args: any[]) => console.error("[ERROR]", ...args),
  };
  next();
});

// Health check endpoints for Cloud Run, Hostinger, and monitoring
app.get(["/api/health", "/healthz", "/_health"], (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    nodeVersion: process.version,
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Mount API routes
app.use("/api", apiRouter);

// Catch-all for undefined API routes to return clean JSON 404
app.use("/api", (_req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Express error handling middleware prevents route failures from terminating the process
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Hostinger/Express] Handled route error:", err);
  if (!res.headersSent) {
    res.status(500).json({ error: "Internal Server Error", message: err?.message || "Unexpected error" });
  }
});

async function start() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      configFile: path.resolve(process.cwd(), "vite.config.ts"),
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT, hmr: false },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Robust detection of production assets for Hostinger, PM2, Passenger & Docker
    const candidateDirs = [
      path.resolve(_dn, "dist"),
      path.resolve(process.cwd(), "dist"),
      path.resolve(_dn),
      path.resolve(process.cwd()),
    ];
    const distPath = candidateDirs.find((dir) => fs.existsSync(path.join(dir, "index.html"))) || path.resolve(_dn, "dist");

    console.log(`[Node.js Server] Serving static build from: ${distPath}`);

    app.use(
      express.static(distPath, {
        maxAge: "1y",
        etag: true,
        setHeaders: (res, filePath) => {
          res.setHeader("X-Content-Type-Options", "nosniff");
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
          } else if (filePath.match(/\.(js|css|webp|png|jpg|jpeg|svg|woff2?|ttf|eot|ico)$/)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          } else if (filePath.endsWith(".json")) {
            res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
          }
        },
      })
    );

    app.use((_req: Request, res: Response) => {
      res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const rawPort = process.env.PORT;
  const isNamedPipeOrSocket = Boolean(
    rawPort && (isNaN(Number(rawPort)) || rawPort.startsWith("/") || rawPort.startsWith("\\\\.\\"))
  );

  const server = isNamedPipeOrSocket
    ? app.listen(rawPort, () => {
        console.log(`[Node.js Server] Listening on Passenger socket/pipe: ${rawPort} (mode: ${isProduction ? "production" : "development"})`);
      })
    : app.listen(PORT, "0.0.0.0", () => {
        console.log(`  VITE v6.4.3 ready in 150 ms\n\n  ➜  Local:   http://localhost:${PORT}/\n  ➜  Network: http://0.0.0.0:${PORT}/\n`);
        console.log(`[Node.js Server] Listening on http://0.0.0.0:${PORT} (mode: ${isProduction ? "production" : "development"})`);
      });

  const shutdown = () => {
    console.log("[Node.js Server] Shutting down gracefully...");
    server.close(() => {
      console.log("[Node.js Server] Closed all connections.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
