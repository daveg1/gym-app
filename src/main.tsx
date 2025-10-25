import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SessionContextProvider } from "./context/session.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionContextProvider>
      <App />
    </SessionContextProvider>
  </StrictMode>,
);
