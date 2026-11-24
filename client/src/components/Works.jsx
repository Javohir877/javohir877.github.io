import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReveal } from "../hooks/useReveal.js";
import { useLang } from "../i18n.jsx";
import Icon, { Lbl } from "./Icon.jsx";
import SplitTitle from "./SplitTitle.jsx";

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

// 3D sahna og'ir — faqat bo'limga yaqinlashganda yuklanadi
const DevicesScene = lazy(() => import("./DevicesScene.jsx"));

const PLATFORM_ICON = { web: null, android: "android", windows: "windows" };

export default function Works({ sites, bots = [], onOpen }) {
  const { t, pick } = useLang();
  const [sel, setSel] = useState(0);
  const [mount, setMount] = useState(false);
  const touched = useRef(0);
  const stage = useRef(null);
  const side = useReveal();
  const platforms = new Set(sites.flatMap((s) => s.platforms || []));
  const stats = [sites.length, bots.length, platforms.size];
  const site = sites[sel] || sites[0];

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setMount(true); io.disconnect(); }
    }, { rootMargin: "500px 0px" });
    io.observe(stage.current);
    return () => io.disconnect();
  }, []);

  // hech kim tegmasa, loyihalar o'zi almashadi (bo'lim ko'rinib turganda)
  useEffect(() => {
    if (reduced) return;
    let on = false;
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; }, { threshold: 0.4 });
    io.observe(stage.current);
    const id = setInterval(() => {
      if (on && Date.now() - touched.current > 12000) setSel((s) => (s + 1) % sites.length);
    }, 6500);
    return () => { clearInterval(id); io.disconnect(); };
  }, [sites.length]);

  const choose = (i) => { touched.current = Date.now(); setSel(i); };

  return (
    <section className="sec" id="ishlar">
      <div className="works-head">
        <SplitTitle text={t.works.title} />
        <p className="w-stats">
          {stats.map((n, i) => <span key={i}><Count to={n} /> {t.works.stats[i][0]}</span>)}
        </p>
      </div>

      <div className="dv">
        <div className="dv-stage" ref={stage}>
          {mount && (
            <Suspense fallback={null}>
              <DevicesScene sites={sites} index={sel} onOpen={onOpen} />
            </Suspense>
          )}
          <img className="dv-fallback" src={site.img} alt={site.name} />
          <p className="hint">{t.works.hint}</p>
        </div>

        <div className="dv-side rv" ref={side}>
          <ol className="dv-list" role="tablist" aria-label={t.works.title}>
            {sites.map((s, i) => (
              <li key={s.id}>
                <button role="tab" aria-selected={i === sel} className={i === sel ? "on" : ""} onClick={() => choose(i)}>
                  <span className="dv-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="dv-name">{s.name}</span>
                  <span className="dv-pf">
                    {(s.platforms || []).map((p) => PLATFORM_ICON[p] && <Icon key={p} name={PLATFORM_ICON[p]} size={13} />)}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="dv-info" key={site.id}>
            <p className="dv-text">{pick(site.text)}</p>
            {site.tags?.length > 0 && <ul className="c-tags">{site.tags.map((tg) => <li key={tg}>{tg}</li>)}</ul>}
            <p className="dv-acts">
              <button className="btn sm" onClick={() => onOpen(sel)}><Lbl s={t.works.details} /></button>
              <a className="link" href={site.url} target="_blank" rel="noopener"><Lbl s={t.works.site} /></a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
