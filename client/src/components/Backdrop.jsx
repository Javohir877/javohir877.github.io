// Orqa fon: nozik katak to'r, mayda "don" teksturasi va sichqonchaga ergashadigan yumshoq yorug'lik.
import { useEffect, useRef } from "react";

export default function Backdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", e.clientX + "px");
        el.style.setProperty("--my", e.clientY + "px");
        el.classList.add("lit");
      });
    };
    addEventListener("pointermove", move);
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="backdrop" ref={ref} aria-hidden="true">
      <div className="bd-grid" />
      <div className="bd-light" />
      <div className="bd-grain" />
    </div>
  );
}
