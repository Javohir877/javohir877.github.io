# Javohir — portfolio

Sayt: https://javohir877.github.io

- `client/` — frontend: React + Vite, 3D telefon three.js'da
- `server/` — backend: Node.js + Express
  - `GET /api/projects` — saytlar, botlar va 3D telefon ekranlari (`server/data.js`)
  - `POST /api/visit` — sayt necha marta ochilganini sanaydi (`server/data/views.json`)

## Ishga tushirish (kompyuterda)

```
cd server && npm install && npm run dev      # http://localhost:3001
cd client && npm install && npm run dev      # http://localhost:5173
```

Vite `/api` so'rovlarini 3001-portdagi serverga yo'naltiradi.

## Internetga chiqarish

```
cd client && npm run build
cd ../server && npm start
```

Server `client/dist` ni o'zi tarqatadi, ya'ni bitta Node xizmati yetarli
(Render, Railway, VPS). `PORT` muhit o'zgaruvchisi qo'llab-quvvatlanadi.

## GitHub Pages

`gh-pages` tarmog'ida yig'ilgan frontend turadi (backendsiz: loyihalar
`client/src/data.js` dan olinadi, ko'rishlar hisoblagichi ko'rinmaydi).
Yangilash: `cd client && npm run build`, keyin `client/dist` ni `gh-pages` ga yuklash.

## Yangi ish qo'shish

`server/data.js` dagi `SITES`, `BOTS` yoki `SCREENS` ro'yxatiga yozing,
rasmni `client/public/img/` ga qo'ying. Server ishlamay qolsa, sayt
`client/src/data.js` dagi zaxira nusxadan foydalanadi — uni ham yangilab qo'ying.
