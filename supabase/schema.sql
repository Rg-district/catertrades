-- CaterTrades database schema

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  title text,
  make text,
  model text,
  year int,
  price int,
  price_label text,
  location text,
  lat float,
  lng float,
  miles int,
  tags jsonb default '[]',
  featured bool default false,
  listing_tier text default 'standard',
  status text default 'pending',
  description text,
  seller_name text,
  seller_email text,
  seller_phone text,
  images jsonb default '[]',
  created_at timestamptz default now()
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id),
  buyer_name text,
  buyer_email text,
  buyer_phone text,
  message text,
  created_at timestamptz default now()
);
