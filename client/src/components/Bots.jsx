import { useState } from "react";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n.jsx";

function FlipCard({ bot, i }) {
  const { t, pick } = useLang();
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
          <span className={"platform " + bot.platform}>{bot.platform === "discord" ? "Discord" : "Telegram"}</span>
          <img src={bot.img} alt="" width="120" height="120" />
          <b>{bot.name}</b>
          <span>{bot.platform === "discord" ? t.bots.discord : "@" + bot.user}</span>
        </div>
        <div className="face back">
          <p>{pick(bot.text)}</p>
          {bot.url && (
            <a className="btn sm" href={bot.url} target="_blank" rel="noopener">
              {bot.platform === "discord" ? t.bots.invite : t.bots.open}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Bots({ bots }) {
  const { t } = useLang();
  const head = useReveal();
  return (
    <section className="sec" id="botlar">
      <div className="rv" ref={head}>
        <h2 className="sec-title">{t.bots.title}</h2>
        <p className="sec-sub">{t.bots.sub}</p>
      </div>
      <div className="bots">
        {bots.map((b, i) => <FlipCard key={b.user} bot={b} i={i} />)}
      </div>
    </section>
  );
}
