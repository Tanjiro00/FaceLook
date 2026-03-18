-- ============================================================
-- FaceLook — Atomic generation consumption
-- Replaces separate check + increment with a single atomic call
-- ============================================================

-- Atomically try to consume one generation slot.
-- Returns the updated profile row if successful, empty if limit reached.
create or replace function public.try_consume_generation(p_user_id uuid)
returns table (
  generations_used integer,
  generations_limit integer,
  subscription_tier text
)
language plpgsql
security definer
as $$
begin
  return query
  update public.profiles
  set generations_used = profiles.generations_used + 1,
      updated_at = now()
  where id = p_user_id
    and profiles.generations_used < profiles.generations_limit
  returning
    profiles.generations_used,
    profiles.generations_limit,
    profiles.subscription_tier;
end;
$$;

-- Rollback a consumed generation (e.g., on pipeline failure).
create or replace function public.rollback_generation(p_user_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.profiles
  set generations_used = greatest(generations_used - 1, 0),
      updated_at = now()
  where id = p_user_id;
end;
$$;
