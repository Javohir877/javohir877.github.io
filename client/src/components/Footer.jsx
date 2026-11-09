import { useEffect, useState } from "react";
import { useLang } from "../i18n.jsx";

export default function Footer({ views }) {
  const { t, lang } = useLang();
  const [install, setInstall] = useState(null);

  // brauzer saytni ilova sifatida o'rnatishni taklif qilsa — tugma chiqadi
  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setInstall(e); };
    const onDone = () => setInstall(null);
    addEventListener("beforeinstallprompt", onPrompt);
    addEventListener("appinstalled", onDone);
    return () => {
      removeEventListener("beforeinstallprompt", onPrompt);
      removeEventListener("appinstalled", onDone);
    };
  }, []);

  const doInstall = async () => {
    install.prompt();
    await install.userChoice;
    setInstall(null);
  };

  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} Javohir</span>
      {views != null && <span>{t.foot.views(views.toLocaleString(lang))}</span>}
      {install && <button className="install" onClick={doInstall}>{t.pwa.install}</button>}
      <span>React · Node.js · Express · three.js</span>
    </footer>
  );
}
