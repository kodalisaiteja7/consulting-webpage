# Teja Consulting — Full-Stack App

Monorepo with frontend (Vite + React + TS + Tailwind + Framer Motion) and backend (Express + MongoDB + TypeScript).

## Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

## Backend
```
cd consulting-site/backend
# create and edit .env
npm install
npm run dev
```
Default: http://localhost:4000

## Frontend
```
cd consulting-site/frontend
npm install
# create .env and set VITE_API_URL=http://localhost:4000/api
npm run dev
```
Default: http://localhost:5173

## Features
- Animated pages: Home, About, Services, Jobs, Contact
- Jobs with search/filters and Apply modal (file upload)
- Dark mode, Tailwind, SEO meta
- Admin JWT login with protected job CRUD endpoints

## Deploy
- Frontend: Vercel/Netlify (VITE_API_URL set to backend URL)
- Backend: Render/Heroku/Fly.io; set env: PORT, MONGO_URI, JWT_SECRET, CORS_ORIGIN

## Scripts
Backend: `npm run dev`, `npm run build`, `npm start`
Frontend: `npm run dev`, `npm run build`, `npm run preview`
