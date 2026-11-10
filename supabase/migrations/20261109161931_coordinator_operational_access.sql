begin;

-- The installed public.profiles table is this application's role source.
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check
  check (role in ('admin', 'coordenador_operacional', 'familia', 'cuidador'));

create or replace function private.is_coordinator_operational()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog
as $$
  select coalesce(private.current_active(), false)
    and private.current_role() = 'coordenador_operacional'
$$;

revoke all on function private.is_coordinator_operational() from public, anon;
grant execute on function private.is_coordinator_operational() to authenticated;

-- Self-service profile edits cannot change a role or reactivate/deactivate an account.
drop policy if exists profiles_select_self_or_admin on public.profiles;
create policy profiles_select_self_or_admin
on public.profiles for select to authenticated
using (id = (select auth.uid()) or (select private.is_admin()));

drop policy if exists profiles_update_admin_or_self on public.profiles;
drop policy if exists profiles_update_admin on public.profiles;
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_admin
on public.profiles for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy profiles_update_self
on public.profiles for update to authenticated
using (id = (select auth.uid()) and (select private.current_active()))
with check (
  id = (select auth.uid())
  and (select private.current_active())
  and role = (select private.current_role())
  and active = true
);

-- Operational work areas. Finance tables retain their existing Admin-only RLS.
drop policy if exists leads_admin_all on public.leads;
create policy leads_admin_or_coordinator_all
on public.leads for all to authenticated
using ((select private.is_admin()) or (select private.is_coordinator_operational()))
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));

drop policy if exists professional_applications_admin_all on public.professional_applications;
create policy professional_applications_admin_or_coordinator_all
on public.professional_applications for all to authenticated
using ((select private.is_admin()) or (select private.is_coordinator_operational()))
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));

drop policy if exists caregiver_profiles_select_admin_or_self on public.caregiver_profiles;
drop policy if exists caregiver_profiles_insert_admin on public.caregiver_profiles;
drop policy if exists caregiver_profiles_update_admin on public.caregiver_profiles;
drop policy if exists caregiver_profiles_delete_admin on public.caregiver_profiles;
create policy caregiver_profiles_select_admin_coordinator_or_self
on public.caregiver_profiles for select to authenticated
using (
  (select private.is_admin())
  or (select private.is_coordinator_operational())
  or (
    user_id = (select auth.uid())
    and (select private.current_active())
    and (select private.current_role()) = 'cuidador'
  )
);
create policy caregiver_profiles_insert_admin_or_coordinator
on public.caregiver_profiles for insert to authenticated
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));
create policy caregiver_profiles_update_admin_or_coordinator
on public.caregiver_profiles for update to authenticated
using ((select private.is_admin()) or (select private.is_coordinator_operational()))
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));
create policy caregiver_profiles_delete_admin
on public.caregiver_profiles for delete to authenticated
using ((select private.is_admin()));

drop policy if exists patients_select_authorized on public.patients;
drop policy if exists patients_insert_admin on public.patients;
drop policy if exists patients_update_admin on public.patients;
drop policy if exists patients_delete_admin on public.patients;
create policy patients_select_authorized
on public.patients for select to authenticated
using (
  (select private.is_admin())
  or (select private.is_coordinator_operational())
  or (select private.is_patient_family(id))
  or (select private.is_active_caregiver(id))
);
create policy patients_insert_admin_or_coordinator
on public.patients for insert to authenticated
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));
create policy patients_update_admin_or_coordinator
on public.patients for update to authenticated
using ((select private.is_admin()) or (select private.is_coordinator_operational()))
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));
create policy patients_delete_admin
on public.patients for delete to authenticated
using ((select private.is_admin()));

