import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LangProvider } from "./i18n.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);

// offline ishlash va telefonga o'rnatish uchun (faqat tayyor saytda)
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
