// Uch til: o'zbekcha, ruscha, inglizcha. Tanlov localStorage'da saqlanadi,
// birinchi kirishda brauzer tiliga qarab tanlanadi.
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const LANGS = ["uz", "ru", "en"];

const DICT = {
  uz: {
    nav: { works: "Ishlar", bots: "Botlar", process: "Jarayon", github: "GitHub", contact: "Aloqa" },
    hero: {
      eyebrow: "Sayt · Telegram bot · Android ilova",
      // fe'llar alohida — ular navbat bilan yonadi
      parts: ["Men Javohirman. Sun'iy intellekt bilan birgalikda kod ", 0, ", uni ", 1, ", ", 2, " va ", 3, "."],
      verbs: ["yozaman", "tahrirlayman", "sayqallayman", "ishga tushiraman"],
      cta: "Ishlarni ko'rish",
      tg: "Telegramda yozish ›",
      hint: "sudrang — aylanadi · bosing — ekran almashadi · botni bosing — ochiladi",
      scroll: "pastga",
      screens: "Ekranlar",
    },
    works: { title: "Ishlar", site: "Saytni ko'rish ↗", details: "Batafsil →", open: "Saytni ochish ↗", code: "Kodni ko'rish ↗", close: "Yopish", prev: "Oldingi", next: "Keyingi", desktop: "Kompyuterda", mobile: "Telefonda" },
    bots: { title: "Botlar", sub: "Telegram va Discord uchun. Kartani bosing yoki ustiga olib boring — orqa tomoni ochiladi.", open: "Ochish ↗", invite: "Serverga qo'shish ↗", discord: "Discord bot" },
    process: {
      title: "Sun'iy intellekt bilan ishlayman",
      sub: "Har loyiha shu to'rt bosqichdan o'tadi. Kod oynasi hozir qaysi bosqichda ekanini ko'rsatib turadi.",
      steps: [
        ["Yozaman", "G'oyani birga muhokama qilamiz, sun'iy intellekt bilan birinchi ishlaydigan versiyani tez yozaman."],
        ["Tahrirlayman", "Har qatorini o'qib chiqaman: xatolar, xavfsizlik, ortiqcha kod — hammasini to'g'irlayman."],
        ["Sayqallayman", "Dizayn, animatsiya, tezlik va telefonlarga moslash. Sayt «AI qilgan» emas, tirik ko'rinishi kerak."],
        ["Ishga tushiraman", "Server, domen, Telegram bot, GitHub Pages — loyiha internetda ishlab turguncha kuzataman."],
      ],
      phases: ["yozish", "tahrir", "sayqal", "ishga tushirish"],
    },
    gh: {
      title: "GitHub'da hozir",
      sub: "Oxirgi 8 hafta faolligi va yaqinda yangilangan loyihalar — GitHub'dan jonli olinadi.",
      weeks: "8 hafta", less: "kam", more: "ko'p", repos: "ta ochiq loyiha", profile: "Profilni ochish ↗",
      updated: "yangilandi", noDesc: "Tavsif yo'q",
    },
    contact: {
      title: ["Loyihangiz ", "bormi?"],
      sub: "Do'kon, kafe yoki xizmatingiz uchun sayt, bot yoki ilova.",
      btn: "Telegramda yozish",
    },
    palette: { hint: "Qidirish", placeholder: "Bo'lim, loyiha yoki bot nomini yozing…", empty: "Hech narsa topilmadi", go: "O'tish", open: "Ochish", lang: "Til", section: "Bo'lim", project: "Loyiha", bot: "Bot", link: "Havola" },
    pwa: { install: "Telefonga o'rnatish" },
    top: "Tepaga",
    foot: { views: (n) => `Sayt ${n} marta ochilgan` },
  },

  ru: {
    nav: { works: "Работы", bots: "Боты", process: "Процесс", github: "GitHub", contact: "Связь" },
    hero: {
      eyebrow: "Сайт · Telegram-бот · Android-приложение",
      parts: ["Я Жавохир. Вместе с искусственным интеллектом я ", 0, " код, ", 1, ", ", 2, " и ", 3, " его."],
      verbs: ["пишу", "правлю", "шлифую", "запускаю"],
      cta: "Смотреть работы",
      tg: "Написать в Telegram ›",
      hint: "тяните — вращается · нажмите — сменится экран · нажмите на бота — откроется",
      scroll: "вниз",
      screens: "Экраны",
    },
    works: { title: "Работы", site: "Открыть сайт ↗", details: "Подробнее →", open: "Открыть сайт ↗", code: "Смотреть код ↗", close: "Закрыть", prev: "Назад", next: "Далее", desktop: "На компьютере", mobile: "На телефоне" },
    bots: { title: "Боты", sub: "Для Telegram и Discord. Нажмите на карточку или наведите курсор — откроется обратная сторона.", open: "Открыть ↗", invite: "Добавить на сервер ↗", discord: "Discord-бот" },
    process: {
      title: "Работаю с искусственным интеллектом",
      sub: "Каждый проект проходит эти четыре этапа. Окно с кодом показывает, на каком этапе он сейчас.",
      steps: [
        ["Пишу", "Обсуждаем идею, и вместе с ИИ я быстро пишу первую рабочую версию."],
        ["Правлю", "Читаю каждую строку: ошибки, безопасность, лишний код — всё исправляю."],
        ["Шлифую", "Дизайн, анимации, скорость, адаптация под телефоны. Сайт должен выглядеть живым, а не «сделанным ИИ»."],
        ["Запускаю", "Сервер, домен, Telegram-бот, GitHub Pages — веду проект, пока он не заработает в интернете."],
      ],
      phases: ["пишу", "правлю", "шлифую", "запуск"],
    },
    gh: {
      title: "Сейчас на GitHub",
      sub: "Активность за последние 8 недель и недавно обновлённые проекты — данные берутся с GitHub в реальном времени.",
      weeks: "8 недель", less: "меньше", more: "больше", repos: "открытых проектов", profile: "Открыть профиль ↗",
      updated: "обновлён", noDesc: "Без описания",
    },
    contact: {
      title: ["Есть ", "проект?"],
      sub: "Сайт, бот или приложение для вашего магазина, кафе или сервиса.",
      btn: "Написать в Telegram",
    },
    palette: { hint: "Поиск", placeholder: "Введите раздел, проект или бота…", empty: "Ничего не найдено", go: "Перейти", open: "Открыть", lang: "Язык", section: "Раздел", project: "Проект", bot: "Бот", link: "Ссылка" },
    pwa: { install: "Установить на телефон" },
    top: "Наверх",
    foot: { views: (n) => `Сайт открыли ${n} раз` },
  },

  en: {
    nav: { works: "Work", bots: "Bots", process: "Process", github: "GitHub", contact: "Contact" },
    hero: {
      eyebrow: "Websites · Telegram bots · Android apps",
      parts: ["I'm Javohir. Together with AI I ", 0, " code, ", 1, " it, ", 2, " it and ", 3, " it."],
      verbs: ["write", "edit", "polish", "ship"],
      cta: "See my work",
      tg: "Message on Telegram ›",
      hint: "drag — it spins · tap — screen changes · tap a bot — it opens",
      scroll: "scroll",
      screens: "Screens",
    },
    works: { title: "Work", site: "Open the site ↗", details: "Details →", open: "Open the site ↗", code: "View code ↗", close: "Close", prev: "Previous", next: "Next", desktop: "Desktop", mobile: "Mobile" },
    bots: { title: "Bots", sub: "For Telegram and Discord. Tap a card or hover over it to flip it.", open: "Open ↗", invite: "Add to server ↗", discord: "Discord bot" },
    process: {
      title: "I work with AI",
      sub: "Every project goes through these four steps. The code window shows which one it is in right now.",
      steps: [
        ["Write", "We talk the idea through, then I write the first working version quickly with AI."],
        ["Edit", "I read every line: bugs, security, dead code — all of it gets fixed."],
        ["Polish", "Design, motion, speed and phone layouts. A site should feel alive, not \"made by AI\"."],
        ["Ship", "Server, domain, Telegram bot, GitHub Pages — I stay with it until it runs online."],
      ],
      phases: ["write", "edit", "polish", "ship"],
    },
    gh: {
      title: "On GitHub now",
      sub: "Activity over the last 8 weeks and recently updated projects — pulled live from GitHub.",
      weeks: "8 weeks", less: "less", more: "more", repos: "public projects", profile: "Open profile ↗",
      updated: "updated", noDesc: "No description",
    },
    contact: {
      title: ["Got a ", "project?"],
      sub: "A website, bot or app for your shop, café or service.",
      btn: "Message on Telegram",
    },
    palette: { hint: "Search", placeholder: "Type a section, project or bot…", empty: "Nothing found", go: "Go", open: "Open", lang: "Language", section: "Section", project: "Project", bot: "Bot", link: "Link" },
    pwa: { install: "Install app" },
    top: "Back to top",
    foot: { views: (n) => `Opened ${n} times` },
  },
};

const LangCtx = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (LANGS.includes(saved)) return saved;
  } catch {}
  // asosiy auditoriya o'zbek: ruscha brauzerga ruscha, qolganlarga o'zbekcha
  return (navigator.language || "").toLowerCase().startsWith("ru") ? "ru" : "uz";
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t: DICT[lang],
    // ma'lumotdagi { uz, ru, en } matndan joriy tilni oladi
    pick: (v) => (v && typeof v === "object" ? v[lang] ?? v.uz : v),
  }), [lang]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
