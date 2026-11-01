export default function Footer({ views }) {
  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} Javohir</span>
      {views != null && <span>Sayt {views.toLocaleString("uz")} marta ochilgan</span>}
      <span>React · Node.js · Express · three.js</span>
    </footer>
  );
}
