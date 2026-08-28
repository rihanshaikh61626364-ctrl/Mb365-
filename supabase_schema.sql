-- ==========================================
-- MYBOOKS365 SUPABASE DATABASE SCHEMA
-- ==========================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CATEGORIES TABLE
create table public.categories (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    slug text not null unique,
    description text,
    status text not null default 'active' check (status in ('active', 'inactive')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. BOOKS TABLE
create table public.books (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    slug text not null unique,
    subtitle text,
    author text not null,
    description text,
    category_id uuid references public.categories(id) on delete set null,
    price numeric(10, 2) not null,
    currency text not null default 'INR',
    cover_url text,
    pages integer,
    language text not null default 'Hinglish + English',
    format text not null default 'Digital eBook',
    what_you_learn text[] not null default '{}'::text[],
    chapters text[] not null default '{}'::text[],
    who_this_is_for text,
    key_features text[] not null default '{}'::text[],
    superprofile_url text,
    is_featured boolean not null default false,
    status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.categories enable row level security;
alter table public.books enable row level security;

-- 3. SECURITY POLICIES (ROW LEVEL SECURITY)

-- A. Categories Policies
create policy "Allow public read access to active categories"
on public.categories for select
using (status = 'active');

create policy "Allow admin full access to categories"
on public.categories for all
using (auth.role() = 'service_role' or auth.jwt()->>'role' = 'admin');

-- B. Books Policies
create policy "Allow public read access to published books"
on public.books for select
using (status = 'published');

create policy "Allow admin full access to books"
on public.books for all
using (auth.role() = 'service_role' or auth.jwt()->>'role' = 'admin');


-- 4. CATEGORIES SEED DATA
insert into public.categories (id, name, slug, description, status) values
('b3fa72bb-7622-4467-9c98-15c4d32049d5', 'Business', 'business', 'Understand how businesses actually work.', 'active'),
('e8b0a880-993d-4c3d-86cf-15dcd9302bf5', 'Entrepreneurship', 'entrepreneurship', 'Learn how ideas become real businesses.', 'active'),
('d5a0ab2a-a92c-49f3-8b3d-1cf7d2105cf4', 'Marketing', 'marketing', 'Understand how brands attract and retain customers.', 'active'),
('f9d0c22d-bc4d-4cb3-9d4d-2df9db30cf55', 'Finance', 'finance', 'Build a practical understanding of money and business finance.', 'active'),
('a5c0df3a-3c2d-45db-ad6b-3cf9e3100df5', 'Productivity & AI', 'productivity', 'Work smarter with better systems and modern tools.', 'active'),
('c6d0fb4d-8c1d-44a3-ad6c-4df9db504df5', 'Growth & Strategy', 'growth', 'Learn how businesses grow, compete and scale.', 'active');


-- 5. BOOKS SEED DATA (EXAMPLES WITH SUPERPROFILE PURCHASE URLS)
insert into public.books (
    title, slug, subtitle, author, description, category_id, price, currency, cover_url, pages, language, format, 
    what_you_learn, chapters, who_this_is_for, key_features, superprofile_url, is_featured, status
) values
(
    'Business Basics', 
    'business-basics', 
    'Business Actually Kaise Work Karta Hai', 
    'MyBooks365 Editorial', 
    'A practical beginner-friendly guide to understanding the fundamentals of business.',
    'b3fa72bb-7622-4467-9c98-15c4d32049d5', 
    299.00, 
    'INR', 
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80', 
    145, 
    'Hinglish + English', 
    'Digital eBook',
    array['Business actually kaise work karta hai', 'Customer aur value ka relationship', 'Revenue, costs aur profit', 'Marketing aur sales ka basic framework', 'Business models kaise kaam karte hain', 'Growth aur scalability ko kaise samjhein'],
    array['Chapter 1: Customers and Value', 'Chapter 2: Revenue and Pricing', 'Chapter 3: Distribution and Growth', 'Chapter 4: Scalability and Team'],
    'This book is for anyone who wants to understand business from the ground up—especially students, aspiring entrepreneurs and beginners.',
    array['Easy Hinglish + English explanations', 'Practical real-world case studies', 'Visual diagrams and frameworks', 'Beginner-friendly step-by-step systems'],
    'https://superprofile.bio/mybooks365/business-basics',
    true,
    'published'
),
(
    'Entrepreneurship Basics', 
    'entrepreneurship-basics', 
    'Learn how ideas become real businesses', 
    'MyBooks365 Editorial', 
    'A complete hands-on playbook to take your ideas and turn them into functional, money-making systems.',
    'e8b0a880-993d-4c3d-86cf-15dcd9302bf5', 
    299.00, 
    'INR', 
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80', 
    128, 
    'Hinglish + English', 
    'Digital eBook',
    array['Idea validation without spending money', 'How to build your first MVP (Minimum Viable Product)', 'Finding your first 100 paying customers', 'Failing fast and pivoting with purpose', 'Pitching and organizing your starting team'],
    array['Chapter 1: Getting Started from Zero', 'Chapter 2: Core Frameworks & Workflows', 'Chapter 3: Advanced Methods & Mastery', 'Chapter 4: Case Studies and Actions'],
    'Ideal for aspiring founders, creators, side-hustlers, and builders wanting actionable plans.',
    array['Hands-on interactive checklists', 'Direct delivery setup guides', 'Real-world startup case studies'],
    'https://superprofile.bio/mybooks365/entrepreneurship-basics',
    true,
    'published'
);
