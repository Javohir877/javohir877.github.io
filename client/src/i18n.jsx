// Uch til: o'zbekcha, ruscha, inglizcha. Tanlov localStorage'da saqlanadi,
// birinchi kirishda brauzer tiliga qarab tanlanadi.
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const LANGS = ["uz", "ru", "en"];

const DICT = {
  uz: {
    nav: { works: "Ishlar", bots: "Botlar", process: "Jarayon", quantum: "Kvant", github: "GitHub", contact: "Aloqa" },
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
    quantum: {
      title: "Kvant kompyuter ichidan",
      sub: "Qiziqib o'rganayotgan mavzuim. Modelni three.js'da noldan yasadim: haqiqiy kvant kompyuterlar shunday oltin «qandil» ichida, koinotdan ham sovuqroq joyda ishlaydi.",
      stages: [
        ["50 K", "Birinchi to'siq", "Tashqaridan kirayotgan issiqlikning katta qismini shu disk ushlab qoladi."],
        ["4 K", "Pulse-tube bosqichi", "Asosiy sovutgich shu yergacha sovutadi. Kubitlardan kelgan zaif signallarni kuchaytirgichlar shu yerda turadi."],
        ["0.8 K", "Still", "Geliy-3 bug'lanib, haroratni yanada pastga tushiradi."],
        ["100 mK", "Sovuq disk", "Kabellar orqali keladigan issiqlik shovqini shu yerda so'ndiriladi."],
        ["10 mK", "Aralashtirish kamerasi", "Eng sovuq joy — koinot fonidan (2.7 K) taxminan 270 marta sovuqroq."],
        ["Kubitlar", "Protsessor", "O'ta o'tkazuvchan kubitlar bir vaqtda 0 va 1 holatida bo'la oladi. Shuning uchun ularni shunchalik sovuq saqlash kerak."],
      ],
      close: "Qopqoqni yopish",
      open: "Qopqoqni ochish",
      closedNote: "Ishlayotganda qandil vakuum idishi ichida bo'ladi",
      hint: "sudrang — aylanadi · diskni bosing — nima ekanini ko'rasiz",
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
    nav: { works: "Работы", bots: "Боты", process: "Процесс", quantum: "Квант", github: "GitHub", contact: "Связь" },
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
    quantum: {
      title: "Квантовый компьютер изнутри",
      sub: "Тема, которую я изучаю из интереса. Модель собрал с нуля на three.js: настоящие квантовые компьютеры работают внутри такой золотой «люстры», в месте холоднее космоса.",
      stages: [
        ["50 K", "Первый барьер", "Этот диск задерживает большую часть тепла, идущего снаружи."],
        ["4 K", "Ступень pulse-tube", "Основной охладитель доводит до этой температуры. Здесь стоят усилители слабых сигналов от кубитов."],
        ["0.8 K", "Still", "Испаряется гелий-3 и опускает температуру ещё ниже."],
        ["100 mK", "Холодная пластина", "Здесь гасится тепловой шум, идущий по кабелям."],
        ["10 mK", "Камера смешения", "Самое холодное место — примерно в 270 раз холоднее космического фона (2,7 K)."],
        ["Кубиты", "Процессор", "Сверхпроводящие кубиты могут быть одновременно 0 и 1. Поэтому их держат в таком холоде."],
      ],
      close: "Закрыть кожух",
      open: "Открыть кожух",
      closedNote: "Во время работы люстра находится внутри вакуумного кожуха",
      hint: "тяните — вращается · нажмите на диск — узнаете, что это",
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
    nav: { works: "Work", bots: "Bots", process: "Process", quantum: "Quantum", github: "GitHub", contact: "Contact" },
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
    quantum: {
      title: "Inside a quantum computer",
      sub: "A topic I'm exploring out of curiosity. I built the model from scratch in three.js: real quantum computers run inside a golden \"chandelier\" like this, colder than outer space.",
      stages: [
        ["50 K", "First shield", "This plate stops most of the heat coming in from outside."],
        ["4 K", "Pulse-tube stage", "The main cooler gets things down to here. Amplifiers for the faint qubit signals sit on this plate."],
        ["0.8 K", "Still", "Helium-3 evaporates here and pulls the temperature down further."],
        ["100 mK", "Cold plate", "Thermal noise travelling down the cables is damped here."],
        ["10 mK", "Mixing chamber", "The coldest spot — about 270 times colder than the cosmic background (2.7 K)."],
        ["Qubits", "Processor", "Superconducting qubits can be 0 and 1 at the same time. That's why they have to be kept this cold."],
      ],
      close: "Close the shield",
      open: "Open the shield",
      closedNote: "While running, the chandelier sits inside a vacuum can",
      hint: "drag — it spins · tap a plate — see what it is",
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
