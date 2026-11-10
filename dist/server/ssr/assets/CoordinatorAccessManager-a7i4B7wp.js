import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import { t as useRouter } from "./navigation-tipnko1D.js";
//#region src/components/admin/CoordinatorAccessManager.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function CoordinatorAccessManager({ initialAccounts }) {
	const router = useRouter();
	const [accounts, setAccounts] = (0, import_react.useState)(initialAccounts);
	const [busyId, setBusyId] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [message, setMessage] = (0, import_react.useState)(null);
	async function createAccount(event) {
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
					active: data.get("active") === "on"
				})
			});
			const result = await response.json().catch(() => null);
			if (!response.ok || !result?.account) throw new Error(result?.error || "Não foi possível criar o acesso.");
			setAccounts((current) => [...current, result.account].sort((a, b) => a.name.localeCompare(b.name)));
			form.reset();
			setMessage("A conta do Coordenador foi criada.");
			router.refresh();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Não foi possível criar o acesso.");
		} finally {
			setBusyId(null);
		}
	}
	async function updateAccount(account, form) {
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
					password: data.get("password") || void 0,
					active: data.get("active") === "on"
				})
			});
			const result = await response.json().catch(() => null);
			if (!response.ok) throw new Error(result?.error || "Não foi possível salvar as alterações.");
			setAccounts((current) => current.map((item) => item.id === account.id ? {
				...item,
				name: String(data.get("name") || item.name),
				email: String(data.get("email") || item.email),
				active: data.get("active") === "on"
			} : item));
			setMessage("A conta foi atualizada.");
			router.refresh();
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Não foi possível salvar as alterações.");
		} finally {
			setBusyId(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: createAccount,
				className: "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-[var(--foreground)]",
						children: "Criar acesso"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nome",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "input",
									name: "name",
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "E-mail",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "input",
									name: "email",
									type: "email",
									required: true,
									autoComplete: "email"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Senha inicial",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "input",
									name: "password",
									type: "password",
									required: true,
									minLength: 12,
									autoComplete: "new-password"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-center gap-2 self-end text-sm text-[var(--foreground)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									name: "active",
									defaultChecked: true,
									className: "h-4 w-4 accent-[var(--brand)]"
								}), " Conta ativa"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busyId === "new",
						className: "mt-5 min-h-11 rounded-lg bg-[var(--brand)] px-5 text-sm font-semibold text-white disabled:opacity-60",
						children: busyId === "new" ? "Criando…" : "Criar Coordenador"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-[var(--foreground)]",
					children: "Contas existentes"
				}), accounts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-4",
					children: accounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (event) => {
							event.preventDefault();
							updateAccount(account, event.currentTarget);
						},
						className: "grid gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nome",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "input",
									name: "name",
									required: true,
									defaultValue: account.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "E-mail",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "input",
									name: "email",
									type: "email",
									required: true,
									defaultValue: account.email
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nova senha (opcional)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "input",
									name: "password",
									type: "password",
									minLength: 12,
									autoComplete: "new-password"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex min-h-11 items-center gap-2 text-sm text-[var(--foreground)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										name: "active",
										defaultChecked: account.active,
										className: "h-4 w-4 accent-[var(--brand)]"
									}), " Ativa"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: busyId === account.id,
									className: "min-h-11 rounded-lg border border-[var(--border-strong)] px-4 text-sm font-semibold text-[var(--brand-dark)] disabled:opacity-60",
									children: "Salvar"
								})]
							})
						]
					}, account.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-[var(--muted)]",
					children: "Nenhuma conta de Coordenador cadastrada."
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-sm text-[var(--status-critical)]",
				children: error
			}) : null,
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "text-sm text-[var(--status-good)]",
				children: message
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
				jsx: true,
				children: `.input{width:100%;min-height:2.75rem;border:1px solid var(--border);border-radius:.6rem;background:white;padding:.6rem .75rem;font-size:.875rem;color:var(--foreground)}.input:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px var(--brand-light)}`
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5 text-xs font-medium text-[var(--muted)]",
		children: [label, children]
	});
}
//#endregion
export { CoordinatorAccessManager };
