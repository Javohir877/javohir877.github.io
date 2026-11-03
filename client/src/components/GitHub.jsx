// GitHub'dan jonli: oxirgi 8 hafta faolligi va yaqinda yangilangan loyihalar.
// Natija 30 daqiqa localStorage'da saqlanadi (GitHub soatiga 60 so'rovga ruxsat beradi).
import { useEffect, useState } from "react";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n.jsx";

const USER = "Javohir877";
// portfolioning o'zi va ishlamaydigan loyihalar ko'rsatilmaydi
const SKIP = new Set(["javohir877.github.io", "mexrify"]);
const LANG_COLOR = { JavaScript: "#f1e05a", HTML: "#e34c26", CSS: "#663399", Python: "#3572a5", TypeScript: "#3178c6" };
const DAYS = 56;

async function load() {
  try {
    const c = JSON.parse(localStorage.getItem("gh-cache-v2") || "null");
    if (c && Date.now() - c.at < 30 * 60_000) return c.data;
  } catch {}

  const [user, repos, events] = await Promise.all([
    fetch(`https://api.github.com/users/${USER}`).then((r) => r.json()),
    fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=12`).then((r) => r.json()),
    fetch(`https://api.github.com/users/${USER}/events/public?per_page=100`).then((r) => r.json()),
  ]);
  if (!Array.isArray(repos) || !Array.isArray(events)) throw new Error("GitHub javob bermadi");

  // kunlar bo'yicha faollik: har push — bitta "ish"
  const counts = {};
  events.forEach((e) => {
    const day = e.created_at.slice(0, 10);
    counts[day] = (counts[day] || 0) + 1;
  });

  const data = {
    repoCount: user.public_repos,
    counts,
    repos: repos
      .filter((r) => !r.fork && !SKIP.has(r.name))
      .slice(0, 4)
      .map((r) => ({ name: r.name, desc: r.description, lang: r.language, url: r.html_url, pushed: r.pushed_at })),
  };
  try { localStorage.setItem("gh-cache-v2", JSON.stringify({ at: Date.now(), data })); } catch {}
  return data;
}

function ago(iso, lang) {
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  const s = (new Date(iso) - Date.now()) / 1000;
  const steps = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
  for (const [unit, sec] of steps) if (Math.abs(s) >= sec) return rtf.format(Math.round(s / sec), unit);
  return rtf.format(0, "minute");
}

function Heatmap({ counts, t }) {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  // eng eski kun — 8 hafta oldingi dushanba
  const start = new Date(today);
  start.setDate(start.getDate() - (DAYS - 1) - ((today.getDay() + 6) % 7));
  const cells = [];
  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    const n = counts[key] || 0;
    const level = n === 0 ? 0 : n < 3 ? 1 : n < 8 ? 2 : n < 15 ? 3 : 4;
    cells.push(<i key={key} className={"l" + level} title={`${key}: ${n}`} />);
  }
  return (
    <div className="heat">
      <div className="heat-grid">{cells}</div>
      <p className="heat-legend">
        <span>{t.gh.weeks}</span>
        <span className="hl">{t.gh.less} <i className="l0" /><i className="l1" /><i className="l2" /><i className="l3" /><i className="l4" /> {t.gh.more}</span>
      </p>
    </div>
  );
}

export default function GitHub() {
  const { t, lang } = useLang();
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const head = useReveal();
  const body = useReveal();

  useEffect(() => {
    load().then(setData).catch(() => setFailed(true));
  }, []);

  if (failed) return null;

  return (
    <section className="sec gh" id="github">
      <div className="rv" ref={head}>
        <h2 className="sec-title">{t.gh.title}</h2>
        <p className="sec-sub">{t.gh.sub}</p>
      </div>
      <div className="gh-grid rv" ref={body}>
        <div className="gh-card">
          {data ? <Heatmap counts={data.counts} t={t} /> : <div className="heat skeleton" />}
          <a className="gh-profile" href={`https://github.com/${USER}`} target="_blank" rel="noopener">
            <b>{data?.repoCount ?? "—"}</b> {t.gh.repos}
            <span className="link">{t.gh.profile}</span>
          </a>
        </div>
        <ul className="gh-repos">
          {(data?.repos ?? Array.from({ length: 4 }, () => null)).map((r, i) => (
            <li key={r?.name ?? i}>
              {r ? (
                <a href={r.url} target="_blank" rel="noopener">
                  <b>{r.name}</b>
                  <p>{r.desc || t.gh.noDesc}</p>
                  <span className="meta">
                    {r.lang && <><i style={{ background: LANG_COLOR[r.lang] || "#8a8f9c" }} />{r.lang} · </>}
                    {t.gh.updated} {ago(r.pushed, lang)}
                  </span>
                </a>
              ) : <div className="skeleton row" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
