// Sahifa skrinshoti (Chrome headless orqali). Portfoliodagi rasmlarni yangilash uchun.
// Ishlatish: node scripts/shot.mjs <url> <chiqish.webp|.jpg> <eni> <bo'yi> [kutish_ms]
// Muhit o'zgaruvchilari:
//   DPR=2      piksel zichligi (sayt skrinshotlari 2, telefon ekranlari 3)
//   Q=88       sifat (webp/jpeg)
//   FULL=1     butun sahifa
//   TOUCH=1    sensorli ekranni taqlid qilish
//   PRE=<js>   sahifa ochilishidan oldin bajariladigan kod
//   EVAL=<js>  skrinshotdan oldin bajarib, natijasini chiqaradi
//   CHROME=... brauzer manzili (standart: Google Chrome)
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const [url, out, w = "1440", h = "900", wait = "4000"] = process.argv.slice(2);
if (!url || !out) {
  console.log("node scripts/shot.mjs <url> <chiqish.webp> <eni> <bo'yi> [kutish_ms]");
  process.exit(1);
}

const CHROME = process.env.CHROME || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9300 + Math.floor(Math.random() * 500);
const browser = spawn(CHROME, [
  "--headless=new", "--hide-scrollbars", `--remote-debugging-port=${port}`,
  `--user-data-dir=${path.join(tmpdir(), "shot-" + port)}`, `--window-size=${w},${h}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page"); } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });

const mobile = Number(w) < 600;
const dpr = +(process.env.DPR || (mobile ? 2 : 1));
await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: dpr, mobile });
if (process.env.TOUCH) {
  await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  await send("Emulation.setEmulatedMedia", { features: [{ name: "pointer", value: "coarse" }, { name: "hover", value: "none" }] });
}
await send("Page.enable");
if (process.env.PRE) await send("Page.addScriptToEvaluateOnNewDocument", { source: process.env.PRE });
await send("Page.navigate", { url });
await sleep(+wait);

if (process.env.EVAL) {
  const r = await send("Runtime.evaluate", { expression: process.env.EVAL, returnByValue: true, awaitPromise: true });
  console.log(JSON.stringify(r.result?.value ?? r));
}

const opts = { format: out.endsWith(".webp") ? "webp" : out.endsWith(".png") ? "png" : "jpeg", quality: +(process.env.Q || 85) };
if (process.env.FULL) {
  const { cssContentSize: s } = await send("Page.getLayoutMetrics");
  Object.assign(opts, { captureBeyondViewport: true, clip: { x: 0, y: 0, width: s.width, height: s.height, scale: 0.5 } });
}
const { data } = await send("Page.captureScreenshot", opts);
writeFileSync(out, Buffer.from(data, "base64"));
console.log("saved", out);
ws.close();
browser.kill();
process.exit(0);
