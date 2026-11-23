// Sarlavha "o'lchash" effekti bilan chiqadi: avval 0/1 va kubit belgilari aralashib turadi,
// keyin chapdan o'ngga harfma-harf aniq holatga keladi (kvant o'lchovidagi kabi).
import { useEffect, useRef, useState } from "react";

const GLYPHS = "01ψ⟩|01∿⟨";
const reduced = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SplitTitle({ as: Tag = "h2", text, className = "" }) {
  const ref = useRef(null);
  const full = String(text);
  const [done, setDone] = useState(reduced ? full.length : -1); // -1: hali ko'rinmagan
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) { setDone(full.length); return; }
    setDone(-1);
    const el = ref.current;
    let raf, t0;
    const run = (now) => {
      if (!t0) t0 = now;
      const p = Math.min(1, (now - t0) / (380 + full.length * 38));
      setDone(Math.floor(p * full.length));
      setTick((x) => x + 1);
      if (p < 1) raf = requestAnimationFrame(run);
    };
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      raf = requestAnimationFrame(run);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [full]);

  const chars = [...full].map((ch, i) => {
    if (ch === " " || i < done) return ch;
    if (done < 0) return <span key={i} className="qc wait">{ch}</span>;
    // aniqlanmagan harf — har kadrda boshqa belgi
    const g = GLYPHS[(i * 7 + tick) % GLYPHS.length];
    return <span key={i} className="qc">{g}</span>;
  });

  return (
    <Tag ref={ref} className={"sec-title qt " + className} aria-label={full}>
      <span aria-hidden="true">{chars}</span>
    </Tag>
  );
}
