import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Suppress Vite HMR WebSocket connection errors in sandbox/preview iframe non-blockingly
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (e) => {
    const msg = e && e.reason ? String(e.reason.message || e.reason) : "";
    if (msg.includes("WebSocket") || msg.includes("ws:") || msg.includes("ws")) {
      e.preventDefault();
      e.stopImmediatePropagation?.();
    }
  }, true);
  window.addEventListener("error", (e) => {
    const msg = e ? String(e.message || "") : "";
    if (msg.includes("WebSocket") || msg.includes("ws:")) {
      e.preventDefault();
      e.stopImmediatePropagation?.();
    }
  }, true);
}

createRoot(document.getElementById("root")!).render(<App />);
