import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import { t as useRouter } from "./navigation-tipnko1D.js";
import { r as PROFESSION_OPTIONS } from "./caregiver-directory-BZrywd7G.js";
//#region src/components/admin/NewCaregiverForm.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function NewCaregiverForm() {
	const router = useRouter();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSaved(false);
		const data = new FormData(e.currentTarget);
		try {
			const res = await fetch("/api/admin/caregivers", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: data.get("name"),
					email: data.get("email"),
					phone: data.get("phone"),
					password: data.get("password"),
					profession: data.get("profession")
				})
			});
			const json = await res.json().catch(() => ({}));
			if (!res.ok) {
				setError(json.error || "Não foi possível cadastrar.");
				return;
			}
			e.target.reset();
			setSaved(true);
			setOpen(false);
			router.refresh();
		} catch {
			setError("Erro de conexão. O profissional não foi cadastrado. Tente novamente.");
		} finally {
			setLoading(false);
		}
	}
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => {
			setError(null);
			setSaved(false);
			setOpen(true);
		},
		className: "rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brand-dark)]",
		children: "+ Novo profissional"
	}), saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm text-[var(--status-good)]",
		role: "status",
		children: "Profissional cadastrado."
	}) : null] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-semibold text-[var(--foreground)] mb-4",
				children: "Cadastrar profissional"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid sm:grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "manual-professional-name",
						label: "Nome completo *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "manual-professional-name",
							name: "name",
							required: true,
							className: "input"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "manual-professional-phone",
						label: "Telefone",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "manual-professional-phone",
							name: "phone",
							className: "input"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "manual-professional-role",
						label: "Área profissional *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "manual-professional-role",
							name: "profession",
							required: true,
							defaultValue: "cuidador",
							className: "input",
							children: PROFESSION_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: option.value,
								children: option.label
							}, option.value))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "manual-professional-email",
						label: "E-mail de acesso *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "manual-professional-email",
							type: "email",
							name: "email",
							required: true,
							className: "input"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "manual-professional-password",
						label: "Senha provisória *",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "manual-professional-password",
							type: "password",
							name: "password",
							required: true,
							minLength: 12,
							autoComplete: "new-password",
							placeholder: "Crie uma senha provisória segura",
							className: "input"
						})
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-[var(--status-critical)]",
				role: "alert",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: loading,
					className: "rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brand-dark)] disabled:opacity-50",
					children: loading ? "Salvando..." : "Cadastrar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(false),
					className: "rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-black/[0.03]",
					children: "Cancelar"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
				jsx: true,
				children: `
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid var(--border);
          background: white;
          padding: 0.625rem 0.75rem;
          font-size: 0.875rem;
          color: var(--foreground);
        }
      `
			})
		]
	});
}
function Field({ id, label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		htmlFor: id,
		className: "block text-xs font-medium text-[var(--muted)] mb-1",
		children: label
	}), children] });
}
//#endregion
export { NewCaregiverForm };