drop policy if exists assignments_select_authorized on public.caregiver_assignments;
drop policy if exists assignments_insert_admin on public.caregiver_assignments;
drop policy if exists assignments_update_admin on public.caregiver_assignments;
drop policy if exists assignments_delete_admin on public.caregiver_assignments;
create policy assignments_select_authorized
on public.caregiver_assignments for select to authenticated
using (
  (select private.is_admin())
  or (select private.is_coordinator_operational())
  or (
    caregiver_user_id = (select auth.uid())
    and (select private.current_active())
    and (select private.current_role()) = 'cuidador'
  )
  or (select private.is_patient_family(patient_id))
);
create policy assignments_insert_admin_or_coordinator
on public.caregiver_assignments for insert to authenticated
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));
create policy assignments_update_admin_or_coordinator
on public.caregiver_assignments for update to authenticated
using ((select private.is_admin()) or (select private.is_coordinator_operational()))
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));
create policy assignments_delete_admin_or_coordinator
on public.caregiver_assignments for delete to authenticated
using ((select private.is_admin()) or (select private.is_coordinator_operational()));

drop policy if exists daily_records_select_authorized on public.daily_records;
drop policy if exists daily_records_insert_authorized on public.daily_records;
drop policy if exists daily_records_update_authorized on public.daily_records;
create policy daily_records_select_authorized
on public.daily_records for select to authenticated
using (
  (select private.is_admin())
  or (select private.is_coordinator_operational())
  or (select private.is_patient_family(patient_id))
  or (caregiver_user_id = (select auth.uid()) and (select private.is_active_caregiver(patient_id)))
);
create policy daily_records_insert_authorized
on public.daily_records for insert to authenticated
with check (
  (select private.is_admin())
  or (select private.is_coordinator_operational())
  or (caregiver_user_id = (select auth.uid()) and (select private.is_active_caregiver(patient_id)))
);
create policy daily_records_update_authorized
on public.daily_records for update to authenticated
using (
  (select private.is_admin())
  or (select private.is_coordinator_operational())
  or (caregiver_user_id = (select auth.uid()) and (select private.is_active_caregiver(patient_id)))
)
with check (
  (select private.is_admin())
  or (select private.is_coordinator_operational())
  or (caregiver_user_id = (select auth.uid()) and (select private.is_active_caregiver(patient_id)))
);

drop policy if exists daily_record_audit_select_authorized on public.daily_record_audit_events;
create policy daily_record_audit_select_authorized
on public.daily_record_audit_events for select to authenticated
using (
  (select private.is_admin())
  or (select private.is_coordinator_operational())
  or (select private.is_patient_family(patient_id))
  or (select private.is_active_caregiver(patient_id))
);

drop policy if exists contract_documents_select_authorized on public.contract_documents;
drop policy if exists contract_documents_insert_admin on public.contract_documents;
drop policy if exists contract_documents_update_admin on public.contract_documents;
drop policy if exists contract_documents_delete_admin on public.contract_documents;
create policy contract_documents_select_authorized
on public.contract_documents for select to authenticated
using (
  (select private.is_admin())
  or (select private.is_coordinator_operational())
  or (family_user_id = (select auth.uid()) and (select private.current_role()) = 'familia' and (select private.current_active()))
  or (caregiver_user_id = (select auth.uid()) and (select private.current_role()) = 'cuidador' and (select private.current_active()))
  or (
    caregiver_profile_id is not null
    and (select private.current_role()) = 'cuidador'
    and (select private.current_active())
    and exists (
      select 1 from public.caregiver_profiles as cp
      where cp.id = contract_documents.caregiver_profile_id
        and cp.user_id = (select auth.uid())
    )
  )
);
create policy contract_documents_insert_admin_or_coordinator
on public.contract_documents for insert to authenticated
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));
create policy contract_documents_update_admin_or_coordinator
on public.contract_documents for update to authenticated
using ((select private.is_admin()) or (select private.is_coordinator_operational()))
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));
create policy contract_documents_delete_admin_or_coordinator
on public.contract_documents for delete to authenticated
using ((select private.is_admin()) or (select private.is_coordinator_operational()));

-- The coordinator can read service types and contract dates, but cannot select tariffs.
drop policy if exists family_patient_service_rates_admin_all on public.family_patient_service_rates;
create policy family_patient_service_rates_select_admin_or_coordinator
on public.family_patient_service_rates for select to authenticated
using ((select private.is_admin()) or (select private.is_coordinator_operational()));
create policy family_patient_service_rates_write_admin
on public.family_patient_service_rates for all to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

