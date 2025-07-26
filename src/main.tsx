import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { BoardProvider } from "./contexts/BoardContext.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <BoardProvider>
          <App />
        </BoardProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
