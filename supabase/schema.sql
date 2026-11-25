-- =========================================================
-- Portfólio Vitor Hugo Correia — estrutura do Supabase
-- Cole tudo no SQL Editor do Supabase e clique em Run.
-- Antes, troque o e-mail abaixo se o seu login do admin for outro.
-- =========================================================

-- E-mail que pode editar o site
create or replace function public.is_owner() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'one.vitorhc@gmail.com'
$$;

-- Configurações gerais (perfil, selo, CV, stack)
create table if not exists public.settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Listas editáveis
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  enabled boolean not null default true,
  sort integer not null default 0,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.bi_projects (like public.certificates including all);
create table if not exists public.sql_challenges (like public.certificates including all);

-- Segurança (RLS)
alter table public.settings       enable row level security;
alter table public.certificates   enable row level security;
alter table public.bi_projects    enable row level security;
alter table public.sql_challenges enable row level security;

-- Leitura pública
drop policy if exists "settings read" on public.settings;
create policy "settings read" on public.settings for select using (true);

drop policy if exists "certificates read" on public.certificates;
create policy "certificates read" on public.certificates for select using (enabled or public.is_owner());
drop policy if exists "bi read" on public.bi_projects;
create policy "bi read" on public.bi_projects for select using (enabled or public.is_owner());
drop policy if exists "sql read" on public.sql_challenges;
create policy "sql read" on public.sql_challenges for select using (enabled or public.is_owner());

-- Escrita só pelo dono
drop policy if exists "settings write" on public.settings;
create policy "settings write" on public.settings for all using (public.is_owner()) with check (public.is_owner());
drop policy if exists "certificates write" on public.certificates;
create policy "certificates write" on public.certificates for all using (public.is_owner()) with check (public.is_owner());
drop policy if exists "bi write" on public.bi_projects;
create policy "bi write" on public.bi_projects for all using (public.is_owner()) with check (public.is_owner());
drop policy if exists "sql write" on public.sql_challenges;
create policy "sql write" on public.sql_challenges for all using (public.is_owner()) with check (public.is_owner());

-- Armazenamento de arquivos (CV, imagens, .pbix)
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

drop policy if exists "portfolio read" on storage.objects;
create policy "portfolio read" on storage.objects for select using (bucket_id = 'portfolio');
drop policy if exists "portfolio insert" on storage.objects;
create policy "portfolio insert" on storage.objects for insert with check (bucket_id = 'portfolio' and public.is_owner());
drop policy if exists "portfolio update" on storage.objects;
create policy "portfolio update" on storage.objects for update using (bucket_id = 'portfolio' and public.is_owner());
drop policy if exists "portfolio delete" on storage.objects;
create policy "portfolio delete" on storage.objects for delete using (bucket_id = 'portfolio' and public.is_owner());
