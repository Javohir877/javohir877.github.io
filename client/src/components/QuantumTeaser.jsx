import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n.jsx";

// Bosh sahifada kvant sahifasiga olib boradigan ixcham karta.
// Rasm o'rniga qandilning chiziqli chizmasi — og'ir 3D faqat /kvant/ da yuklanadi.
const PLATES = [[64, 30], [56, 62], [48, 92], [40, 120], [33, 146]];

export default function QuantumTeaser() {
  const { t } = useLang();
  const q = t.quantum;
  const ref = useReveal();
  return (
    <section className="sec" id="kvant">
      <a className="q-teaser rv" ref={ref} href="/kvant/">
        <div className="qt-text">
          <p className="qt-tag">{q.tag}</p>
          <h2 className="sec-title">{q.title}</h2>
          <p className="qt-sub">{q.teaser}</p>
          <span className="qt-go">{q.go}</span>
        </div>
        <svg className="qt-art" viewBox="0 0 160 200" aria-hidden="true">
          <line x1="80" y1="6" x2="80" y2="160" className="qt-pipe" />
          {[-1, 1].map((s) => (
            <path key={s} className="qt-cable" d={`M${80 + s * 40} 30 C ${80 + s * 52} 70, ${80 - s * 10} 100, ${80 + s * 26} 146`} />
          ))}
          {PLATES.map(([rx, y], i) => (
            <ellipse key={i} cx="80" cy={y} rx={rx} ry={rx * 0.16} className="qt-plate" style={{ animationDelay: i * 0.6 + "s" }} />
          ))}
          <rect x="70" y="156" width="20" height="16" rx="3" className="qt-chip" />
          {[0, 1, 2].map((i) => <circle key={i} cx={74 + i * 6} cy="164" r="1.6" className="qt-qubit" style={{ animationDelay: i * 0.4 + "s" }} />)}
        </svg>
      </a>
    </section>
  );
}
