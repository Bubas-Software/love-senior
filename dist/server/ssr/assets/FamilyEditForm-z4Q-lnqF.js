import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import { t as useRouter } from "./navigation-tipnko1D.js";
//#region src/components/admin/FamilyEditForm.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function FamilyEditForm({ family }) {
	const router = useRouter();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [saved, setSaved] = (0, import_react.useState)(false);
	async function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		setError(null);
		setSaved(false);
		const data = new FormData(event.currentTarget);
		try {
			const response = await fetch(`/api/admin/families/${family.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: data.get("name"),
					phone: data.get("phone")
				})
			});
			const result = await response.json().catch(() => ({}));
			if (!response.ok) {
				setError(result.error || "Não foi possível salvar os dados da família.");
				return;
			}
			setSaved(true);
			setOpen(false);
			router.refresh();
		} catch {
			setError("Erro de conexão. Tente novamente.");
		} finally {
			setLoading(false);
		}
	}
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => {
				setError(null);
				setSaved(false);
				setOpen(true);
			},
			className: "rounded-lg border border-[var(--border-strong)] px-4 py-2 text-sm font-semibold text-[var(--brand-dark)] hover:border-[var(--brand)] hover:bg-[var(--brand-light)]",
			children: "Editar dados"
		}), saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-[var(--status-good)]",
			role: "status",
			children: "Alterações salvas."
		}) : null]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "mt-5 space-y-4 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: `family-name-${family.id}`,
				className: "block text-xs font-medium text-[var(--muted)]",
				children: "Nome da família *"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: `family-name-${family.id}`,
				name: "name",
				required: true,
				defaultValue: family.name,
				className: "input mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: `family-phone-${family.id}`,
				className: "block text-xs font-medium text-[var(--muted)]",
				children: "Telefone"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: `family-phone-${family.id}`,
				name: "phone",
				defaultValue: family.phone || "",
				className: "input mt-1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs leading-5 text-[var(--muted-2)]",
				children: [
					"E-mail de acesso: ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "break-words",
						children: family.email
					}),
					". Para preservar o acesso, o e-mail e a senha não são editados nesta tela."
				]
			}) }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-[var(--status-critical)]",
				role: "alert",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: loading,
					className: "rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-dark)] disabled:opacity-50",
					children: loading ? "Salvando..." : "Salvar alterações"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: loading,
					onClick: () => setOpen(false),
					className: "rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] hover:bg-black/[0.03] disabled:opacity-50",
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
        .input:focus {
          outline: none;
          border-color: var(--brand);
          box-shadow: 0 0 0 3px var(--brand-light);
        }
      `
			})
		]
	});
}
//#endregion
export { FamilyEditForm };
