import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import compression from "compression";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import apiRouter from "./artifacts/api-server/src/routes";

const app = express();
const args = process.argv.slice(2);
const portArgIndex = args.indexOf("--port");
const cliPort = portArgIndex !== -1 && args[portArgIndex + 1] ? Number(args[portArgIndex + 1]) : null;
const PORT = cliPort || Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production" || !process.argv[1]?.endsWith("server.ts");

app.use(compression());
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

async function start() {
  if (!isProduction) {
    const vite = await createViteServer({
      configFile: path.resolve(process.cwd(), "vite.config.ts"),
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Robust detection of production assets for Hostinger, PM2, Passenger & Docker
    const candidateDirs = [
      path.resolve(process.cwd(), "dist"),
      path.resolve(__dirname, "dist"),
      path.resolve(__dirname),
      path.resolve(process.cwd()),
    ];
    const distPath = candidateDirs.find((dir) => fs.existsSync(path.join(dir, "index.html"))) || path.resolve(process.cwd(), "dist");

    console.log(`[Node.js Server] Serving static build from: ${distPath}`);

    app.use(
      express.static(distPath, {
        maxAge: "1d",
        etag: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          } else if (filePath.match(/\.(js|css|webp|png|jpg|jpeg|svg|woff2)$/)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          }
        },
      })
    );

    app.use((_req: Request, res: Response) => {
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
