// /kvant/ sahifasi: kvant kompyuterning 3D modeli alohida, butun ekranda
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LANGS, LangProvider, useLang } from "./i18n.jsx";
import Backdrop from "./components/Backdrop.jsx";
import Quantum from "./components/Quantum.jsx";
import "./styles.css";

function KvantPage() {
  const { t, lang, setLang } = useLang();
  return (
    <>
      <Backdrop />
      <header className="nav">
        <a className="logo" href="/">Javohir<i>.</i></a>
        <nav>
          <a href="/">{t.quantum.back}</a>
        </nav>
        <div className="langs" role="group" aria-label="Til / Язык / Language">
          {LANGS.map((l) => (
            <button key={l} className={l === lang ? "on" : ""} onClick={() => setLang(l)} aria-pressed={l === lang}>{l}</button>
          ))}
        </div>
      </header>
      <main>
        <Quantum page />
      </main>
      <footer className="foot q-foot">
        <a className="link" href="/">{t.quantum.back}</a>
        <a className="link" href="https://t.me/ByJavohir_aep" target="_blank" rel="noopener">Telegram ↗</a>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LangProvider>
      <KvantPage />
    </LangProvider>
  </StrictMode>
);

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
