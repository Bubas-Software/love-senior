import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import { t as Card } from "./Card-CwAtBYLW.js";
//#region src/components/admin/PricingCalculator.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var INITIAL_INPUTS = {
	shiftCost: "115",
	shiftsPerMonth: "15",
	additionalPerShift: "0",
	operationReserve: "8",
	estimatedTaxes: "6",
	desiredMargin: "20"
};
var INPUT_CLASS = "mt-1 min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 py-2 text-base text-[var(--foreground)] shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 sm:text-sm";
var LABEL_CLASS = "block text-sm font-semibold text-[var(--foreground)]";
function formatCurrency(cents) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(cents / 100);
}
function formatMonth(value) {
	const date = /* @__PURE__ */ new Date(value + "-01T00:00:00Z");
	if (Number.isNaN(date.getTime())) return value;
	return new Intl.DateTimeFormat("pt-BR", {
		month: "long",
		year: "numeric",
		timeZone: "UTC"
	}).format(date);
}
function centsFromInput(value) {
	const parsed = Number(value.replace(",", "."));
	return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed * 100) : 0;
}
function percentageFromInput(value) {
	const parsed = Number(value.replace(",", "."));
	return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}
function Field({ id, label, value, onChange, min = "0", max, step, inputMode = "decimal", suffix }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
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
			value,
			onChange,
			className: INPUT_CLASS + (suffix ? " pr-12" : "")
		}), suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-y-0 right-3 flex items-center pt-1 text-sm text-[var(--muted)]",
			children: suffix
		})]
	})] });
}
function PricingCalculator({ initialMonth }) {
	const [month, setMonth] = (0, import_react.useState)(initialMonth);
	const [inputs, setInputs] = (0, import_react.useState)(INITIAL_INPUTS);
	const estimate = (0, import_react.useMemo)(() => {
		const shiftCostCents = centsFromInput(inputs.shiftCost);
		const additionalCents = centsFromInput(inputs.additionalPerShift);
		const shiftCount = Math.max(0, Math.floor(Number(inputs.shiftsPerMonth) || 0));
		const reserve = percentageFromInput(inputs.operationReserve);
		const taxes = percentageFromInput(inputs.estimatedTaxes);
		const margin = percentageFromInput(inputs.desiredMargin);
		const teamCostCents = (shiftCostCents + additionalCents) * shiftCount;
		const minimumDenominator = 1 - (reserve + taxes) / 100;
		const suggestedDenominator = minimumDenominator - margin / 100;
		return {
			teamCostCents,
			shiftCount,
			reserve,
			taxes,
			margin,
			minimumPriceCents: minimumDenominator > 0 ? Math.round(teamCostCents / minimumDenominator) : null,
			suggestedPriceCents: suggestedDenominator > 0 ? Math.round(teamCostCents / suggestedDenominator) : null
		};
	}, [inputs]);
	function updateInput(key) {
		return (event) => {
			const { value } = event.target;
			setInputs((current) => ({
				...current,
				[key]: value
			}));
		};
	}
	const percentageTotal = estimate.reserve + estimate.taxes + estimate.margin;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-dark)]",
						children: "Love Sênior / operação"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-serif text-3xl font-normal leading-tight text-[var(--brand-deep)] sm:text-4xl",
						children: "Precificação"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-6 text-[var(--muted)]",
						children: "Simule o valor antes de enviar uma proposta."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full sm:w-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "pricing-month",
						className: "block text-xs font-medium text-[var(--muted)]",
						children: "Competência"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "pricing-month",
						type: "month",
						value: month,
						onChange: (event) => setMonth(event.target.value),
						className: INPUT_CLASS + " sm:min-w-48"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: formatMonth(month)
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid min-w-0 gap-4 lg:grid-cols-[1.06fr_.94fr]",
			"aria-label": "Simulador de preço mensal",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-2xl font-normal text-[var(--brand-deep)]",
						children: "Simular proposta"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-5 text-[var(--muted)]",
						children: "Informe valores reais para uma estimativa mensal."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-x-4 gap-y-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "pricing-shift-cost",
							label: "Custo por plantão (R$)",
							value: inputs.shiftCost,
							onChange: updateInput("shiftCost"),
							step: "0.01"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "pricing-shifts",
							label: "Plantões no mês",
							value: inputs.shiftsPerMonth,
							onChange: updateInput("shiftsPerMonth"),
							step: "1",
							inputMode: "numeric"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "pricing-additional",
							label: "Adicionais por plantão (R$)",
							value: inputs.additionalPerShift,
							onChange: updateInput("additionalPerShift"),
							step: "0.01"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "pricing-reserve",
							label: "Operação e reserva (%)",
							value: inputs.operationReserve,
							onChange: updateInput("operationReserve"),
							max: "100",
							step: "0.1",
							suffix: "%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "pricing-taxes",
							label: "Impostos estimados (%)",
							value: inputs.estimatedTaxes,
							onChange: updateInput("estimatedTaxes"),
							max: "100",
							step: "0.1",
							suffix: "%"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "pricing-margin",
							label: "Margem desejada (%)",
							value: inputs.desiredMargin,
							onChange: updateInput("desiredMargin"),
							max: "100",
							step: "0.1",
							suffix: "%"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 rounded-2xl border border-white/10 bg-[var(--brand-dark)] p-6 text-white shadow-[0_12px_35px_rgba(8,54,49,0.12)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.16em] text-[#bfe7de]",
							children: "Valor mensal sugerido"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl",
							children: estimate.suggestedPriceCents === null ? "—" : formatCurrency(estimate.suggestedPriceCents)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-[#d8eee9]",
							children: [
								"Estimativa para ",
								estimate.shiftCount,
								" ",
								estimate.shiftCount === 1 ? "plantão" : "plantões",
								month ? " em " + formatMonth(month) : ""
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 divide-y divide-white/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Custo da equipe" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-semibold tabular-nums",
									children: formatCurrency(estimate.teamCostCents)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Preço mínimo sem margem" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-semibold tabular-nums",
									children: estimate.minimumPriceCents === null ? "—" : formatCurrency(estimate.minimumPriceCents)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Margem pretendida" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-semibold tabular-nums",
									children: [estimate.margin.toLocaleString("pt-BR"), "%"]
								})]
							})
						]
					}),
					percentageTotal >= 100 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "mt-4 rounded-xl border border-white/20 bg-white/10 p-3 text-sm leading-5 text-white",
						children: "Operação, impostos e margem precisam somar menos de 100% para calcular o preço sugerido."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 rounded-xl border border-white/20 bg-white/10 p-3 text-sm leading-5 text-[#e6f3f0]",
						children: "A calculadora usa percentuais sobre a receita. Confirme impostos, encargos e adicionais com seu contador antes de enviar a proposta."
					})
				]
			})]
		})]
	});
}
//#endregion
export { PricingCalculator };
