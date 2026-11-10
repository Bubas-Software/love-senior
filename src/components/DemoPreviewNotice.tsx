import { runtimeValue } from "@/lib/runtime-config";

export function DemoPreviewNotice() {
  if (runtimeValue("LOVE_SENIOR_SAFE_PREVIEW")?.trim().toLowerCase() !== "true") return null;

  return (
    <div
      className="border-b border-[var(--border-strong)] bg-[var(--brand-light)] px-4 py-2 text-center text-xs font-medium text-[var(--brand-deep)] sm:text-sm"
      role="status"
    >
      Prévia protegida · Área restrita desativada · Sem contas ou registros de teste
    </div>
  );
}
