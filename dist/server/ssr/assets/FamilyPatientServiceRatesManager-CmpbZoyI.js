import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import { t as useRouter } from "./navigation-tipnko1D.js";
import { t as PROFESSION_LABELS } from "./date-utils-DBPeGKCT.js";
//#region src/components/admin/FamilyPatientServiceRatesManager.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var professions = Object.keys(PROFESSION_LABELS);
var inputClassName = "min-h-11 w-full rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]";
function emptyPatientDraft() {
	return {
		cuidador: {
			selected: false,
			amount: ""
		},
		tecnico_enfermagem: {
			selected: false,
			amount: ""
		},
		enfermeiro: {
			selected: false,
			amount: ""
		},
		outros: {
			selected: false,
			amount: ""
		}
	};
}
function draftsFromRates(patients, rates) {
	const result = {};
	for (const patient of patients) result[patient.id] = emptyPatientDraft();
	for (const rate of rates) {
		if (rate.valid_to !== null || !result[rate.patient_id]) continue;
		result[rate.patient_id][rate.profession] = {
			selected: true,
			amount: (rate.amount_cents / 100).toFixed(2)
		};
	}
	return result;
}
function amountToCents(value) {
	if (!value.trim()) return null;
	const normalized = value.trim().replace(",", ".");
	const amount = Number(normalized);
	if (!Number.isFinite(amount) || amount <= 0 || amount > 1e6) return null;
	return Math.round(amount * 100);
}
function FamilyPatientServiceRatesManager({ familyId, patients, rates, today, available }) {
	const router = useRouter();
	const [drafts, setDrafts] = (0, import_react.useState)((0, import_react.useMemo)(() => draftsFromRates(patients, rates), [patients, rates]));
	const currentMonth = today.slice(0, 7);
	const [competenceMonth, setCompetenceMonth] = (0, import_react.useState)(currentMonth);
	const [savingPatientId, setSavingPatientId] = (0, import_react.useState)(null);
	const [messageByPatient, setMessageByPatient] = (0, import_react.useState)({});
	const [errorByPatient, setErrorByPatient] = (0, import_react.useState)({});
	function changeService(patientId, profession, update) {
		setDrafts((current) => ({
			...current,
			[patientId]: {
				...current[patientId] || emptyPatientDraft(),
				[profession]: {
					...current[patientId]?.[profession] || emptyPatientDraft()[profession],
					...update
				}
			}
		}));
		setMessageByPatient((current) => ({
			...current,
			[patientId]: ""
		}));
		setErrorByPatient((current) => ({
			...current,
			[patientId]: ""
		}));
	}
	async function submit(event, patient) {
		event.preventDefault();
		const currentDraft = drafts[patient.id] || emptyPatientDraft();
		const selectedRates = [];
		for (const profession of professions) {
			const service = currentDraft[profession];
			if (!service.selected) continue;
			const amountCents = amountToCents(service.amount);
			if (!amountCents) {
				setErrorByPatient((current) => ({
					...current,
					[patient.id]: `Informe um valor por plantão válido para ${PROFESSION_LABELS[profession]}.`
				}));
				setMessageByPatient((current) => ({
					...current,
					[patient.id]: ""
				}));
				return;
			}
			selectedRates.push({
				profession,
				amount_cents: amountCents
			});
		}
		setSavingPatientId(patient.id);
		setMessageByPatient((current) => ({
			...current,
			[patient.id]: ""
		}));
		setErrorByPatient((current) => ({
			...current,
			[patient.id]: ""
		}));
		try {
			const response = await fetch(`/api/admin/families/${familyId}/service-rates`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					patient_id: patient.id,
					effective_from: `${competenceMonth}-01`,
					rates: selectedRates
				})
			});
			const result = await response.json().catch(() => null);
			if (!response.ok) throw new Error(result?.error || "Não foi possível salvar os valores.");
			setMessageByPatient((current) => ({
				...current,
				[patient.id]: "Valores salvos. Os plantões da competência foram sincronizados."
			}));
			router.refresh();
		} catch (submissionError) {
			setErrorByPatient((current) => ({
				...current,
				[patient.id]: submissionError instanceof Error ? submissionError.message : "Não foi possível salvar os valores. Tente novamente."
			}));
		} finally {
			setSavingPatientId(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-8",
		"aria-labelledby": "family-service-rates-heading",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "family-service-rates-heading",
					className: "text-lg font-semibold text-[var(--foreground)]",
					children: "Serviços contratados e custo por plantão"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-3xl text-sm leading-6 text-[var(--muted)]",
					children: "Configure cada paciente separadamente. A tarifa vale para todo o mês selecionado, mesmo nos plantões anteriores ao cadastro."
				})] }), patients.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "w-full text-sm font-medium text-[var(--muted)] sm:max-w-56",
					children: ["Competência da tarifa", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "month",
						value: competenceMonth,
						min: currentMonth,
						disabled: !available,
						onChange: (event) => setCompetenceMonth(event.target.value),
						className: `${inputClassName} mt-1 disabled:cursor-not-allowed disabled:bg-[var(--surface-soft)] disabled:opacity-70`
					})]
				})]
			}),
			!available && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "status",
				className: "mb-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950",
				children: "A configuração está aguardando a migration no banco. Você pode visualizar esta área, mas os valores só poderão ser editados e salvos depois que a migration for aplicada."
			}),
			patients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]",
				children: "Vincule pacientes a esta família antes de configurar os valores dos serviços."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: patients.map((patient) => {
					const patientDraft = drafts[patient.id] || emptyPatientDraft();
					const selectedCount = professions.filter((profession) => patientDraft[profession]?.selected).length;
					const saving = savingPatientId === patient.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "group rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden sm:px-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate font-semibold text-[var(--foreground)]",
									children: patient.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-xs text-[var(--muted)]",
									children: selectedCount ? `${selectedCount} serviço${selectedCount === 1 ? "" : "s"} configurado${selectedCount === 1 ? "" : "s"}` : "Nenhum serviço configurado"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: "text-lg text-[var(--brand)] transition-transform group-open:rotate-180",
								children: "⌄"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (event) => void submit(event, patient),
							className: "border-t border-[var(--border)] px-4 py-4 sm:px-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-4 text-sm leading-6 text-[var(--muted)]",
									children: "Marque somente as funções previstas no contrato para este paciente. Pagamentos já efetuados e valores ajustados manualmente serão preservados."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: professions.map((profession) => {
										const service = patientDraft[profession] || emptyPatientDraft()[profession];
										const inputId = `family-rate-${patient.id}-${profession}`;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												htmlFor: `${inputId}-selected`,
												className: "flex min-h-8 cursor-pointer items-center gap-2 text-sm font-medium text-[var(--foreground)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													id: `${inputId}-selected`,
													type: "checkbox",
													checked: service.selected,
													disabled: !available,
													onChange: (event) => changeService(patient.id, profession, { selected: event.target.checked }),
													className: "h-4 w-4 accent-[var(--brand)] disabled:cursor-not-allowed"
												}), PROFESSION_LABELS[profession]]
											}), service.selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												htmlFor: inputId,
												className: "mt-3 block text-xs font-medium text-[var(--muted)]",
												children: ["Custo por plantão (R$)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													id: inputId,
													type: "number",
													min: "0.01",
													max: "1000000",
													step: "0.01",
													inputMode: "decimal",
													required: true,
													value: service.amount,
													disabled: !available,
													onChange: (event) => changeService(patient.id, profession, { amount: event.target.value }),
													className: `${inputClassName} mt-1 disabled:cursor-not-allowed disabled:bg-[var(--surface-soft)] disabled:opacity-70`
												})]
											})]
										}, profession);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-col gap-3 border-t border-[var(--border)] pt-4 sm:flex-row sm:items-center sm:justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										role: "status",
										"aria-live": "polite",
										className: "text-sm text-[var(--status-good)]",
										children: messageByPatient[patient.id] || ""
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: !available || saving || !competenceMonth,
										className: "min-h-11 rounded-xl bg-[var(--brand)] px-4 text-sm font-semibold text-white hover:bg-[var(--brand-dark)] disabled:cursor-not-allowed disabled:opacity-60",
										children: saving ? "Salvando…" : "Salvar valores deste paciente"
									})]
								}),
								errorByPatient[patient.id] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									"aria-live": "assertive",
									className: "mt-3 text-sm text-[var(--status-critical)]",
									children: errorByPatient[patient.id]
								})
							]
						})]
					}, patient.id);
				})
			})
		]
	});
}
//#endregion
export { FamilyPatientServiceRatesManager };
