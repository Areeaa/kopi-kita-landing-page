create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(12, 2) not null default 0,
  image_url text,
  shopee_link text,
  category text,
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  thumbnail_url text,
  category text default 'Cerita Kopi',
  created_at timestamptz not null default now()
);

create table if not exists public.site_config (
  id int primary key default 1 check (id = 1),
  about_text text,
  address text,
  whatsapp_number text,
  instagram_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  role text,
  quote text not null,
  rating int not null default 5 check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

insert into public.site_config (id, about_text, address, whatsapp_number, instagram_url)
values (
  1,
  'KOPI KITA adalah UMKM kopi lokal yang mengolah biji pilihan dari petani Indonesia menjadi kopi harian yang jujur, segar, dan mudah dinikmati.',
  'Jl. Aroma Kopi No. 12, Jakarta',
  '6281234567890',
  'https://instagram.com/kopikita'
)
on conflict (id) do nothing;

alter table public.products enable row level security;
alter table public.articles enable row level security;
alter table public.site_config enable row level security;
alter table public.testimonials enable row level security;

create policy "Public can read products" on public.products for select using (true);
create policy "Public can read articles" on public.articles for select using (true);
create policy "Public can read site config" on public.site_config for select using (true);
create policy "Public can read testimonials" on public.testimonials for select using (true);

create policy "Admins manage products" on public.products for all to authenticated using (true) with check (true);
create policy "Admins manage articles" on public.articles for all to authenticated using (true) with check (true);
create policy "Admins manage site config" on public.site_config for all to authenticated using (true) with check (true);
create policy "Admins manage testimonials" on public.testimonials for all to authenticated using (true) with check (true);

insert into storage.buckets (id, name, public)
values ('kopi-kita', 'kopi-kita', true)
on conflict (id) do nothing;

create policy "Public can view kopi-kita assets"
on storage.objects for select
using (bucket_id = 'kopi-kita');

create policy "Admins can upload kopi-kita assets"
on storage.objects for insert to authenticated
with check (bucket_id = 'kopi-kita');

create policy "Admins can update kopi-kita assets"
on storage.objects for update to authenticated
using (bucket_id = 'kopi-kita')
with check (bucket_id = 'kopi-kita');

create policy "Admins can delete kopi-kita assets"
on storage.objects for delete to authenticated
using (bucket_id = 'kopi-kita');
