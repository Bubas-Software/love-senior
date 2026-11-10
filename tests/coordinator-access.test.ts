import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { roleHomePath } from "../src/lib/auth";
import { canAccessAdminPath, canCoordinatorAccessAdminPath } from "../src/lib/route-access";
import { mapSupabaseRole } from "../src/lib/supabase/roles";
import { parseScheduleMutation } from "../src/lib/schedule-admin";

const validSchedule = {
  patient_id: "136ad1f7-1ed5-4507-8444-df8a190f8390",
  caregiver_user_id: "136ad1f7-1ed5-4507-8444-df8a190f8391",
  scheduled_date: "2026-11-10",
  start_time: "08:00",
  end_time: "20:00",
  ends_next_day: false,
};

describe("acesso do Coordenador operacional", () => {
  it("mapeia o papel e direciona a sessão ao painel administrativo", () => {
    expect(mapSupabaseRole("coordenador_operacional")).toBe("coordenador_operacional");
    expect(roleHomePath("coordenador_operacional")).toBe("/admin");
  });

  it("permite somente as áreas operacionais explicitamente autorizadas", () => {
    for (const path of [
      "/admin",
      "/admin/leads",
      "/admin/profissionais/123",
      "/admin/pacientes/123",
      "/admin/familias/123",
      "/admin/cuidadores/perfil/123",
      "/admin/escalas/123",
    ]) {
      expect(canCoordinatorAccessAdminPath(path), path).toBe(true);
    }
    for (const path of [
      "/admin/finance",
      "/admin/precificacao",
      "/admin/projecoes",
      "/admin/coordenadores",
      "/admin/coordenadores/123",
      "/admin/cuidadores/conta/123",
      "/administ/admin",
    ]) {
      expect(canCoordinatorAccessAdminPath(path), path).toBe(false);
    }
    expect(canAccessAdminPath("admin", "/admin/finance")).toBe(true);
    expect(canAccessAdminPath("coordenador_operacional", "/admin/finance")).toBe(false);
    expect(canAccessAdminPath("familia", "/admin/pacientes")).toBe(false);
    expect(canAccessAdminPath("cuidador", "/admin/escalas")).toBe(false);
  });

  it("rejeita override financeiro por Coordenador mesmo quando o valor é nulo", () => {
    const result = parseScheduleMutation(
      { ...validSchedule, payroll_amount_cents_override: null },
      { allowPayrollOverride: false },
    );
    expect(result.error).toMatch(/Somente o Admin/);
  });

  it("preserva override financeiro para o fluxo Admin e omite quando não enviado", () => {
    expect(parseScheduleMutation(validSchedule, { allowPayrollOverride: false }).data)
      .not.toHaveProperty("payroll_amount_cents_override");
    expect(parseScheduleMutation(
      { ...validSchedule, payroll_amount_cents_override: 12500 },
      { allowPayrollOverride: true },
    ).data?.payroll_amount_cents_override).toBe(12500);
  });
});

describe("migration do Coordenador operacional", () => {
  const migration = readFileSync(
    join(process.cwd(), "supabase/migrations/20261109161931_coordinator_operational_access.sql"),
    "utf8",
  );

  it("substitui a policy consolidada de perfil e protege role/status no auto-update", () => {
    expect(migration).toContain("drop policy if exists profiles_update_admin_or_self on public.profiles");
    expect(migration).toMatch(/create policy profiles_update_admin[\s\S]*?with check \(\(select private\.is_admin\(\)\)\)/);
    expect(migration).toMatch(/create policy profiles_update_self[\s\S]*?role = \(select private\.current_role\(\)\)[\s\S]*?active = true/);
  });

  it("separa leitura operacional de valores financeiros e mantém RPCs apenas Admin", () => {
    const familyRateGrant = migration.match(/grant select \(([\s\S]*?)\)\s+on table public\.family_patient_service_rates to authenticated/);
    const scheduleGrant = migration.match(/grant select \(([\s\S]*?)\)\s+on table public\.caregiver_schedule_entries to authenticated/);
    expect(familyRateGrant?.[1]).toContain("valid_from");
    expect(familyRateGrant?.[1]).not.toMatch(/\bamount_cents\b/);
    expect(scheduleGrant?.[1]).toContain("ends_next_day");
    expect(scheduleGrant?.[1]).not.toMatch(/payroll_|amount_cents/);
    expect(migration).toContain("revoke all on table public.caregiver_schedule_entries from public, anon, authenticated");
    expect(migration).toContain("revoke all on table public.family_patient_service_rates from public, anon, authenticated");
    expect(migration).toMatch(/admin_list_schedule_payroll[\s\S]*?private\.is_admin\(\)/);
    expect(migration).toMatch(/admin_list_family_patient_service_rates[\s\S]*?private\.is_admin\(\)/);
    expect(migration).toContain("revoke all on function private.sync_caregiver_schedule_payroll(uuid) from public, anon, authenticated, service_role");
  });

  it("inclui o Coordenador nos objetos clínicos autorizados do Storage mantendo buckets privados", () => {
    expect(migration).toContain("create policy record_photos_select_authorized");
    expect(migration).toContain("private.is_coordinator_operational()");
    expect(migration).toContain("create policy contracts_select_authorized");
    expect(migration).toContain("from public.contract_documents as cd where cd.storage_key = name");
    expect(migration).not.toMatch(/update storage\.buckets[\s\S]*?public = true/i);
  });

  it("mantém endpoints de contas e tarifas exclusivos do Admin", () => {
    const adminAccountsApi = readFileSync(join(process.cwd(), "src/app/api/admin/coordenadores/route.ts"), "utf8");
    const coordinatorPatchApi = readFileSync(join(process.cwd(), "src/app/api/admin/coordenadores/[id]/route.ts"), "utf8");
    const caregiverAccountsApi = readFileSync(join(process.cwd(), "src/app/api/admin/caregiver-users/[id]/route.ts"), "utf8");
    const familyRatesApi = readFileSync(join(process.cwd(), "src/app/api/admin/families/[id]/service-rates/route.ts"), "utf8");

    expect(adminAccountsApi.match(/requireRole\("admin"\)/g)).toHaveLength(2);
    expect(coordinatorPatchApi).toContain('requireRole("admin")');
    expect(coordinatorPatchApi).toContain('new Set(["name", "email", "password", "active"])');
    expect(caregiverAccountsApi).toContain('requireRole("admin")');
    expect(familyRatesApi.match(/requireRole\("admin"\)/g)).toHaveLength(2);
  });

  it("não inclui valores da escala em payloads de Coordenador e mantém remoção clínica somente Admin", () => {
    const schedulesApi = readFileSync(join(process.cwd(), "src/app/api/schedules/route.ts"), "utf8");
    const patientPage = readFileSync(join(process.cwd(), "src/app/admin/pacientes/[id]/page.tsx"), "utf8");

    expect(schedulesApi).toContain('delete safeEntry.payroll_rate_status');
    expect(schedulesApi).toContain('delete safeEntry.payroll_amount_cents_override');
    expect(patientPage).toContain('session.role === "admin" ? `/api/admin/patients/${patient.id}/records/${r.id}` : undefined');
  });
});
