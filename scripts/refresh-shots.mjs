// Portfoliodagi barcha sayt skrinshotlarini jonli saytlardan qaytadan oladi:
// kompyuter (1440×900, 2x) va telefon (390×844, 3x) ko'rinishlari, WebP formatida.
// Ishlatish: node scripts/refresh-shots.mjs            — hammasi
//            node scripts/refresh-shots.mjs navo olov  — faqat shu loyihalar
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { SITES } from "../server/data.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const shot = path.join(here, "shot.mjs");
const out = (p) => path.join(here, "..", "client", "public", p.replace(/^\//, ""));
const only = process.argv.slice(2);

for (const s of SITES) {
  if (only.length && !only.includes(s.id)) continue;
  // brauzer keshini chetlab o'tish uchun — har safar yangi manzil
  const url = s.url + (s.url.includes("?") ? "&" : "?") + "shot=" + Date.now();
  const jobs = [
    { file: s.img, w: 1440, h: 900, env: { DPR: "2", Q: "86" } },
    s.phone && { file: s.phone, w: 390, h: 844, env: { DPR: "3", Q: "86", TOUCH: "1" } },
  ].filter(Boolean);
  for (const j of jobs) {
    const r = spawnSync(process.execPath, [shot, url, out(j.file), String(j.w), String(j.h), "7000"], {
      env: { ...process.env, ...j.env },
      encoding: "utf8",
    });
    console.log(s.id.padEnd(10), j.w < 600 ? "telefon " : "kompyuter", r.status === 0 ? "✓" : "✗ " + (r.stderr || r.stdout).trim());
  }
}
