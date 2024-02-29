import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserProvider } from "./contexts/UserContext.jsx";
import { LivesProvider } from "./contexts/LivesContext.jsx";
import { VotesProvider } from "./contexts/VotesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
  <VotesProvider>
    <LivesProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LivesProvider>
    </VotesProvider>
  </BrowserRouter>
  /* </React.StrictMode> */
);
