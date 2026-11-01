import { useRef } from "react";
import { useReveal } from "../hooks/useReveal.js";

const finePointer = typeof matchMedia !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;

// Sichqonchaga qarab 3D egiladigan quti
export function Tilt({ className = "", max = 9, as: Tag = "div", children, ...rest }) {
  const ref = useRef(null);
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

function WorkCard({ site, i }) {
  const reveal = useReveal();
  return (
    <div ref={reveal} className={"rv" + (site.wide ? " wide" : "")} style={{ transitionDelay: i * 0.08 + "s" }}>
      <Tilt as="a" className="card" href={site.url} target="_blank" rel="noopener">
        <img className="c-img" src={site.img} alt={site.name + " sayti"} width="1440" height="900" />
        {site.phone && (
          <div className="c-phone"><img src={site.phone} alt="" width="780" height="1688" /></div>
        )}
        <div className="c-text">
          <h3>{site.name}</h3>
          <p>{site.text}</p>
          <span className="c-go">Saytni ko'rish ↗</span>
        </div>
      </Tilt>
    </div>
  );
}

export default function Works({ sites }) {
  const title = useReveal();
  return (
    <section className="sec" id="ishlar">
      <h2 className="sec-title rv" ref={title}>Ishlar</h2>
      <div className="works">
        {sites.map((s, i) => <WorkCard key={s.id} site={s} i={i} />)}
      </div>
    </section>
  );
}
