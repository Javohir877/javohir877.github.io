import { useRef } from "react";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n.jsx";

const finePointer = typeof matchMedia !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function Contact() {
  const { t } = useLang();
  const magnet = useRef(null);
  const head = useReveal();
  const cta = useReveal();

  // tugma sichqonchaga tortiladi
  const pull = (e) => {
    if (!finePointer) return;
    const el = magnet.current;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = Math.hypot(dx, dy) < 220 ? `translate(${dx * 0.3}px, ${dy * 0.3}px)` : "";
  };

  return (
    <section className="sec contact" id="aloqa" onPointerMove={pull} onPointerLeave={() => (magnet.current.style.transform = "")}>
      <div className="rv" ref={head}>
        <h2>{t.contact.title[0]}<em>{t.contact.title[1]}</em></h2>
        <p className="sec-sub">{t.contact.sub}</p>
      </div>
      <div className="contact-cta rv" ref={cta}>
        <a ref={magnet} className="btn big magnet" href="https://t.me/ByJavohir_aep" target="_blank" rel="noopener">{t.contact.btn}</a>
        <a className="link" href="https://github.com/Javohir877" target="_blank" rel="noopener">GitHub ›</a>
      </div>
    </section>
  );
}
