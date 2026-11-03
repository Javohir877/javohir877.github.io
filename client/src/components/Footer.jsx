import { useLang } from "../i18n.jsx";

export default function Footer({ views }) {
  const { t, lang } = useLang();
  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} Javohir</span>
      {views != null && <span>{t.foot.views(views.toLocaleString(lang))}</span>}
      <span>React · Node.js · Express · three.js</span>
    </footer>
  );
}
