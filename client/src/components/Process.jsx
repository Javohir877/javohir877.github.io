import { Tilt } from "./Works.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n.jsx";

// Ish jarayoni: to'rt bosqich va ular bilan bir vaqtda yuradigan kod oynasi
export default function Process({ phase, html }) {
  const { t } = useLang();
  const text = useReveal();
  const card = useReveal();
  return (
    <section className="sec ai" id="jarayon">
      <div className="rv" ref={text}>
        <h2 className="sec-title">{t.process.title}</h2>
        <p className="sec-sub">{t.process.sub}</p>
        <ol className="steps">
          {t.process.steps.map(([title, desc], i) => (
            <li key={title} className={i === phase ? "on" : i < phase ? "done" : ""}>
              <span className="s-n">0{i + 1}</span>
              <div>
                <b>{title}</b>
                <p>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="rv" ref={card}>
        <Tilt className="code" max={10}>
          <p className="code-top"><span>worker.js</span><span className="code-step">{t.process.phases[phase]}</span></p>
          <pre dangerouslySetInnerHTML={{ __html: html }} />
        </Tilt>
      </div>
    </section>
  );
}
