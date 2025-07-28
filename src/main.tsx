import { loadTheme } from "@/utils/themeStorage"; // 👈 import before
const savedTheme = loadTheme();
document.documentElement.classList.add(savedTheme); // 👈 apply immediately
// This ensures that the HTML already has .dark or .light before the CSS loads.

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
