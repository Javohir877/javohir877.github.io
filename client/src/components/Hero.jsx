import { lazy, Suspense, useState } from "react";
import { useLang } from "../i18n.jsx";

// three.js og'ir, shuning uchun 3D sahna alohida yuklanadi
const PhoneScene = lazy(() => import("./PhoneScene.jsx"));

export default function Hero({ phase, screens, bots }) {
  const { t, pick } = useLang();
  const [screen, setScreen] = useState(0);
  const [goTo, setGoTo] = useState(null);
  const cls = (i) => (i === phase ? "on" : i < phase ? "done" : "");

  return (
    <section className="hero">
      <div className="hero-text">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1>
          {t.hero.parts.map((p, i) =>
            typeof p === "number" ? <em key={i} className={cls(p)}>{t.hero.verbs[p]}</em> : <span key={i}>{p}</span>
          )}
        </h1>
        <p className="hero-links">
          <a className="btn" href="#ishlar">{t.hero.cta}</a>
          <a className="link" href="https://t.me/ByJavohir_aep" target="_blank" rel="noopener">{t.hero.tg}</a>
        </p>
      </div>

      <div className="stage">
        <Suspense fallback={null}>
          <PhoneScene screens={screens} bots={bots} goTo={goTo} onScreen={setScreen} />
        </Suspense>
        <div className="stage-ui">
          <p className="screen-name">{pick(screens[screen]?.name)}</p>
          <div className="dots" role="tablist" aria-label={t.hero.screens}>
            {screens.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === screen}
                aria-label={pick(s.name)}
                className={i === screen ? "on" : ""}
                onClick={() => setGoTo({ i, at: Date.now() })}
              />
            ))}
          </div>
          <p className="hint">{t.hero.hint}</p>
        </div>
      </div>

      <a className="scroll-cue" href="#ishlar" aria-label={t.hero.scroll}>
        <span className="mouse"><i /></span>
        <span>{t.hero.scroll}</span>
      </a>
    </section>
  );
}
