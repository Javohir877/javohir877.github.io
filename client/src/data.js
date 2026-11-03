// Server ishlamay qolganda (yoki GitHub Pages'da) ishlatiladigan nusxa.
// Asl ro'yxat: server/data.js — o'zgartirsangiz, bu fayl ham yangilansin: node scripts/sync-data.mjs

const SITES = [
  {
    id: "opus",
    name: "OPUS MARKET",
    text: {
      uz: "Kompyuter do'koni: sayt, server, bot va Android ilova.",
      ru: "Магазин компьютеров: сайт, сервер, бот и Android-приложение.",
      en: "Computer store: website, server, bot and Android app.",
    },
    tags: ["Cloudflare Workers", "D1", "Telegram Mini App", "Android"],
    url: "https://javohir877.github.io/OPUS-MARKET/",
    img: "/img/opus.jpg",
    phone: "/img/opus-m.jpg",
    wide: true,
  },
  {
    id: "olov",
    name: "OLOV FOOD",
    text: {
      uz: "Fast food sayti. Burger sichqonchaga qaraydi.",
      ru: "Сайт фастфуда. Бургер следит за курсором.",
      en: "Fast food site. The burger follows your cursor.",
    },
    tags: ["React", "Vite", "Cloudflare D1", "PWA"],
    url: "https://javohir877.github.io/OLOV-FOOD/",
    img: "/img/olov.jpg",
  },
  {
    id: "hojiakbar",
    name: "By.Hojiakbar",
    text: {
      uz: "Video montajchi uchun portfolio va o'z pleyeri.",
      ru: "Портфолио видеомонтажёра со своим плеером.",
      en: "Video editor's portfolio with a custom player.",
    },
    tags: ["React", "Express", "ffmpeg"],
    url: "https://javohir877.github.io/byhojiakbar-portfolio/",
    img: "/img/hojiakbar.jpg",
  },
  {
    id: "mexrify",
    name: "MEXRIFY",
    text: {
      uz: "Musiqa platformasi: dunyo chartlari, phonk, pleylistlar va to'liq ijro.",
      ru: "Музыкальная платформа: мировые чарты, фонк, плейлисты и полное воспроизведение.",
      en: "Music platform: world charts, phonk, playlists and full playback.",
    },
    tags: ["React", "Node.js", "Express", "Deezer API"],
    url: "https://github.com/Javohir877/mexrify",
    art: "vinyl",
    code: true,
  },
  {
    id: "startap",
    name: "Startap Sayohati",
    text: {
      uz: "Sinf uchun interaktiv o'yin: guruhlar Pre-seed'dan Exit'gacha startap quradi.",
      ru: "Интерактивная игра для класса: группы проходят путь стартапа от Pre-seed до Exit.",
      en: "Classroom game: teams grow a startup from Pre-seed to Exit.",
    },
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://javohir877.github.io/startap-sayohati/",
    img: "/img/startap.jpg",
  },
];

const BOTS = [
  {
    user: "opussmarketbot",
    name: "OPUS MARKET",
    img: "/img/bot-opussmarketbot.jpg",
    text: {
      uz: "Buyurtmani 6 xonali kod bilan tasdiqlaydi. Menyu tugmasi do'konni Telegram ichida ochadi.",
      ru: "Подтверждает заказ 6-значным кодом. Кнопка меню открывает магазин прямо в Telegram.",
      en: "Confirms orders with a 6-digit code. The menu button opens the store inside Telegram.",
    },
  },
  {
    user: "olovfoodbot",
    name: "OLOV FOOD",
    img: "/img/bot-olovfoodbot.jpg",
    text: {
      uz: "Har buyurtmani egasiga yetkazadi. Holat o'zgarsa, mijozga o'zi yozadi.",
      ru: "Передаёт каждый заказ владельцу. Когда статус меняется, сам пишет клиенту.",
      en: "Delivers every order to the owner and messages the customer when the status changes.",
    },
  },
  {
    user: "swipeslidebot",
    name: "SwipeSlide",
    img: "/img/bot-swipeslidebot.jpg",
    text: {
      uz: "Talabalar uchun: referat, kurs ishi, taqdimot, Excel va PDF ↔ Word. 4 tilda.",
      ru: "Для студентов: рефераты, курсовые, презентации, Excel и PDF ↔ Word. На 4 языках.",
      en: "For students: essays, coursework, slides, Excel and PDF ↔ Word. In 4 languages.",
    },
  },
  {
    user: "dzteambot",
    name: "DZ TEAM",
    img: "/img/bot-dzteambot.jpg",
    text: {
      uz: "DELTA ZONE jamoasining rasmiy boti: jamoaga qo'shilish uchun ariza.",
      ru: "Официальный бот команды DELTA ZONE: заявки на вступление.",
      en: "Official DELTA ZONE team bot: applications to join.",
    },
  },
];

// 3D telefonda navbat bilan ko'rsatiladigan ekranlar
const SCREENS = [
  { img: "/img/opus-app.jpg", name: { uz: "OPUS MARKET · Android ilova", ru: "OPUS MARKET · Android-приложение", en: "OPUS MARKET · Android app" } },
  { img: "/img/olov-m.jpg", name: { uz: "OLOV FOOD · telefonda", ru: "OLOV FOOD · на телефоне", en: "OLOV FOOD · on mobile" } },
  { img: "/img/hojiakbar-m.jpg", name: { uz: "By.Hojiakbar · telefonda", ru: "By.Hojiakbar · на телефоне", en: "By.Hojiakbar · on mobile" } },
  { img: "/img/startap-m.jpg", name: { uz: "Startap Sayohati · telefonda", ru: "Startap Sayohati · на телефоне", en: "Startap Sayohati · on mobile" } },
  { img: "/img/opus-m.jpg", name: { uz: "OPUS MARKET · sayt telefonda", ru: "OPUS MARKET · сайт на телефоне", en: "OPUS MARKET · site on mobile" } },
];

export const FALLBACK = { sites: SITES, bots: BOTS, screens: SCREENS };
