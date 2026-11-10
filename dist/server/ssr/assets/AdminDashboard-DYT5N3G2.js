import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import Link from "./link-CgGlv3b-.js";
import { $ as ResponsiveContainer, a as Legend, n as XAxis, o as CartesianGrid, r as Tooltip, t as YAxis } from "./YAxis-BIE5qNJN.js";
import { t as Bar } from "./Bar-CjLWcLIw.js";
import { t as BarChart } from "./BarChart-BK6TIWJk.js";
import { t as Card } from "./Card-CwAtBYLW.js";
import { t as Pill } from "./Badge-wYrEQwK-.js";
//#region src/app/admin/dashboard-utils.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var DASHBOARD_PERIODS = [
	{
		value: "7d",
		label: "1 semana"
	},
	{
		value: "1m",
		label: "1 mês"
	},
	{
		value: "6m",
		label: "6 meses"
	},
	{
		value: "1y",
		label: "1 ano"
	},
	{
		value: "all",
		label: "Todo histórico"
	}
];
var OPEN_LEAD_STATUSES = ["novo", "em_contato"];
var OPEN_APPLICATION_STATUSES = ["novo", "em_analise"];
function parseCreatedAt(value) {
	const timestamp = new Date(value).getTime();
	return Number.isNaN(timestamp) ? null : timestamp;
}
function getPeriodLabel(period) {
	return DASHBOARD_PERIODS.find((option) => option.value === period)?.label || "6 meses";
}
function getPeriodStart(period, now) {
	if (period === "all") return null;
	const start = new Date(now);
	if (period === "7d") start.setUTCDate(start.getUTCDate() - 7);
	if (period === "1m") start.setUTCMonth(start.getUTCMonth() - 1);
	if (period === "6m") start.setUTCMonth(start.getUTCMonth() - 6);
	if (period === "1y") start.setUTCFullYear(start.getUTCFullYear() - 1);
	return start;
}
function filterByPeriod(items, period, now) {
	const endTimestamp = now.getTime();
	if (Number.isNaN(endTimestamp)) return [];
	const startTimestamp = getPeriodStart(period, now)?.getTime() ?? Number.NEGATIVE_INFINITY;
	return items.filter((item) => {
		const timestamp = parseCreatedAt(item.created_at);
		return timestamp !== null && timestamp >= startTimestamp && timestamp <= endTimestamp;
	});
}
function filterDashboardData(data, period, now) {
	return {
		leads: filterByPeriod(data.leads, period, now),
		patients: filterByPeriod(data.patients, period, now),
		caregivers: filterByPeriod(data.caregivers, period, now),
		professionalApplications: filterByPeriod(data.professionalApplications, period, now),
		caregiverUsers: data.caregiverUsers
	};
}
function calculateConversionRate(leads) {
	if (leads.length === 0) return 0;
	return leads.filter((lead) => lead.status === "convertido").length / leads.length * 100;
}
function countActiveProfessionals(caregivers, caregiverUsers) {
	const linkedUserIds = new Set(caregivers.map((caregiver) => caregiver.user_id).filter((userId) => Boolean(userId)));
	const professionalIds = /* @__PURE__ */ new Set();
	for (const caregiver of caregivers) {
		if (caregiver.account_status !== "ativo") continue;
		professionalIds.add(caregiver.user_id ? `user:${caregiver.user_id}` : `profile:${caregiver.id}`);
	}
	for (const user of caregiverUsers) {
		if (user.role !== "cuidador" || user.deleted_at !== null || linkedUserIds.has(user.id)) continue;
		professionalIds.add(`user:${user.id}`);
	}
	return professionalIds.size;
}
function currentOperationalMetrics(data) {
	return {
		openContacts: data.leads.filter((lead) => OPEN_LEAD_STATUSES.includes(lead.status)).length,
		openApplications: data.professionalApplications.filter((application) => OPEN_APPLICATION_STATUSES.includes(application.status)).length,
		activePatients: data.patients.filter((patient) => patient.status === "ativo").length,
		activeProfessionals: countActiveProfessionals(data.caregivers, data.caregiverUsers),
		pendingPatients: data.patients.filter((patient) => patient.status === "pendente").length,
		patientsWithoutFamily: data.patients.filter((patient) => !patient.family_user_id).length,
		professionalsWaitingAccess: data.caregivers.filter((caregiver) => caregiver.account_status === "aguardando_acesso").length
	};
}
function getDashboardMetrics(data, period, now) {
	const periodData = filterDashboardData(data, period, now);
	return {
		...currentOperationalMetrics(data),
		conversionRate: calculateConversionRate(periodData.leads),
		leadsInPeriod: periodData.leads.length,
		applicationsInPeriod: periodData.professionalApplications.length,
		convertedLeadsInPeriod: periodData.leads.filter((lead) => lead.status === "convertido").length
	};
}
function startOfUtcDay(date) {
	return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
function startOfUtcWeek(date) {
	const day = date.getUTCDay();
	const daysSinceMonday = day === 0 ? 6 : day - 1;
	const start = startOfUtcDay(date);
	start.setUTCDate(start.getUTCDate() - daysSinceMonday);
	return start;
}
function startOfUtcMonth(date) {
	return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}
function bucketUnitFor(period) {
	if (period === "7d") return "day";
	if (period === "1m") return "week";
	return "month";
}
function bucketStartFor(date, unit) {
	if (unit === "day") return startOfUtcDay(date);
	if (unit === "week") return startOfUtcWeek(date);
	return startOfUtcMonth(date);
}
function advanceBucket(date, unit) {
	const next = new Date(date);
	if (unit === "day") next.setUTCDate(next.getUTCDate() + 1);
	if (unit === "week") next.setUTCDate(next.getUTCDate() + 7);
	if (unit === "month") next.setUTCMonth(next.getUTCMonth() + 1);
	return next;
}
function bucketKey(date, unit) {
	if (unit === "month") return date.toISOString().slice(0, 7);
	return date.toISOString().slice(0, 10);
}
function bucketLabel(date, unit) {
	if (unit === "month") return new Intl.DateTimeFormat("pt-BR", {
		month: "short",
		year: "2-digit",
		timeZone: "UTC"
	}).format(date).replace(".", "");
	return new Intl.DateTimeFormat("pt-BR", {
		day: "2-digit",
		month: "2-digit",
		timeZone: "UTC"
	}).format(date);
}
function earliestEntryTimestamp(data, endTimestamp) {
	const timestamps = [...data.leads, ...data.professionalApplications].map((item) => parseCreatedAt(item.created_at)).filter((timestamp) => timestamp !== null && timestamp <= endTimestamp);
	return timestamps.length > 0 ? Math.min(...timestamps) : null;
}
function buildEntrySeries(data, period, now) {
	const endTimestamp = now.getTime();
	if (Number.isNaN(endTimestamp)) return [];
	const unit = bucketUnitFor(period);
	const periodLeads = filterByPeriod(data.leads, period, now);
	const periodApplications = filterByPeriod(data.professionalApplications, period, now);
	if (![...periodLeads, ...periodApplications].some((item) => parseCreatedAt(item.created_at) !== null)) return [];
	const firstTimestamp = getPeriodStart(period, now)?.getTime() ?? earliestEntryTimestamp(data, endTimestamp);
	if (firstTimestamp === null || firstTimestamp === void 0) return [];
	const firstBucket = bucketStartFor(new Date(firstTimestamp), unit);
	const lastBucket = bucketStartFor(now, unit);
	const buckets = /* @__PURE__ */ new Map();
	for (let cursor = firstBucket; cursor.getTime() <= lastBucket.getTime(); cursor = advanceBucket(cursor, unit)) {
		const key = bucketKey(cursor, unit);
		buckets.set(key, {
			key,
			label: bucketLabel(cursor, unit),
			leads: 0,
			applications: 0
		});
	}
	for (const lead of periodLeads) {
		const timestamp = parseCreatedAt(lead.created_at);
		if (timestamp === null) continue;
		const bucket = buckets.get(bucketKey(bucketStartFor(new Date(timestamp), unit), unit));
		if (bucket) bucket.leads += 1;
	}
	for (const application of periodApplications) {
		const timestamp = parseCreatedAt(application.created_at);
		if (timestamp === null) continue;
		const bucket = buckets.get(bucketKey(bucketStartFor(new Date(timestamp), unit), unit));
		if (bucket) bucket.applications += 1;
	}
	return [...buckets.values()];
}
function buildOperationalDistribution(data) {
	const metrics = currentOperationalMetrics(data);
	return [
		{
			key: "active-patients",
			label: "Pacientes ativos",
			value: metrics.activePatients
		},
		{
			key: "pending-patients",
			label: "Pacientes pendentes",
			value: metrics.pendingPatients
		},
		{
			key: "without-family",
			label: "Sem família",
			value: metrics.patientsWithoutFamily
		},
		{
			key: "active-professionals",
			label: "Profissionais ativos",
			value: metrics.activeProfessionals
		},
		{
			key: "waiting-access",
			label: "Aguardando acesso",
			value: metrics.professionalsWaitingAccess
		}
	];
}
function sortByCreatedAtDescending(items) {
	return [...items].sort((left, right) => {
		const leftTime = parseCreatedAt(left.created_at) ?? Number.NEGATIVE_INFINITY;
		return (parseCreatedAt(right.created_at) ?? Number.NEGATIVE_INFINITY) - leftTime;
	});
}
//#endregion
//#region src/app/admin/AdminDashboard.tsx
var import_jsx_runtime = require_jsx_runtime();
var numberFormatter = new Intl.NumberFormat("pt-BR");
var percentFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
var CHART_GRID = "#e4ebe9";
var CHART_AXIS = "#7b908b";
var CHART_PRIMARY = "#24675f";
var CHART_SECONDARY = "#e99b63";
function StatCard({ label, value, helper, href }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		href,
		className: "block min-w-0 rounded-2xl focus-visible:outline-offset-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "h-full transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(8,54,49,0.1)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-[var(--muted-2)]",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 tabular-nums text-3xl font-semibold leading-none text-[var(--foreground)]",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs leading-5 text-[var(--muted)]",
					children: helper
				})
			]
		})
	});
}
function EmptyState({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-56 flex-col items-center justify-center rounded-xl bg-[var(--surface-soft)] px-5 py-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-semibold text-[var(--foreground)]",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-sm text-sm leading-6 text-[var(--muted)]",
			children: description
		})]
	});
}
function formatPercentage(value) {
	return `${percentFormatter.format(value)}%`;
}
function formatDate(value) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "Data não informada";
	return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(date);
}
function entrySummary(entries, periodLabel) {
	const leads = entries.reduce((total, entry) => total + entry.leads, 0);
	const applications = entries.reduce((total, entry) => total + entry.applications, 0);
	return `No período de ${periodLabel}, foram registrados ${leads} ${leads === 1 ? "lead" : "leads"} e ${applications} ${applications === 1 ? "candidatura" : "candidaturas"}.`;
}
function operationalSummary(points) {
	return `Distribuição atual: ${points.map((point) => `${point.label}, ${point.value}`).join("; ")}.`;
}
function RecentLeads({ leads }) {
	const recentLeads = sortByCreatedAtDescending(leads).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-semibold text-[var(--foreground)]",
			children: "Contatos recentes"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-[var(--muted)]",
			children: "Acompanhe os últimos contatos recebidos."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			href: "/admin/leads",
			className: "self-start text-sm font-semibold text-[var(--brand)] hover:underline sm:self-auto",
			children: "Ver todos"
		})]
	}), recentLeads.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-5 divide-y divide-[var(--border)]",
		children: recentLeads.map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-col gap-2 py-3 first:pt-0 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-medium text-[var(--foreground)]",
					children: lead.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[var(--muted-2)]",
					children: lead.phone
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { value: lead.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
					className: "text-xs text-[var(--muted-2)]",
					dateTime: lead.created_at,
					children: formatDate(lead.created_at)
				})]
			})]
		}, lead.id))
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-5 rounded-xl bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]",
		children: "Nenhum contato recebido ainda."
	})] });
}
function RecentPatients({ patients }) {
	const recentPatients = sortByCreatedAtDescending(patients).slice(0, 5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-semibold text-[var(--foreground)]",
			children: "Pacientes recentes"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-[var(--muted)]",
			children: "Veja os últimos cadastros da operação."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			href: "/admin/pacientes",
			className: "self-start text-sm font-semibold text-[var(--brand)] hover:underline sm:self-auto",
			children: "Ver todos"
		})]
	}), recentPatients.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-5 divide-y divide-[var(--border)]",
		children: recentPatients.map((patient) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-col gap-2 py-3 first:pt-0 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-medium text-[var(--foreground)]",
					children: patient.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[var(--muted-2)]",
					children: patient.care_level || "Plano a definir"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 sm:flex-col sm:items-end sm:gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { value: patient.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
					className: "text-xs text-[var(--muted-2)]",
					dateTime: patient.created_at,
					children: formatDate(patient.created_at)
				})]
			})]
		}, patient.id))
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-5 rounded-xl bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted)]",
		children: "Nenhum paciente cadastrado ainda."
	})] });
}
function Shortcuts() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-semibold text-[var(--foreground)]",
			children: "Atalhos"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-[var(--muted)]",
			children: "Acesse rapidamente as áreas mais usadas."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 grid gap-3 sm:grid-cols-2",
			children: [
				{
					label: "Gerenciar contatos",
					description: "Acompanhar leads abertos",
					href: "/admin/leads"
				},
				{
					label: "Revisar candidaturas",
					description: "Analisar novos profissionais",
					href: "/admin/profissionais"
				},
				{
					label: "Ver pacientes",
					description: "Abrir a base de pacientes",
					href: "/admin/pacientes"
				},
				{
					label: "Abrir banco profissional",
					description: "Gerenciar acessos e perfis",
					href: "/admin/cuidadores"
				}
			].map((shortcut) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				href: shortcut.href,
				className: "rounded-xl border border-[var(--border)] p-4 transition-colors duration-150 hover:border-[var(--brand)] hover:bg-[var(--brand-light)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-semibold text-[var(--brand-dark)]",
					children: shortcut.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-sm leading-5 text-[var(--muted)]",
					children: shortcut.description
				})]
			}, shortcut.href))
		})
	] });
}
function AdminDashboard({ data, asOf }) {
	const [period, setPeriod] = (0, import_react.useState)("6m");
	const now = (0, import_react.useMemo)(() => new Date(asOf), [asOf]);
	const metrics = (0, import_react.useMemo)(() => getDashboardMetrics(data, period, now), [
		data,
		now,
		period
	]);
	const entries = (0, import_react.useMemo)(() => buildEntrySeries(data, period, now), [
		data,
		now,
		period
	]);
	const operational = (0, import_react.useMemo)(() => buildOperationalDistribution(data), [data]);
	const periodLabel = getPeriodLabel(period);
	const entriesText = entrySummary(entries, periodLabel);
	const operationalText = operationalSummary(operational);
	const stats = [
		{
			label: "Contatos abertos",
			value: numberFormatter.format(metrics.openContacts),
			helper: "Novos ou em contato",
			href: "/admin/leads"
		},
		{
			label: "Candidaturas abertas",
			value: numberFormatter.format(metrics.openApplications),
			helper: "Novas ou em análise",
			href: "/admin/profissionais"
		},
		{
			label: "Pacientes ativos",
			value: numberFormatter.format(metrics.activePatients),
			helper: "Status atual",
			href: "/admin/pacientes"
		},
		{
			label: "Profissionais ativos",
			value: numberFormatter.format(metrics.activeProfessionals),
			helper: "Acesso ativo",
			href: "/admin/cuidadores"
		},
		{
			label: "Taxa de conversão",
			value: formatPercentage(metrics.conversionRate),
			helper: `${periodLabel} · ${metrics.convertedLeadsInPeriod} convertidos`,
			href: "/admin/leads"
		},
		{
			label: "Pacientes pendentes",
			value: numberFormatter.format(metrics.pendingPatients),
			helper: "Status atual",
			href: "/admin/pacientes"
		},
		{
			label: "Pacientes sem família",
			value: numberFormatter.format(metrics.patientsWithoutFamily),
			helper: "Precisam de vínculo",
			href: "/admin/pacientes"
		},
		{
			label: "Profissionais aguardando acesso",
			value: numberFormatter.format(metrics.professionalsWaitingAccess),
			helper: "Perfil aprovado sem acesso",
			href: "/admin/cuidadores"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-7 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-dark)]",
							children: "Visão geral"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-2xl font-semibold leading-tight text-[var(--foreground)] sm:text-3xl",
							children: "Acompanhe a operação da Love Sênior"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]",
							children: "Os indicadores operacionais mostram o estado atual. O período selecionado controla as entradas e a taxa de conversão."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					role: "group",
					"aria-labelledby": "dashboard-period-label",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "dashboard-period-label",
						className: "mb-2 text-sm font-semibold text-[var(--foreground)]",
						children: "Período de entradas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: DASHBOARD_PERIODS.map((option) => {
							const selected = option.value === period;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": selected,
								onClick: () => setPeriod(option.value),
								className: `min-h-11 rounded-xl border px-3 text-sm font-semibold transition-colors duration-150 focus-visible:outline-offset-2 ${selected ? "border-[var(--brand)] bg-[var(--brand)] text-white" : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--brand)] hover:text-[var(--brand-dark)]"}`,
								children: option.label
							}, option.value);
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "dashboard-metrics-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "dashboard-metrics-title",
					className: "sr-only",
					children: "Indicadores administrativos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
					children: stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, { ...stat }, stat.label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-7 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.65fr)]",
				"aria-labelledby": "dashboard-charts-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "dashboard-charts-title",
						className: "sr-only",
						children: "Análises da operação"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-[var(--foreground)]",
								children: "Entradas no período"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-[var(--muted)]",
								children: [
									"Leads e candidaturas recebidos ao longo de ",
									periodLabel.toLowerCase(),
									"."
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-[var(--muted-2)]",
								children: "Comparativo"
							})]
						}), entries.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								role: "img",
								"aria-label": "Gráfico de entradas comparando leads e candidaturas",
								"aria-describedby": "entries-summary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-64 min-w-0 sm:h-72",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
											data: entries,
											margin: {
												top: 8,
												right: 8,
												left: -20,
												bottom: 0
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
													stroke: CHART_GRID,
													vertical: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													dataKey: "label",
													tick: {
														fontSize: 11,
														fill: CHART_AXIS
													},
													axisLine: { stroke: CHART_GRID },
													tickLine: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
													allowDecimals: false,
													tick: {
														fontSize: 11,
														fill: CHART_AXIS
													},
													axisLine: false,
													tickLine: false,
													width: 32
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
													contentStyle: {
														borderRadius: 12,
														border: `1px solid ${CHART_GRID}`,
														fontSize: 12
													},
													cursor: { fill: "rgba(36, 103, 95, 0.06)" }
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
													dataKey: "leads",
													name: "Leads",
													fill: CHART_PRIMARY,
													radius: [
														5,
														5,
														0,
														0
													],
													maxBarSize: 28
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
													dataKey: "applications",
													name: "Candidaturas",
													fill: CHART_SECONDARY,
													radius: [
														5,
														5,
														0,
														0
													],
													maxBarSize: 28
												})
											]
										})
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-6 text-[var(--muted)]",
								id: "entries-summary",
								children: entriesText
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								title: "Sem entradas neste período",
								description: "Selecione outro período ou aguarde novos leads e candidaturas."
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-[var(--foreground)]",
							children: "Distribuição operacional"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-[var(--muted)]",
							children: "Situação atual de pacientes e profissionais."
						})] }), operational.some((point) => point.value > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								role: "img",
								"aria-label": "Gráfico da distribuição operacional atual",
								"aria-describedby": "operational-summary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-64 min-w-0 sm:h-72",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
											layout: "vertical",
											data: operational,
											margin: {
												top: 4,
												right: 12,
												left: 0,
												bottom: 0
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
													stroke: CHART_GRID,
													horizontal: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													type: "number",
													allowDecimals: false,
													tick: {
														fontSize: 11,
														fill: CHART_AXIS
													},
													axisLine: { stroke: CHART_GRID },
													tickLine: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
													type: "category",
													dataKey: "label",
													width: 112,
													tick: {
														fontSize: 11,
														fill: CHART_AXIS
													},
													axisLine: false,
													tickLine: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
													contentStyle: {
														borderRadius: 12,
														border: `1px solid ${CHART_GRID}`,
														fontSize: 12
													},
													cursor: { fill: "rgba(36, 103, 95, 0.06)" }
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
													dataKey: "value",
													name: "Cadastros",
													fill: CHART_PRIMARY,
													radius: [
														0,
														5,
														5,
														0
													],
													barSize: 18
												})
											]
										})
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-6 text-[var(--muted)]",
								id: "operational-summary",
								children: operationalText
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								title: "Operação sem registros",
								description: "Os indicadores aparecerão quando houver pacientes ou profissionais cadastrados."
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-7 grid min-w-0 gap-6 xl:grid-cols-2",
				"aria-labelledby": "dashboard-recent-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "dashboard-recent-title",
						className: "sr-only",
						children: "Atividade recente e atalhos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentLeads, { leads: data.leads }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentPatients, { patients: data.patients })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6",
				"aria-label": "Atalhos administrativos",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shortcuts, {})
			})
		]
	});
}
//#endregion
export { AdminDashboard as default };
