import { Tilt } from "./Works.jsx";
import { PHASE_NAMES } from "../hooks/useEditor.js";
import { useReveal } from "../hooks/useReveal.js";

export default function AiCode({ phase, html }) {
  const text = useReveal();
  const card = useReveal();
  return (
    <section className="sec ai">
      <div className="rv" ref={text}>
        <h2 className="sec-title">Sun'iy intellekt bilan ishlayman</h2>
        <p className="sec-sub">
          G'oyani birga muhokama qilamiz, kodni birga yozamiz,
          keyin men uni tekshiraman, tahrirlayman va ishga tushiraman.
        </p>
      </div>
      <div className="rv" ref={card}>
        <Tilt className="code" max={10}>
          <p className="code-top"><span>worker.js</span><span className="code-step">{PHASE_NAMES[phase]}</span></p>
          <pre dangerouslySetInnerHTML={{ __html: html }} />
        </Tilt>
      </div>
    </section>
  );
}
