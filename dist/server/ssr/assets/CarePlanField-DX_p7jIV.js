import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
//#region src/components/admin/care-plan.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var DAYTIME_CARE_PLAN = "Período diurno 12h/dia";
var NIGHTTIME_CARE_PLAN = "Período noturno 12h/dia";
var FULL_DAY_CARE_PLAN = "24 horas";
var CUSTOM_CARE_PLAN_LABEL = "Personalizado";
var CUSTOM_CARE_PLAN_OPTION = "__custom__";
var LEGACY_CARE_PLAN_OPTION = "__legacy__";
var STANDARD_CARE_PLAN_VALUES = [
	DAYTIME_CARE_PLAN,
	NIGHTTIME_CARE_PLAN,
	FULL_DAY_CARE_PLAN
];
var CARE_PLAN_OPTIONS = [
	{
		value: DAYTIME_CARE_PLAN,
		label: DAYTIME_CARE_PLAN
	},
	{
		value: NIGHTTIME_CARE_PLAN,
		label: NIGHTTIME_CARE_PLAN
	},
	{
		value: FULL_DAY_CARE_PLAN,
		label: FULL_DAY_CARE_PLAN
	},
	{
		value: CUSTOM_CARE_PLAN_OPTION,
		label: CUSTOM_CARE_PLAN_LABEL
	}
];
var MINUTES_PER_DAY = 1440;
var TIME_PATTERN = /^(\d{2}):(\d{2})$/;
var CUSTOM_CARE_PLAN_PATTERN = /^Personalizado\s*\(\s*((?:[01]\d|2[0-3]):[0-5]\d)\s*(?:–|-|às)\s*((?:[01]\d|2[0-3]):[0-5]\d)\s*\)$/u;
function isStandardCarePlan(value) {
	return STANDARD_CARE_PLAN_VALUES.some((plan) => plan === value);
}
function timeToMinutes(value) {
	const match = TIME_PATTERN.exec(value);
	if (!match) return null;
	const hours = Number(match[1]);
	const minutes = Number(match[2]);
	if (hours > 23 || minutes > 59) return null;
	return hours * 60 + minutes;
}
function calculateCustomDuration(start, end) {
	const startMinutes = timeToMinutes(start);
	const endMinutes = timeToMinutes(end);
	if (startMinutes === null || endMinutes === null || startMinutes === endMinutes) return null;
	const duration = endMinutes - startMinutes;
	return duration > 0 ? duration : duration + MINUTES_PER_DAY;
}
function validateCustomCarePlanSchedule(start, end) {
	const startMinutes = timeToMinutes(start);
	const endMinutes = timeToMinutes(end);
	if (!start && !end) return {
		valid: false,
		message: "Informe a hora de início e a hora de fim.",
		focus: "both"
	};
	if (startMinutes === null) return {
		valid: false,
		message: "Informe uma hora de início válida, entre 00:00 e 23:59.",
		focus: "start"
	};
	if (endMinutes === null) return {
		valid: false,
		message: "Informe uma hora de fim válida, entre 00:00 e 23:59.",
		focus: "end"
	};
	if (startMinutes === endMinutes) return {
		valid: false,
		message: "A hora de fim deve ser diferente da hora de início.",
		focus: "both"
	};
	const duration = endMinutes - startMinutes;
	return {
		valid: true,
		durationMinutes: duration > 0 ? duration : duration + MINUTES_PER_DAY
	};
}
function formatDuration(durationMinutes) {
	if (!Number.isInteger(durationMinutes) || durationMinutes < 0) throw new RangeError("A duração deve ser um número inteiro de minutos não negativo.");
	const hours = Math.floor(durationMinutes / 60);
	const minutes = durationMinutes % 60;
	const parts = [];
	if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hora" : "horas"}`);
	if (minutes > 0 || hours === 0) parts.push(`${minutes} ${minutes === 1 ? "minuto" : "minutos"}`);
	return parts.join(" e ");
}
function serializeCustomCarePlan(schedule) {
	if (!validateCustomCarePlanSchedule(schedule.start, schedule.end).valid) return null;
	return `${CUSTOM_CARE_PLAN_LABEL} (${schedule.start}–${schedule.end})`;
}
function parseCarePlanValue(value) {
	if (value === null || value === void 0 || value.trim() === "") return {
		kind: "empty",
		value: null
	};
	const trimmedValue = value.trim();
	if (isStandardCarePlan(trimmedValue)) return {
		kind: "standard",
		value: trimmedValue
	};
	const customMatch = CUSTOM_CARE_PLAN_PATTERN.exec(trimmedValue);
	if (customMatch) {
		const schedule = {
			start: customMatch[1],
			end: customMatch[2]
		};
		if (validateCustomCarePlanSchedule(schedule.start, schedule.end).valid) return {
			kind: "custom",
			value,
			schedule
		};
	}
	return {
		kind: "legacy",
		value
	};
}
function resolveCarePlanInitialState(value, preserveLegacy) {
	const parsed = parseCarePlanValue(value);
	if (parsed.kind === "custom") return {
		selection: CUSTOM_CARE_PLAN_OPTION,
		storedValue: parsed.value,
		customSchedule: parsed.schedule,
		legacyValue: null
	};
	if (parsed.kind === "standard") return {
		selection: parsed.value,
		storedValue: parsed.value,
		customSchedule: null,
		legacyValue: null
	};
	if (parsed.kind === "legacy" && preserveLegacy) return {
		selection: LEGACY_CARE_PLAN_OPTION,
		storedValue: parsed.value,
		customSchedule: null,
		legacyValue: parsed.value
	};
	return {
		selection: DAYTIME_CARE_PLAN,
		storedValue: DAYTIME_CARE_PLAN,
		customSchedule: null,
		legacyValue: null
	};
}
//#endregion
//#region src/components/admin/CarePlanField.tsx
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_SCHEDULE = {
	start: "",
	end: ""
};
function handleCarePlanTimeChange(setDraftSchedule, field, event) {
	const value = event.currentTarget.value;
	setDraftSchedule((current) => ({
		...current,
		[field]: value
	}));
}
function CarePlanField({ name = "care_level", initialValue, preserveLegacy = false, id }) {
	const generatedId = (0, import_react.useId)().replace(/:/g, "");
	const fieldId = id || `care-plan-${generatedId}`;
	const selectionName = `${name}_option`;
	const helpId = `${fieldId}-help`;
	const dialogId = `${fieldId}-dialog`;
	const dialogTitleId = `${dialogId}-title`;
	const dialogDescriptionId = `${dialogId}-description`;
	const dialogErrorId = `${dialogId}-error`;
	const durationId = `${dialogId}-duration`;
	const startId = `${dialogId}-start`;
	const endId = `${dialogId}-end`;
	const [initialState] = (0, import_react.useState)(() => resolveCarePlanInitialState(initialValue, preserveLegacy));
	const [selectedOption, setSelectedOption] = (0, import_react.useState)(initialState.selection);
	const [storedValue, setStoredValue] = (0, import_react.useState)(initialState.storedValue);
	const [customSchedule, setCustomSchedule] = (0, import_react.useState)(initialState.customSchedule);
	const [draftSchedule, setDraftSchedule] = (0, import_react.useState)(initialState.customSchedule || EMPTY_SCHEDULE);
	const [dialogError, setDialogError] = (0, import_react.useState)(null);
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const dialogRef = (0, import_react.useRef)(null);
	const startTimeRef = (0, import_react.useRef)(null);
	const endTimeRef = (0, import_react.useRef)(null);
	const dialogTriggerRef = (0, import_react.useRef)(null);
	const selectionBeforeDialogRef = (0, import_react.useRef)(initialState.selection);
	const storedValueBeforeDialogRef = (0, import_react.useRef)(initialState.storedValue);
	const savedCustomDuration = customSchedule ? calculateCustomDuration(customSchedule.start, customSchedule.end) : null;
	const draftDuration = calculateCustomDuration(draftSchedule.start, draftSchedule.end);
	(0, import_react.useEffect)(() => {
		if (!dialogOpen) return;
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (!dialog.open) dialog.showModal();
		startTimeRef.current?.focus();
		return () => {
			if (dialog.open) dialog.close();
			dialogTriggerRef.current?.focus();
		};
	}, [dialogOpen]);
	function openCustomScheduleDialog(trigger) {
		selectionBeforeDialogRef.current = selectedOption;
		storedValueBeforeDialogRef.current = storedValue;
		dialogTriggerRef.current = trigger;
		setDraftSchedule(customSchedule || EMPTY_SCHEDULE);
		setDialogError(null);
		setSelectedOption(CUSTOM_CARE_PLAN_OPTION);
		setDialogOpen(true);
	}
	function handleSelectionChange(event) {
		const nextOption = event.currentTarget.value;
		if (nextOption === "__custom__") {
			openCustomScheduleDialog(event.currentTarget);
			return;
		}
		if (nextOption === "__legacy__" && initialState.legacyValue !== null) {
			setSelectedOption(nextOption);
			setStoredValue(initialState.legacyValue);
			return;
		}
		if (isStandardCarePlan(nextOption)) {
			setSelectedOption(nextOption);
			setStoredValue(nextOption);
		}
	}
	function cancelCustomScheduleDialog() {
		setSelectedOption(selectionBeforeDialogRef.current);
		setStoredValue(storedValueBeforeDialogRef.current);
		setDialogError(null);
		setDialogOpen(false);
	}
	function saveCustomSchedule() {
		const validation = validateCustomCarePlanSchedule(draftSchedule.start, draftSchedule.end);
		if (!validation.valid) {
			setDialogError(validation.message);
			if (validation.focus === "end") endTimeRef.current?.focus();
			else startTimeRef.current?.focus();
			return;
		}
		const serializedValue = serializeCustomCarePlan(draftSchedule);
		if (serializedValue === null) {
			setDialogError("Informe um intervalo válido para salvar o horário personalizado.");
			startTimeRef.current?.focus();
			return;
		}
		setCustomSchedule({ ...draftSchedule });
		setStoredValue(serializedValue);
		setSelectedOption(CUSTOM_CARE_PLAN_OPTION);
		setDialogError(null);
		setDialogOpen(false);
	}
	function handleTimeChange(field, event) {
		handleCarePlanTimeChange(setDraftSchedule, field, event);
		if (dialogError) setDialogError(null);
	}
	function handleDialogKeyDown(event) {
		if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
			event.preventDefault();
			saveCustomSchedule();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: fieldId,
			className: "block text-xs font-medium text-[var(--muted)] mb-1",
			children: "Plano de cuidado"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			id: fieldId,
			name: selectionName,
			value: selectedOption,
			onChange: handleSelectionChange,
			"aria-describedby": helpId,
			className: "input",
			children: [CARE_PLAN_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: option.value,
				children: option.label
			}, option.value)), initialState.legacyValue !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
				value: "__legacy__",
				children: ["Valor anterior: ", initialState.legacyValue]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "hidden",
			name,
			value: storedValue
		}),
		selectedOption === "__custom__" && customSchedule && savedCustomDuration !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: helpId,
			className: "schedule-summary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Horário: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
					customSchedule.start,
					"–",
					customSchedule.end
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Total: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "duration",
					children: formatDuration(savedCustomDuration)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: (event) => openCustomScheduleDialog(event.currentTarget),
					className: "edit-schedule-button",
					children: "Editar horário"
				})
			]
		}) : selectedOption === "__legacy__" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			id: helpId,
			className: "field-help",
			children: "Este valor anterior será mantido até que você escolha outro plano."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			id: helpId,
			className: "field-help",
			children: "Ao escolher Personalizado, informe o intervalo diário de atendimento."
		}),
		dialogOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dialog", {
			ref: dialogRef,
			id: dialogId,
			"aria-modal": "true",
			"aria-labelledby": dialogTitleId,
			"aria-describedby": dialogDescriptionId,
			className: "care-plan-dialog",
			onCancel: (event) => {
				event.preventDefault();
				cancelCustomScheduleDialog();
			},
			onClick: (event) => {
				if (event.target === event.currentTarget) cancelCustomScheduleDialog();
			},
			onKeyDown: handleDialogKeyDown,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dialog-content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "dialog-header",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: dialogTitleId,
							children: "Definir horário personalizado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: dialogDescriptionId,
							children: "Informe as horas de início e fim. Se a hora de fim for menor, o período continuará após a meia-noite."
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "time-grid",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: startId,
							className: "dialog-label",
							children: "Hora de início"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: startTimeRef,
							id: startId,
							type: "time",
							step: "60",
							value: draftSchedule.start,
							onChange: (event) => handleTimeChange("start", event),
							required: true,
							"aria-invalid": dialogError ? "true" : void 0,
							"aria-describedby": `${dialogDescriptionId} ${dialogError ? dialogErrorId : durationId}`,
							className: "input"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: endId,
							className: "dialog-label",
							children: "Hora de fim"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: endTimeRef,
							id: endId,
							type: "time",
							step: "60",
							value: draftSchedule.end,
							onChange: (event) => handleTimeChange("end", event),
							required: true,
							"aria-invalid": dialogError ? "true" : void 0,
							"aria-describedby": `${dialogDescriptionId} ${dialogError ? dialogErrorId : durationId}`,
							className: "input"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: dialogErrorId,
						role: "alert",
						className: dialogError ? "validation-error" : "validation-error empty",
						children: dialogError || ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: durationId,
						role: "status",
						"aria-live": "polite",
						className: "duration-summary",
						children: draftDuration === null ? "Informe horários diferentes para calcular o total." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Total: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "duration",
							children: formatDuration(draftDuration)
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dialog-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: cancelCustomScheduleDialog,
							className: "secondary-action",
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: saveCustomSchedule,
							className: "primary-action",
							children: "Salvar horário"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
			jsx: true,
			children: `
        .input {
          width: 100%;
          min-height: 2.75rem;
          border-radius: 0.5rem;
          border: 1px solid var(--border);
          background: white;
          padding: 0.625rem 0.75rem;
          font-size: 1rem;
          line-height: 1.5;
          color: var(--foreground);
        }

        .input:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px var(--brand-light);
        }

        .field-help,
        .schedule-summary {
          margin-top: 0.4rem;
          color: var(--muted-2);
          font-size: 0.75rem;
          line-height: 1.5;
        }

        .schedule-summary {
          display: grid;
          gap: 0.15rem;
          color: var(--muted);
        }

        .schedule-summary p {
          margin: 0;
        }

        .duration {
          font-variant-numeric: tabular-nums;
        }

        .edit-schedule-button {
          justify-self: start;
          min-height: 2.5rem;
          margin-top: 0.25rem;
          padding: 0.25rem 0;
          color: var(--brand-dark);
          font-size: 0.75rem;
          font-weight: 600;
          text-decoration: underline;
          text-underline-position: from-font;
        }

        .care-plan-dialog {
          width: min(32rem, calc(100vw - 2rem));
          max-height: calc(100vh - 2rem);
          margin: auto;
          padding: 0;
          overflow: auto;
          overscroll-behavior: contain;
          border: 1px solid var(--border);
          border-radius: 1rem;
          background: var(--surface);
          color: var(--foreground);
          box-shadow: 0 1.5rem 4rem rgba(20, 63, 58, 0.2);
        }

        :global(.care-plan-dialog::backdrop) {
          background: rgba(9, 13, 12, 0.42);
        }

        .dialog-content {
          padding: 1.5rem;
        }

        .dialog-header h2 {
          margin: 0;
          color: var(--foreground);
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .dialog-header p {
          max-width: 34rem;
          margin: 0.5rem 0 0;
          color: var(--muted);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .time-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 1.25rem;
        }

        .dialog-label {
          display: block;
          margin-bottom: 0.4rem;
          color: var(--foreground);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .validation-error {
          min-height: 1.5rem;
          margin: 0.5rem 0 0;
          color: var(--status-critical);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .validation-error.empty {
          visibility: hidden;
        }

        .duration-summary {
          margin: 0.75rem 0 0;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          background: var(--brand-light);
          color: var(--brand-deep);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .dialog-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .secondary-action,
        .primary-action {
          min-height: 2.75rem;
          border-radius: 0.5rem;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .secondary-action {
          border: 1px solid var(--border);
          color: var(--foreground);
        }

        .secondary-action:hover {
          background: rgba(9, 13, 12, 0.03);
        }

        .primary-action {
          background: var(--brand);
          color: white;
        }

        .primary-action:hover {
          background: var(--brand-dark);
        }

        @media (max-width: 32rem) {
          .dialog-content {
            padding: 1.25rem;
          }

          .time-grid {
            grid-template-columns: 1fr;
          }

          .dialog-actions {
            flex-direction: column-reverse;
            align-items: stretch;
          }

          .secondary-action,
          .primary-action {
            width: 100%;
          }
        }
      `
		})
	] });
}
//#endregion
export { CarePlanField as t };
