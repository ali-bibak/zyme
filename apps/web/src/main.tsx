import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Contexts
import { AuthProvider } from "./contexts/AuthContext";

// Styles
import "./styles/index.scss";

// Routes
import Router from "./router";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
};

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
