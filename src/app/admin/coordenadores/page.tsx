import { CoordinatorAccessManager } from "@/components/admin/CoordinatorAccessManager";
import { listCoordinatorAccounts } from "@/lib/data";
import { requirePageRole } from "@/lib/page-guard";

export default async function CoordinatorsPage() {
  await requirePageRole("admin");
  const accounts = await listCoordinatorAccounts();
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="eyebrow">Acessos administrativos</p>
        <h2 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">Coordenadores operacionais</h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">Crie e administre contas com acesso à operação e aos dados clínicos autorizados.</p>
      </header>
      <CoordinatorAccessManager initialAccounts={accounts} />
    </div>
  );
}
