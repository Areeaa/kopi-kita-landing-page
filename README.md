# KOPI KITA Landing Page

React + Vite landing page dan CMS sederhana untuk UMKM kopi.

## Stack

- React Vite
- Tailwind CSS
- Supabase Database, Auth, dan Storage
- React Router DOM
- React Helmet Async untuk SEO

## Menjalankan Lokal

```bash
corepack pnpm install
corepack pnpm dev
```

Salin `.env.example` menjadi `.env`, lalu isi:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Setup Supabase

1. Buat project Supabase.
2. Jalankan SQL di `supabase/schema.sql`.
3. Aktifkan Email & Password di Authentication.
4. Buat user admin dari Supabase Dashboard.
5. Bucket storage `kopi-kita` dibuat oleh schema SQL.

## Route

- `/` landing page pengunjung.
- `/artikel/:slug` detail artikel dengan meta tags.
- `/admin/login` login admin.
- `/admin` dashboard CMS.
- `/admin/products` CRUD produk dan upload gambar.
- `/admin/articles` CRUD artikel dan upload thumbnail.
- `/admin/settings` pengaturan profil toko.
