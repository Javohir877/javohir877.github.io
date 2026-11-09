// Loyiha oynasi: katta skrinshot (kompyuter / telefon), batafsil tavsif, sayt va kod havolalari.
// Esc — yopish, ← → — loyihalar orasida yurish.
import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";

export default function ProjectModal({ sites, index, onClose, onNav }) {
  const { t, pick } = useLang();
  const site = sites[index];
  const [view, setView] = useState("desktop");
  const closeBtn = useRef(null);
  const lastFocus = useRef(null);

  // ochilganda fokus oynaga o'tadi, yopilganda joyiga qaytadi; orqadagi sahifa aylanmaydi
  useEffect(() => {
    lastFocus.current = document.activeElement;
    closeBtn.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    setView("desktop");
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  if (!site) return null;
  const hasPhone = Boolean(site.phone);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pm" key={site.id}>
        <header className="pm-head">
          <div>
            <p className="pm-count">{String(index + 1).padStart(2, "0")} / {String(sites.length).padStart(2, "0")}</p>
            <h3 id="pm-title">{site.name}</h3>
          </div>
          <div className="pm-nav">
            <button onClick={() => onNav(-1)} aria-label={t.works.prev}>←</button>
            <button onClick={() => onNav(1)} aria-label={t.works.next}>→</button>
            <button ref={closeBtn} onClick={onClose} aria-label={t.works.close}>✕</button>
          </div>
        </header>

        <div className="pm-body">
          <div className={"pm-shot " + view}>
            {view === "desktop" || !hasPhone ? (
              <div className="pm-browser">
                <p className="pm-bar"><i /><i /><i /><span>{site.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span></p>
                <img src={site.img} alt={site.name} width="2880" height="1800" />
              </div>
            ) : (
              <div className="pm-phone"><img src={site.phone} alt={site.name} width="1170" height="2532" /></div>
            )}
            {hasPhone && (
              <div className="seg pm-seg" role="tablist">
                <button role="tab" aria-selected={view === "desktop"} className={view === "desktop" ? "on" : ""} onClick={() => setView("desktop")}>{t.works.desktop}</button>
                <button role="tab" aria-selected={view === "mobile"} className={view === "mobile" ? "on" : ""} onClick={() => setView("mobile")}>{t.works.mobile}</button>
              </div>
            )}
          </div>

          <div className="pm-info">
            <p className="pm-lead">{pick(site.text)}</p>
            <p className="pm-about">{pick(site.about)}</p>
            <ul className="c-tags">{site.tags.map((tg) => <li key={tg}>{tg}</li>)}</ul>
            <p className="pm-links">
              <a className="btn" href={site.url} target="_blank" rel="noopener">{t.works.open}</a>
              {site.repo && <a className="link" href={site.repo} target="_blank" rel="noopener">{t.works.code}</a>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