revoke all on table public.family_patient_service_rates from public, anon, authenticated;
grant select (id, family_user_id, patient_id, profession, valid_from, valid_to, created_at, updated_at)
  on table public.family_patient_service_rates to authenticated;

-- Table grants would override column restrictions, so authenticated clients receive
-- only operational schedule columns. Financial fields stay behind Admin RPCs.
revoke all on table public.caregiver_schedule_entries from public, anon, authenticated;
grant select (
  id, caregiver_assignment_id, scheduled_date, start_time, end_time, ends_next_day,
  profession, created_by, updated_by, created_at, updated_at
) on table public.caregiver_schedule_entries to authenticated;
grant insert (
  id, caregiver_assignment_id, scheduled_date, start_time, end_time, ends_next_day,
  profession, created_by, updated_by
) on table public.caregiver_schedule_entries to authenticated;
grant update (
  caregiver_assignment_id, scheduled_date, start_time, end_time, ends_next_day,
  profession, updated_by, updated_at
) on table public.caregiver_schedule_entries to authenticated;
grant delete on table public.caregiver_schedule_entries to authenticated;

drop policy if exists caregiver_schedule_entries_select_admin_or_owner on public.caregiver_schedule_entries;
drop policy if exists caregiver_schedule_entries_insert_admin on public.caregiver_schedule_entries;
drop policy if exists caregiver_schedule_entries_update_admin on public.caregiver_schedule_entries;
drop policy if exists caregiver_schedule_entries_delete_admin on public.caregiver_schedule_entries;
create policy caregiver_schedule_entries_select_admin_coordinator_or_owner
on public.caregiver_schedule_entries for select to authenticated
using (
  (select private.is_admin())
  or (select private.is_coordinator_operational())
  or private.can_read_caregiver_schedule(caregiver_assignment_id, scheduled_date)
);
create policy caregiver_schedule_entries_insert_admin_or_coordinator
on public.caregiver_schedule_entries for insert to authenticated
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));
create policy caregiver_schedule_entries_update_admin_or_coordinator
on public.caregiver_schedule_entries for update to authenticated
using ((select private.is_admin()) or (select private.is_coordinator_operational()))
with check ((select private.is_admin()) or (select private.is_coordinator_operational()));
create policy caregiver_schedule_entries_delete_admin_or_coordinator
on public.caregiver_schedule_entries for delete to authenticated
using ((select private.is_admin()) or (select private.is_coordinator_operational()));

-- Payroll synchronization and paid-shift checks must work for operational writes,
-- without granting callers direct execution of the finance-writing helpers.
alter function private.sync_caregiver_schedule_payroll(uuid) security definer;
alter function private.sync_caregiver_schedule_payroll(uuid) set search_path = pg_catalog;
alter function private.sync_caregiver_schedule_payroll_trigger() security definer;
alter function private.sync_caregiver_schedule_payroll_trigger() set search_path = pg_catalog;
alter function private.sync_caregiver_assignment_payroll() security definer;
alter function private.sync_caregiver_assignment_payroll() set search_path = pg_catalog;
alter function private.sync_family_patient_service_rate_payroll() security definer;
alter function private.sync_family_patient_service_rate_payroll() set search_path = pg_catalog;
alter function private.sync_patient_family_payroll() security definer;
alter function private.sync_patient_family_payroll() set search_path = pg_catalog;
alter function private.prevent_paid_caregiver_schedule_change() security definer;
alter function private.prevent_paid_caregiver_schedule_change() set search_path = pg_catalog;
alter function private.prevent_paid_caregiver_assignment_change() security definer;
alter function private.prevent_paid_caregiver_assignment_change() set search_path = pg_catalog;
alter function private.validate_family_patient_service_rate() security definer;
alter function private.validate_family_patient_service_rate() set search_path = pg_catalog;

