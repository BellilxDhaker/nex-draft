create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  context text not null default '',
  domain text not null default '',
  target_users text not null default '',
  goals text not null default '',
  constraints text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists projects_created_at_idx on public.projects(created_at desc);

alter table public.projects enable row level security;

create policy "Projects are viewable by owner"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Projects are insertable by owner"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Projects are updatable by owner"
  on public.projects for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Projects are deletable by owner"
  on public.projects for delete
  using (auth.uid() = user_id);
