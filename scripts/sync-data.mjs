// server/data.js dan client/src/data.js (zaxira nusxa) ni yasaydi.
// Ishlatish: node scripts/sync-data.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("..", import.meta.url);
const src = readFileSync(new URL("server/data.js", root), "utf8");

const body = src
  .split("\n")
  .filter((line, i) => i > 2 || !line.startsWith("//")) // fayl boshidagi izohlar
  .join("\n")
  .replace(/^export const (SITES|BOTS|SCREENS) = /gm, "const $1 = ")
  .trim();

const out = `// Server ishlamay qolganda (yoki GitHub Pages'da) ishlatiladigan nusxa.
// Asl ro'yxat: server/data.js — o'zgartirsangiz, bu fayl ham yangilansin: node scripts/sync-data.mjs

${body}

export const FALLBACK = { sites: SITES, bots: BOTS, screens: SCREENS };
`;

writeFileSync(new URL("client/src/data.js", root), out);
console.log("yangilandi:", fileURLToPath(new URL("client/src/data.js", root)));
