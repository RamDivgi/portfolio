import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";

import "./index.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "10px",
            padding: "14px 18px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <App />
    </>
  </StrictMode>
);