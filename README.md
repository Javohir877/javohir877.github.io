# Javohir — portfolio

Sayt: https://javohir877.github.io

- `client/` — frontend: React + Vite, 3D telefon three.js'da, uch tilda (uz / ru / en — `client/src/i18n.jsx`),
  GitHub faolligi bo'limi GitHub API'dan jonli olinadi
- `server/` — backend: Node.js + Express
  - `GET /api/projects` — saytlar, botlar va 3D telefon ekranlari (`server/data.js`)
  - `POST /api/visit` — sayt necha marta ochilganini sanaydi (`server/data/views.json`)

## Ishga tushirish (kompyuterda)

```
cd server && npm install && npm run dev      # http://localhost:3010
cd client && npm install && npm run dev      # http://localhost:5173
```

Vite `/api` so'rovlarini 3010-portdagi serverga yo'naltiradi.

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
Joylash va yangilash (Git Bash'da): `bash deploy.sh` — manba kodni `main` ga,
yig'ilgan saytni `gh-pages` ga yuklaydi, birinchi marta repozitoriya va Pages'ni ham yaratadi.

## Yangi ish qo'shish

`server/data.js` dagi `SITES`, `BOTS` yoki `SCREENS` ro'yxatiga yozing (matnlar
`{ uz, ru, en }` ko'rinishida), rasmni `client/public/img/` ga qo'ying, keyin
`node scripts/sync-data.mjs` — u `client/src/data.js` zaxira nusxasini yangilaydi
(GitHub Pages'da sayt shu nusxadan foydalanadi).
