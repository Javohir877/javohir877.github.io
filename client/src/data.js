// Server ishlamay qolganda (yoki GitHub Pages'da) ishlatiladigan nusxa.
// Asl ro'yxat: server/data.js — o'zgartirsangiz, bu fayl ham yangilansin: node scripts/sync-data.mjs

const SITES = [
  {
    id: "opus",
    repo: "https://github.com/Javohir877/OPUS-MARKET",
    about: {
      uz: "Noutbuk va aksessuarlar do'koni. Katalog, akkauntlar, buyurtmalar va rasmlar Cloudflare D1 bazasida — admin panelda narxni o'zgartirsangiz sayt shu zahoti yangilanadi. Buyurtma Telegram bot yuborgan 6 xonali kod bilan tasdiqlanadi, bot ichidagi Mini App esa parolsiz kiritadi. Android ilova — alohida mobil interfeys: stories, filtrlar, kompyuter yig'ish (soket, xotira va blok quvvatini tekshiradi) va buyurtma holatini ko'rsatadigan vidjet.",
      ru: "Магазин ноутбуков и аксессуаров. Каталог, аккаунты, заказы и фото хранятся в Cloudflare D1 — меняете цену в админке, и сайт обновляется сразу. Заказ подтверждается 6-значным кодом от Telegram-бота, а Mini App внутри бота входит без пароля. Android-приложение — отдельный мобильный интерфейс: сторис, фильтры, сборка ПК (проверяет сокет, память и мощность блока) и виджет со статусом заказа.",
      en: "Laptop and accessories store. Catalog, accounts, orders and photos live in Cloudflare D1 — change a price in the admin panel and the site updates instantly. Orders are confirmed with a 6-digit code from the Telegram bot, and the Mini App inside the bot signs you in without a password. The Android app is its own mobile UI: stories, filters, a PC builder (checks socket, memory and PSU) and an order-status widget.",
    },
    name: "OPUS MARKET",
    text: {
      uz: "Kompyuter do'koni: sayt, server, bot va Android ilova.",
      ru: "Магазин компьютеров: сайт, сервер, бот и Android-приложение.",
      en: "Computer store: website, server, bot and Android app.",
    },
    tags: ["Cloudflare Workers", "D1", "Telegram Mini App", "Android"],
    url: "https://javohir877.github.io/OPUS-MARKET/",
    img: "/img/opus.webp",
    phone: "/img/opus-m.webp",
    wide: true,
  },
  {
    id: "olov",
    repo: "https://github.com/Javohir877/OLOV-FOOD",
    about: {
      uz: "Burger va lavash yetkazib berish sayti. Bosh sahifadagi burger tirik: sichqonchaga qaraydi, ko'z qisadi, bossangiz sakraydi. Kombo yig'ish, promokodlar, omad g'ildiragi va 5% keshbek bor. Har buyurtma @olovfoodbot orqali egasiga keladi, admin holatni o'zgartirsa bot mijozga o'zi yozadi. Telefonga ilova sifatida o'rnatiladi.",
      ru: "Сайт доставки бургеров и лаваша. Бургер на главной живой: следит за курсором, подмигивает, подпрыгивает при нажатии. Есть сборка комбо, промокоды, колесо удачи и кешбэк 5%. Каждый заказ приходит владельцу через @olovfoodbot, а при смене статуса бот сам пишет клиенту. Устанавливается на телефон как приложение.",
      en: "Burger and wrap delivery site. The burger on the home page is alive: it follows your cursor, winks and jumps when tapped. Combo builder, promo codes, a wheel of fortune and 5% cashback. Every order reaches the owner through @olovfoodbot, and the bot messages the customer when the status changes. Installs on a phone like an app.",
    },
    name: "OLOV FOOD",
    text: {
      uz: "Fast food sayti. Burger sichqonchaga qaraydi.",
      ru: "Сайт фастфуда. Бургер следит за курсором.",
      en: "Fast food site. The burger follows your cursor.",
    },
    tags: ["React", "Vite", "Cloudflare D1", "PWA"],
    url: "https://javohir877.github.io/OLOV-FOOD/",
    img: "/img/olov.webp",
  },
  {
    id: "hojiakbar",
    repo: "https://github.com/Javohir877/byhojiakbar-portfolio",
    about: {
      uz: "Video montajchi uchun portfolio: futbol editlar, Reels va Shorts. O'zimiz yozgan video pleyer va ariza formasi bor — ariza to'g'ri Telegramga tushadi. Videolar ffmpeg bilan siqilgan, shuning uchun sayt telefonda ham tez ochiladi.",
      ru: "Портфолио видеомонтажёра: футбольные эдиты, Reels и Shorts. Свой видеоплеер и форма заявки — заявка приходит прямо в Telegram. Видео сжаты через ffmpeg, поэтому сайт быстро открывается и на телефоне.",
      en: "Portfolio for a video editor: football edits, Reels and Shorts. A custom video player and an order form that sends requests straight to Telegram. Videos are compressed with ffmpeg, so the site opens fast on phones too.",
    },
    name: "By.Hojiakbar",
    text: {
      uz: "Video montajchi uchun portfolio va o'z pleyeri.",
      ru: "Портфолио видеомонтажёра со своим плеером.",
      en: "Video editor's portfolio with a custom player.",
    },
    tags: ["React", "Express", "ffmpeg"],
    url: "https://javohir877.github.io/byhojiakbar-portfolio/",
    img: "/img/hojiakbar.webp",
  },
  {
    id: "hisobla",
    repo: "https://github.com/Javohir877/hisobla",
    apk: "https://github.com/Javohir877/hisobla/releases/latest/download/hisobla.apk",
    about: {
      uz: "Universal kalkulyator: oddiy va ilmiy rejim, o'lchov konvertori, foiz, tana massasi (BMI) va kredit kalkulyatorlari. Kasrlar BigInt asosida aniq hisoblanadi: 1/2 + 1/3 = 5/6, 0,1 + 0,2 = 0,3, davriy kasrlar 0,(3) ham tushuniladi. Kasrlar bo'limi qisqartirishni (EKUB, Yevklid algoritmi) bosqichma-bosqich ko'rsatadi va mashq beradi. Internetsiz ishlaydi, telefonga o'rnatiladi; Android APK GitHub Actions'da avtomatik yig'iladi.",
      ru: "Универсальный калькулятор: обычный и научный режим, конвертер единиц, проценты, индекс массы тела (BMI) и кредитный калькулятор. Дроби считаются точно на BigInt: 1/2 + 1/3 = 5/6, 0,1 + 0,2 = 0,3, понимает и периодические дроби 0,(3). Раздел дробей пошагово показывает сокращение (НОД, алгоритм Евклида) и даёт упражнения. Работает без интернета, ставится на телефон; Android APK собирается автоматически в GitHub Actions.",
      en: "An all-in-one calculator: basic and scientific modes, unit converter, percentages, BMI and a loan calculator. Fractions are exact, built on BigInt: 1/2 + 1/3 = 5/6, 0.1 + 0.2 = 0.3, and repeating decimals like 0.(3) work too. The fractions section shows simplification step by step (GCD, Euclid's algorithm) and has practice drills. Works offline, installs on a phone, and the Android APK is built automatically by GitHub Actions.",
    },
    name: "Hisobla",
    text: {
      uz: "Kalkulyator: sayt va Android ilova. Kasrlar bosqichma-bosqich yechiladi.",
      ru: "Калькулятор: сайт и Android-приложение. Дроби решаются по шагам.",
      en: "Calculator: website and Android app. Fractions solved step by step.",
    },
    tags: ["JavaScript", "BigInt", "PWA", "Android"],
    url: "https://javohir877.github.io/hisobla/",
    img: "/img/hisobla.webp",
    phone: "/img/hisobla-m.webp",
    wide: true,
  },
  {
    id: "startap",
    repo: "https://github.com/Javohir877/startap-sayohati",
    about: {
      uz: "Sinf uchun interaktiv ta'lim o'yini: uch guruh startap jamoasiga aylanib Pre-seed → Seed → Series A, B, C → Exit bosqichlaridan o'tadi. Har bosqichda strategik qaror, tasodif kartasi, investor taklifi va 30 soniyalik bilim savoli bor. Maqsad — eng foydali exit va eng bilimdon guruh bo'lish.",
      ru: "Интерактивная учебная игра для класса: три группы становятся стартап-командами и проходят Pre-seed → Seed → Series A, B, C → Exit. На каждом этапе — стратегическое решение, карта случая, предложение инвестора и вопрос на 30 секунд. Цель — самый выгодный exit и звание самой знающей группы.",
      en: "Classroom learning game: three groups become startup teams and go through Pre-seed → Seed → Series A, B, C → Exit. Each stage has a strategic decision, a chance card, an investor offer and a 30-second quiz question. The goal is the most profitable exit and the best-informed team.",
    },
    name: "Startap Sayohati",
    text: {
      uz: "Sinf uchun interaktiv o'yin: guruhlar Pre-seed'dan Exit'gacha startap quradi.",
      ru: "Интерактивная игра для класса: группы проходят путь стартапа от Pre-seed до Exit.",
      en: "Classroom game: teams grow a startup from Pre-seed to Exit.",
    },
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://javohir877.github.io/startap-sayohati/",
    img: "/img/startap.webp",
    phone: "/img/startap-m.webp",
    wide: true,
  },
];

