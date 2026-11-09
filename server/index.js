import express from "express";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { SITES, BOTS, SCREENS } from "./data.js";

const dir = path.dirname(fileURLToPath(import.meta.url));
// 3001 band bo'lishi mumkin (By.Hojiakbar serveri) — shuning uchun 3010
const PORT = process.env.PORT || 3010;

const app = express();

/* ---------- loyihalar ---------- */

app.get("/api/projects", (req, res) => {
  res.set("Cache-Control", "public, max-age=300");
  res.json({ sites: SITES, bots: BOTS, screens: SCREENS });
});

/* ---------- ko'rishlar soni ---------- */

const viewsFile = path.join(dir, "data", "views.json");
let views = 0;
try { views = JSON.parse(await readFile(viewsFile, "utf8")).views || 0; } catch {}

let saveTimer;
function saveViews() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    await mkdir(path.dirname(viewsFile), { recursive: true });
    await writeFile(viewsFile, JSON.stringify({ views }));
  }, 1000);
}

app.post("/api/visit", (req, res) => {
  views++;
  saveViews();
  res.json({ views });
});

/* ---------- tayyor frontend (npm run build dan keyin) ---------- */

const dist = path.join(dir, "..", "client", "dist");
if (existsSync(dist)) {
  app.use(express.static(dist, { maxAge: "7d", index: false }));
  app.get("*", (req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(PORT, () => console.log(`API: http://localhost:${PORT}`));
