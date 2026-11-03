import { useEffect, useState } from "react";
import { LANGS, useLang } from "../i18n.jsx";

const SECTIONS = ["ishlar", "botlar", "jarayon", "github", "aloqa"];
const KEYS = ["works", "bots", "process", "github", "contact"];

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);

  // hozir ekranda turgan bo'lim menyuda ajralib turadi
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
    }, { rootMargin: "-45% 0px -50% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // pastga surilganda menyu yashirinadi, tepaga surilganda qaytadi
  useEffect(() => {
    let last = scrollY;
    const onScroll = () => {
      const y = scrollY;
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 400);
      last = y;
      if (y < 300) setActive("");
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={"nav" + (hidden ? " away" : "")}>
      <a className="logo" href="#">Javohir<i>.</i></a>
      <nav>
        {SECTIONS.map((id, i) => (
          <a key={id} href={"#" + id} className={(active === id ? "on " : "") + "n-" + KEYS[i]}>{t.nav[KEYS[i]]}</a>
        ))}
      </nav>
      <div className="langs" role="group" aria-label="Til / Язык / Language">
        {LANGS.map((l) => (
          <button key={l} className={l === lang ? "on" : ""} onClick={() => setLang(l)} aria-pressed={l === lang}>{l}</button>
        ))}
      </div>
    </header>
  );
}
