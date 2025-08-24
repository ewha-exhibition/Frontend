import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Theme from "./style/Theme.jsx";
import GlobalStyle from "./style/GlobalStyle.jsx";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
