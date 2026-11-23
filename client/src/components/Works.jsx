import { useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n.jsx";

const finePointer = typeof matchMedia !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduced = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

// 3D egiladigan quti: sichqonchada kursorga qarab, sensorli ekranda esa
// scroll paytida — pastdan qiya kirib keladi, ekran o'rtasida tekislanadi.
export function Tilt({ className = "", max = 9, as: Tag = "div", children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    if (finePointer || reduced) return;
    const el = ref.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -1..1
      const rx = Math.max(-1, Math.min(1, p)) * max * 2;
      el.style.setProperty("--rx", rx.toFixed(2) + "deg");
      el.style.setProperty("--ry", (-p * max * 0.6).toFixed(2) + "deg");
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    el.classList.add("hot");
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [max]);

  const move = (e) => {
    if (!finePointer) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.classList.add("hot");
    el.style.setProperty("--ry", (px * max * 2).toFixed(2) + "deg");
    el.style.setProperty("--rx", (-py * max * 1.4).toFixed(2) + "deg");
  };
  const leave = () => {
    if (!finePointer) return;
    const el = ref.current;
    el.classList.remove("hot");
    el.style.removeProperty("--ry");
    el.style.removeProperty("--rx");
  };
  return (
    <Tag ref={ref} className={"tilt " + className} onPointerMove={move} onPointerLeave={leave} {...rest}>
      <div className="card-in">{children}</div>
    </Tag>
  );
}

function WorkCard({ site, i, onOpen }) {
  const { t, pick } = useLang();
  const reveal = useReveal();
  return (
    <div ref={reveal} className={"rv" + (site.wide ? " wide" : "")} style={{ transitionDelay: (i % 3) * 0.08 + "s" }}>
      {/* oddiy bosish — loyiha oynasi, g'ildirakcha / Ctrl bilan — saytning o'zi yangi tabda */}
      <Tilt
        as="a"
        className={"card c-" + site.id}
        href={site.url}
        target="_blank"
        rel="noopener"
        onClick={(e) => {
          if (e.ctrlKey || e.metaKey || e.shiftKey) return;
          e.preventDefault();
          onOpen(i);
        }}
      >
        <div className="c-shot">
          <img className="c-img" src={site.img} alt={site.name} width="1440" height="900" loading="lazy" />
          {site.phone && (
            <div className="c-phone"><img src={site.phone} alt="" width="780" height="1688" loading="lazy" /></div>
          )}
        </div>
        <div className="c-text">
          <h3>{site.name}</h3>
          <p>{pick(site.text)}</p>
          {site.tags?.length > 0 && (
            <ul className="c-tags">{site.tags.map((tg) => <li key={tg}>{tg}</li>)}</ul>
          )}
          <span className="c-go">{t.works.details}</span>
        </div>
      </Tilt>
    </div>
  );
}

// raqam ko'ringanda 0 dan sanab chiqadi
function Count({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(reduced ? to : 0);
  useEffect(() => {
    if (reduced) return setN(to);
    const el = ref.current;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / 1100);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <b ref={ref}>{String(n).padStart(2, "0")}</b>;
}

const FILTERS = [
  () => true,
  (s) => s.platforms?.includes("web"),
  (s) => s.platforms?.some((p) => p === "android" || p === "windows"),
];

export default function Works({ sites, bots = [], onOpen }) {
  const { t } = useLang();
  const title = useReveal();
  const [f, setF] = useState(0);
  const platforms = new Set(sites.flatMap((s) => s.platforms || []));
  const stats = [sites.length, bots.length, platforms.size];
  return (
    <section className="sec" id="ishlar">
      <div className="works-head">
        <h2 className="sec-title split rv" ref={title}>
          {t.works.title.split(" ").map((w, i) => <span key={i} className="w" style={{ "--i": i }}><span>{w}</span></span>)}
        </h2>
        <p className="w-stats">
          {stats.map((n, i) => <span key={i}><Count to={n} /> {t.works.stats[i][0]}</span>)}
        </p>
        <div className="w-filter" role="group" aria-label={t.works.filterLabel}>
          {t.works.filters.map((label, i) => (
            <button key={i} className={f === i ? "on" : ""} aria-pressed={f === i} onClick={() => setF(i)}>
              {label} <i>{sites.filter(FILTERS[i]).length}</i>
            </button>
          ))}
        </div>
      </div>
      {/* filtr almashganda kartalar qaytadan, navbat bilan paydo bo'ladi */}
      <div className="works" key={f}>
        {sites.map((s, i) => FILTERS[f](s) && <WorkCard key={s.id} site={s} i={i} onOpen={onOpen} />)}
      </div>
    </section>
  );
}
