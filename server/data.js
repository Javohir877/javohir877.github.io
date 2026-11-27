// Saytdagi loyihalar. Yangi ish qo'shish uchun shu ro'yxatlarga yozing —
// frontend ularni /api/projects orqali oladi (zaxira nusxasi: client/src/data.js).
// Matnlar uch tilda: { uz, ru, en }.

export const SITES = [
  {
    id: "opus",
    platforms: ["web", "android"],
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
    id: "navo",
    platforms: ["windows", "linux", "android"],
    repo: "https://github.com/Javohir877/navo",
    exe: "https://github.com/Javohir877/navo/releases/latest/download/Navo-Setup.exe",
    linux: "https://github.com/Javohir877/navo/releases/latest/download/Navo.AppImage",
    apk: "https://github.com/Javohir877/navo/releases/latest/download/Navo.apk",
    about: {
      uz: "Windows, Linux va Android uchun musiqa pleyeri. Qo'shiq oldindan tahlil qilinadi, effektlar har bir 808 zarbasiga aniq tushadi: drop'larda kuchli, sokin qismlarda jim. Uslubni o'zi aniqlaydi (Phonk, Rep, Elektron, Pop), Slowed + Reverb, Nightcore va 8D rejimlari, karaoke uslubidagi qo'shiq matni, 10 polosali ekvalayzer bor. MP3, FLAC, WAV, OPUS va boshqa formatlarni o'ynaydi, Windows'da ffmpeg orqali yanada ko'prog'ini. Bitta interfeys kodi: kompyuterda Electron, Android'da Capacitor.",
      ru: "Музыкальный плеер для Windows, Linux и Android. Трек заранее анализируется, и эффекты точно попадают в каждый удар 808: на дропах — мощно, в тихих местах — тишина. Сам определяет стиль (Phonk, рэп, электроника, поп), есть режимы Slowed + Reverb, Nightcore и 8D, текст песни в стиле караоке и 10-полосный эквалайзер. Играет MP3, FLAC, WAV, OPUS и другие форматы, а на Windows через ffmpeg — ещё больше. Один код интерфейса: Electron на компьютере, Capacitor на Android.",
      en: "A music player for Windows, Linux and Android. Each track is analysed ahead of time so the effects land exactly on every 808 hit: big on the drops, quiet in the calm parts. It detects the style on its own (Phonk, rap, electronic, pop), and has Slowed + Reverb, Nightcore and 8D modes, karaoke-style lyrics and a 10-band equalizer. Plays MP3, FLAC, WAV, OPUS and more, with even more formats on Windows via ffmpeg. One interface codebase: Electron on desktop, Capacitor on Android.",
    },
    name: "Navo",
    text: {
      uz: "Musiqa pleyeri: Windows, Linux va Android. Effektlar bass bilan birga uradi.",
      ru: "Музыкальный плеер для Windows, Linux и Android. Эффекты бьют в такт басу.",
      en: "Music player for Windows, Linux and Android. Effects hit with the bass.",
    },
    tags: ["Electron", "Capacitor", "Web Audio", "ffmpeg"],
    url: "https://javohir877.github.io/navo/",
    img: "/img/navo.webp",
    phone: "/img/navo-m.webp",
    wide: true,
  },
  {
    id: "olov",
    platforms: ["web"],
    repo: "https://github.com/Javohir877/OLOV-FOOD",
    about: {
      uz: "Toshkent bo'ylab burger, lavash, pitsa va tovuq yetkazib berish sayti. Menyuda «Hit», «Yangi», «Achchiq» va «600 kkal gacha» saralash, vaqt hisoblagichli kun taklifi, uchta taomdan 15% arzon kombo yig'ish, omad g'ildiragi, filiallar va buyurtmani kuzatish bor. Har buyurtma @olovfoodbot orqali egasiga keladi, admin holatni o'zgartirsa bot mijozga o'zi yozadi. Telefonga ilova sifatida o'rnatiladi.",
      ru: "Сайт доставки бургеров, лаваша, пиццы и курицы по Ташкенту. В меню — фильтры «Хит», «Новинка», «Острое» и «до 600 ккал», предложение дня с таймером, сборка комбо из трёх блюд на 15% дешевле, колесо удачи, филиалы и отслеживание заказа. Каждый заказ приходит владельцу через @olovfoodbot, а при смене статуса бот сам пишет клиенту. Устанавливается на телефон как приложение.",
      en: "Burger, wrap, pizza and chicken delivery across Tashkent. The menu has Hit, New, Spicy and under-600-kcal filters, a daily deal with a countdown, a three-item combo builder at 15% off, a wheel of fortune, branches and order tracking. Every order reaches the owner through @olovfoodbot, and the bot messages the customer when the status changes. Installs on a phone like an app.",
    },
    name: "OLOV FOOD",
    text: {
      uz: "Fast food yetkazib berish: menyu, kombo, kun taklifi va kuzatuv.",
      ru: "Доставка фастфуда: меню, комбо, предложение дня и отслеживание.",
      en: "Fast food delivery: menu, combos, daily deal and tracking.",
    },
    tags: ["React", "Vite", "Cloudflare D1", "PWA"],
    url: "https://javohir877.github.io/OLOV-FOOD/",
    img: "/img/olov.webp",
    phone: "/img/olov-m.webp",
  },
  {
    id: "hojiakbar",
    platforms: ["web"],
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
    phone: "/img/hojiakbar-m.webp",
  },
  {
    id: "hisobla",
    platforms: ["web", "android"],
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
    platforms: ["web"],
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
export const BOTS = [
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
    // namuna suhbat (saytda «namuna» deb belgilanadi)
    demo: [
      { from: "me", text: { uz: "/start", ru: "/start", en: "/start" } },
      { from: "bot", text: { uz: "Assalomu alaykum! OPUS MARKET do'koniga xush kelibsiz.", ru: "Здравствуйте! Добро пожаловать в OPUS MARKET.", en: "Hi! Welcome to OPUS MARKET." }, buttons: [{ uz: "Do'konni ochish", ru: "Открыть магазин", en: "Open the store" }] },
      { from: "bot", text: { uz: "Buyurtmani tasdiqlash kodi: 482 913", ru: "Код подтверждения заказа: 482 913", en: "Order confirmation code: 482 913" } },
    ],
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
    // namuna suhbat (saytda «namuna» deb belgilanadi)
    demo: [
      { from: "bot", text: { uz: "Buyurtmangiz qabul qilindi: #1042", ru: "Ваш заказ принят: #1042", en: "Your order is in: #1042" } },
      { from: "bot", text: { uz: "Holat: tayyorlanmoqda", ru: "Статус: готовится", en: "Status: being prepared" } },
      { from: "bot", text: { uz: "Holat: yo'lda — kuryer 15 daqiqada yetib boradi", ru: "Статус: в пути — курьер будет через 15 минут", en: "Status: on the way — courier arrives in 15 minutes" } },
    ],
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
    // namuna suhbat (saytda «namuna» deb belgilanadi)
    demo: [
      { from: "me", text: { uz: "/start", ru: "/start", en: "/start" } },
      { from: "bot", text: { uz: "Nima tayyorlaymiz?", ru: "Что подготовим?", en: "What shall we make?" }, buttons: [{ uz: "Referat", ru: "Реферат", en: "Essay" }, { uz: "Taqdimot", ru: "Презентация", en: "Slides" }, { uz: "PDF ↔ Word", ru: "PDF ↔ Word", en: "PDF ↔ Word" }] },
      { from: "me", text: { uz: "Taqdimot", ru: "Презентация", en: "Slides" } },
      { from: "bot", text: { uz: "Mavzuni yozing — slaydlarni tayyorlab beraman.", ru: "Напишите тему — подготовлю слайды.", en: "Send the topic and I'll prepare the slides." } },
    ],
  },
  {
    user: "sparfentusmakerbot",
    platform: "telegram",
    url: "https://t.me/sparfentusmakerbot",
    name: "SparFentus Maker",
    img: "/img/bot-sparfentusmakerbot.jpg",
    text: {
      uz: "Kanal egalari uchun: istalgan mavzuda 20 xil uslubda tayyor post va YouTube uchun CTR baland nomlar. Gemini AI bilan.",
      ru: "Для владельцев каналов: готовый пост на любую тему в 20 стилях и цепляющие названия для YouTube. На Gemini AI.",
      en: "For channel owners: a ready post on any topic in 20 styles, plus high-CTR YouTube titles. Powered by Gemini AI.",
    },
    // namuna suhbat (saytda «namuna» deb belgilanadi)
    demo: [
      { from: "me", text: { uz: "Yangi kolleksiya keldi, 20% chegirma, 25-sentyabrgacha", ru: "Новая коллекция, скидка 20% до 25 сентября", en: "New collection is in, 20% off until Sept 25" } },
      { from: "bot", text: { uz: "Qaysi uslubda yozay?", ru: "В каком стиле написать?", en: "Which style should I use?" }, buttons: [{ uz: "Sotuv / reklama", ru: "Продажи / реклама", en: "Sales / ad" }, { uz: "Hikoya", ru: "История", en: "Story" }, { uz: "Tasodifiy uslub", ru: "Случайный стиль", en: "Random style" }] },
      { from: "me", text: { uz: "Sotuv / reklama", ru: "Продажи / реклама", en: "Sales / ad" } },
      { from: "bot", text: { uz: "Yangi kolleksiya — 20% arzon! Faqat 25-sentyabrgacha. Ulgurib qoling — eng chiroylilari birinchi kunlardayoq tugaydi. #chegirma #yangikolleksiya", ru: "Новая коллекция — минус 20%! Только до 25 сентября. Успейте — лучшее разбирают в первые дни. #скидка #новаяколлекция", en: "New collection, 20% off! Only until Sept 25. Hurry: the best pieces go in the first days. #sale #newcollection" }, buttons: [{ uz: "Qayta yozish", ru: "Переписать", en: "Rewrite" }, { uz: "Boshqa uslub", ru: "Другой стиль", en: "Another style" }] },
    ],
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
    // namuna suhbat (saytda «namuna» deb belgilanadi)
    demo: [
      { from: "me", text: { uz: "/start", ru: "/start", en: "/start" } },
      { from: "bot", text: { uz: "DELTA ZONE jamoasiga ariza. Ismingizni yozing.", ru: "Заявка в команду DELTA ZONE. Напишите своё имя.", en: "Application to DELTA ZONE. Send your name." } },
      { from: "me", text: { uz: "Javohir", ru: "Жавохир", en: "Javohir" } },
      { from: "bot", text: { uz: "Ariza yuborildi. Javobni shu yerda olasiz.", ru: "Заявка отправлена. Ответ придёт сюда.", en: "Application sent. You'll get the answer here." } },
    ],
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
    // namuna suhbat (saytda «namuna» deb belgilanadi)
    demo: [
      { from: "me", text: { uz: "/mafia start", ru: "/mafia start", en: "/mafia start" } },
      { from: "bot", text: { uz: "Tun tushdi. Rollar shaxsiy xabarda: Don, Komissar, Doktor, Ma'shuqa, Qotil.", ru: "Наступила ночь. Роли в личных сообщениях: Дон, Комиссар, Доктор, Любовница, Маньяк.", en: "Night falls. Roles sent by DM: Don, Detective, Doctor, Lover, Killer." } },
      { from: "bot", text: { uz: "Kun boshlandi — ovoz berish uchun 60 soniya.", ru: "Наступил день — 60 секунд на голосование.", en: "Day breaks — 60 seconds to vote." } },
    ],
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
    // namuna suhbat (saytda «namuna» deb belgilanadi)
    demo: [
      { from: "me", text: { uz: "/play", ru: "/play", en: "/play" } },
      { from: "bot", text: { uz: "Ovozli kanalga qo'shildim. Navbatdagi qo'shiq ijro etilmoqda.", ru: "Подключился к голосовому каналу. Играет следующий трек.", en: "Joined the voice channel. Now playing the next track." } },
    ],
  },
];

// 3D telefonda navbat bilan ko'rsatiladigan ekranlar
export const SCREENS = [
  { img: "/img/opus-app.webp", name: { uz: "OPUS MARKET · Android ilova", ru: "OPUS MARKET · Android-приложение", en: "OPUS MARKET · Android app" } },
  { img: "/img/olov-m.webp", name: { uz: "OLOV FOOD · telefonda", ru: "OLOV FOOD · на телефоне", en: "OLOV FOOD · on mobile" } },
  { img: "/img/hojiakbar-m.webp", name: { uz: "By.Hojiakbar · telefonda", ru: "By.Hojiakbar · на телефоне", en: "By.Hojiakbar · on mobile" } },
  { img: "/img/startap-m.webp", name: { uz: "Startap Sayohati · telefonda", ru: "Startap Sayohati · на телефоне", en: "Startap Sayohati · on mobile" } },
  { img: "/img/opus-m.webp", name: { uz: "OPUS MARKET · sayt telefonda", ru: "OPUS MARKET · сайт на телефоне", en: "OPUS MARKET · site on mobile" } },
];
