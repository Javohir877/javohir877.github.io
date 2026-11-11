import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";

// three.js og'ir, shuning uchun 3D sahna alohida yuklanadi
const QuantumScene = lazy(() => import("./QuantumScene.jsx"));

export default function Hero({ phase, bots }) {
  const { t } = useLang();
  const q = t.quantum;
  const [active, setActive] = useState(4);
  const [closed, setClosed] = useState(false);
  const touched = useRef(0);
  const cls = (i) => (i === phase ? "on" : i < phase ? "done" : "");

  // hech kim tegmasa, qandilning bosqichlari navbat bilan yonadi
  useEffect(() => {
    if (closed) return;
    const id = setInterval(() => {
      if (Date.now() - touched.current > 9000) setActive((a) => (a + 1) % q.stages.length);
    }, 3200);
    return () => clearInterval(id);
  }, [closed, q.stages.length]);

  const pick = (i) => { touched.current = Date.now(); setActive(i); setClosed(false); };
  const toggle = () => { touched.current = Date.now(); setClosed((c) => !c); };
  const [temp, name] = q.stages[active];

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
          <QuantumScene hero bots={bots} active={active} closed={closed} onPick={pick} onToggle={toggle} />
        </Suspense>
        <div className="stage-ui">
          <p className="screen-name" aria-live="polite">
            {closed ? q.closedNote : <><span className="q-temp">{temp}</span> {name}</>}
          </p>
          <p className="stage-links">
            <a className="link" href="/kvant/">{t.hero.more}</a>
          </p>
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
