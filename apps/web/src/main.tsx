import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Contexts
import { AuthProvider } from "./contexts/AuthContext";

// Routes
import Router from "./router";

// Importing the CSS file
import "./style.css";
import Navbar from "./components/Navbar";

const rootElement = document.getElementById("root");

// Ensure rootElement exists before creating the root
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>,
  );
} else {
  console.error(
    "Root element not found. Check your HTML file for an element with id='root'.",
  );
}
