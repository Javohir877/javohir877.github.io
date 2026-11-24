// Ish jarayoni: to'rt bosqichli "konveyer". Har bosqichda o'sha ishning kichik namunasi bor,
// tepadagi chiziq bo'ylab zarra hozirgi bosqichga yuguradi (bosh gapdagi fe'llar bilan bir vaqtda).
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n.jsx";
import SplitTitle from "./SplitTitle.jsx";
import Icon from "./Icon.jsx";

function Artefact({ k, a }) {
  if (k === 0) {
    return (
      <div className="art art-chat">
        <p className="me">{a.ask}</p>
        <p className="bot"><i>AI</i>{a.answer}</p>
      </div>
    );
  }
  if (k === 1) {
    return (
      <pre className="art art-diff">
        <span className="del">{'- await tg(env, "Yangi: " + id)'}</span>
        <span className="add">{"+ if (!order.items.length) return bad()"}</span>
        <span className="add">{"+ await tg(env, `Yangi: ${id}`)"}</span>
      </pre>
    );
  }
  if (k === 2) {
    return (
      <div className="art art-meter">
        {a.meters.map(([label, from, to], i) => (
          <div key={i} style={{ "--to": to + "%", "--from": from + "%" }}>
            <span>{label}</span>
            <b>{from} <Icon name="next" size={12} /> {to}</b>
            <i><em /></i>
          </div>
        ))}
      </div>
    );
  }
  return (
    <pre className="art art-term">
      <span className="cmd">$ npx wrangler deploy</span>
      <span>Uploaded olov-food-bot</span>
      <span className="ok">✓ Deployed · workers.dev</span>
    </pre>
  );
}

export default function Process({ phase }) {
  const { t } = useLang();
  const head = useReveal();
  const body = useReveal();
  const p = t.process;
  return (
    <section className="sec pipe-sec" id="jarayon">
      <div className="rv" ref={head}>
        <SplitTitle text={p.title} />
        <p className="sec-sub">{p.sub}</p>
      </div>
      <div className="pipe rv" ref={body} style={{ "--p": phase }}>
        <div className="pipe-rail" aria-hidden="true"><i /><b /></div>
        <ol className="pipe-steps">
          {p.steps.map(([title, desc], i) => (
            <li key={title} className={i === phase ? "on" : i < phase ? "done" : ""}>
              <span className="pipe-n">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <Artefact k={i} a={p.art} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
