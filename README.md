# Bear With Us — Website Resmi & Sistem Pendaftaran Bot Telegram

Proyek ini sudah terkonfigurasi penuh untuk berjalan di **2 lingkungan sekaligus**:
1. **Lokal di VS Code** (`npm run dev` via `server.ts`)
2. **Deploy Online di Vercel** (dilengkapi folder `/api/telegram/*` Serverless Functions + `vercel.json`)

---

## A. Cara Menjalankan di VS Code (Laptop / PC)

1. Buka folder proyek di VS Code, buka Terminal (`Ctrl + ~`), lalu instal package:
   ```bash
   npm install
   ```
2. Buat file bernama **`.env`** di folder utama (sejajar dengan `package.json`), lalu isi:
   ```env
   TELEGRAM_BOT_TOKEN="7123456789:AAHxyz1234567890abcdefghijklmnop"
   TELEGRAM_CHAT_ID="-1001234567890"
   TELEGRAM_BOT_USERNAME="BearWithUsBot"
   TELEGRAM_GROUP_URL="https://t.me/BearWithUsCommunity"
   ```
3. Jalankan server:
   ```bash
   npm run dev
   ```
4. Buka **`http://localhost:3000`** di browser.

---

## B. Cara Deploy ke Vercel (100% Siap Pakai)

Karena di dalam proyek ini sudah saya buatkan folder **`/api/telegram/`** (`register.ts`, `status.ts`, `test.ts`, `webhook.ts`) dan file **`vercel.json`**, kamu bisa langsung deploy ke Vercel dengan langkah berikut:

1. **Upload ke GitHub** dari VS Code, lalu buka dashboard **Vercel** → klik **Add New Project** → pilih repository GitHub kamu.
2. Sebelum klik **Deploy** (atau di menu **Settings → Environment Variables** di Vercel), masukkan 4 variabel ini:
   - `TELEGRAM_BOT_TOKEN` = `7123456789:AAHxyz...`
   - `TELEGRAM_CHAT_ID` = `-1001234567890`
   - `TELEGRAM_BOT_USERNAME` = `BearWithUsBot`
   - `TELEGRAM_GROUP_URL` = `https://t.me/BearWithUsCommunity`
3. Klik **Deploy** dan tunggu sampai selesai.
4. **(Khusus Vercel agar Bot Auto-Reply `/start` & `/id` menyala 24 jam)**:
   Buka website Vercel kamu yang sudah online → scroll ke bagian pendaftaran → klik **"Panduan Koneksi Bot & API Telegram"** → klik tombol **"Aktifkan Webhook Vercel"** sekali saja!
   *(Atau cukup buka `https://nama-web-kamu.vercel.app/api/telegram/webhook` di browser).*
