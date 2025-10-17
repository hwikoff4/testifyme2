-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Add triggers for updated_at
create trigger clients_updated_at
  before update on public.clients
  for each row
  execute function public.handle_updated_at();

create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger reviews_updated_at
  before update on public.reviews
  for each row
  execute function public.handle_updated_at();
