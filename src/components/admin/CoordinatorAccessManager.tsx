"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { CoordinatorAccount } from "@/lib/data";

export function CoordinatorAccessManager({ initialAccounts }: { initialAccounts: CoordinatorAccount[] }) {
  const router = useRouter();
  const [accounts, setAccounts] = useState(initialAccounts);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function createAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusyId("new");
    setError(null);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/coordenadores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          password: data.get("password"),
          active: data.get("active") === "on",
        }),
      });
      const result = await response.json().catch(() => null) as { account?: CoordinatorAccount; error?: string } | null;
      if (!response.ok || !result?.account) throw new Error(result?.error || "Não foi possível criar o acesso.");
      setAccounts((current) => [...current, result.account!].sort((a, b) => a.name.localeCompare(b.name)));
      form.reset();
      setMessage("A conta do Coordenador foi criada.");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível criar o acesso.");
    } finally {
      setBusyId(null);
    }
  }

  async function updateAccount(account: CoordinatorAccount, form: HTMLFormElement) {
    const data = new FormData(form);
    setBusyId(account.id);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/coordenadores/${encodeURIComponent(account.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          password: data.get("password") || undefined,
          active: data.get("active") === "on",
        }),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(result?.error || "Não foi possível salvar as alterações.");
      setAccounts((current) => current.map((item) => item.id === account.id ? {
        ...item,
        name: String(data.get("name") || item.name),
        email: String(data.get("email") || item.email),
        active: data.get("active") === "on",
      } : item));
      setMessage("A conta foi atualizada.");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível salvar as alterações.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={createAccount} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h3 className="font-semibold text-[var(--foreground)]">Criar acesso</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Nome"><input className="input" name="name" required /></Field>
          <Field label="E-mail"><input className="input" name="email" type="email" required autoComplete="email" /></Field>
          <Field label="Senha inicial"><input className="input" name="password" type="password" required minLength={12} autoComplete="new-password" /></Field>
          <label className="flex min-h-11 items-center gap-2 self-end text-sm text-[var(--foreground)]"><input type="checkbox" name="active" defaultChecked className="h-4 w-4 accent-[var(--brand)]" /> Conta ativa</label>
        </div>
        <button type="submit" disabled={busyId === "new"} className="mt-5 min-h-11 rounded-lg bg-[var(--brand)] px-5 text-sm font-semibold text-white disabled:opacity-60">{busyId === "new" ? "Criando…" : "Criar Coordenador"}</button>
      </form>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <h3 className="font-semibold text-[var(--foreground)]">Contas existentes</h3>
        {accounts.length ? <div className="mt-4 space-y-4">{accounts.map((account) => (
          <form key={account.id} onSubmit={(event) => { event.preventDefault(); void updateAccount(account, event.currentTarget); }} className="grid gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
            <Field label="Nome"><input className="input" name="name" required defaultValue={account.name} /></Field>
            <Field label="E-mail"><input className="input" name="email" type="email" required defaultValue={account.email} /></Field>
            <Field label="Nova senha (opcional)"><input className="input" name="password" type="password" minLength={12} autoComplete="new-password" /></Field>
            <div className="flex items-center gap-3">
              <label className="flex min-h-11 items-center gap-2 text-sm text-[var(--foreground)]"><input type="checkbox" name="active" defaultChecked={account.active} className="h-4 w-4 accent-[var(--brand)]" /> Ativa</label>
              <button type="submit" disabled={busyId === account.id} className="min-h-11 rounded-lg border border-[var(--border-strong)] px-4 text-sm font-semibold text-[var(--brand-dark)] disabled:opacity-60">Salvar</button>
            </div>
          </form>
        ))}</div> : <p className="mt-3 text-sm text-[var(--muted)]">Nenhuma conta de Coordenador cadastrada.</p>}
      </section>
      {error ? <p role="alert" className="text-sm text-[var(--status-critical)]">{error}</p> : null}
      {message ? <p role="status" className="text-sm text-[var(--status-good)]">{message}</p> : null}
      <style jsx>{`.input{width:100%;min-height:2.75rem;border:1px solid var(--border);border-radius:.6rem;background:white;padding:.6rem .75rem;font-size:.875rem;color:var(--foreground)}.input:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px var(--brand-light)}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-1.5 text-xs font-medium text-[var(--muted)]">{label}{children}</label>;
}
