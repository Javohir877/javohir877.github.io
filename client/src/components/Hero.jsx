import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";

// three.js og'ir, shuning uchun 3D sahna alohida yuklanadi
const QuantumScene = lazy(() => import("./QuantumScene.jsx"));

const fmtK = (k) => (k >= 1 ? (k < 10 ? k.toFixed(1) : Math.round(k)) + " K" : Math.max(10, Math.round(k * 1000)) + " mK");

export default function Hero({ phase, bots }) {
  const { t } = useLang();
  const q = t.quantum;
  const [active, setActive] = useState(4);
  const [closed, setClosed] = useState(false);
  const touched = useRef(0);
  const [cool, setCool] = useState(null);
  const [bot, setBot] = useState(null); // ustiga borilgan bot tangasi: { name, x, y } // intro paytidagi harorat (K), tugagach null
  const cls = (i) => (i === phase ? "on" : i < phase ? "done" : "");

  // hech kim tegmasa, qandilning bosqichlari navbat bilan yonadi
  useEffect(() => {
    if (closed) return;
    const id = setInterval(() => {
      if (Date.now() - touched.current > 9000) setActive((a) => (a + 1) % q.stages.length);
    }, 3200);
    return () => clearInterval(id);
  }, [closed, q.stages.length]);

  // qandil yuklangach: harorat 300 K dan 10 mK gacha tushadi (logarifmik shkalada)
  const onReady = (dur) => {
    if (!dur) return;
    touched.current = Date.now() + dur * 1000;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / (dur * 1000));
      setCool(300 * Math.pow(0.01 / 300, p));
      if (p < 1) requestAnimationFrame(step);
      else { setCool(null); setActive(4); }
    };
    requestAnimationFrame(step);
  };

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
        {/* 3D yuklanguncha (yoki WebGL bo'lmasa) — qandilning chiziqli chizmasi */}
        <svg className="stage-ph" viewBox="0 0 160 200" aria-hidden="true">
          <line x1="80" y1="0" x2="80" y2="160" />
          {[[66, 22], [58, 56], [50, 88], [42, 116], [34, 142]].map(([rx, y], i) => (
            <ellipse key={i} cx="80" cy={y} rx={rx} ry={rx * 0.16} />
          ))}
          <rect x="70" y="152" width="20" height="16" rx="3" />
        </svg>
        <Suspense fallback={null}>
          <QuantumScene hero bots={bots} active={active} closed={closed} onPick={pick} onToggle={toggle} onReady={onReady} onBot={setBot} />
        </Suspense>
        {bot && <span className="bot-tip" style={{ left: bot.x, top: bot.y }}>{bot.name} ↗</span>}
        <div className="stage-ui">
          <p className="screen-name" aria-live="polite">
            {cool !== null
              ? <><span className="q-temp">{fmtK(cool)}</span> {t.hero.cooling}</>
              : closed ? q.closedNote : <><span className="q-temp">{temp}</span> {name}</>}
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
