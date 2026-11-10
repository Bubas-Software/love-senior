import type { Role } from "./auth";

const COORDINATOR_ADMIN_AREAS = [
  "/admin/leads",
  "/admin/profissionais",
  "/admin/pacientes",
  "/admin/familias",
  "/admin/cuidadores",
  "/admin/escalas",
] as const;

export function canCoordinatorAccessAdminPath(pathname: string): boolean {
  if (pathname === "/admin") return true;
  if (pathname === "/admin/coordenadores" || pathname.startsWith("/admin/coordenadores/")) return false;
  if (pathname === "/admin/cuidadores/conta" || pathname.startsWith("/admin/cuidadores/conta/")) return false;
  return COORDINATOR_ADMIN_AREAS.some((base) => pathname === base || pathname.startsWith(`${base}/`));
}

export function canAccessAdminPath(role: Role, pathname: string): boolean {
  return role === "admin" || (role === "coordenador_operacional" && canCoordinatorAccessAdminPath(pathname));
}
