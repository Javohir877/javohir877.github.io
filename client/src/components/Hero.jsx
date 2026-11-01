import { lazy, Suspense, useState } from "react";

// three.js og'ir, shuning uchun 3D sahna alohida yuklanadi
const PhoneScene = lazy(() => import("./PhoneScene.jsx"));

const VERBS = ["yozaman", "tahrirlayman", "sayqallayman", "ishga tushiraman"];

export default function Hero({ phase, screens, bots }) {
  const [screenName, setScreenName] = useState(screens[0]?.name);
  const cls = (i) => (i === phase ? "on" : i < phase ? "done" : "");

  return (
    <section className="hero">
      <div className="hero-text">
        <p className="eyebrow">Sayt · Telegram bot · Android ilova</p>
        <h1>
          Men Javohirman. Sun'iy intellekt bilan birgalikda kod{" "}
          <em className={cls(0)}>{VERBS[0]}</em>, uni <em className={cls(1)}>{VERBS[1]}</em>,{" "}
          <em className={cls(2)}>{VERBS[2]}</em> va <em className={cls(3)}>{VERBS[3]}</em>.
        </h1>
        <p className="hero-links">
          <a className="btn" href="#ishlar">Ishlarni ko'rish</a>
          <a className="link" href="https://t.me/ByJavohir_aep" target="_blank" rel="noopener">Telegramda yozish ›</a>
        </p>
      </div>

      <div className="stage">
        <Suspense fallback={null}>
          <PhoneScene screens={screens} bots={bots} onScreen={setScreenName} />
        </Suspense>
        <div className="stage-ui">
          <p className="screen-name">{screenName}</p>
          <p className="hint">sudrang — aylanadi · bosing — ekran almashadi · botni bosing — ochiladi</p>
        </div>
      </div>
    </section>
  );
}
