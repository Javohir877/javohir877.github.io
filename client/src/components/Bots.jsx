// Botlar: chapda ro'yxat, o'ngda tanlangan botning namuna suhbati.
// Suhbat "yozmoqda…" belgisi bilan xabarma-xabar o'ynaladi; hech kim tegmasa, keyingi botga o'tadi.
import { useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n.jsx";
import SplitTitle from "./SplitTitle.jsx";

const reduced = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

function Chat({ bot, shown, typing }) {
  const { t, pick } = useLang();
  const discord = bot.platform === "discord";
  const msgs = (bot.demo || []).slice(0, shown);
  const body = useRef(null);

  // yangi xabar chiqqanda pastga suriladi (faqat suhbat oynasining ichida)
  useEffect(() => {
    const el = body.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown, typing]);

  return (
    <div className="bx-body" ref={body} aria-live="polite">
      {msgs.map((m, i) => {
        const me = m.from === "me";
        const text = pick(m.text);
        if (discord) {
          return (
            <div key={i} className={"dc-msg" + (me ? " me" : "")}>
              {me ? <span className="dc-av me" aria-hidden="true">{t.bots.you[0]}</span> : <img className="dc-av" src={bot.img} alt="" />}
              <div>
                <b>{me ? t.bots.you : bot.name}{!me && <i className="dc-tag">BOT</i>}</b>
                {me ? <code>{text}</code> : <p className="dc-embed">{text}</p>}
              </div>
            </div>
          );
        }
        return (
          <div key={i} className={"tg-msg" + (me ? " me" : "")}>
            <p>{text}</p>
            {m.buttons && (
              <div className="tg-kb">{m.buttons.map((b, j) => <span key={j}>{pick(b)}</span>)}</div>
            )}
          </div>
        );
      })}
      {typing && (
        <div className={discord ? "dc-typing" : "tg-msg typing"} aria-label="…">
          <i /><i /><i />
        </div>
      )}
    </div>
  );
}

export default function Bots({ bots }) {
  const { t, pick } = useLang();
  const head = useReveal();
  const box = useReveal();
  const [sel, setSel] = useState(0);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const touched = useRef(0);
  const wrap = useRef(null);
  const bot = bots[sel];

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  // suhbatni xabarma-xabar o'ynash; tugagach (hech kim tegmasa) keyingi botga o'tish
  useEffect(() => {
    const demo = bot?.demo || [];
    if (reduced) { setShown(demo.length); setTyping(false); return; }
    if (!visible) return;
    setShown(0);
    setTyping(false);
    const timers = [];
    let at = 400;
    demo.forEach((m, i) => {
      if (m.from === "bot") {
        timers.push(setTimeout(() => setTyping(true), at));
        at += 900;
      } else {
        at += 300;
      }
      timers.push(setTimeout(() => { setTyping(false); setShown(i + 1); }, at));
      at += m.from === "bot" ? 700 : 500;
    });
    timers.push(setTimeout(() => {
      if (Date.now() - touched.current > 12000) setSel((s) => (s + 1) % bots.length);
    }, at + 3500));
    return () => timers.forEach(clearTimeout);
  }, [sel, visible, bot, bots.length]);

  const choose = (i) => { touched.current = Date.now(); setSel(i); };
  if (!bot) return null;
  const discord = bot.platform === "discord";

  return (
    <section className="sec" id="botlar" ref={wrap}>
      <div className="rv" ref={head}>
        <SplitTitle text={t.bots.title} />
        <p className="sec-sub">{t.bots.sub}</p>
      </div>

      <div className="bx rv" ref={box}>
        <div className="bx-list" role="tablist" aria-label={t.bots.title}>
          {bots.map((b, i) => (
            <button
              key={b.user}
              role="tab"
              aria-selected={i === sel}
              className={i === sel ? "on" : ""}
              onClick={() => choose(i)}
            >
              <img src={b.img} alt="" width="44" height="44" />
              <span>
                <b>{b.name}</b>
                <small>{b.platform === "discord" ? t.bots.discord : "@" + b.user}</small>
              </span>
              <i className={"platform " + b.platform}>{b.platform === "discord" ? "Discord" : "Telegram"}</i>
            </button>
          ))}
        </div>

        <div className={"bx-chat " + bot.platform} role="tabpanel">
          <header className="bx-top">
            <img src={bot.img} alt="" width="40" height="40" />
            <div>
              <b>{bot.name}</b>
              <small>{discord ? t.bots.discord : "@" + bot.user + " · bot"}</small>
            </div>
            <span className="bx-sample">{t.bots.sample}</span>
          </header>
          <Chat key={bot.user} bot={bot} shown={shown} typing={typing} />
          <footer className="bx-foot">
            <p>{pick(bot.text)}</p>
            {bot.url && (
              <a className="btn sm" href={bot.url} target="_blank" rel="noopener">
                {discord ? t.bots.invite : t.bots.open}
              </a>
            )}
          </footer>
        </div>
      </div>
    </section>
  );
}
