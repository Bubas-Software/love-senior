import { FinanceDashboard } from "@/components/admin/FinanceDashboard";
import { requirePageRole } from "@/lib/page-guard";

function currentFinanceMonth(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((entry) => entry.type === type)?.value || "";
  return part("year") + "-" + part("month");
}

export default async function AdminFinancePage() {
  await requirePageRole("admin");
  return <FinanceDashboard initialMonth={currentFinanceMonth()} />;
}
