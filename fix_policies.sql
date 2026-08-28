drop policy if exists "Allow authenticated admins full access to admin list" on public.admin_users;
drop policy if exists "Allow first admin creation when empty" on public.admin_users;
drop policy if exists "Public Read Admin Users" on public.admin_users;
drop policy if exists "Allow authenticated admins to update their own profile" on public.admin_users;
drop policy if exists "Allow authenticated admins to delete their own profile" on public.admin_users;

create policy "Enable read access for all users"
on public.admin_users for select
using (true);

create policy "Enable insert for authenticated users"
on public.admin_users for insert
with check (auth.uid() = id);

create policy "Enable update for users based on id"
on public.admin_users for update
using (auth.uid() = id);

create policy "Enable delete for users based on id"
on public.admin_users for delete
using (auth.uid() = id);
