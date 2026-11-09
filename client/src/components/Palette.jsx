// Tezkor qidiruv (Ctrl+K yoki "/"): bo'limlar, loyihalar, botlar, til va havolalar.
import { useEffect, useMemo, useRef, useState } from "react";
import { LANGS, useLang } from "../i18n.jsx";

const SECTIONS = [["ishlar", "works"], ["botlar", "bots"], ["jarayon", "process"], ["github", "github"], ["aloqa", "contact"]];
const LANG_NAMES = { uz: "O'zbekcha", ru: "Русский", en: "English" };

export default function Palette({ open, setOpen, sites, bots, onProject }) {
  const { t, pick, setLang } = useLang();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef(null);
  const list = useRef(null);

  // Ctrl+K / Cmd+K yoki "/" (yozish maydonida bo'lmaganda) — ochadi
  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea|select/i.test(document.activeElement?.tagName || "");
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing && !open)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    setTimeout(() => input.current?.focus(), 0);
  }, [open]);

  const items = useMemo(() => {
    const all = [
      ...SECTIONS.map(([id, key]) => ({
        kind: t.palette.section, label: t.nav[key], icon: "#",
        run: () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      })),
      ...sites.map((s, i) => ({
        kind: t.palette.project, label: s.name, extra: pick(s.text), icon: "◆",
        run: () => onProject(i),
      })),
      ...bots.filter((b) => b.url).map((b) => ({
        kind: t.palette.bot, label: b.name, extra: b.platform === "discord" ? "Discord" : "@" + b.user, icon: "↗",
        run: () => window.open(b.url, "_blank", "noopener"),
      })),
      ...LANGS.map((l) => ({
        kind: t.palette.lang, label: LANG_NAMES[l], extra: l.toUpperCase(), icon: "文",
        run: () => setLang(l),
      })),
      { kind: t.palette.link, label: "Telegram", extra: "@ByJavohir_aep", icon: "↗", run: () => window.open("https://t.me/ByJavohir_aep", "_blank", "noopener") },
      { kind: t.palette.link, label: "GitHub", extra: "Javohir877", icon: "↗", run: () => window.open("https://github.com/Javohir877", "_blank", "noopener") },
    ];
    const needle = q.trim().toLowerCase();
    if (!needle) return all;
    return all.filter((it) => `${it.label} ${it.extra || ""} ${it.kind}`.toLowerCase().includes(needle));
  }, [q, t, pick, sites, bots, onProject, setLang]);

  useEffect(() => {
    list.current?.querySelector(".on")?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const run = (it) => {
    setOpen(false);
    setTimeout(it.run, 60);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === "Enter" && items[active]) run(items[active]);
  };

  return (
    <div className="modal pal-wrap" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="pal" role="dialog" aria-modal="true" aria-label={t.palette.hint}>
        <div className="pal-in">
          <span className="pal-icon" aria-hidden="true">⌕</span>
          <input
            ref={input}
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            onKeyDown={onKeyDown}
            placeholder={t.palette.placeholder}
            aria-label={t.palette.placeholder}
            role="combobox"
            aria-expanded="true"
            aria-controls="pal-list"
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="pal-list" id="pal-list" ref={list} role="listbox">
          {items.length === 0 && <li className="pal-empty">{t.palette.empty}</li>}
          {items.map((it, i) => (
            <li
              key={it.kind + it.label}
              role="option"
              aria-selected={i === active}
              className={i === active ? "on" : ""}
              onMouseEnter={() => setActive(i)}
              onClick={() => run(it)}
            >
              <span className="pi">{it.icon}</span>
              <span className="pl">{it.label}{it.extra && <small>{it.extra}</small>}</span>
              <span className="pk">{it.kind}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
