import { useCallback, useEffect, useState } from "react";
import { getProjects, countVisit } from "./api.js";
import { FALLBACK } from "./data.js";
import { useEditor } from "./hooks/useEditor.js";
import Backdrop from "./components/Backdrop.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Works from "./components/Works.jsx";
import Bots from "./components/Bots.jsx";
import Process from "./components/Process.jsx";
import Quantum from "./components/Quantum.jsx";
import GitHub from "./components/GitHub.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import Palette from "./components/Palette.jsx";
import ToTop from "./components/ToTop.jsx";

// StrictMode effektni ikki marta ishlatadi — tashrif bir marta sanalsin
let visitCounted = false;

export default function App() {
  const [data, setData] = useState(FALLBACK);
  const [views, setViews] = useState(null);
  const editor = useEditor();
  const [project, setProject] = useState(null); // ochiq loyiha oynasi (indeks)
  const [palette, setPalette] = useState(false);

  // loyiha oynasining o'z havolasi bor: #ish-opus — ulashsa, oyna to'g'ri ochiladi
  const openProject = useCallback((i) => {
    setProject(i);
    const id = data.sites[i]?.id;
    if (id) history.replaceState(null, "", "#ish-" + id);
  }, [data.sites]);

  const closeProject = useCallback(() => {
    setProject(null);
    history.replaceState(null, "", location.pathname + location.search);
  }, []);

  const navProject = useCallback((d) => {
    setProject((p) => {
      const n = (p + d + data.sites.length) % data.sites.length;
      history.replaceState(null, "", "#ish-" + data.sites[n].id);
      return n;
    });
  }, [data.sites]);

  useEffect(() => {
    const m = location.hash.match(/^#ish-(.+)$/);
    if (!m) return;
    const i = data.sites.findIndex((s) => s.id === m[1]);
    if (i >= 0) setProject(i);
  }, [data.sites]);

  useEffect(() => {
    getProjects().then(setData);
    if (!visitCounted) {
      visitCounted = true;
      countVisit().then(setViews);
    }
  }, []);

  return (
    <>
      <Backdrop />
      <Nav onSearch={() => setPalette(true)} />
      <Hero phase={editor.phase} screens={data.screens} bots={data.bots} />
      <main>
        <Works sites={data.sites} onOpen={openProject} />
        <Bots bots={data.bots} />
        <Process phase={editor.phase} html={editor.html} />
        <Quantum />
        <GitHub sites={data.sites} />
        <Contact />
      </main>
      <Footer views={views} />
      <ToTop />
      {project !== null && <ProjectModal sites={data.sites} index={project} onClose={closeProject} onNav={navProject} />}
      <Palette open={palette} setOpen={setPalette} sites={data.sites} bots={data.bots} onProject={openProject} />
    </>
  );
}
