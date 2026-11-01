import { useState } from "react";
import { useReveal } from "../hooks/useReveal.js";

function FlipCard({ bot, i }) {
  const [open, setOpen] = useState(false);
  const reveal = useReveal();
  return (
    <div
      ref={reveal}
      className={"flip rv" + (open ? " open" : "")}
      style={{ transitionDelay: i * 0.08 + "s" }}
      tabIndex={0}
      onClick={(e) => !e.target.closest("a") && setOpen((v) => !v)}
      onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
    >
      <div className="flip-in">
        <div className="face front">
          <img src={bot.img} alt="" width="120" height="120" />
          <b>{bot.name}</b>
          <span>@{bot.user}</span>
        </div>
        <div className="face back">
          <p>{bot.text}</p>
          <a className="btn sm" href={`https://t.me/${bot.user}`} target="_blank" rel="noopener">Ochish ↗</a>
        </div>
      </div>
    </div>
  );
}

export default function Bots({ bots }) {
  const head = useReveal();
  return (
    <section className="sec" id="botlar">
      <div className="rv" ref={head}>
        <h2 className="sec-title">Telegram botlar</h2>
        <p className="sec-sub">Kartani bosing yoki ustiga olib boring — orqa tomoni ochiladi.</p>
      </div>
      <div className="bots">
        {bots.map((b, i) => <FlipCard key={b.user} bot={b} i={i} />)}
      </div>
    </section>
  );
}
