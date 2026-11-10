import { requirePageRole } from "@/lib/page-guard";
import { DashboardShell } from "@/components/DashboardShell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requirePageRole("admin", "coordenador_operacional");
  const isAdmin = session.role === "admin";
  const navItems = [
    { href: "/admin", label: "Visão geral", icon: "📊" },
    { href: "/admin/leads", label: "Contatos recebidos", icon: "📨" },
    { href: "/admin/profissionais", label: "Candidaturas", icon: "📋" },
    { href: "/admin/pacientes", label: "Pacientes", icon: "🧑‍🤝‍🧑" },
    { href: "/admin/familias", label: "Famílias", icon: "👪" },
    { href: "/admin/cuidadores", label: "Cuidadores", icon: "🩺" },
    { href: "/admin/escalas", label: "Escalas", icon: "📅" },
    ...(isAdmin ? [
      { href: "/admin/finance", label: "Financeiro", icon: "💰" },
      { href: "/admin/precificacao", label: "Precificação", icon: "🧮" },
      { href: "/admin/projecoes", label: "Projeções", icon: "📈" },
      { href: "/admin/coordenadores", label: "Coordenadores", icon: "🔐" },
    ] : []),
  ];

  return (
    <DashboardShell
      title="Painel administrativo"
      userName={session?.name || ""}
      roleLabel={isAdmin ? "Administrador" : "Coordenador operacional"}
      navItems={navItems}
    >
      {children}
    </DashboardShell>
  );
}
