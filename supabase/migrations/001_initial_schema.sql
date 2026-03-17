-- ============================================================
-- FaceLook — Initial Database Schema
-- Run in Supabase SQL Editor or via CLI
-- ============================================================

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  subscription_tier text not null default 'free'
    check (subscription_tier in ('free', 'basic', 'premium', 'pay_per_use')),
  generations_used integer not null default 0,
  generations_limit integer not null default 3,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Generations table
create table public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles on delete cascade not null,
  procedure_id text not null,
  original_image_url text,
  result_image_url text,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'completed', 'failed')),
  error text,
  processing_time_ms integer,
  created_at timestamptz not null default now()
);

-- Indexes
create index idx_generations_user_id on public.generations (user_id);
create index idx_generations_created_at on public.generations (created_at desc);
create index idx_profiles_stripe_customer_id on public.profiles (stripe_customer_id);
create index idx_profiles_stripe_subscription_id on public.profiles (stripe_subscription_id);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.generations enable row level security;

-- Profiles: users can only read/update their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Generations: users can only access their own generations
create policy "Users can read own generations"
  on public.generations for select
  using (auth.uid() = user_id);

create policy "Users can insert own generations"
  on public.generations for insert
  with check (auth.uid() = user_id);

create policy "Users can update own generations"
  on public.generations for update
  using (auth.uid() = user_id);

-- Function: auto-create profile on sign-up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function: increment generations used (called from API)
create or replace function public.increment_generations_used(user_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.profiles
  set generations_used = generations_used + 1,
      updated_at = now()
  where id = user_id;
end;
$$;

-- Function: reset monthly usage (run via cron)
create or replace function public.reset_monthly_usage()
returns void
language plpgsql
security definer
as $$
begin
  update public.profiles
  set generations_used = 0,
      updated_at = now()
  where subscription_tier != 'free';
end;
$$;
