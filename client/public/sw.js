// Offline ishlash uchun service worker.
// Sahifa (HTML) har doim avval internetdan olinadi — yangilanish darhol ko'rinadi;
// internet bo'lmasa, saqlangan nusxa ochiladi. /assets/ fayllari nomida hash bor,
// shuning uchun ular keshdan beriladi; rasmlar keshdan beriladi va fonda yangilanadi.
const CACHE = "javohir-v2";
const SHELL = ["/", "/kvant/", "/favicon.svg", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const put = (req, res) => {
  if (res.ok) caches.open(CACHE).then((c) => c.put(req, res));
  return res;
};

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const fonts = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (url.origin !== location.origin && !fonts) return; // GitHub API va boshqalar — keshlanmaydi

  // sahifa: avval internet, bo'lmasa kesh
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => put(url.pathname, res.clone()) && res)
        .catch(() => caches.match(url.pathname).then((hit) => hit || caches.match("/")))
    );
    return;
  }

  // hash'li fayllar va shriftlar: keshdan, bo'lmasa internetdan
  if (url.pathname.startsWith("/assets/") || fonts) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => put(req, res.clone()) && res)));
    return;
  }

  // qolganlari (rasmlar va h.k.): keshdan darhol, fonda yangilanadi
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => put(req, res.clone()) && res).catch(() => hit);
      return hit || net;
    })
  );
});
