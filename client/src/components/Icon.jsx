// Ikonkalar: matndagi ↗ → ↓ kabi belgilar o'rniga bir xil chiziqli ikonkalar (Lucide, ISC litsenziya)
// va platformalarning rasmiy logotiplari (Simple Icons, CC0).
import { ArrowUpRight, ArrowRight, ArrowLeft, ArrowUp, Download, X, Search, Languages, LayoutGrid, Hash } from "lucide-react";
import { siTelegram, siDiscord, siGithub, siAndroid, siLinux } from "simple-icons";

const LUCIDE = {
  out: ArrowUpRight,
  next: ArrowRight,
  prev: ArrowLeft,
  up: ArrowUp,
  down: Download,
  close: X,
  search: Search,
  lang: Languages,
  project: LayoutGrid,
  section: Hash,
};

const BRAND = { telegram: siTelegram, discord: siDiscord, github: siGithub, android: siAndroid, linux: siLinux };

export default function Icon({ name, size = 16, className = "" }) {
  const cls = "ic " + className;
  if (name === "windows") {
    // Windows belgisi: to'rtta kvadrat
    return (
      <svg className={cls} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="2" y="2" width="9.5" height="9.5" /><rect x="12.5" y="2" width="9.5" height="9.5" />
        <rect x="2" y="12.5" width="9.5" height="9.5" /><rect x="12.5" y="12.5" width="9.5" height="9.5" />
      </svg>
    );
  }
  const brand = BRAND[name];
  if (brand) {
    return (
      <svg className={cls} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={brand.path} />
      </svg>
    );
  }
  const L = LUCIDE[name];
  return L ? <L className={cls} size={size} strokeWidth={2} aria-hidden="true" /> : null;
}

// Matn oxiridagi ↗ → ↓ › yoki boshidagi ← belgisini ikonkaga aylantiradi: "Ochish ↗" → Ochish [↗]
const TAIL = { "↗": "out", "→": "next", "↓": "down", "›": "next" };
export function Lbl({ s, icon }) {
  let text = String(s ?? "");
  let lead = null, tail = null;
  if (text.startsWith("← ")) { lead = "prev"; text = text.slice(2); }
  const last = text.slice(-1);
  if (TAIL[last]) { tail = TAIL[last]; text = text.slice(0, -1).trimEnd(); }
  return (
    <span className="lbl">
      {icon && <Icon name={icon} />}
      {lead && <Icon name={lead} />}
      <span>{text}</span>
      {tail && <Icon name={tail} />}
    </span>
  );
}
