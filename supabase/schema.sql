-- MyBooks365 Complete All-In-One Database Setup
-- Run this entire script ONCE in the Supabase SQL Editor (SQL Query panel).
-- This script safely drops existing tables (if any), creates the schema, configures RLS, storage, and inserts initial seed data.

-- ========================================================
-- 0. CLEANUP (Ensures a completely clean run without "already exists" errors)
-- ========================================================
drop trigger if exists update_categories_updated_at on public.categories;
drop trigger if exists update_books_updated_at on public.books;
drop trigger if exists update_site_settings_updated_at on public.site_settings;
drop function if exists public.update_updated_at_column();

drop table if exists public.books cascade;
drop table if exists public.admin_users cascade;
drop table if exists public.categories cascade;
drop table if exists public.site_settings cascade;

-- Enable UUID Extension
create extension if not exists "uuid-ossp";

-- ========================================================
-- 1. CREATE TABLES
-- ========================================================

-- Categories Directory
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Admin Users Profile Table (references auth.users created by Supabase Auth)
create table public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz default now()
);

-- Books Catalog Table
create table public.books (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  subtitle text,
  author text,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  price numeric(10,2) not null,
  currency text not null default 'INR',
  cover_url text,
  pages integer,
  language text not null default 'English',
  format text not null default 'PDF & EPUB',
  what_you_learn jsonb default '[]'::jsonb,
  chapters jsonb default '[]'::jsonb,
  who_this_is_for text,
  key_features jsonb default '[]'::jsonb,
  superprofile_url text,
  is_featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Global Site Settings
create table public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  site_name text not null default 'MyBooks365',
  tagline text not null default 'Read. Learn. Grow.',
  description text not null default 'Practical eBooks for people who want to learn, build and grow.',
  logo_url text,
  contact_email text not null default 'contact@mybooks365.com',
  updated_at timestamptz default now()
);

-- ========================================================
-- 2. AUTOMATIC UPDATED_AT TIMESTAMP TRIGGERS
-- ========================================================
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_categories_updated_at
before update on public.categories
for each row execute function public.update_updated_at_column();

create trigger update_books_updated_at
before update on public.books
for each row execute function public.update_updated_at_column();

create trigger update_site_settings_updated_at
before update on public.site_settings
for each row execute function public.update_updated_at_column();

-- ========================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================================
alter table public.categories enable row level security;
alter table public.admin_users enable row level security;
alter table public.books enable row level security;
alter table public.site_settings enable row level security;

-- ========================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- ADMIN_USERS Policies
drop policy if exists "Allow authenticated admins full access to admin list" on public.admin_users;
drop policy if exists "Allow first admin creation when empty" on public.admin_users;
drop policy if exists "Public Read Admin Users" on public.admin_users;
drop policy if exists "Allow authenticated admins to update their own profile" on public.admin_users;
drop policy if exists "Allow authenticated admins to delete their own profile" on public.admin_users;

create policy "Enable read access for all users"
on public.admin_users for select
using (true);

create policy "Enable insert for authenticated users"
on public.admin_users for insert
with check (auth.uid() = id);

create policy "Enable update for users based on id"
on public.admin_users for update
using (auth.uid() = id);

create policy "Enable delete for users based on id"
on public.admin_users for delete
using (auth.uid() = id);

-- CATEGORIES Policies
create policy "Allow public to select active categories"
on public.categories for select
using (status = 'active');

create policy "Allow authenticated admins full access to categories"
on public.categories for all
using (
  auth.role() = 'authenticated' AND
  exists (select 1 from public.admin_users where id = auth.uid())
);

-- BOOKS Policies
create policy "Allow public to select published books"
on public.books for select
using (status = 'published');

create policy "Allow authenticated admins full access to books"
on public.books for all
using (
  auth.role() = 'authenticated' AND
  exists (select 1 from public.admin_users where id = auth.uid())
);

-- SITE_SETTINGS Policies
create policy "Allow public to select site settings"
on public.site_settings for select
using (true);

create policy "Allow authenticated admins full access to site settings"
on public.site_settings for all
using (
  auth.role() = 'authenticated' AND
  exists (select 1 from public.admin_users where id = auth.uid())
);

-- ========================================================
-- 5. STORAGE BUCKET CONFIGURATION & POLICIES
-- ========================================================

-- Ensure the public bucket exists
insert into storage.buckets (id, name, public)
values ('book-covers', 'book-covers', true)
on conflict (id) do nothing;

-- Public Storage Access policy
create policy "Allow Public Storage Access"
on storage.objects for select
using (bucket_id = 'book-covers');

-- Admin Storage Access policies (Upload, Update, Delete)
create policy "Allow Admin Storage Uploads"
on storage.objects for insert
with check (
  bucket_id = 'book-covers' AND
  auth.role() = 'authenticated' AND
  exists (select 1 from public.admin_users where id = auth.uid())
);

create policy "Allow Admin Storage Updates"
on storage.objects for update
using (
  bucket_id = 'book-covers' AND
  auth.role() = 'authenticated' AND
  exists (select 1 from public.admin_users where id = auth.uid())
);

create policy "Allow Admin Storage Deletions"
on storage.objects for delete
using (
  bucket_id = 'book-covers' AND
  auth.role() = 'authenticated' AND
  exists (select 1 from public.admin_users where id = auth.uid())
);

-- ========================================================
-- 6. SEED DATA INSERTS
-- ========================================================

-- Seed Categories with fixed static UUIDs
insert into public.categories (id, name, slug, description, status) values
  ('d3c26027-4638-40a2-b9e7-f1be2a0b1fef', 'Business', 'business', 'Core business models, gross margins, pricing, and scaling principles.', 'active'),
  ('e4d37138-5749-41b3-c0f8-02cf3b1c2f0a', 'Entrepreneurship', 'entrepreneurship', 'Blueprints for launching digital assets, agency management, and cashflow mastery.', 'active'),
  ('f5e48249-685a-42c4-d109-13df4c2d3f1b', 'Marketing', 'marketing', 'Copywriting hacks, content distribution channels, and organic traffic growth.', 'active'),
  ('a1b2c3d4-796b-53d5-e21a-24ef5d3e4f2c', 'Finance', 'finance', 'Personal finance frameworks, investment guidelines, and cash flow models.', 'active'),
  ('b2c3d4e5-8a7c-64e6-f32b-35f06e4f5a3d', 'Productivity & AI', 'productivity-ai', 'Workflows, system automations, and AI tools to save time and speed up results.', 'active'),
  ('c3d4e5f6-9b8d-75f7-a43c-46a17f5f6b4e', 'Growth & Strategy', 'growth-strategy', 'Advanced organic SEO, viral funnels, and customer retention systems.', 'active')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  status = excluded.status;

-- Seed Default Site Settings
insert into public.site_settings (id, site_name, tagline, description, contact_email) values
  ('8b1a37c8-9e12-4f3d-b5b6-791b5c2a1e3f', 'MyBooks365', 'Read. Learn. Grow.', 'Practical eBooks for people who want to learn, build and grow.', 'contact@mybooks365.com')
on conflict (id) do update set
  site_name = excluded.site_name,
  tagline = excluded.tagline,
  description = excluded.description,
  contact_email = excluded.contact_email;
