import { useEffect, useState } from "react";
import { getProjects, countVisit } from "./api.js";
import { FALLBACK } from "./data.js";
import { useEditor } from "./hooks/useEditor.js";
import Backdrop from "./components/Backdrop.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Works from "./components/Works.jsx";
import Bots from "./components/Bots.jsx";
import Process from "./components/Process.jsx";
import GitHub from "./components/GitHub.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

// StrictMode effektni ikki marta ishlatadi — tashrif bir marta sanalsin
let visitCounted = false;

export default function App() {
  const [data, setData] = useState(FALLBACK);
  const [views, setViews] = useState(null);
  const editor = useEditor();

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
      <Nav />
      <Hero phase={editor.phase} screens={data.screens} bots={data.bots} />
      <main>
        <Works sites={data.sites} />
        <Bots bots={data.bots} />
        <Process phase={editor.phase} html={editor.html} />
        <GitHub />
        <Contact />
      </main>
      <Footer views={views} />
    </>
  );
}
