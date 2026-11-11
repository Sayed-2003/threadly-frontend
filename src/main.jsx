import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./design/base.css";
import "./design/layout.css";
import "./design/discover.css";
import "./design/conversation-art.css";
import "./design/pages.css";
import "./design/communities.css";
import "./design/community-header.css";
import "./design/auth.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>,
);
