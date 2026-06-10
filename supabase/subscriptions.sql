create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  plan text not null default 'FREE',
  status text not null default 'active',
  current_period_start timestamptz not null default now(),
  current_period_end timestamptz,
  canceled_at timestamptz,
  stripe_subscription_id text,
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;

create trigger subscriptions_set_updated_at
before update on public.subscriptions
for each row
execute function public.set_updated_at();

create or replace function public.create_free_subscription()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.subscriptions (user_id, plan, status)
  values (new.id, 'FREE', 'active')
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_subscription on auth.users;

create trigger on_auth_user_created_subscription
after insert on auth.users
for each row
execute function public.create_free_subscription();

alter table public.subscriptions enable row level security;

create policy "Subscriptions are viewable by owner"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Subscriptions are insertable by owner"
  on public.subscriptions for insert
  with check (auth.uid() = user_id);

create policy "Subscriptions are updatable by owner"
  on public.subscriptions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
