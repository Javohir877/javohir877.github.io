// Kod muharriri: yozaman → tahrirlayman → sayqallayman → ishga tushiraman.
// Bosh gapdagi fe'llar ham shu bosqichga qarab yonadi.
import { useEffect, useState } from "react";

const RAW = [
  "export default {",
  "  async fetch(req, env) {",
  "    const order = await req.json()",
  "    await env.DB.prepare(\"INSERT INTO orders VALUES (?, ?)\")",
  "      .bind(order.id, JSON.stringify(order)).run()",
  "    await tg(env, \"Yangi buyurtma: \" + order.id)",
  "    return Response.json({ ok: true })",
  "  }",
  "}",
];

const EDIT = [
  [" ", "export default {"],
  [" ", "  async fetch(req, env) {"],
  [" ", "    const order = await req.json()"],
  ["+", "    if (!order.items?.length) return bad(\"Savat bo'sh\")"],
  [" ", "    await saveOrder(env.DB, order)"],
  ["-", "    await tg(env, \"Yangi buyurtma: \" + order.id)"],
  ["+", "    await tg(env, `Yangi buyurtma: ${order.id}`)"],
  [" ", "    return Response.json({ ok: true })"],
  [" ", "  }"],
  [" ", "}"],
];

const POLISH = [
  "// buyurtmani saqlaydi, egasiga xabar beradi",
  "export default {",
  "  async fetch(req, env) {",
  "    const order = await req.json()",
  "    if (!order.items?.length) return bad(\"Savat bo'sh\")",
  "",
  "    await saveOrder(env.DB, order)",
  "    await tg(env, `Yangi buyurtma: ${order.id}`)",
  "    return Response.json({ ok: true })",
  "  },",
  "}",
];

const DEPLOY = [
  "$ npx wrangler deploy",
  "",
  "Uploaded olov-food-bot (2.31 sec)",
  "Deployed olov-food-bot (0.84 sec)",
  "  https://olov-food-bot.workers.dev",
  "",
  "@@✓ ishlayapti",
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function paint(line) {
  if (line.trim().startsWith("//")) return `<span class="cm">${esc(line)}</span>`;
  return esc(line)
    .replace(/"(.*?)"/g, '<span class="st">"$1"</span>')
    .replace(/`([^`]*)`/g, '<span class="st">`$1`</span>')
    .replace(/\b(export|default|async|await|const|return|if)\b/g, '<span class="kw">$1</span>')
    .replace(/\b(fetch|json|prepare|bind|run|tg|stringify|saveOrder|bad)\(/g, '<span class="fn">$1</span>(');
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export function useEditor() {
  const [phase, setPhase] = useState(0);
  const [html, setHtml] = useState("");

  useEffect(() => {
    let alive = true;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    async function run() {
      if (reduced) {
        setPhase(2);
        setHtml(POLISH.map(paint).join("\n"));
        return;
      }
      while (alive) {
        setPhase(0);
        let out = "";
        for (const line of RAW) {
          for (let c = 2; c <= line.length + 1 && alive; c += 2) {
            setHtml(out + paint(line.slice(0, c)) + '<span class="cur"></span>');
            await wait(16);
          }
          out += paint(line) + "\n";
        }
        await wait(1500);
        if (!alive) return;

        setPhase(1);
        setHtml(EDIT.map(([m, l]) =>
          m === "+" ? `<span class="add">+ ${esc(l)}</span>` : m === "-" ? `<span class="del">- ${esc(l)}</span>` : `  ${paint(l)}\n`
        ).join(""));
        await wait(2800);
        if (!alive) return;

        setPhase(2);
        setHtml(POLISH.map(paint).join("\n"));
        await wait(2800);
        if (!alive) return;

        setPhase(3);
        let term = "";
        for (const l of DEPLOY) {
          term += (l.startsWith("@@") ? `<span class="ok">${esc(l.slice(2))}</span>` : esc(l)) + "\n";
          setHtml(term);
          await wait(280);
        }
        await wait(3000);
      }
    }

    run();
    return () => { alive = false; };
  }, []);

  return { phase, html };
}
