import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import { $ as ResponsiveContainer, a as Legend, n as XAxis, o as CartesianGrid, r as Tooltip, t as YAxis } from "./YAxis-BIE5qNJN.js";
import { t as Bar } from "./Bar-CjLWcLIw.js";
import { t as BarChart } from "./BarChart-BK6TIWJk.js";
import { t as Card } from "./Card-CwAtBYLW.js";
import { t as Line } from "./Line-hvS6KK5z.js";
import { t as LineChart } from "./LineChart-DddtAAC4.js";
//#region src/components/admin/ProjectionDashboard.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var INITIAL_INPUTS = {
	patientsAtStart: "",
	revenuePerPatient: "",
	directTeamCost: "",
	fixedCosts: "0",
	taxPercent: "6",
	availableCash: "0",
	horizonMonths: "12",
	realisticGrowth: "3"
};
var INPUT_CLASS = "mt-1 min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 py-2 text-base text-[var(--foreground)] shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 sm:text-sm";
var LABEL_CLASS = "block text-sm font-semibold text-[var(--foreground)]";
var MAX_MONTHLY_AMOUNT_CENTS = 1e9;
var SCENARIO_COLORS = {
	conservative: "#d18b43",
	base: "#24675f",
	accelerated: "#0ca37c"
};
function numberFromInput(value) {
	const parsed = Number(value.replace(",", "."));
	return Number.isFinite(parsed) ? parsed : 0;
}
function centsFromInput(value) {
	return Math.min(MAX_MONTHLY_AMOUNT_CENTS, Math.max(0, Math.round(numberFromInput(value) * 100)));
}
function boundedNumber(value, min, max) {
	return Math.min(max, Math.max(min, numberFromInput(value)));
}
function formatCurrency(cents) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(cents / 100);
}
function formatAxisCurrency(cents) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
		notation: "compact",
		maximumFractionDigits: 1
	}).format(cents / 100);
}
function formatMonth(value) {
	if (!value) return "";
	const date = /* @__PURE__ */ new Date(value + "-01T00:00:00Z");
	if (Number.isNaN(date.getTime())) return value;
	return new Intl.DateTimeFormat("pt-BR", {
		month: "long",
		year: "numeric",
		timeZone: "UTC"
	}).format(date);
}
function formatChartMonth(month, offset) {
	const [year, monthNumber] = month.split("-").map(Number);
	if (!year || !monthNumber) return "Mês " + offset;
	const date = new Date(Date.UTC(year, monthNumber - 1 + offset, 1));
	return new Intl.DateTimeFormat("pt-BR", {
		month: "short",
		timeZone: "UTC"
	}).format(date).replace(".", "") + ". " + String(date.getUTCFullYear()).slice(-2);
}
function NumericField({ id, label, value, onChange, min = "0", max, step = "1", suffix, placeholder = "0", inputMode = "decimal" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: LABEL_CLASS,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				type: "number",
				min,
				max,
				step,
				inputMode,
				placeholder,
				value,
				onChange,
				className: INPUT_CLASS + (suffix ? " pr-12" : "")
			}), suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1 text-sm text-[var(--muted)]",
				children: suffix
			})]
		})]
	});
}
function SelectField({ id, label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: LABEL_CLASS,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			id,
			value,
			onChange,
			className: INPUT_CLASS,
			children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: option.value,
				children: option.label
			}, option.value))
		})]
	});
}
function ScenarioCard({ scenario }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "mb-4 h-1 w-full rounded-full",
				style: { backgroundColor: scenario.color }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-base font-semibold text-[var(--foreground)]",
					children: scenario.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-[var(--muted)]",
					children: [
						"Crescimento de ",
						scenario.growth.toLocaleString("pt-BR"),
						"% ao mês"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: "mt-1 h-3 w-3 shrink-0 rounded-full",
					style: { backgroundColor: scenario.color }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm text-[var(--muted)]",
							children: "Receita no último mês"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-sm font-semibold tabular-nums text-[var(--foreground)]",
							children: formatCurrency(scenario.finalRevenueCents)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm text-[var(--muted)]",
							children: "Resultado operacional acumulado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-sm font-semibold tabular-nums " + (scenario.cumulativeResultCents < 0 ? "text-[var(--status-critical)]" : "text-[var(--foreground)]"),
							children: formatCurrency(scenario.cumulativeResultCents)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm text-[var(--muted)]",
							children: "Resultado operacional no último mês"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-sm font-semibold tabular-nums " + (scenario.finalMonthlyResultCents < 0 ? "text-[var(--status-critical)]" : "text-[var(--foreground)]"),
							children: formatCurrency(scenario.finalMonthlyResultCents)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm text-[var(--muted)]",
							children: "Capital de giro estimado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-sm font-semibold tabular-nums text-[var(--foreground)]",
							children: formatCurrency(scenario.workingCapitalCents)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 border-b border-[var(--border)] pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm text-[var(--muted)]",
							children: "Reserva total sugerida"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-sm font-semibold tabular-nums text-[var(--brand-dark)]",
							children: formatCurrency(scenario.recommendedReserveCents)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm text-[var(--muted)]",
							children: "Caixa adicional necessário"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-right text-sm font-semibold tabular-nums text-[var(--foreground)]",
							children: formatCurrency(scenario.additionalCashNeededCents)
						})]
					})
				]
			})
		]
	});
}
function ProjectionDashboard({ initialMonth, initialActivePatients, initialAverageRevenuePerPatientCents, initialDirectTeamCostCents }) {
	const [month, setMonth] = (0, import_react.useState)(initialMonth);
	const [inputs, setInputs] = (0, import_react.useState)(INITIAL_INPUTS);
	const projection = (0, import_react.useMemo)(() => {
		const patientsAtStart = Math.round(boundedNumber(inputs.patientsAtStart || String(initialActivePatients), 0, 1e5));
		const revenuePerPatientCents = centsFromInput(inputs.revenuePerPatient || String(initialAverageRevenuePerPatientCents / 100));
		const monthlyRevenueCents = Math.min(MAX_MONTHLY_AMOUNT_CENTS, patientsAtStart * revenuePerPatientCents);
		const fixedCostsCents = centsFromInput(inputs.fixedCosts);
		const availableCashCents = centsFromInput(inputs.availableCash);
		const directTeamCostCents = centsFromInput(inputs.directTeamCost || String(initialDirectTeamCostCents / 100));
		const taxPercent = boundedNumber(inputs.taxPercent, 0, 100);
		const realisticGrowth = boundedNumber(inputs.realisticGrowth, -100, 50);
		const horizonMonths = Math.round(boundedNumber(inputs.horizonMonths, 1, 24));
		const scenarioResults = [
			{
				key: "conservative",
				label: "Conservador",
				growth: Math.max(-100, realisticGrowth - 2),
				color: SCENARIO_COLORS.conservative
			},
			{
				key: "base",
				label: "Base",
				growth: realisticGrowth,
				color: SCENARIO_COLORS.base
			},
			{
				key: "accelerated",
				label: "Acelerado",
				growth: Math.min(50, realisticGrowth + 2),
				color: SCENARIO_COLORS.accelerated
			}
		].map((scenario) => {
			let cumulativeResultCents = 0;
			let finalRevenueCents = monthlyRevenueCents;
			let finalCostsCents = fixedCostsCents + directTeamCostCents + Math.round(monthlyRevenueCents * taxPercent / 100);
			for (let monthIndex = 1; monthIndex <= horizonMonths; monthIndex += 1) {
				const revenueGrowthFactor = Math.pow(1 + scenario.growth / 100, monthIndex);
				finalRevenueCents = Math.round(monthlyRevenueCents * revenueGrowthFactor);
				const projectedTaxes = Math.round(finalRevenueCents * taxPercent / 100);
				finalCostsCents = fixedCostsCents + directTeamCostCents + projectedTaxes;
				cumulativeResultCents += finalRevenueCents - finalCostsCents;
			}
			const workingCapitalCents = Math.max(0, finalRevenueCents - finalCostsCents);
			const operatingReserveCents = Math.round(finalCostsCents * 2);
			const recommendedReserveCents = workingCapitalCents + operatingReserveCents;
			return {
				...scenario,
				finalRevenueCents,
				finalCostsCents,
				finalMonthlyResultCents: finalRevenueCents - finalCostsCents,
				cumulativeResultCents,
				workingCapitalCents,
				operatingReserveCents,
				recommendedReserveCents,
				additionalCashNeededCents: Math.max(0, recommendedReserveCents - availableCashCents)
			};
		});
		const chartData = [];
		for (let monthIndex = 0; monthIndex <= horizonMonths; monthIndex += 1) chartData.push({
			month_label: formatChartMonth(month, monthIndex),
			conservative_revenue: Math.round(monthlyRevenueCents * Math.pow(1 + scenarioResults[0].growth / 100, monthIndex)),
			base_revenue: Math.round(monthlyRevenueCents * Math.pow(1 + scenarioResults[1].growth / 100, monthIndex)),
			accelerated_revenue: Math.round(monthlyRevenueCents * Math.pow(1 + scenarioResults[2].growth / 100, monthIndex))
		});
		return {
			scenarios: scenarioResults,
			chartData,
			horizonMonths,
			hasBaseline: monthlyRevenueCents > 0 || fixedCostsCents > 0 || directTeamCostCents > 0
		};
	}, [
		inputs,
		month,
		initialActivePatients,
		initialAverageRevenuePerPatientCents,
		initialDirectTeamCostCents
	]);
	function updateInput(key) {
		return (event) => {
			const { value } = event.target;
			setInputs((current) => ({
				...current,
				[key]: value
			}));
		};
	}
	function updateSelect(key) {
		return (event) => {
			const { value } = event.target;
			setInputs((current) => ({
				...current,
				[key]: value
			}));
		};
	}
	const reserveChartData = projection.scenarios.map((scenario) => ({
		name: scenario.label,
		workingCapitalCents: scenario.workingCapitalCents,
		operatingReserveCents: scenario.operatingReserveCents
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-7 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-dark)]",
							children: "Love Sênior / operação"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-serif text-3xl font-normal leading-tight text-[var(--brand-deep)] sm:text-4xl",
							children: "Projeções"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-[var(--muted)]",
							children: "Compare cenários de crescimento e planeje o capital de giro e a reserva de caixa."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "projection-month",
						className: "block text-xs font-medium text-[var(--muted)]",
						children: "Início da projeção"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "projection-month",
						type: "month",
						value: month,
						onChange: (event) => setMonth(event.target.value),
						className: INPUT_CLASS + " sm:min-w-48"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:min-w-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectField, {
							id: "projection-horizon",
							label: "Horizonte",
							value: inputs.horizonMonths,
							onChange: updateSelect("horizonMonths"),
							options: [
								{
									value: "3",
									label: "3 meses"
								},
								{
									value: "6",
									label: "6 meses"
								},
								{
									value: "12",
									label: "12 meses"
								},
								{
									value: "18",
									label: "18 meses"
								},
								{
									value: "24",
									label: "24 meses"
								}
							]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-labelledby": "projection-inputs-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							id: "projection-inputs-title",
							className: "font-serif text-2xl font-normal text-[var(--brand-deep)]",
							children: "Parâmetros da projeção"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-6 text-[var(--muted)]",
							children: "Campos vazios usam a base atual de pacientes ativos e cobranças. Altere os valores para simular decisões."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-x-5 gap-y-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
								id: "projection-patients",
								label: "Pacientes no início",
								value: inputs.patientsAtStart,
								onChange: updateInput("patientsAtStart"),
								step: "1",
								inputMode: "numeric",
								placeholder: "Pacientes ativos como padrão"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs leading-5 text-[var(--muted)]",
								children: [
									"Padrão atual: ",
									initialActivePatients,
									" ",
									initialActivePatients === 1 ? "paciente ativo" : "pacientes ativos",
									"."
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
								id: "projection-revenue-per-patient",
								label: "Receita mensal por paciente (R$)",
								value: inputs.revenuePerPatient,
								onChange: updateInput("revenuePerPatient"),
								step: "0.01",
								placeholder: "Média das cobranças como padrão"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs leading-5 text-[var(--muted)]",
								children: [
									"Referência: cobranças de ",
									formatMonth(initialMonth),
									" ÷ ",
									initialActivePatients,
									" pacientes ativos = ",
									formatCurrency(initialAverageRevenuePerPatientCents),
									" por paciente."
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
								id: "projection-direct-team-cost",
								label: "Custo direto mensal da equipe (R$)",
								value: inputs.directTeamCost,
								onChange: updateInput("directTeamCost"),
								step: "0.01",
								placeholder: String((initialDirectTeamCostCents / 100).toFixed(2))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs leading-5 text-[var(--muted)]",
								children: [
									"Padrão atual: ",
									formatCurrency(initialDirectTeamCostCents),
									" em plantões lançados no Financeiro."
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
								id: "projection-fixed-costs",
								label: "Despesas fixas mensais (R$)",
								value: inputs.fixedCosts,
								onChange: updateInput("fixedCosts"),
								step: "0.01"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
								id: "projection-tax",
								label: "Tributos estimados (%)",
								value: inputs.taxPercent,
								onChange: updateInput("taxPercent"),
								max: "100",
								step: "0.1",
								suffix: "%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
								id: "projection-realistic-growth",
								label: "Crescimento mensal realista (%)",
								value: inputs.realisticGrowth,
								onChange: updateInput("realisticGrowth"),
								min: "-100",
								max: "50",
								step: "0.1",
								suffix: "%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericField, {
								id: "projection-cash",
								label: "Caixa disponível hoje (R$)",
								value: inputs.availableCash,
								onChange: updateInput("availableCash"),
								step: "0.01"
							})
						]
					})]
				})
			}),
			!projection.hasBaseline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "mt-4 rounded-xl border border-[var(--border)] bg-[var(--brand-light)] px-4 py-3 text-sm leading-5 text-[var(--brand-dark)]",
				children: "Informe uma receita por paciente ou use as cobranças registradas para visualizar os cenários."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-7",
				"aria-labelledby": "projection-scenarios-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "projection-scenarios-title",
						className: "font-serif text-2xl font-normal text-[var(--brand-deep)]",
						children: "Comparação de cenários"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm leading-6 text-[var(--muted)]",
						children: [
							"Resultados ao fim de ",
							projection.horizonMonths,
							" meses, considerando o crescimento mensal realista informado."
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 xl:grid-cols-3",
					children: projection.scenarios.map((scenario) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioCard, { scenario }, scenario.key))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid min-w-0 gap-4 xl:grid-cols-2",
				"aria-label": "Gráficos das projeções",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold text-[var(--foreground)]",
						children: "Receita mensal projetada"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-5 text-[var(--muted)]",
						children: "Evolução da receita nos três cenários."
					})] }), projection.hasBaseline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-72 min-w-0 sm:h-80",
						role: "img",
						"aria-label": "Gráfico da receita mensal nos cenários conservador, base e acelerado",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: projection.chartData,
								margin: {
									top: 10,
									right: 8,
									left: 2,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "#e4ebe9",
										strokeDasharray: "4 4",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month_label",
										tick: {
											fontSize: 11,
											fill: "#58706b"
										},
										axisLine: { stroke: "#e4ebe9" },
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tickFormatter: (value) => formatAxisCurrency(Number(value)),
										tick: {
											fontSize: 11,
											fill: "#58706b"
										},
										axisLine: false,
										tickLine: false,
										width: 68
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										formatter: (value, name) => [formatCurrency(Number(value)), String(name)],
										labelFormatter: (label) => String(label),
										contentStyle: {
											borderRadius: 12,
											border: "1px solid #e4ebe9",
											fontSize: 12
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
										fontSize: 12,
										paddingTop: 8
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										dataKey: "conservative_revenue",
										name: "Conservador",
										type: "monotone",
										stroke: SCENARIO_COLORS.conservative,
										strokeWidth: 2.5,
										dot: false,
										activeDot: { r: 5 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										dataKey: "base_revenue",
										name: "Base",
										type: "monotone",
										stroke: SCENARIO_COLORS.base,
										strokeWidth: 2.5,
										dot: false,
										activeDot: { r: 5 }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										dataKey: "accelerated_revenue",
										name: "Acelerado",
										type: "monotone",
										stroke: SCENARIO_COLORS.accelerated,
										strokeWidth: 2.5,
										dot: false,
										activeDot: { r: 5 }
									})
								]
							})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex min-h-72 items-center justify-center rounded-xl bg-[var(--surface-soft)] px-5 text-center text-sm leading-6 text-[var(--muted)]",
						children: "Informe uma receita por paciente ou registre cobranças para ver as curvas de crescimento."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold text-[var(--foreground)]",
						children: "Reserva de caixa sugerida"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-5 text-[var(--muted)]",
						children: "Capital de giro e meses de reserva operacional."
					})] }), projection.hasBaseline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-72 min-w-0 sm:h-80",
						role: "img",
						"aria-label": "Gráfico comparativo da composição da reserva sugerida",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: reserveChartData,
								margin: {
									top: 10,
									right: 8,
									left: 2,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "#e4ebe9",
										strokeDasharray: "4 4",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fontSize: 11,
											fill: "#58706b"
										},
										axisLine: { stroke: "#e4ebe9" },
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tickFormatter: (value) => formatAxisCurrency(Number(value)),
										tick: {
											fontSize: 11,
											fill: "#58706b"
										},
										axisLine: false,
										tickLine: false,
										width: 68
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										formatter: (value, name) => [formatCurrency(Number(value)), String(name)],
										contentStyle: {
											borderRadius: 12,
											border: "1px solid #e4ebe9",
											fontSize: 12
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
										fontSize: 12,
										paddingTop: 8
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "workingCapitalCents",
										name: "Capital de giro",
										stackId: "reserve",
										fill: SCENARIO_COLORS.base,
										radius: [
											0,
											0,
											0,
											0
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "operatingReserveCents",
										name: "Reserva operacional",
										stackId: "reserve",
										fill: "#8bc7bc",
										radius: [
											5,
											5,
											0,
											0
										],
										maxBarSize: 54
									})
								]
							})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex min-h-72 items-center justify-center rounded-xl bg-[var(--surface-soft)] px-5 text-center text-sm leading-6 text-[var(--muted)]",
						children: "Informe a receita por paciente para estimar a necessidade de caixa."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 max-w-5xl text-xs leading-5 text-[var(--muted)]",
				children: "Estimativa simplificada: receita inicial = pacientes × receita mensal por paciente. O cenário Base usa a taxa realista; Conservador usa 2 pontos percentuais a menos e Acelerado, 2 pontos a mais. Custos diretos da equipe e tributos incidem sobre a receita; despesas fixas permanecem constantes. O capital de giro considera um mês de receita menos um mês de despesas, limitado a zero, e a reserva sugerida soma dois meses de despesas. Não considera sazonalidade, inadimplência, investimentos ou alterações nos contratos; revise as premissas com seu contador."
			})
		]
	});
}
//#endregion
export { ProjectionDashboard };