revoke all on function private.sync_caregiver_schedule_payroll(uuid) from public, anon, authenticated, service_role;
revoke all on function private.sync_caregiver_schedule_payroll_trigger() from public, anon, authenticated, service_role;
revoke all on function private.sync_caregiver_assignment_payroll() from public, anon, authenticated, service_role;
revoke all on function private.sync_family_patient_service_rate_payroll() from public, anon, authenticated, service_role;
revoke all on function private.sync_patient_family_payroll() from public, anon, authenticated, service_role;
revoke all on function private.prevent_paid_caregiver_schedule_change() from public, anon, authenticated, service_role;
revoke all on function private.prevent_paid_caregiver_assignment_change() from public, anon, authenticated, service_role;
revoke all on function private.validate_family_patient_service_rate() from public, anon, authenticated, service_role;

-- Admin-only readers expose only the financial fields needed by existing Admin screens.
create or replace function public.admin_list_family_patient_service_rates(p_family_user_id uuid)
returns table (
  id uuid,
  family_user_id uuid,
  patient_id uuid,
  profession text,
  amount_cents integer,
  valid_from date,
  valid_to date,
  created_at timestamptz,
  updated_at timestamptz
)
language plpgsql
stable
security definer
set search_path = pg_catalog
as $$
begin
  if not coalesce(private.is_admin(), false) then
    raise exception using errcode = '42501', message = 'ADMIN_REQUIRED';
  end if;
  return query
    select rate.id, rate.family_user_id, rate.patient_id, rate.profession,
           rate.amount_cents, rate.valid_from, rate.valid_to, rate.created_at, rate.updated_at
    from public.family_patient_service_rates as rate
    where rate.family_user_id = p_family_user_id
    order by rate.patient_id, rate.profession, rate.valid_from desc;
end;
$$;

create or replace function public.admin_list_schedule_payroll(p_schedule_ids uuid[])
returns table (
  schedule_entry_id uuid,
  payroll_rate_status text,
  payroll_amount_cents_override integer
)
language plpgsql
stable
security definer
set search_path = pg_catalog
as $$
begin
  if not coalesce(private.is_admin(), false) then
    raise exception using errcode = '42501', message = 'ADMIN_REQUIRED';
  end if;
  return query
    select entry.id, entry.payroll_rate_status, entry.payroll_amount_cents_override
    from public.caregiver_schedule_entries as entry
    where entry.id = any(coalesce(p_schedule_ids, array[]::uuid[]));
end;
$$;

create or replace function public.admin_create_caregiver_schedule_entry(
  p_caregiver_assignment_id uuid,
  p_scheduled_date date,
  p_start_time time without time zone,
  p_end_time time without time zone,
  p_ends_next_day boolean,
  p_profession text,
  p_payroll_amount_cents_override integer
)
returns uuid
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  created_schedule_id uuid;
begin
  if not coalesce(private.is_admin(), false) then
    raise exception using errcode = '42501', message = 'ADMIN_REQUIRED';
  end if;
  insert into public.caregiver_schedule_entries (
    caregiver_assignment_id, scheduled_date, start_time, end_time, ends_next_day,
    profession, payroll_amount_cents_override, created_by, updated_by
  ) values (
    p_caregiver_assignment_id, p_scheduled_date, p_start_time, p_end_time, p_ends_next_day,
    p_profession, p_payroll_amount_cents_override, auth.uid(), auth.uid()
  ) returning id into created_schedule_id;
  return created_schedule_id;
end;
$$;

