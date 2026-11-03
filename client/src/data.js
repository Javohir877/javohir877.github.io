// Server ishlamay qolganda ishlatiladigan zaxira nusxa (asl ro'yxat: server/data.js)
export const FALLBACK = {
  sites: [
    { id: "opus", tags: ["Cloudflare Workers", "D1", "Telegram Mini App", "Android"], name: "OPUS MARKET", text: "Kompyuter do'koni: sayt, server, bot va Android ilova.", url: "https://javohir877.github.io/OPUS-MARKET/", img: "/img/opus.jpg", phone: "/img/opus-m.jpg", wide: true },
    { id: "olov", tags: ["React", "Vite", "Cloudflare D1", "PWA"], name: "OLOV FOOD", text: "Fast food sayti. Burger sichqonchaga qaraydi.", url: "https://javohir877.github.io/OLOV-FOOD/", img: "/img/olov.jpg" },
    { id: "hojiakbar", tags: ["React", "Express", "ffmpeg"], name: "By.Hojiakbar", text: "Video montajchi uchun portfolio va o'z pleyeri.", url: "https://javohir877.github.io/byhojiakbar-portfolio/", img: "/img/hojiakbar.jpg" },
  ],
  bots: [
    { user: "opussmarketbot", name: "OPUS MARKET", img: "/img/bot-opussmarketbot.jpg", text: "Buyurtmani 6 xonali kod bilan tasdiqlaydi. Menyu tugmasi do'konni Telegram ichida ochadi." },
    { user: "olovfoodbot", name: "OLOV FOOD", img: "/img/bot-olovfoodbot.jpg", text: "Har buyurtmani egasiga yetkazadi. Holat o'zgarsa, mijozga o'zi yozadi." },
    { user: "swipeslidebot", name: "SwipeSlide", img: "/img/bot-swipeslidebot.jpg", text: "Talabalar uchun: referat, kurs ishi, taqdimot, Excel va PDF ↔ Word. 4 tilda." },
    { user: "dzteambot", name: "DZ TEAM", img: "/img/bot-dzteambot.jpg", text: "DELTA ZONE jamoasining rasmiy boti: jamoaga qo'shilish uchun ariza." },
  ],
  screens: [
    { img: "/img/opus-app.jpg", name: "OPUS MARKET · Android ilova" },
    { img: "/img/olov-m.jpg", name: "OLOV FOOD · telefonda" },
    { img: "/img/hojiakbar-m.jpg", name: "By.Hojiakbar · telefonda" },
    { img: "/img/opus-m.jpg", name: "OPUS MARKET · sayt telefonda" },
  ],
};
