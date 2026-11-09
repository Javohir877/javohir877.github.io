// O'ng pastdagi "tepaga" tugmasi: atrofidagi halqa sahifaning qancha qismi o'qilganini ko'rsatadi.
import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";

const R = 20;
const C = 2 * Math.PI * R;

export default function ToTop() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  const ring = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      if (ring.current) ring.current.style.strokeDashoffset = String(C * (1 - p));
      setShow(scrollY > innerHeight * 0.9);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      className={"to-top" + (show ? " show" : "")}
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t.top}
      title={t.top}
      tabIndex={show ? 0 : -1}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={R} className="tt-track" />
        <circle ref={ring} cx="24" cy="24" r={R} className="tt-ring" strokeDasharray={C} strokeDashoffset={C} />
      </svg>
      <span aria-hidden="true">↑</span>
    </button>
  );
}