create or replace function public.admin_update_caregiver_schedule_entry(
  p_schedule_entry_id uuid,
  p_caregiver_assignment_id uuid,
  p_scheduled_date date,
  p_start_time time without time zone,
  p_end_time time without time zone,
  p_ends_next_day boolean,
  p_profession text,
  p_payroll_amount_cents_override integer
)
returns void
language plpgsql
security definer
set search_path = pg_catalog
as $$
begin
  if not coalesce(private.is_admin(), false) then
    raise exception using errcode = '42501', message = 'ADMIN_REQUIRED';
  end if;
  update public.caregiver_schedule_entries as entry
  set caregiver_assignment_id = p_caregiver_assignment_id,
      scheduled_date = p_scheduled_date,
      start_time = p_start_time,
      end_time = p_end_time,
      ends_next_day = p_ends_next_day,
      profession = p_profession,
      payroll_amount_cents_override = p_payroll_amount_cents_override,
      updated_by = auth.uid(),
      updated_at = pg_catalog.now()
  where entry.id = p_schedule_entry_id;
  if not found then
    raise exception using errcode = 'P0002', message = 'SCHEDULE_ENTRY_NOT_FOUND';
  end if;
end;
$$;

alter function public.save_family_patient_service_rates(uuid, uuid, date, jsonb) security definer;
alter function public.save_family_patient_service_rates(uuid, uuid, date, jsonb) set search_path = pg_catalog;
revoke all on function public.save_family_patient_service_rates(uuid, uuid, date, jsonb) from public, anon;
grant execute on function public.save_family_patient_service_rates(uuid, uuid, date, jsonb) to authenticated;

revoke all on function public.admin_list_family_patient_service_rates(uuid) from public, anon;
revoke all on function public.admin_list_schedule_payroll(uuid[]) from public, anon;
revoke all on function public.admin_create_caregiver_schedule_entry(uuid, date, time without time zone, time without time zone, boolean, text, integer) from public, anon;
revoke all on function public.admin_update_caregiver_schedule_entry(uuid, uuid, date, time without time zone, time without time zone, boolean, text, integer) from public, anon;
grant execute on function public.admin_list_family_patient_service_rates(uuid) to authenticated;
grant execute on function public.admin_list_schedule_payroll(uuid[]) to authenticated;
grant execute on function public.admin_create_caregiver_schedule_entry(uuid, date, time without time zone, time without time zone, boolean, text, integer) to authenticated;
grant execute on function public.admin_update_caregiver_schedule_entry(uuid, uuid, date, time without time zone, time without time zone, boolean, text, integer) to authenticated;

-- Keep private clinical and contract buckets private; expand only the
-- authenticated operational permission for recognized object paths.
drop policy if exists record_photos_select_authorized on storage.objects;
drop policy if exists record_photos_insert_authorized on storage.objects;
drop policy if exists record_photos_update_authorized on storage.objects;
drop policy if exists record_photos_delete_authorized on storage.objects;

create policy record_photos_select_authorized
on storage.objects for select to authenticated
using (
  bucket_id = 'record-photos'
  and name ~ '^patients/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/records/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.](jpg|jpeg|png|webp)$'
  and (
    (select private.is_admin())
    or (
      (select private.is_coordinator_operational())
      and exists (
        select 1 from public.daily_records as dr
        where dr.id::text = split_part(name, '/', 4)
          and dr.patient_id::text = split_part(name, '/', 2)
      )
    )
    or exists (
      select 1 from public.daily_records as dr
      where dr.id::text = split_part(name, '/', 4)
        and dr.patient_id::text = split_part(name, '/', 2)
        and ((select private.is_patient_family(dr.patient_id)) or (select private.is_active_caregiver(dr.patient_id)))
    )
  )
);

create policy record_photos_insert_authorized
on storage.objects for insert to authenticated
with check (
  bucket_id = 'record-photos'
  and name ~ '^patients/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/records/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.](jpg|jpeg|png|webp)$'
  and (
    (select private.is_admin())
    or (
      (select private.is_coordinator_operational())
      and exists (
        select 1 from public.daily_records as dr
        where dr.id::text = split_part(name, '/', 4)
          and dr.patient_id::text = split_part(name, '/', 2)
      )
    )
    or exists (
      select 1 from public.daily_records as dr
      where dr.id::text = split_part(name, '/', 4)
        and dr.patient_id::text = split_part(name, '/', 2)
        and (select private.is_active_caregiver(dr.patient_id))
    )
  )
);

