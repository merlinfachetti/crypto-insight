import { loadTheme } from "@/utils/themeStorage";

// Apply theme to <html> before first paint to avoid flash
const savedTheme = loadTheme();
document.documentElement.classList.add(savedTheme);

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/router";
import "./i18n";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
