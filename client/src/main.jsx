import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LangProvider } from "./i18n.jsx";
import "./styles.css";

// gradient variantini sinash uchun: ?rang=sovish | shafaq | sadaf | olov (sessiya davomida eslab qolinadi)
try {
  const q = new URLSearchParams(location.search).get("rang");
  if (q !== null) sessionStorage.setItem("rang", q);
  const r = sessionStorage.getItem("rang");
  if (["sovish", "shafaq", "sadaf", "olov"].includes(r)) document.documentElement.dataset.palette = r;
} catch {}

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
