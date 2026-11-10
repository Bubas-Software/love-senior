import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import { $ as ResponsiveContainer, a as Legend, c as arrayTooltipSearcher, n as XAxis, o as CartesianGrid, r as Tooltip, s as CartesianChart, t as YAxis } from "./YAxis-BIE5qNJN.js";
import { t as Bar } from "./Bar-CjLWcLIw.js";
import { t as Card } from "./Card-CwAtBYLW.js";
import { t as Line } from "./Line-hvS6KK5z.js";
//#region node_modules/recharts/es6/chart/ComposedChart.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var allowedTooltipTypes = ["axis"];
/**
* @consumes ResponsiveContainerContext
* @provides CartesianViewBoxContext
* @provides CartesianChartContext
*/
var ComposedChart = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	return /* @__PURE__ */ import_react.createElement(CartesianChart, {
		chartName: "ComposedChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: allowedTooltipTypes,
		tooltipPayloadSearcher: arrayTooltipSearcher,
		categoricalChartProps: props,
		ref
	});
});
//#endregion
//#region src/components/ui/Button.tsx
var import_jsx_runtime = require_jsx_runtime();
var VARIANTS = {
	primary: "bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)]",
	secondary: "bg-[var(--brand-light)] text-[var(--brand-dark)] hover:bg-[#d4e9e3]",
	ghost: "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-soft)]",
	danger: "bg-[var(--status-critical-bg)] text-[var(--status-critical)] hover:bg-[#f6d9d9]"
};
function Button({ variant = "primary", className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`,
		...props
	});
}
//#endregion
//#region src/lib/finance-utils.ts
function shiftFinanceMonth(month, offset) {
	const match = /^(\d{4})-(\d{2})$/.exec(month);
	if (!match) throw new Error("Competência inválida.");
	return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1 + offset, 1)).toISOString().slice(0, 7);
}
function buildFinanceCashFlow(month, receipts, payments) {
	const points = /* @__PURE__ */ new Map();
	for (let offset = -5; offset <= 0; offset += 1) {
		const key = shiftFinanceMonth(month, offset);
		points.set(key, {
			month: key,
			received_cents: 0,
			paid_cents: 0
		});
	}
	for (const receipt of receipts) {
		const point = points.get(receipt.received_on.slice(0, 7));
		if (point) point.received_cents += receipt.amount_cents;
	}
	for (const payment of payments) {
		const point = points.get(payment.paid_on.slice(0, 7));
		if (point) point.paid_cents += payment.amount_cents;
	}
	return [...points.values()];
}
function emptyFinanceSnapshot(month) {
	return {
		month,
		charges: [],
		expenses: [],
		cash_flow: buildFinanceCashFlow(month, [], [])
	};
}
function totalChargeBalance(charges) {
	return charges.reduce((total, charge) => total + Math.max(0, charge.amount_cents - charge.received_cents), 0);
}
//#endregion
//#region src/components/admin/FinanceDashboard.tsx
var EXPENSE_CATEGORIES = [
	{
		value: "marketing",
		label: "Marketing"
	},
	{
		value: "sistema",
		label: "Sistema"
	},
	{
		value: "contabilidade",
		label: "Contabilidade"
	},
	{
		value: "impostos",
		label: "Impostos"
	},
	{
		value: "operacao",
		label: "Operação"
	},
	{
		value: "outros",
		label: "Outros"
	}
];
var INPUT_CLASS = "mt-1 min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 py-2 text-base text-[var(--foreground)] sm:text-sm";
var LABEL_CLASS = "block text-sm font-semibold text-[var(--foreground)]";
var TABLE_HEAD_CLASS = "border-b border-[var(--border-strong)] bg-[var(--surface-soft)] px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]";
var TABLE_CELL_CLASS = "border-b border-[var(--border)] px-3 py-3 align-middle text-sm text-[var(--foreground)]";
var CHART_GREEN = "#0ca30c";
var CHART_RED = "#d03b3b";
var CHART_LINE = "#143f3a";
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
		maximumFractionDigits: 0
	}).format(cents / 100);
}
function centsToInput(cents) {
	return (cents / 100).toFixed(2);
}
function formatDate(value) {
	if (!value) return "—";
	const date = /* @__PURE__ */ new Date(value + "T12:00:00Z");
	if (Number.isNaN(date.getTime())) return "—";
	return new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "short",
		timeZone: "UTC"
	}).format(date);
}
function formatMonth(value, style = "long") {
	const date = /* @__PURE__ */ new Date(value + "-01T00:00:00Z");
	if (Number.isNaN(date.getTime())) return value;
	return new Intl.DateTimeFormat("pt-BR", {
		month: style,
		year: "numeric",
		timeZone: "UTC"
	}).format(date);
}
function todayInSaoPaulo() {
	const parts = new Intl.DateTimeFormat("en-CA", {
		timeZone: "America/Sao_Paulo",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).formatToParts(/* @__PURE__ */ new Date());
	const part = (type) => parts.find((entry) => entry.type === type)?.value || "";
	return part("year") + "-" + part("month") + "-" + part("day");
}
function getChargeStatus(charge) {
	if (charge.received_cents >= charge.amount_cents) return {
		label: "Pago",
		className: "bg-[var(--status-good-bg)] text-[var(--status-good)]"
	};
	if (charge.received_cents > 0) return {
		label: "Parcial",
		className: "bg-[var(--status-warning-bg)] text-[var(--status-warning)]"
	};
	if (charge.due_date < todayInSaoPaulo()) return {
		label: "Vencido",
		className: "bg-[var(--status-critical-bg)] text-[var(--status-critical)]"
	};
	return {
		label: "Em aberto",
		className: "bg-[var(--surface-soft)] text-[var(--muted)]"
	};
}
function categoryLabel(category) {
	if (category === "equipe") return "Equipe";
	return EXPENSE_CATEGORIES.find((option) => option.value === category)?.label || "Outros";
}
function MetricCard({ label, value, helper, negative = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-[var(--muted)]",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 break-words text-2xl font-semibold tabular-nums sm:text-3xl " + (negative ? "text-[var(--status-critical)]" : "text-[var(--foreground)]"),
				children: formatCurrency(value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-5 text-[var(--muted)]",
				children: helper
			})
		]
	});
}
function FinanceDialog({ dialog, month, busy, error, onClose, onSubmit }) {
	const dialogRef = (0, import_react.useCallback)((element) => {
		if (element && !element.open) element.showModal();
	}, []);
	if (!dialog) return null;
	const charge = dialog.kind === "charge" ? dialog.record : void 0;
	const expense = dialog.kind === "expense" ? dialog.record : void 0;
	const payrollExpense = expense?.category === "equipe";
	const receiptCharge = dialog.kind === "receipt" ? dialog.charge : void 0;
	const title = dialog.kind === "charge" ? charge ? "Editar cobrança" : "Nova cobrança" : dialog.kind === "expense" ? payrollExpense ? "Editar plantão" : expense ? "Editar despesa" : "Nova despesa" : "Registrar recebimento";
	const description = payrollExpense ? "Ajuste o valor deste plantão e registre a data do pagamento." : dialog.kind === "receipt" ? "Informe a data e o valor recebido para esta cobrança." : "Os campos marcados com * são obrigatórios.";
	const remainingCents = receiptCharge ? Math.max(0, receiptCharge.amount_cents - receiptCharge.received_cents) : 0;
	function submit(event) {
		event.preventDefault();
		onSubmit(new FormData(event.currentTarget));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dialog", {
		ref: dialogRef,
		"aria-modal": "true",
		"aria-labelledby": "finance-dialog-title",
		"aria-describedby": "finance-dialog-description",
		onCancel: (event) => {
			event.preventDefault();
			onClose();
		},
		onClick: (event) => {
			if (event.target === event.currentTarget) onClose();
		},
		className: "m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-0 shadow-2xl backdrop:bg-black/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5 sm:p-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "finance-dialog-title",
					className: "text-xl font-semibold text-[var(--foreground)]",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					id: "finance-dialog-description",
					className: "mt-1 text-sm text-[var(--muted)]",
					children: description
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				children: [
					dialog.kind === "charge" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "charge-label",
									className: LABEL_CLASS,
									children: "Cliente / contrato *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "charge-label",
									name: "label",
									type: "text",
									maxLength: 180,
									autoComplete: "off",
									required: true,
									defaultValue: charge?.label || "",
									placeholder: "Ex.: contrato da família Silva",
									className: INPUT_CLASS
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "charge-competence",
								className: LABEL_CLASS,
								children: "Competência *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "charge-competence",
								name: "competence_month",
								type: "month",
								required: true,
								defaultValue: charge?.competence_month || month,
								className: INPUT_CLASS
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "charge-due-date",
								className: LABEL_CLASS,
								children: "Vencimento *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "charge-due-date",
								name: "due_date",
								type: "date",
								required: true,
								defaultValue: charge?.due_date || todayInSaoPaulo(),
								className: INPUT_CLASS
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "charge-amount",
								className: LABEL_CLASS,
								children: "Valor total (R$) *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "charge-amount",
								name: "amount",
								type: "number",
								min: "0.01",
								step: "0.01",
								inputMode: "decimal",
								required: true,
								defaultValue: charge ? centsToInput(charge.amount_cents) : "",
								className: INPUT_CLASS
							})] })
						]
					}),
					dialog.kind === "expense" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [payrollExpense ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-[var(--surface-soft)] p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-[var(--foreground)]",
										children: expense?.payee || "Cuidador"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-[var(--muted)]",
										children: ["Paciente: ", expense?.patient_name || "Não identificado"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-[var(--muted)]",
										children: ["Plantão em ", formatDate(expense?.expense_date || null)]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "payroll-amount",
										className: LABEL_CLASS,
										children: "Valor do plantão (R$) *"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "payroll-amount",
										name: "amount",
										type: "number",
										min: "0.01",
										step: "0.01",
										inputMode: "decimal",
										required: true,
										defaultValue: expense ? centsToInput(expense.amount_cents) : "",
										className: INPUT_CLASS
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs leading-5 text-[var(--muted)]",
										children: "Alterações pontuais ficam vinculadas a este plantão e não serão substituídas por atualizações futuras da tarifa da família."
									})
								]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "expense-date",
								className: LABEL_CLASS,
								children: "Data *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "expense-date",
								name: "expense_date",
								type: "date",
								required: true,
								defaultValue: expense?.expense_date || todayInSaoPaulo(),
								className: INPUT_CLASS
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "expense-category",
								className: LABEL_CLASS,
								children: "Categoria *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "expense-category",
								name: "category",
								required: true,
								defaultValue: expense?.category || "",
								className: INPUT_CLASS,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									disabled: true,
									children: "Selecione"
								}), EXPENSE_CATEGORIES.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: option.value,
									children: option.label
								}, option.value))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "expense-description",
								className: LABEL_CLASS,
								children: "Descrição *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "expense-description",
								name: "description",
								type: "text",
								maxLength: 180,
								autoComplete: "off",
								required: true,
								defaultValue: expense?.description || "",
								className: INPUT_CLASS
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "expense-amount",
								className: LABEL_CLASS,
								children: "Valor (R$) *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "expense-amount",
								name: "amount",
								type: "number",
								min: "0.01",
								step: "0.01",
								inputMode: "decimal",
								required: true,
								defaultValue: expense ? centsToInput(expense.amount_cents) : "",
								className: INPUT_CLASS
							})] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: payrollExpense ? "sm:col-span-2" : "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: payrollExpense ? "payroll-paid-on" : "expense-paid-on",
								className: LABEL_CLASS,
								children: "Data do pagamento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: payrollExpense ? "payroll-paid-on" : "expense-paid-on",
								name: "paid_on",
								type: "date",
								defaultValue: expense?.paid_on || "",
								className: INPUT_CLASS
							})]
						})]
					}),
					dialog.kind === "receipt" && receiptCharge && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2 rounded-xl bg-[var(--surface-soft)] p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-[var(--muted)]",
									children: "Saldo desta cobrança"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xl font-semibold tabular-nums text-[var(--foreground)]",
									children: formatCurrency(remainingCents)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "receipt-date",
								className: LABEL_CLASS,
								children: "Data do recebimento *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "receipt-date",
								name: "received_on",
								type: "date",
								required: true,
								defaultValue: todayInSaoPaulo(),
								className: INPUT_CLASS
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "receipt-amount",
								className: LABEL_CLASS,
								children: "Valor recebido (R$) *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "receipt-amount",
								name: "amount",
								type: "number",
								min: "0.01",
								max: centsToInput(remainingCents),
								step: "0.01",
								inputMode: "decimal",
								required: true,
								defaultValue: centsToInput(remainingCents),
								className: INPUT_CLASS
							})] })
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 rounded-xl border border-[var(--status-critical)]/25 bg-[var(--status-critical-bg)] px-4 py-3 text-sm leading-5 text-[var(--status-critical)]",
						role: "alert",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: onClose,
							disabled: busy,
							className: "min-h-11",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							className: "min-h-11",
							children: busy ? "Salvando…" : dialog.kind === "receipt" ? "Registrar recebimento" : payrollExpense ? "Salvar pagamento" : "Salvar"
						})]
					})
				]
			})]
		})
	});
}
function ChargeActions({ charge, busy, onReceive, onEdit, onDelete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-end gap-1",
		children: [
			Math.max(0, charge.amount_cents - charge.received_cents) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onReceive(charge),
				className: "min-h-11 rounded-lg px-2 text-sm font-semibold text-[var(--brand-dark)] hover:bg-[var(--brand-light)]",
				children: "Registrar recebimento"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onEdit(charge),
				className: "min-h-11 rounded-lg px-2 text-sm font-semibold text-[var(--brand-dark)] hover:bg-[var(--brand-light)]",
				children: "Editar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onDelete(charge),
				disabled: busy,
				"aria-label": "Excluir cobrança " + charge.label,
				className: "min-h-11 rounded-lg px-2 text-sm font-semibold text-[var(--status-critical)] hover:bg-[var(--status-critical-bg)] disabled:cursor-not-allowed disabled:opacity-50",
				children: "Excluir"
			})
		]
	});
}
function ExpenseActions({ expense, busy, onEdit, onDelete }) {
	const isPayrollExpense = expense.category === "equipe";
	const isArchivedPayroll = isPayrollExpense && !expense.caregiver_schedule_entry_id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-end gap-1",
		children: [
			!isArchivedPayroll && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onEdit(expense),
				disabled: busy,
				className: "min-h-11 rounded-lg px-2 text-sm font-semibold text-[var(--brand-dark)] hover:bg-[var(--brand-light)]",
				children: isPayrollExpense ? "Editar plantão" : "Editar"
			}),
			isArchivedPayroll && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "px-2 text-xs text-[var(--muted)]",
				children: "Histórico pago"
			}),
			!isPayrollExpense && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onDelete(expense),
				disabled: busy,
				"aria-label": "Excluir despesa " + expense.description,
				className: "min-h-11 rounded-lg px-2 text-sm font-semibold text-[var(--status-critical)] hover:bg-[var(--status-critical-bg)] disabled:cursor-not-allowed disabled:opacity-50",
				children: "Excluir"
			})
		]
	});
}
function FinanceDashboard({ initialMonth }) {
	const [month, setMonth] = (0, import_react.useState)(initialMonth);
	const [snapshot, setSnapshot] = (0, import_react.useState)(() => emptyFinanceSnapshot(initialMonth));
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)("");
	const [dialog, setDialog] = (0, import_react.useState)(null);
	const [dialogError, setDialogError] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [busyId, setBusyId] = (0, import_react.useState)("");
	const [actionError, setActionError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	const loadSnapshot = (0, import_react.useCallback)(async (selectedMonth, signal) => {
		try {
			const response = await fetch("/api/admin/finance?month=" + encodeURIComponent(selectedMonth), {
				cache: "no-store",
				signal
			});
			const payload = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(typeof payload?.error === "string" ? payload.error : "Não foi possível carregar o financeiro.");
			setLoadError("");
			setSnapshot(payload);
			return true;
		} catch (error) {
			if (signal?.aborted) return false;
			setSnapshot(emptyFinanceSnapshot(selectedMonth));
			setLoadError(error instanceof Error ? error.message : "Não foi possível carregar o financeiro.");
			return false;
		} finally {
			if (!signal?.aborted) setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		const refresh = window.setTimeout(() => {
			loadSnapshot(month, controller.signal);
		}, 0);
		return () => {
			window.clearTimeout(refresh);
			controller.abort();
		};
	}, [loadSnapshot, month]);
	const monthFlow = (0, import_react.useMemo)(() => snapshot.cash_flow.find((point) => point.month === month) || {
		month,
		received_cents: 0,
		paid_cents: 0
	}, [month, snapshot.cash_flow]);
	const chartData = (0, import_react.useMemo)(() => snapshot.cash_flow.map((point) => ({
		...point,
		month_label: formatMonth(point.month, "short"),
		result_cents: point.received_cents - point.paid_cents
	})), [snapshot.cash_flow]);
	const chargedCents = snapshot.charges.reduce((total, charge) => total + charge.amount_cents, 0);
	const expenseCents = snapshot.expenses.reduce((total, expense) => total + expense.amount_cents, 0);
	const expenseDetails = snapshot.expenses.filter((expense) => expense.category !== "equipe");
	const managerialResultCents = chargedCents - expenseCents;
	const chartTotals = snapshot.cash_flow.reduce((total, point) => ({
		received: total.received + point.received_cents,
		paid: total.paid + point.paid_cents
	}), {
		received: 0,
		paid: 0
	});
	const resultCents = monthFlow.received_cents - monthFlow.paid_cents;
	const hasCashMovements = chartTotals.received > 0 || chartTotals.paid > 0;
	const payrollSummary = (0, import_react.useMemo)(() => {
		const groups = /* @__PURE__ */ new Map();
		for (const expense of snapshot.expenses) {
			if (expense.category !== "equipe") continue;
			const key = expense.caregiver_user_id || expense.payee || "cuidador-sem-nome";
			const group = groups.get(key) || {
				key,
				name: expense.payee || "Cuidador",
				shifts: 0,
				totalCents: 0,
				paidCents: 0,
				expenses: []
			};
			group.shifts += 1;
			group.totalCents += expense.amount_cents;
			if (expense.paid_on) group.paidCents += expense.amount_cents;
			group.expenses.push(expense);
			groups.set(key, group);
		}
		return [...groups.values()].map((group) => ({
			...group,
			openCents: group.totalCents - group.paidCents
		})).sort((left, right) => left.name.localeCompare(right.name, "pt-BR"));
	}, [snapshot.expenses]);
	function openDialog(nextDialog) {
		setDialogError("");
		setActionError("");
		setNotice("");
		setDialog(nextDialog);
	}
	async function submitDialog(formData) {
		if (!dialog) return;
		setSaving(true);
		setDialogError("");
		setActionError("");
		let action = "";
		let payload = {};
		if (dialog.kind === "charge") {
			action = dialog.record ? "update_charge" : "create_charge";
			payload = {
				action,
				label: String(formData.get("label") || ""),
				competence_month: String(formData.get("competence_month") || ""),
				due_date: String(formData.get("due_date") || ""),
				amount: String(formData.get("amount") || "")
			};
			if (dialog.record) payload.id = dialog.record.id;
		} else if (dialog.kind === "expense") if (dialog.record?.category === "equipe") {
			action = "update_payroll_expense";
			payload = {
				action,
				id: dialog.record.id,
				amount: String(formData.get("amount") || ""),
				paid_on: String(formData.get("paid_on") || "")
			};
		} else {
			action = dialog.record ? "update_expense" : "create_expense";
			payload = {
				action,
				expense_date: String(formData.get("expense_date") || ""),
				category: String(formData.get("category") || ""),
				description: String(formData.get("description") || ""),
				amount: String(formData.get("amount") || ""),
				paid_on: String(formData.get("paid_on") || "")
			};
			if (dialog.record) payload.id = dialog.record.id;
		}
		else {
			action = "record_receipt";
			payload = {
				action,
				charge_id: dialog.charge.id,
				received_on: String(formData.get("received_on") || ""),
				amount: String(formData.get("amount") || "")
			};
		}
		try {
			const response = await fetch("/api/admin/finance", {
				method: dialog.kind !== "receipt" && dialog.record ? "PATCH" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const result = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(typeof result?.error === "string" ? result.error : "Não foi possível salvar o lançamento.");
			const successText = dialog.kind === "receipt" ? "Recebimento registrado." : dialog.kind === "charge" ? dialog.record ? "Cobrança atualizada." : "Cobrança adicionada." : dialog.record?.category === "equipe" ? "Plantão atualizado." : dialog.record ? "Despesa atualizada." : "Despesa adicionada.";
			setDialog(null);
			setNotice(successText);
			await loadSnapshot(month);
		} catch (error) {
			setDialogError(error instanceof Error ? error.message : "Não foi possível salvar o lançamento.");
		} finally {
			setSaving(false);
		}
	}
	async function removeCharge(charge) {
		if (!window.confirm("Excluir esta cobrança? Os recebimentos registrados nela também serão apagados.")) return;
		setBusyId(charge.id);
		setActionError("");
		setNotice("");
		try {
			const response = await fetch("/api/admin/finance?entity=charge&id=" + encodeURIComponent(charge.id), { method: "DELETE" });
			const result = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(result?.error || "Não foi possível excluir a cobrança.");
			setNotice("Cobrança excluída.");
			await loadSnapshot(month);
		} catch (error) {
			setActionError(error instanceof Error ? error.message : "Não foi possível excluir a cobrança.");
		} finally {
			setBusyId("");
		}
	}
	async function removeExpense(expense) {
		if (!window.confirm("Excluir esta despesa?")) return;
		setBusyId(expense.id);
		setActionError("");
		setNotice("");
		try {
			const response = await fetch("/api/admin/finance?entity=expense&id=" + encodeURIComponent(expense.id), { method: "DELETE" });
			const result = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(result?.error || "Não foi possível excluir a despesa.");
			setNotice("Despesa excluída.");
			await loadSnapshot(month);
		} catch (error) {
			setActionError(error instanceof Error ? error.message : "Não foi possível excluir a despesa.");
		} finally {
			setBusyId("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-7xl",
		"aria-busy": loading,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-7 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-dark)]",
							children: "Love Sênior / operação"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl font-semibold leading-tight text-[var(--foreground)] sm:text-4xl",
							children: "Financeiro"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-[var(--muted)]",
							children: "Acompanhe cobranças, despesas e o resultado financeiro por competência."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "finance-month",
						className: LABEL_CLASS,
						children: "Competência"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "finance-month",
						type: "month",
						value: month,
						onChange: (event) => {
							setLoading(true);
							setLoadError("");
							setNotice("");
							setActionError("");
							setMonth(event.target.value);
						},
						className: INPUT_CLASS + " min-w-48"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							onClick: () => openDialog({ kind: "charge" }),
							className: "min-h-11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "＋"
							}), " Nova cobrança"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: () => openDialog({ kind: "expense" }),
							className: "min-h-11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "＋"
							}), " Nova despesa"]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 min-h-6",
				"aria-live": "polite",
				children: [
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-sm text-[var(--muted)]",
						children: "Carregando lançamentos financeiros…"
					}),
					notice && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-sm font-medium text-[var(--status-good)]",
						children: notice
					}),
					loadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "rounded-xl border border-[var(--status-warning)]/30 bg-[var(--status-warning-bg)] px-4 py-3 text-sm leading-5 text-[var(--foreground)]",
						children: loadError
					}),
					actionError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "rounded-xl border border-[var(--status-critical)]/25 bg-[var(--status-critical-bg)] px-4 py-3 text-sm leading-5 text-[var(--status-critical)]",
						children: actionError
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "finance-metrics-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					id: "finance-metrics-title",
					className: "sr-only",
					children: ["Resumo financeiro de ", formatMonth(month)]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "A receber",
							value: totalChargeBalance(snapshot.charges),
							helper: "Saldo das cobranças desta competência"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Entradas recebidas",
							value: monthFlow.received_cents,
							helper: "Recebimentos registrados em " + formatMonth(month)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Despesas pagas",
							value: monthFlow.paid_cents,
							helper: "Pagamentos registrados em " + formatMonth(month)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
							label: "Resultado financeiro",
							value: resultCents,
							helper: "Entradas recebidas menos despesas pagas",
							negative: resultCents < 0
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6",
				"aria-labelledby": "finance-chart-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "finance-chart-title",
								className: "text-lg font-semibold text-[var(--foreground)]",
								children: "Entradas, saídas e resultado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-[var(--muted)]",
								children: [
									"Visão mensal das liquidações nos seis meses até ",
									formatMonth(month),
									"."
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "self-start rounded-full bg-[var(--brand-light)] px-3 py-1 text-xs font-semibold text-[var(--brand-dark)]",
								children: "Por mês"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-72 min-w-0 sm:h-80",
							role: "img",
							"aria-label": "Gráfico mensal de entradas, saídas e resultado financeiro",
							"aria-describedby": "finance-chart-summary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
									data: chartData,
									margin: {
										top: 10,
										right: 10,
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
											width: 70
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											formatter: (value, name) => [formatCurrency(Number(value)), String(name)],
											labelFormatter: (label) => String(label),
											contentStyle: {
												borderRadius: 12,
												border: "1px solid #e4ebe9",
												fontSize: 12
											},
											cursor: { fill: "rgba(36, 103, 95, 0.06)" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
											fontSize: 12,
											paddingTop: 8
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "received_cents",
											name: "Entradas",
											fill: CHART_GREEN,
											radius: [
												5,
												5,
												0,
												0
											],
											maxBarSize: 32
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "paid_cents",
											name: "Saídas",
											fill: CHART_RED,
											radius: [
												5,
												5,
												0,
												0
											],
											maxBarSize: 32
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											dataKey: "result_cents",
											name: "Resultado",
											type: "monotone",
											stroke: CHART_LINE,
											strokeWidth: 2.5,
											dot: {
												r: 3,
												fill: CHART_LINE
											},
											activeDot: { r: 5 }
										})
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: "finance-chart-summary",
							className: "mt-2 text-sm leading-6 text-[var(--muted)]",
							children: hasCashMovements ? "No período: entradas de " + formatCurrency(chartTotals.received) + ", saídas de " + formatCurrency(chartTotals.paid) + " e resultado de " + formatCurrency(chartTotals.received - chartTotals.paid) + "." : "Sem movimentações liquidadas neste período. O gráfico considera a data de cada recebimento e pagamento."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6",
				"aria-labelledby": "finance-charges-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "finance-charges-title",
								className: "text-lg font-semibold text-[var(--foreground)]",
								children: "Cobranças"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-3xl text-sm leading-6 text-[var(--muted)]",
								children: "Controle os valores a receber. Registre recebimentos totais ou parciais para atualizar o saldo e o gráfico."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: () => openDialog({ kind: "charge" }),
								className: "min-h-11 self-start lg:self-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "＋"
								}), " Nova cobrança"]
							})]
						}),
						snapshot.charges.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 hidden overflow-hidden rounded-xl border border-[var(--border)] sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full min-w-[860px] border-collapse",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("caption", {
											className: "sr-only",
											children: ["Cobranças da competência ", formatMonth(month)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS,
												children: "Vencimento"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS,
												children: "Cliente / contrato"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS,
												children: "Valor"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS,
												children: "Recebido"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS,
												children: "Situação"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS + " text-right",
												children: "Ações"
											})
										] }) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: snapshot.charges.map((charge) => {
											const status = getChargeStatus(charge);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "hover:bg-[var(--surface-soft)]/70",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: TABLE_CELL_CLASS + " whitespace-nowrap font-semibold tabular-nums",
														children: formatDate(charge.due_date)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: TABLE_CELL_CLASS + " max-w-[20rem] break-words font-medium",
														children: charge.label
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: TABLE_CELL_CLASS + " whitespace-nowrap tabular-nums",
														children: formatCurrency(charge.amount_cents)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: TABLE_CELL_CLASS + " whitespace-nowrap tabular-nums",
														children: formatCurrency(charge.received_cents)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: TABLE_CELL_CLASS,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "inline-flex min-h-7 items-center rounded-full px-3 text-xs font-semibold " + status.className,
															children: status.label
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: TABLE_CELL_CLASS + " text-right",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChargeActions, {
															charge,
															busy: busyId === charge.id,
															onReceive: (item) => openDialog({
																kind: "receipt",
																charge: item
															}),
															onEdit: (item) => openDialog({
																kind: "charge",
																record: item
															}),
															onDelete: removeCharge
														})
													})
												]
											}, charge.id);
										}) })
									]
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 space-y-3 sm:hidden",
							children: snapshot.charges.map((charge) => {
								const status = getChargeStatus(charge);
								const openCents = Math.max(0, charge.amount_cents - charge.received_cents);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
									className: "group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
										className: "flex min-h-20 cursor-pointer list-none items-center justify-between gap-3 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--brand)] [&::-webkit-details-marker]:hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "inline-flex min-h-7 items-center rounded-full px-3 text-xs font-semibold " + status.className,
														children: status.label
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs text-[var(--muted)]",
														children: ["Vence em ", formatDate(charge.due_date)]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 break-words text-sm font-semibold text-[var(--foreground)]",
													children: charge.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-sm tabular-nums text-[var(--muted)]",
													children: formatCurrency(charge.amount_cents)
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											className: "shrink-0 text-lg text-[var(--muted)] transition-transform group-open:rotate-180",
											children: "⌄"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-[var(--border)] px-4 pb-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
											className: "grid grid-cols-2 gap-x-3 gap-y-3 py-2 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-xs text-[var(--muted)]",
													children: "Valor"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "mt-1 font-medium tabular-nums text-[var(--foreground)]",
													children: formatCurrency(charge.amount_cents)
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-xs text-[var(--muted)]",
													children: "Recebido"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "mt-1 font-medium tabular-nums text-[var(--foreground)]",
													children: formatCurrency(charge.received_cents)
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-xs text-[var(--muted)]",
													children: "Em aberto"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "mt-1 font-medium tabular-nums text-[var(--foreground)]",
													children: formatCurrency(openCents)
												})] })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "-mx-2 border-t border-[var(--border)] pt-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChargeActions, {
												charge,
												busy: busyId === charge.id,
												onReceive: (item) => openDialog({
													kind: "receipt",
													charge: item
												}),
												onEdit: (item) => openDialog({
													kind: "charge",
													record: item
												}),
												onDelete: removeCharge
											})
										})]
									})]
								}, charge.id);
							})
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-8 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-[var(--foreground)]",
									children: "Nenhuma cobrança nesta competência"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-6 text-[var(--muted)]",
									children: "Cadastre uma cobrança para acompanhar vencimento e recebimentos."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									onClick: () => openDialog({ kind: "charge" }),
									className: "mt-4 min-h-11",
									children: "Adicionar cobrança"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-[var(--muted)]",
							children: [
								"Total lançado: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-semibold tabular-nums text-[var(--foreground)]",
									children: formatCurrency(chargedCents)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "px-2",
									"aria-hidden": "true",
									children: "·"
								}),
								"Em aberto: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-semibold tabular-nums text-[var(--foreground)]",
									children: formatCurrency(totalChargeBalance(snapshot.charges))
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6",
				"aria-labelledby": "finance-expenses-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "finance-expenses-title",
								className: "text-lg font-semibold text-[var(--foreground)]",
								children: "Despesas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-6 text-[var(--muted)]",
								children: "Acompanhe os gastos da operação. Os pagamentos da equipe ficam resumidos acima."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: () => openDialog({ kind: "expense" }),
								className: "min-h-11 self-start lg:self-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "＋"
								}), " Nova despesa"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 sm:p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-[var(--foreground)]",
									children: "Pagamentos da equipe"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-[var(--muted)]",
									children: "Resumo dos pagamentos lançados para plantões nesta competência."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-[var(--muted)]",
									children: ["Em aberto: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "font-semibold tabular-nums text-[var(--foreground)]",
										children: formatCurrency(payrollSummary.reduce((total, caregiver) => total + caregiver.openCents, 0))
									})]
								})]
							}), payrollSummary.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3",
								children: payrollSummary.map((caregiver) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "min-w-0 break-words font-semibold text-[var(--foreground)]",
												children: caregiver.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "shrink-0 text-xs text-[var(--muted)]",
												children: [
													caregiver.shifts,
													" ",
													caregiver.shifts === 1 ? "pagamento" : "pagamentos"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
											className: "mt-3 space-y-2 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
														className: "text-[var(--muted)]",
														children: "Total"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
														className: "font-medium tabular-nums text-[var(--foreground)]",
														children: formatCurrency(caregiver.totalCents)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
														className: "text-[var(--muted)]",
														children: "Pago"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
														className: "font-medium tabular-nums text-[var(--foreground)]",
														children: formatCurrency(caregiver.paidCents)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between gap-3 border-t border-[var(--border)] pt-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
														className: "font-semibold text-[var(--brand-dark)]",
														children: "A pagar"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
														className: "font-semibold tabular-nums text-[var(--brand-dark)]",
														children: formatCurrency(caregiver.openCents)
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
											className: "mt-3 border-t border-[var(--border)] pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
												className: "min-h-11 cursor-pointer py-3 text-sm font-semibold text-[var(--brand-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand)]",
												children: "Ver plantões para ajuste"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "space-y-2 pb-2",
												children: caregiver.expenses.map((expense) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[var(--surface-soft)] p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-sm font-medium tabular-nums text-[var(--foreground)]",
																children: formatDate(expense.expense_date)
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-1 text-xs text-[var(--muted)]",
																children: expense.patient_name || "Paciente não identificado"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-1 text-xs text-[var(--muted)]",
																children: expense.paid_on ? `Pago em ${formatDate(expense.paid_on)}` : "Em aberto"
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col items-end gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-sm font-semibold tabular-nums text-[var(--foreground)]",
															children: formatCurrency(expense.amount_cents)
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseActions, {
															expense,
															busy: busyId === expense.id,
															onEdit: (item) => openDialog({
																kind: "expense",
																record: item
															}),
															onDelete: removeExpense
														})]
													})]
												}, expense.id))
											})]
										})
									]
								}, caregiver.key))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 rounded-lg bg-[var(--surface)] px-4 py-3 text-sm leading-5 text-[var(--muted)]",
								children: "Os valores serão calculados quando houver plantões na escala e tarifas cadastradas para o paciente na família."
							})]
						}),
						expenseDetails.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 hidden overflow-hidden rounded-xl border border-[var(--border)] sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full min-w-[760px] border-collapse",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("caption", {
											className: "sr-only",
											children: ["Despesas da competência ", formatMonth(month)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS,
												children: "Data"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS,
												children: "Categoria"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS,
												children: "Descrição"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS,
												children: "Valor"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS,
												children: "Pago em"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												scope: "col",
												className: TABLE_HEAD_CLASS + " text-right",
												children: "Ações"
											})
										] }) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: expenseDetails.map((expense) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "hover:bg-[var(--surface-soft)]/70",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: TABLE_CELL_CLASS + " whitespace-nowrap font-semibold tabular-nums",
													children: formatDate(expense.expense_date)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: TABLE_CELL_CLASS + " whitespace-nowrap",
													children: categoryLabel(expense.category)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: TABLE_CELL_CLASS + " max-w-[18rem] break-words",
													children: expense.description
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: TABLE_CELL_CLASS + " whitespace-nowrap tabular-nums",
													children: formatCurrency(expense.amount_cents)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: TABLE_CELL_CLASS + " whitespace-nowrap",
													children: expense.paid_on ? formatDate(expense.paid_on) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "inline-flex min-h-7 items-center rounded-full bg-[var(--status-warning-bg)] px-3 text-xs font-semibold text-[var(--status-warning)]",
														children: "Em aberto"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: TABLE_CELL_CLASS + " text-right",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseActions, {
														expense,
														busy: busyId === expense.id,
														onEdit: (item) => openDialog({
															kind: "expense",
															record: item
														}),
														onDelete: removeExpense
													})
												})
											]
										}, expense.id)) })
									]
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 space-y-3 sm:hidden",
							children: expenseDetails.map((expense) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex min-h-20 cursor-pointer list-none items-center justify-between gap-3 p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--brand)] [&::-webkit-details-marker]:hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "inline-flex min-h-7 items-center rounded-full bg-[var(--surface-soft)] px-3 text-xs font-semibold text-[var(--muted)]",
													children: categoryLabel(expense.category)
												}), expense.paid_on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-[var(--muted)]",
													children: "Pago"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "inline-flex min-h-7 items-center rounded-full bg-[var(--status-warning-bg)] px-3 text-xs font-semibold text-[var(--status-warning)]",
													children: "Em aberto"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 break-words text-sm font-semibold text-[var(--foreground)]",
												children: expense.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm tabular-nums text-[var(--muted)]",
												children: formatCurrency(expense.amount_cents)
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										className: "shrink-0 text-lg text-[var(--muted)] transition-transform group-open:rotate-180",
										children: "⌄"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-[var(--border)] px-4 pb-3 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
										className: "grid grid-cols-2 gap-x-3 gap-y-3 py-2 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-xs text-[var(--muted)]",
												children: "Data"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "mt-1 font-medium tabular-nums text-[var(--foreground)]",
												children: formatDate(expense.expense_date)
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
												className: "text-xs text-[var(--muted)]",
												children: "Pago em"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
												className: "mt-1 font-medium tabular-nums text-[var(--foreground)]",
												children: formatDate(expense.paid_on)
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "col-span-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-xs text-[var(--muted)]",
													children: "Categoria"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
													className: "mt-1 font-medium text-[var(--foreground)]",
													children: categoryLabel(expense.category)
												})]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "-mx-2 border-t border-[var(--border)] pt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseActions, {
											expense,
											busy: busyId === expense.id,
											onEdit: (item) => openDialog({
												kind: "expense",
												record: item
											}),
											onDelete: removeExpense
										})
									})]
								})]
							}, expense.id))
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-8 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-[var(--foreground)]",
									children: "Nenhuma outra despesa nesta competência"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-6 text-[var(--muted)]",
									children: "Os pagamentos da equipe ficam resumidos acima. Cadastre outras despesas para acompanhar valores e datas de pagamento."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "secondary",
									onClick: () => openDialog({ kind: "expense" }),
									className: "mt-4 min-h-11",
									children: "Adicionar despesa"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-[var(--muted)]",
							children: ["Total lançado (inclui pagamentos da equipe): ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "font-semibold tabular-nums text-[var(--foreground)]",
								children: formatCurrency(expenseCents)
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6",
				"aria-labelledby": "finance-result-title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						id: "finance-result-title",
						className: "text-lg font-semibold text-[var(--foreground)]",
						children: ["Resultado de ", formatMonth(month)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 max-w-2xl divide-y divide-[var(--border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-sm text-[var(--muted)]",
									children: "Faturamento lançado"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-semibold tabular-nums text-[var(--foreground)]",
									children: formatCurrency(chargedCents)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-sm text-[var(--muted)]",
									children: "Despesas lançadas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-semibold tabular-nums text-[var(--foreground)]",
									children: ["−", formatCurrency(expenseCents)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-semibold text-[var(--brand-dark)]",
									children: "Resultado gerencial"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-lg font-semibold tabular-nums " + (managerialResultCents < 0 ? "text-[var(--status-critical)]" : "text-[var(--brand-dark)]"),
									children: formatCurrency(managerialResultCents)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 border-t-2 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-sm text-[var(--muted)]",
									children: "Entradas recebidas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-semibold tabular-nums text-[var(--foreground)]",
									children: formatCurrency(monthFlow.received_cents)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-sm text-[var(--muted)]",
									children: "Despesas pagas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-semibold tabular-nums text-[var(--foreground)]",
									children: ["−", formatCurrency(monthFlow.paid_cents)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "font-semibold text-[var(--brand-dark)]",
									children: "Resultado de caixa"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-lg font-semibold tabular-nums " + (resultCents < 0 ? "text-[var(--status-critical)]" : "text-[var(--brand-dark)]"),
									children: formatCurrency(resultCents)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]",
						children: "O resultado gerencial considera cobranças e despesas lançadas na competência; plantões entram automaticamente como despesas de equipe. O resultado de caixa considera recebimentos e pagamentos efetivos."
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinanceDialog, {
				dialog,
				month,
				busy: saving,
				error: dialogError,
				onClose: () => {
					setDialog(null);
					setDialogError("");
				},
				onSubmit: (formData) => void submitDialog(formData)
			}, dialog ? dialog.kind === "receipt" ? dialog.kind + dialog.charge.id : dialog.kind + (dialog.record?.id || "new") : "closed")
		]
	});
}
//#endregion
export { FinanceDashboard };
