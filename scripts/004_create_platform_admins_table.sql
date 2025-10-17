-- Create platform_admins table for SaaS platform owners
create table if not exists public.platform_admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.platform_admins enable row level security;

-- Policies: Only platform admins can see this table
create policy "platform_admins_select_own"
  on public.platform_admins for select
  using (auth.uid() = user_id);
