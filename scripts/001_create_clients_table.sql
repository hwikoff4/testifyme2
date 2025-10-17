-- Create clients table for multi-tenant SaaS
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  subdomain text unique,
  logo_url text,
  brand_color text default '#3b82f6',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.clients enable row level security;

-- Policies: Users can only see their own client data
create policy "clients_select_own"
  on public.clients for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.user_id = auth.uid()
      and profiles.client_id = clients.id
    )
  );

create policy "clients_update_own"
  on public.clients for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.user_id = auth.uid()
      and profiles.client_id = clients.id
      and profiles.role = 'admin'
    )
  );
