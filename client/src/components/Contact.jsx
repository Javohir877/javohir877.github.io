import { useRef } from "react";
import { useReveal } from "../hooks/useReveal.js";

const finePointer = typeof matchMedia !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function Contact() {
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
        <h2>Loyihangiz <em>bormi?</em></h2>
        <p className="sec-sub">Do'kon, kafe yoki xizmatingiz uchun sayt, bot yoki ilova.</p>
      </div>
      <div className="contact-cta rv" ref={cta}>
        <a ref={magnet} className="btn big magnet" href="https://t.me/ByJavohir_aep" target="_blank" rel="noopener">Telegramda yozish</a>
        <a className="link" href="https://github.com/Javohir877" target="_blank" rel="noopener">GitHub ›</a>
      </div>
    </section>
  );
}
