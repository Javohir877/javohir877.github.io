import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n.jsx";

// 3D sahna faqat bo'limga yaqinlashganda yuklanadi
const QuantumScene = lazy(() => import("./QuantumScene.jsx"));

export default function Quantum() {
  const { t } = useLang();
  const q = t.quantum;
  const [active, setActive] = useState(0);
  const [closed, setClosed] = useState(false);
  const [mount, setMount] = useState(false);
  const touched = useRef(0);
  const stage = useRef(null);
  const head = useReveal();
  const list = useReveal();

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setMount(true); io.disconnect(); }
    }, { rootMargin: "400px 0px" });
    io.observe(stage.current);
    return () => io.disconnect();
  }, []);

  // hech kim tegmasa, bosqichlar o'zi navbat bilan yonadi
  useEffect(() => {
    if (closed) return;
    const id = setInterval(() => {
      if (Date.now() - touched.current > 9000) setActive((a) => (a + 1) % q.stages.length);
    }, 3200);
    return () => clearInterval(id);
  }, [closed, q.stages.length]);

  const choose = (i) => {
    touched.current = Date.now();
    setActive(i);
    setClosed(false);
  };
  const toggle = () => {
    touched.current = Date.now();
    setClosed((c) => !c);
  };

  const [temp, name] = q.stages[active];

  return (
    <section className="sec quantum" id="kvant">
      <div className="rv q-head" ref={head}>
        <h2 className="sec-title">{q.title}</h2>
        <p className="sec-sub">{q.sub}</p>
      </div>
      <div className="rv q-side" ref={list}>
        <ol className="q-list">
          {q.stages.map(([tp, nm, desc], i) => (
            <li key={i} className={i === active && !closed ? "on" : ""}>
              <button onClick={() => choose(i)} onMouseEnter={() => choose(i)} aria-pressed={i === active}>
                <span className="q-t">{tp}</span>
                <b>{nm}</b>
              </button>
              <p>{desc}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="q-stage" ref={stage}>
        {mount && (
          <Suspense fallback={null}>
            <QuantumScene active={active} closed={closed} onPick={choose} onToggle={toggle} />
          </Suspense>
        )}
        <div className="q-ui">
          <p className="q-now" aria-live="polite">
            {closed ? q.closedNote : <><span>{temp}</span> {name}</>}
          </p>
          <button className="q-cap" onClick={toggle}>{closed ? q.open : q.close}</button>
          <p className="hint">{q.hint}</p>
        </div>
      </div>
    </section>
  );
}
