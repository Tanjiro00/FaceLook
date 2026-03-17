-- ============================================================
-- FaceLook — Waitlist table
-- Run in Supabase SQL Editor
-- ============================================================

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  referral_source text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.waitlist enable row level security;

-- Allow anonymous inserts (anyone can join waitlist)
create policy "Anyone can join waitlist"
  on public.waitlist for insert
  with check (true);

-- Only service role can read/manage
create policy "Service role can read waitlist"
  on public.waitlist for select
  using (auth.role() = 'service_role');

-- Index for quick duplicate check
create index idx_waitlist_email on public.waitlist (email);
