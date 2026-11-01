// Backend bilan aloqa. Server ishlamasa, sayt o'zidagi zaxira ma'lumot bilan ochilaveradi.
import { FALLBACK } from "./data.js";

// GitHub Pages faqat statik fayllarni beradi — u yerda backend yo'q
const HAS_API = !location.hostname.endsWith("github.io");

export async function getProjects() {
  if (!HAS_API) return FALLBACK;
  try {
    const r = await fetch("/api/projects");
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch {
    return FALLBACK;
  }
}

export async function countVisit() {
  if (!HAS_API) return null;
  try {
    const r = await fetch("/api/visit", { method: "POST" });
    return (await r.json()).views;
  } catch {
    return null;
  }
}
