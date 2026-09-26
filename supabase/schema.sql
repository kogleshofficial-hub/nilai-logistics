create extension if not exists pgcrypto;
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  whatsapp text not null,
  route text not null,
  cargo_type text not null,
  quantity numeric not null,
  quantity_unit text not null,
  source text not null default 'instant-quote',
  metadata jsonb not null default '{}'::jsonb
);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;
grant insert on public.leads to service_role;