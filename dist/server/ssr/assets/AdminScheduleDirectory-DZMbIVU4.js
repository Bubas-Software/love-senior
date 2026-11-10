import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import Link from "./link-CgGlv3b-.js";
//#region src/components/schedules/AdminScheduleDirectory.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var STATUS_LABELS = {
	ativo: "Ativo",
	pendente: "Pendente",
	inativo: "Inativo"
};
var STATUS_STYLES = {
	ativo: "bg-[var(--accent-light)] text-[var(--accent-dark)]",
	pendente: "bg-[var(--status-warning-bg)] text-[var(--status-warning)]",
	inativo: "bg-gray-100 text-gray-600"
};
function AdminScheduleDirectory({ patients }) {
	const searchId = (0, import_react.useId)();
	const statusId = (0, import_react.useId)();
	const carePlanId = (0, import_react.useId)();
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("todos");
	const [carePlan, setCarePlan] = (0, import_react.useState)("todos");
	const carePlans = (0, import_react.useMemo)(() => [...new Set(patients.map((patient) => patient.careLevel?.trim()).filter((plan) => Boolean(plan)))].sort((a, b) => a.localeCompare(b, "pt-BR")), [patients]);
	const filteredPatients = (0, import_react.useMemo)(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
		return patients.filter((patient) => {
			const matchesQuery = !normalizedQuery || `${patient.name} ${patient.familyName || ""}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery);
			const matchesStatus = status === "todos" || patient.status === status;
			const matchesCarePlan = carePlan === "todos" || patient.careLevel === carePlan;
			return matchesQuery && matchesStatus && matchesCarePlan;
		});
	}, [
		carePlan,
		patients,
		query,
		status
	]);
	function clearFilters() {
		setQuery("");
		setStatus("todos");
		setCarePlan("todos");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Pesquisar pacientes para consultar escalas",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(10rem,0.55fr)_minmax(12rem,0.7fr)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2 lg:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: searchId,
							className: "mb-1.5 block text-sm font-medium text-[var(--foreground)]",
							children: "Pesquisar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: searchId,
							type: "search",
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Paciente ou familiar responsável",
							className: "min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-2)]"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: statusId,
						className: "mb-1.5 block text-sm font-medium text-[var(--foreground)]",
						children: "Status do paciente"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: statusId,
						value: status,
						onChange: (event) => setStatus(event.target.value),
						className: "min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 text-sm text-[var(--foreground)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "todos",
								children: "Todos os status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ativo",
								children: "Ativo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "pendente",
								children: "Pendente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "inativo",
								children: "Inativo"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: carePlanId,
						className: "mb-1.5 block text-sm font-medium text-[var(--foreground)]",
						children: "Plano de cuidado"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: carePlanId,
						value: carePlan,
						onChange: (event) => setCarePlan(event.target.value),
						className: "min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 text-sm text-[var(--foreground)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "todos",
							children: "Todos os planos"
						}), carePlans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: plan,
							children: plan
						}, plan))]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-[var(--muted)]",
					role: "status",
					"aria-live": "polite",
					children: [
						filteredPatients.length,
						" ",
						filteredPatients.length === 1 ? "paciente encontrado" : "pacientes encontrados"
					]
				}), (query || status !== "todos" || carePlan !== "todos") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: clearFilters,
					className: "min-h-10 rounded-lg px-3 text-sm font-medium text-[var(--brand)] underline underline-offset-2 hover:text-[var(--brand-dark)]",
					children: "Limpar filtros"
				})]
			}),
			patients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]",
				children: "Não há pacientes cadastrados para organizar escalas."
			}) : filteredPatients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]",
				children: "Nenhum paciente corresponde à pesquisa e aos filtros atuais. Ajuste os filtros para ver outros pacientes."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: filteredPatients.map((patient) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					href: `/admin/escalas/${encodeURIComponent(patient.id)}`,
					className: "group flex min-h-[5.5rem] flex-col justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--accent)] hover:bg-[var(--brand-light)] sm:flex-row sm:items-center sm:px-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block break-words text-base font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-dark)]",
							children: patient.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-0.5 block break-words text-sm text-[var(--muted-2)]",
							children: ["Familiar responsável: ", patient.familyName || "Não vinculado"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex flex-wrap items-center gap-2 sm:justify-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-w-full truncate rounded-full bg-[var(--surface-soft)] px-3 py-1 text-xs font-medium text-[var(--muted)]",
								children: patient.careLevel || "Plano não informado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[patient.status]}`,
								children: STATUS_LABELS[patient.status]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto text-lg text-[var(--brand)] sm:ml-1",
								"aria-hidden": "true",
								children: "→"
							})
						]
					})]
				}) }, patient.id))
			})
		]
	});
}
//#endregion
export { AdminScheduleDirectory };