// Botlar: Telegram va Discord. url bo'lmasa, kartada tugma chiqmaydi.
const BOTS = [
  {
    user: "opussmarketbot",
    platform: "telegram",
    url: "https://t.me/opussmarketbot",
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
    platform: "telegram",
    url: "https://t.me/olovfoodbot",
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
    platform: "telegram",
    url: "https://t.me/swipeslidebot",
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
    platform: "telegram",
    url: "https://t.me/dzteambot",
    name: "DZ TEAM",
    img: "/img/bot-dzteambot.jpg",
    text: {
      uz: "DELTA ZONE jamoasining rasmiy boti: jamoaga qo'shilish uchun ariza.",
      ru: "Официальный бот команды DELTA ZONE: заявки на вступление.",
      en: "Official DELTA ZONE team bot: applications to join.",
    },
  },
  {
    user: "dzmafia",
    platform: "discord",
    // Developer Portal'dagi standart o'rnatish faqat applications.commands — botning o'zi kirmaydi,
    // shuning uchun bot doirasi va README'dagi ruxsatlar aniq yozilgan
    url: "https://discord.com/oauth2/authorize?client_id=1567548963098206410&scope=bot+applications.commands&permissions=361045773312",
    name: "DZ MAFIA",
    img: "/img/bot-dzmafia.png",
    text: {
      uz: "Discord'da Mafia o'yini: Don, Komissar, Doktor, Ma'shuqa, Qotil — tun va kun bosqichlari, /mafia buyruqlari.",
      ru: "Игра «Мафия» в Discord: Дон, Комиссар, Доктор, Любовница, Маньяк — ночь и день, команды /mafia.",
      en: "Mafia game on Discord: Don, Detective, Doctor, Lover, Killer — night and day phases, /mafia commands.",
    },
  },
  {
    user: "dzmusic",
    platform: "discord",
    url: "https://discord.com/oauth2/authorize?client_id=1563234813610168480",
    name: "DZ MUSIC",
    img: "/img/bot-dzmusic.png",
    text: {
      uz: "DELTA ZONE jamoasining musiqa boti: ovozli kanalga qo'shing va birga tinglang.",
      ru: "Музыкальный бот команды DELTA ZONE: добавьте в голосовой канал и слушайте вместе.",
      en: "DELTA ZONE's music bot: add it to a voice channel and listen together.",
    },
  },
];

// 3D telefonda navbat bilan ko'rsatiladigan ekranlar
const SCREENS = [
  { img: "/img/opus-app.webp", name: { uz: "OPUS MARKET · Android ilova", ru: "OPUS MARKET · Android-приложение", en: "OPUS MARKET · Android app" } },
  { img: "/img/olov-m.webp", name: { uz: "OLOV FOOD · telefonda", ru: "OLOV FOOD · на телефоне", en: "OLOV FOOD · on mobile" } },
  { img: "/img/hojiakbar-m.webp", name: { uz: "By.Hojiakbar · telefonda", ru: "By.Hojiakbar · на телефоне", en: "By.Hojiakbar · on mobile" } },
  { img: "/img/startap-m.webp", name: { uz: "Startap Sayohati · telefonda", ru: "Startap Sayohati · на телефоне", en: "Startap Sayohati · on mobile" } },
  { img: "/img/opus-m.webp", name: { uz: "OPUS MARKET · sayt telefonda", ru: "OPUS MARKET · сайт на телефоне", en: "OPUS MARKET · site on mobile" } },
];

export const FALLBACK = { sites: SITES, bots: BOTS, screens: SCREENS };