create policy record_photos_update_authorized
on storage.objects for update to authenticated
using (
  bucket_id = 'record-photos'
  and name ~ '^patients/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/records/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.](jpg|jpeg|png|webp)$'
  and (
    (select private.is_admin())
    or ((select private.is_coordinator_operational()) and exists (
      select 1 from public.daily_records as dr
      where dr.id::text = split_part(name, '/', 4) and dr.patient_id::text = split_part(name, '/', 2)
    ))
    or exists (
      select 1 from public.daily_records as dr
      where dr.id::text = split_part(name, '/', 4)
        and dr.patient_id::text = split_part(name, '/', 2)
        and (select private.is_active_caregiver(dr.patient_id))
    )
  )
)
with check (
  bucket_id = 'record-photos'
  and name ~ '^patients/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/records/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.](jpg|jpeg|png|webp)$'
  and (
    (select private.is_admin())
    or ((select private.is_coordinator_operational()) and exists (
      select 1 from public.daily_records as dr
      where dr.id::text = split_part(name, '/', 4) and dr.patient_id::text = split_part(name, '/', 2)
    ))
    or exists (
      select 1 from public.daily_records as dr
      where dr.id::text = split_part(name, '/', 4)
        and dr.patient_id::text = split_part(name, '/', 2)
        and (select private.is_active_caregiver(dr.patient_id))
    )
  )
);

create policy record_photos_delete_authorized
on storage.objects for delete to authenticated
using (
  bucket_id = 'record-photos'
  and name ~ '^patients/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/records/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.](jpg|jpeg|png|webp)$'
  and (
    (select private.is_admin())
    or ((select private.is_coordinator_operational()) and exists (
      select 1 from public.daily_records as dr
      where dr.id::text = split_part(name, '/', 4) and dr.patient_id::text = split_part(name, '/', 2)
    ))
    or exists (
      select 1 from public.daily_records as dr
      where dr.id::text = split_part(name, '/', 4)
        and dr.patient_id::text = split_part(name, '/', 2)
        and (select private.is_active_caregiver(dr.patient_id))
    )
  )
);

drop policy if exists contracts_select_authorized on storage.objects;
drop policy if exists contracts_insert_admin on storage.objects;
drop policy if exists contracts_update_admin on storage.objects;
drop policy if exists contracts_delete_admin on storage.objects;
create policy contracts_select_authorized
on storage.objects for select to authenticated
using (
  bucket_id = 'contracts'
  and (
    (
      name ~ '^contracts/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.]pdf$'
      and (
        (select private.is_admin())
        or exists (select 1 from public.contract_documents as cd where cd.storage_key = name)
      )
    )
    or (
      name ~ '^contracts/pending/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.]pdf$'
      and (select private.is_admin())
    )
  )
);
create policy contracts_insert_admin_or_coordinator
on storage.objects for insert to authenticated
with check (
  bucket_id = 'contracts'
  and (
    name ~ '^contracts/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.]pdf$'
    or name ~ '^contracts/pending/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.]pdf$'
  )
  and ((select private.is_admin()) or (select private.is_coordinator_operational()))
);
create policy contracts_update_admin_or_coordinator
on storage.objects for update to authenticated
using (
  bucket_id = 'contracts'
  and (
    name ~ '^contracts/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.]pdf$'
    or name ~ '^contracts/pending/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.]pdf$'
  )
  and ((select private.is_admin()) or (select private.is_coordinator_operational()))
)
with check (
  bucket_id = 'contracts'
  and (
    name ~ '^contracts/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.]pdf$'
    or name ~ '^contracts/pending/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.]pdf$'
  )
  and ((select private.is_admin()) or (select private.is_coordinator_operational()))
);
create policy contracts_delete_admin_or_coordinator
on storage.objects for delete to authenticated
using (
  bucket_id = 'contracts'
  and (
    name ~ '^contracts/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.]pdf$'
    or name ~ '^contracts/pending/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}[.]pdf$'
  )
  and ((select private.is_admin()) or (select private.is_coordinator_operational()))
);

commit;
