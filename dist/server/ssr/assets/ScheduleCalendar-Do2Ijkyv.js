import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import { a as formatLongDate, c as formatTime, i as dateKey, l as monthDays, n as WEEKDAYS, o as formatMonth, r as dateFromKey, s as formatShiftTime, t as PROFESSION_LABELS, u as timeToMinutes } from "./date-utils-DBPeGKCT.js";
//#region src/lib/schedule-validation.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function isScheduleDate(value) {
	if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
	const date = /* @__PURE__ */ new Date(`${value}T00:00:00.000Z`);
	return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
var SCHEDULE_RECURRENCE_PATTERNS = [
	"daily",
	"alternate_days",
	"weekdays",
	"weekends",
	"selected_weekdays",
	"every_n_days",
	"monthly",
	"custom_dates"
];
function parseDateList(value, field) {
	if (value === void 0) return [];
	if (!Array.isArray(value) || value.length > 366) return { error: `Revise a lista de ${field.toLocaleLowerCase("pt-BR")} e tente novamente.` };
	const dates = [];
	for (const date of value) {
		if (!isScheduleDate(date)) return { error: `Informe datas válidas em ${field.toLocaleLowerCase("pt-BR")}.` };
		if (dates.includes(date)) return { error: `Remova datas repetidas em ${field.toLocaleLowerCase("pt-BR")}.` };
		dates.push(date);
	}
	return dates;
}
function weekdayOf(date) {
	const [year, month, day] = date.split("-").map(Number);
	return utcDate(year, month - 1, day).getUTCDay();
}
function daysInMonth(year, month) {
	return utcDate(year, month, 0).getUTCDate();
}
function utcDate(year, monthIndex, day) {
	const date = /* @__PURE__ */ new Date(0);
	date.setUTCHours(0, 0, 0, 0);
	date.setUTCFullYear(year, monthIndex, day);
	return date;
}
function addDays(startDate, offset) {
	const [year, month, day] = startDate.split("-").map(Number);
	return utcDate(year, month - 1, day + offset).toISOString().slice(0, 10);
}
function generateScheduleRecurrence(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "Revise os dados da recorrência e tente novamente." };
	const input = value;
	const startDate = input.start_date;
	const endDate = input.end_date;
	const pattern = input.pattern;
	if (!isScheduleDate(startDate) || !isScheduleDate(endDate) || startDate > endDate) return { error: "Informe um período válido para a recorrência." };
	if (!SCHEDULE_RECURRENCE_PATTERNS.includes(pattern)) return { error: "Selecione um padrão de recorrência válido." };
	const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
	const [endYear, endMonth, endDay] = endDate.split("-").map(Number);
	const totalDays = Math.floor((utcDate(endYear, endMonth - 1, endDay).getTime() - utcDate(startYear, startMonth - 1, startDay).getTime()) / 864e5) + 1;
	if (totalDays > 366) return { error: "O período da recorrência não pode ultrapassar 366 dias." };
	const skipDates = parseDateList(input.skip_dates, "Datas para pular");
	if (!Array.isArray(skipDates)) return skipDates;
	if (skipDates.some((date) => date < startDate || date > endDate)) return { error: "As datas para pular devem estar dentro do período da recorrência." };
	let customDates = [];
	if (pattern === "custom_dates") {
		const parsedCustomDates = parseDateList(input.dates, "Datas avulsas");
		if (!Array.isArray(parsedCustomDates)) return parsedCustomDates;
		customDates = parsedCustomDates;
	}
	const weekdaysValue = input.weekdays;
	let weekdays = [];
	if (weekdaysValue !== void 0) {
		if (!Array.isArray(weekdaysValue) || weekdaysValue.some((day) => !Number.isInteger(day) || day < 0 || day > 6)) return { error: "Selecione dias da semana válidos." };
		weekdays = [...new Set(weekdaysValue)];
	}
	let intervalDays = 0;
	if (pattern === "every_n_days") {
		intervalDays = input.interval_days;
		if (!Number.isInteger(intervalDays) || intervalDays < 1 || intervalDays > 366) return { error: "Informe um intervalo entre 1 e 366 dias." };
	}
	if (pattern === "selected_weekdays" && weekdays.length === 0) return { error: "Selecione pelo menos um dia da semana." };
	if (pattern === "custom_dates" && customDates.length === 0) return { error: "Adicione pelo menos uma data avulsa." };
	if (pattern === "custom_dates" && customDates.some((date) => date < startDate || date > endDate)) return { error: "As datas avulsas devem estar dentro do período selecionado." };
	const candidates = [];
	if (pattern === "custom_dates") candidates.push(...customDates);
	else if (pattern === "monthly") {
		const [startYear, startMonth, startDay] = startDate.split("-").map(Number);
		const [endYear, endMonth] = endDate.split("-").map(Number);
		for (let monthIndex = startYear * 12 + startMonth - 1; monthIndex <= endYear * 12 + endMonth - 1; monthIndex += 1) {
			const year = Math.floor(monthIndex / 12);
			const month = monthIndex % 12 + 1;
			const day = Math.min(startDay, daysInMonth(year, month));
			const candidate = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
			if (candidate >= startDate && candidate <= endDate) candidates.push(candidate);
		}
	} else for (let offset = 0; offset < totalDays; offset += 1) {
		const date = addDays(startDate, offset);
		const weekday = weekdayOf(date);
		if (pattern === "daily" || pattern === "alternate_days" && offset % 2 === 0 || pattern === "weekdays" && weekday >= 1 && weekday <= 5 || pattern === "weekends" && (weekday === 0 || weekday === 6) || pattern === "selected_weekdays" && weekdays.includes(weekday) || pattern === "every_n_days" && offset % intervalDays === 0) candidates.push(date);
	}
	const skipped = new Set(skipDates);
	const dates = [...new Set(candidates)].filter((date) => !skipped.has(date)).sort();
	if (dates.length === 0) return { error: "Esse padrão não gera plantões no período selecionado." };
	return { dates };
}
//#endregion
//#region src/components/schedules/ScheduleCalendar.tsx
var import_jsx_runtime = require_jsx_runtime();
var RECURRENCE_OPTIONS = [
	{
		value: "daily",
		label: "Todos os dias"
	},
	{
		value: "alternate_days",
		label: "Dia sim, dia não"
	},
	{
		value: "weekdays",
		label: "Segunda a sexta"
	},
	{
		value: "weekends",
		label: "Finais de semana"
	},
	{
		value: "selected_weekdays",
		label: "Dias escolhidos"
	},
	{
		value: "every_n_days",
		label: "A cada N dias"
	},
	{
		value: "monthly",
		label: "Mensal"
	},
	{
		value: "custom_dates",
		label: "Datas avulsas"
	}
];
function endDateAfterOneYear(startDate) {
	const date = dateFromKey(startDate);
	date.setDate(date.getDate() + 365);
	return dateKey(date);
}
function formatCentsAsCurrency(cents) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(cents / 100);
}
function centsToAmountInput(cents) {
	return cents === null || cents === void 0 ? "" : (cents / 100).toFixed(2);
}
function newRecurrenceDraft(startDate) {
	return {
		end_date: endDateAfterOneYear(startDate),
		pattern: "daily",
		interval_days: 2,
		weekdays: [
			1,
			2,
			3,
			4,
			5
		],
		dates: [],
		skip_dates: [],
		custom_date: "",
		skip_date: ""
	};
}
var NO_PATIENTS = [];
function getErrorMessage(value, fallback) {
	if (value instanceof Error && value.message) return value.message;
	return fallback;
}
function capitalize(value) {
	return value.charAt(0).toLocaleUpperCase("pt-BR") + value.slice(1);
}
function shiftDisplayName(entry, mode, patientNames) {
	if (mode === "admin") return entry.professional_name || "Profissional escalado";
	return entry.patient_name || patientNames.get(entry.patient_id) || "Paciente";
}
function isProfessionalEligible(option, scheduledDate) {
	return option.start_date <= scheduledDate && (!option.end_date || option.end_date >= scheduledDate);
}
function ScheduleCalendar(props) {
	const mode = props.mode;
	const canManagePayroll = props.mode === "admin" && props.canManagePayroll;
	const patientId = props.mode === "admin" ? props.patientId : void 0;
	const patientName = props.mode === "admin" ? props.patientName : void 0;
	const patients = props.mode === "professional" ? props.patients : NO_PATIENTS;
	const monthInputId = (0, import_react.useId)();
	const patientFilterId = (0, import_react.useId)();
	const recurrenceGroupId = (0, import_react.useId)();
	const dialogRef = (0, import_react.useRef)(null);
	const [month, setMonth] = (0, import_react.useState)(() => {
		const now = /* @__PURE__ */ new Date();
		return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
	});
	const [patientFilter, setPatientFilter] = (0, import_react.useState)("todos");
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [professionals, setProfessionals] = (0, import_react.useState)([]);
	const [loadedMonth, setLoadedMonth] = (0, import_react.useState)(null);
	const [retrying, setRetrying] = (0, import_react.useState)(false);
	const [loadError, setLoadError] = (0, import_react.useState)(null);
	const [loadErrorMonth, setLoadErrorMonth] = (0, import_react.useState)(null);
	const [selectedDate, setSelectedDate] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [recurrenceEnabled, setRecurrenceEnabled] = (0, import_react.useState)(false);
	const [recurrenceDraft, setRecurrenceDraft] = (0, import_react.useState)(null);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [deleteTargetId, setDeleteTargetId] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [mutationError, setMutationError] = (0, import_react.useState)(null);
	const [mutationMessage, setMutationMessage] = (0, import_react.useState)(null);
	const patientNames = (0, import_react.useMemo)(() => new Map(patients.map((patient) => [patient.id, patient.name])), [patients]);
	const fetchSchedule = (0, import_react.useCallback)(async (signal) => {
		const params = new URLSearchParams({ month });
		if (mode === "admin" && patientId) params.set("patient_id", patientId);
		const response = await fetch(`/api/schedules?${params.toString()}`, {
			cache: "no-store",
			signal
		});
		const payload = await response.json().catch(() => null);
		if (!response.ok) {
			if (mode === "admin" && patientId) {
				const rosterResponse = await fetch(`/api/admin/schedules/professionals?${params.toString()}`, {
					cache: "no-store",
					signal
				});
				const roster = await rosterResponse.json().catch(() => null);
				if (rosterResponse.ok && roster && Array.isArray(roster.professionals)) return {
					entries: [],
					professionals: roster.professionals,
					error: payload?.error || "Não foi possível carregar as escalas. Atualize a página e tente novamente."
				};
			}
			throw new Error(payload?.error || "Não foi possível carregar as escalas. Atualize a página e tente novamente.");
		}
		if (!payload || !Array.isArray(payload.entries)) throw new Error("A resposta das escalas está incompleta. Atualize a página e tente novamente.");
		return {
			entries: payload.entries,
			professionals: mode === "admin" && Array.isArray(payload.professionals) ? payload.professionals : [],
			error: void 0
		};
	}, [
		mode,
		month,
		patientId
	]);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		fetchSchedule(controller.signal).then((result) => {
			if (controller.signal.aborted) return;
			setEntries(result.entries);
			setProfessionals(result.professionals);
			setLoadError(result.error || null);
			setLoadErrorMonth(result.error ? month : null);
			setLoadedMonth(month);
		}).catch((error) => {
			if (controller.signal.aborted) return;
			setEntries([]);
			setProfessionals([]);
			setLoadError(getErrorMessage(error, "Não foi possível carregar as escalas. Verifique a conexão e tente novamente."));
			setLoadErrorMonth(month);
			setLoadedMonth(month);
		});
		return () => controller.abort();
	}, [fetchSchedule, month]);
	(0, import_react.useEffect)(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (selectedDate && !dialog.open) dialog.showModal();
		if (!selectedDate && dialog.open) dialog.close();
	}, [selectedDate]);
	const dataReadyForMonth = loadedMonth === month && loadErrorMonth !== month && !retrying;
	const visibleEntries = (0, import_react.useMemo)(() => {
		const currentMonthEntries = dataReadyForMonth ? entries : [];
		return mode === "professional" && patientFilter !== "todos" ? currentMonthEntries.filter((entry) => entry.patient_id === patientFilter) : currentMonthEntries;
	}, [
		dataReadyForMonth,
		entries,
		mode,
		patientFilter
	]);
	const entriesByDate = (0, import_react.useMemo)(() => {
		const grouped = /* @__PURE__ */ new Map();
		for (const entry of visibleEntries) {
			const dateEntries = grouped.get(entry.scheduled_date) || [];
			dateEntries.push(entry);
			grouped.set(entry.scheduled_date, dateEntries);
		}
		for (const dateEntries of grouped.values()) dateEntries.sort((a, b) => a.start_time.localeCompare(b.start_time) || a.id.localeCompare(b.id));
		return grouped;
	}, [visibleEntries]);
	const calendarDays = (0, import_react.useMemo)(() => monthDays(month), [month]);
	const selectedEntries = selectedDate ? entriesByDate.get(selectedDate) || [] : [];
	const loading = loadedMonth !== month || retrying;
	const visibleLoadError = loadErrorMonth === month ? loadError : null;
	const eligibleProfessionals = draft ? professionals.filter((professional) => isProfessionalEligible(professional, draft.scheduled_date)) : [];
	const recurrencePreview = (0, import_react.useMemo)(() => {
		if (!recurrenceEnabled || !draft || !recurrenceDraft || editingId) return null;
		return generateScheduleRecurrence({
			start_date: draft.scheduled_date,
			end_date: recurrenceDraft.end_date,
			pattern: recurrenceDraft.pattern,
			interval_days: recurrenceDraft.interval_days,
			weekdays: recurrenceDraft.weekdays,
			dates: recurrenceDraft.dates,
			skip_dates: recurrenceDraft.skip_dates
		});
	}, [
		draft,
		editingId,
		recurrenceDraft,
		recurrenceEnabled
	]);
	function changeMonth(value) {
		if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(value)) return;
		setSelectedDate(null);
		setDraft(null);
		setMonth(value);
	}
	function moveMonth(amount) {
		const [year, monthNumber] = month.split("-").map(Number);
		const target = new Date(year, monthNumber - 1 + amount, 1);
		changeMonth(`${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, "0")}`);
	}
	async function refreshSchedule() {
		setRetrying(true);
		setLoadError(null);
		setLoadErrorMonth(null);
		try {
			const result = await fetchSchedule();
			setEntries(result.entries);
			setProfessionals(result.professionals);
			setLoadError(result.error || null);
			setLoadErrorMonth(result.error ? month : null);
			setLoadedMonth(month);
			return !result.error;
		} catch (error) {
			setEntries([]);
			setProfessionals([]);
			setLoadError(getErrorMessage(error, "Não foi possível carregar as escalas. Verifique a conexão e tente novamente."));
			setLoadErrorMonth(month);
			setLoadedMonth(month);
			return false;
		} finally {
			setRetrying(false);
		}
	}
	function clearDialogState() {
		setSelectedDate(null);
		setDraft(null);
		setRecurrenceEnabled(false);
		setRecurrenceDraft(null);
		setEditingId(null);
		setDeleteTargetId(null);
		setMutationError(null);
		setMutationMessage(null);
	}
	function closeDialog() {
		const dialog = dialogRef.current;
		if (dialog?.open) dialog.close();
		else clearDialogState();
	}
	function startCreate() {
		if (!selectedDate) return;
		setDraft({
			caregiver_user_id: "",
			scheduled_date: selectedDate,
			start_time: "08:00",
			end_time: "20:00",
			ends_next_day: false,
			payroll_amount_cents_override: ""
		});
		setRecurrenceEnabled(false);
		setRecurrenceDraft(newRecurrenceDraft(selectedDate));
		setEditingId(null);
		setDeleteTargetId(null);
		setMutationError(null);
		setMutationMessage(null);
	}
	function startEdit(entry) {
		setDraft({
			caregiver_user_id: entry.caregiver_user_id,
			scheduled_date: entry.scheduled_date,
			start_time: formatTime(entry.start_time),
			end_time: formatTime(entry.end_time),
			ends_next_day: entry.ends_next_day,
			payroll_amount_cents_override: canManagePayroll ? centsToAmountInput(entry.payroll_amount_cents_override) : ""
		});
		setRecurrenceEnabled(false);
		setRecurrenceDraft(null);
		setEditingId(entry.id);
		setDeleteTargetId(null);
		setMutationError(null);
		setMutationMessage(null);
	}
	async function saveSchedule(event) {
		event.preventDefault();
		if (!draft || mode !== "admin" || !patientId) return;
		setMutationError(null);
		setMutationMessage(null);
		const selectedProfessional = eligibleProfessionals.find((professional) => professional.user_id === draft.caregiver_user_id);
		const startMinutes = timeToMinutes(draft.start_time);
		const endMinutes = timeToMinutes(draft.end_time);
		if (!draft.scheduled_date) {
			setMutationError("Informe a data do plantão.");
			return;
		}
		if (!selectedProfessional) {
			setMutationError("Selecione um profissional vinculado e disponível na data escolhida.");
			return;
		}
		if (startMinutes === null || endMinutes === null) {
			setMutationError("Informe horários válidos entre 00:00 e 23:59.");
			return;
		}
		if (draft.ends_next_day && endMinutes > startMinutes) {
			setMutationError("Para terminar no dia seguinte, a hora final deve ser igual ou anterior à hora de início.");
			return;
		}
		if (!draft.ends_next_day && endMinutes <= startMinutes) {
			setMutationError("A hora de término precisa ser posterior à hora de início. Para terminar no dia seguinte, marque essa opção.");
			return;
		}
		const rawAmountOverride = canManagePayroll ? draft.payroll_amount_cents_override.trim() : "";
		const amountInReais = rawAmountOverride ? Number(rawAmountOverride.replace(",", ".")) : null;
		if (rawAmountOverride && (amountInReais === null || !Number.isFinite(amountInReais) || amountInReais <= 0 || amountInReais > 1e6)) {
			setMutationError("Informe um valor entre R$ 0,01 e R$ 1.000.000,00, ou deixe o campo vazio para usar o valor habitual.");
			return;
		}
		const payrollAmountCentsOverride = amountInReais === null ? null : Math.round(amountInReais * 100);
		if (payrollAmountCentsOverride !== null && (!Number.isSafeInteger(payrollAmountCentsOverride) || payrollAmountCentsOverride < 1 || payrollAmountCentsOverride > 1e8)) {
			setMutationError("Informe um valor entre R$ 0,01 e R$ 1.000.000,00, ou deixe o campo vazio para usar o valor habitual.");
			return;
		}
		if (recurrenceEnabled && !editingId && recurrencePreview && "error" in recurrencePreview) {
			setMutationError(recurrencePreview.error);
			return;
		}
		const payload = {
			patient_id: patientId,
			caregiver_user_id: draft.caregiver_user_id,
			start_time: draft.start_time,
			end_time: draft.end_time,
			ends_next_day: draft.ends_next_day
		};
		const isRecurring = recurrenceEnabled && !editingId && recurrenceDraft !== null;
		const requestPayload = isRecurring ? {
			...payload,
			start_date: draft.scheduled_date,
			end_date: recurrenceDraft.end_date,
			pattern: recurrenceDraft.pattern,
			interval_days: recurrenceDraft.interval_days,
			weekdays: recurrenceDraft.weekdays,
			dates: recurrenceDraft.dates,
			skip_dates: recurrenceDraft.skip_dates
		} : {
			...payload,
			scheduled_date: draft.scheduled_date,
			...canManagePayroll ? { payroll_amount_cents_override: payrollAmountCentsOverride } : {}
		};
		setSaving(true);
		try {
			const response = await fetch(editingId ? `/api/admin/schedules/${encodeURIComponent(editingId)}` : isRecurring ? "/api/admin/schedules/recurring" : "/api/admin/schedules", {
				method: editingId ? "PATCH" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestPayload)
			});
			const result = await response.json().catch(() => null);
			if (!response.ok) throw new Error(result?.error || "Não foi possível salvar a escala. Verifique os dados e tente novamente.");
			const refreshed = await refreshSchedule();
			setDraft(null);
			setRecurrenceEnabled(false);
			setRecurrenceDraft(null);
			setEditingId(null);
			setDeleteTargetId(null);
			const successMessage = isRecurring && result?.created_count ? `${result.created_count} ${result.created_count === 1 ? "plantão recorrente foi aplicado" : "plantões recorrentes foram aplicados"}.` : "Escala salva com sucesso.";
			setMutationMessage(refreshed ? successMessage : `${successMessage} Atualize a página para carregar os dados mais recentes.`);
		} catch (error) {
			setMutationError(getErrorMessage(error, "Não foi possível salvar a escala. Verifique a conexão e tente novamente."));
		} finally {
			setSaving(false);
		}
	}
	async function deleteSchedule(entry) {
		setMutationError(null);
		setMutationMessage(null);
		setSaving(true);
		try {
			const response = await fetch(`/api/admin/schedules/${encodeURIComponent(entry.id)}`, { method: "DELETE" });
			const result = await response.json().catch(() => null);
			if (!response.ok) throw new Error(result?.error || "Não foi possível remover a escala. Tente novamente.");
			const refreshed = await refreshSchedule();
			setDeleteTargetId(null);
			setMutationMessage(refreshed ? "Escala removida." : "Escala removida. Atualize a página para carregar os dados mais recentes.");
		} catch (error) {
			setMutationError(getErrorMessage(error, "Não foi possível remover a escala. Verifique a conexão e tente novamente."));
		} finally {
			setSaving(false);
		}
	}
	function openDay(date) {
		setMutationError(null);
		setMutationMessage(null);
		setDraft(null);
		setEditingId(null);
		setDeleteTargetId(null);
		setSelectedDate(date);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		"aria-label": mode === "admin" ? `Calendário de escalas de ${patientName}` : "Calendário das minhas escalas",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-[var(--foreground)]",
						children: "Mês de consulta"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => moveMonth(-1),
								"aria-label": "Ver mês anterior",
								className: "min-h-11 min-w-11 rounded-xl border border-[var(--border)] bg-white text-lg text-[var(--brand)] hover:bg-[var(--brand-light)]",
								children: "‹"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => moveMonth(1),
								"aria-label": "Ver próximo mês",
								className: "min-h-11 min-w-11 rounded-xl border border-[var(--border)] bg-white text-lg text-[var(--brand)] hover:bg-[var(--brand-light)]",
								children: "›"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => changeMonth((() => {
									const now = /* @__PURE__ */ new Date();
									return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
								})()),
								className: "min-h-11 rounded-xl border border-[var(--border)] bg-white px-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--brand-light)]",
								children: "Mês atual"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: monthInputId,
								className: "sr-only",
								children: "Selecionar mês"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: monthInputId,
								type: "month",
								value: month,
								onChange: (event) => changeMonth(event.target.value),
								className: "min-h-11 min-w-0 rounded-xl border border-[var(--border-strong)] bg-white px-3 text-sm text-[var(--foreground)]"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-1 sm:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl font-semibold text-[var(--foreground)]",
						children: formatMonth(month)
					}), mode === "professional" && patients.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full sm:w-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: patientFilterId,
							className: "sr-only",
							children: "Filtrar escalas por paciente"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: patientFilterId,
							value: patientFilter,
							onChange: (event) => setPatientFilter(event.target.value),
							className: "min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 text-sm text-[var(--foreground)] sm:max-w-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "todos",
								children: "Todos os meus pacientes"
							}), patients.map((patient) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: patient.id,
								children: patient.name
							}, patient.id))]
						})]
					})]
				})]
			}),
			visibleLoadError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "alert",
				className: "flex flex-col gap-3 rounded-xl border border-[var(--status-critical)]/30 bg-[var(--status-critical-bg)] p-4 text-sm text-[var(--status-critical)] sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: visibleLoadError }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void refreshSchedule(),
					className: "min-h-11 shrink-0 rounded-lg border border-[var(--status-critical)]/30 bg-white px-4 font-semibold hover:bg-[var(--status-critical-bg)]",
					children: "Tentar novamente"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				"aria-live": "polite",
				className: "min-h-5 text-sm text-[var(--muted)]",
				children: loading ? "Carregando escalas…" : `${visibleEntries.length} ${visibleEntries.length === 1 ? "plantão neste mês" : "plantões neste mês"}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full table-fixed border-collapse",
					"aria-label": `Calendário mensal de escalas: ${formatMonth(month)}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: WEEKDAYS.map((weekday) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
						scope: "col",
						className: "border-b border-r border-[var(--border)] bg-[var(--surface-soft)] px-0.5 py-2 text-center text-[0.62rem] font-semibold text-[var(--muted)] last:border-r-0 sm:px-2 sm:py-3 sm:text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sm:hidden",
								"aria-hidden": "true",
								children: weekday.slice(0, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: weekday
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only sm:hidden",
								children: weekday
							})
						]
					}, weekday)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: Array.from({ length: 6 }, (_, weekIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map(({ date, key, inMonth }) => {
						const dayEntries = entriesByDate.get(key) || [];
						const firstName = dayEntries[0] ? shiftDisplayName(dayEntries[0], mode, patientNames) : "";
						const isToday = key === dateKey(/* @__PURE__ */ new Date());
						const spokenLabel = `${formatLongDate(key)}${dayEntries.length ? `, ${dayEntries.length} ${dayEntries.length === 1 ? "plantão" : "plantões"}${firstName ? `, ${mode === "admin" ? "profissional" : "paciente"}: ${firstName}` : ""}` : ", sem plantões"}`;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: `h-[4.65rem] border-b border-r border-[var(--border)] p-0 align-top last:border-r-0 sm:h-28 ${weekIndex === 5 ? "border-b-0" : ""} ${inMonth ? "bg-white" : "bg-[var(--surface-soft)]/70"}`,
							children: inMonth ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: loading,
								onClick: () => openDay(key),
								"aria-label": spokenLabel,
								"aria-current": isToday ? "date" : void 0,
								className: `flex h-full min-h-[4.65rem] w-full flex-col items-stretch gap-0.5 overflow-hidden p-1 text-left hover:bg-[var(--brand-light)] disabled:cursor-wait disabled:opacity-70 sm:min-h-28 sm:gap-1 sm:p-2 ${selectedDate === key ? "bg-[var(--brand-light)]" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-medium sm:h-6 sm:w-6 sm:text-xs ${isToday ? "bg-[var(--brand)] text-white" : "text-[var(--foreground)]"}`,
										children: date.getDate()
									}),
									dayEntries.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										title: firstName,
										className: "block max-w-full truncate rounded-md bg-[var(--brand-light)] px-1 py-0.5 text-[0.55rem] font-medium leading-tight text-[var(--brand-dark)] sm:px-1.5 sm:text-[0.68rem]",
										children: [
											mode === "professional" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "sm:hidden",
												children: [formatTime(dayEntries[0].start_time), " "]
											}),
											firstName,
											mode === "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "hidden sm:inline",
												children: [" · ", formatTime(dayEntries[0].start_time)]
											})
										]
									}),
									dayEntries.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "truncate pl-1 text-[0.55rem] font-semibold text-[var(--muted)] sm:text-[0.65rem]",
										children: [
											"+",
											dayEntries.length - 1,
											" ",
											mode === "admin" ? "profissional" : "plantão",
											dayEntries.length > 2 ? "s" : ""
										]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: "flex h-full min-h-[4.65rem] items-start p-1 text-[0.65rem] text-[var(--muted-2)] sm:min-h-28 sm:p-2 sm:text-xs",
								children: date.getDate()
							})
						}, key);
					}) }, weekIndex)) })]
				})
			}),
			!loading && visibleEntries.length === 0 && !visibleLoadError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]",
				children: mode === "admin" ? "Nenhum profissional está escalado neste mês. Selecione um dia no calendário para consultar ou adicionar um plantão." : "Nenhum plantão aparece neste mês. Se esperava encontrar uma escala, fale com a administração."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dialog", {
				ref: dialogRef,
				"aria-labelledby": "schedule-day-title",
				onClose: clearDialogState,
				onClick: (event) => {
					if (event.target === event.currentTarget) closeDialog();
				},
				className: "m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-2xl overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-0 text-[var(--foreground)] shadow-2xl backdrop:bg-black/45",
				children: selectedDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-start justify-between gap-3 border-b border-[var(--border)] pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: mode === "admin" ? "Escala do dia" : "Meus plantões"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: "schedule-day-title",
								className: "mt-1 break-words text-lg font-semibold sm:text-xl",
								children: capitalize(formatLongDate(selectedDate))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: closeDialog,
							className: "min-h-11 shrink-0 rounded-xl border border-[var(--border)] px-3 text-sm font-medium text-[var(--muted)] hover:bg-[var(--surface-soft)]",
							children: "Fechar"
						})]
					}), mode === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-base font-semibold",
									children: "Profissionais escalados"
								}), !draft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: startCreate,
									disabled: saving,
									className: "min-h-11 rounded-xl bg-[var(--brand)] px-4 text-sm font-semibold text-white hover:bg-[var(--brand-dark)] disabled:opacity-60",
									children: "Adicionar profissional"
								})]
							}),
							selectedEntries.length === 0 && !draft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-xl border border-dashed border-[var(--border-strong)] p-4 text-sm text-[var(--muted)]",
								children: "Nenhum profissional escalado para esta data. Você pode adicionar um plantão."
							}),
							selectedEntries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-xl border border-[var(--border)] bg-white p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
												className: "break-words font-semibold text-[var(--foreground)]",
												children: entry.professional_name || "Profissional"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-sm text-[var(--muted)]",
												children: ["Função: ", PROFESSION_LABELS[entry.profession] || "Profissional"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-[var(--muted)]",
												children: ["Horário: ", formatShiftTime(entry)]
											}),
											canManagePayroll && entry.payroll_amount_cents_override !== null && entry.payroll_amount_cents_override !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-sm font-medium text-[var(--foreground)]",
												children: ["Valor específico: ", formatCentsAsCurrency(entry.payroll_amount_cents_override)]
											}),
											canManagePayroll && entry.payroll_rate_status === "valor_pendente" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900",
												children: "Valor pendente"
											}),
											entry.professional_phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: `tel:${entry.professional_phone.replace(/[^\d+]/g, "")}`,
												className: "mt-1 inline-flex min-h-10 items-center text-sm font-medium text-[var(--brand)] underline underline-offset-2",
												children: ["Telefone: ", entry.professional_phone]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => startEdit(entry),
											disabled: saving,
											className: "min-h-10 rounded-lg border border-[var(--border-strong)] px-3 text-sm font-medium text-[var(--brand)] hover:bg-[var(--brand-light)] disabled:opacity-60",
											children: "Editar escala"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setDeleteTargetId(entry.id);
												setDraft(null);
												setEditingId(null);
												setMutationError(null);
												setMutationMessage(null);
											},
											disabled: saving,
											className: "min-h-10 rounded-lg border border-[var(--status-critical)]/40 px-3 text-sm font-medium text-[var(--status-critical)] hover:bg-[var(--status-critical-bg)] disabled:opacity-60",
											children: "Remover da escala"
										})]
									})]
								}), deleteTargetId === entry.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 rounded-lg border border-[var(--status-critical)]/30 bg-[var(--status-critical-bg)] p-3",
									role: "group",
									"aria-label": `Confirmação para remover ${entry.professional_name || "profissional"} da escala`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-[var(--foreground)]",
											children: "Remover este plantão da escala?"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-[var(--muted)]",
											children: "A ação excluirá este horário deste paciente."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex flex-wrap gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => void deleteSchedule(entry),
												disabled: saving,
												className: "min-h-10 rounded-lg bg-[var(--status-critical)] px-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60",
												children: saving ? "Removendo…" : "Excluir plantão"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setDeleteTargetId(null),
												disabled: saving,
												className: "min-h-10 rounded-lg border border-[var(--border-strong)] bg-white px-3 text-sm font-medium text-[var(--foreground)] disabled:opacity-60",
												children: "Cancelar"
											})]
										})
									]
								})]
							}, entry.id)),
							draft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: saveSchedule,
								className: "space-y-4 rounded-xl border border-[var(--border-strong)] bg-[var(--surface-soft)] p-4",
								noValidate: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
										className: "font-semibold",
										children: editingId ? "Editar plantão" : "Novo plantão"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-sm font-medium text-[var(--foreground)] sm:col-span-2",
												children: [
													"Profissional",
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														required: true,
														value: eligibleProfessionals.some((professional) => professional.user_id === draft.caregiver_user_id) ? draft.caregiver_user_id : "",
														onChange: (event) => setDraft((current) => current ? {
															...current,
															caregiver_user_id: event.target.value
														} : current),
														className: "mt-1.5 min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 text-sm",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "",
															children: "Selecione um profissional"
														}), eligibleProfessionals.map((professional) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
															value: professional.user_id,
															children: [
																professional.name,
																" · ",
																PROFESSION_LABELS[professional.profession]
															]
														}, professional.user_id))]
													}),
													eligibleProfessionals.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "mt-1 block text-xs font-normal text-[var(--muted)]",
														children: "Não há profissional com vínculo válido nesta data. Verifique as datas do vínculo antes de editar a escala."
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-sm font-medium text-[var(--foreground)]",
												children: [recurrenceEnabled && !editingId ? "Data inicial" : "Data", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "date",
													required: true,
													value: draft.scheduled_date,
													onChange: (event) => {
														const nextStartDate = event.target.value;
														setDraft((current) => current ? {
															...current,
															scheduled_date: nextStartDate
														} : current);
														setRecurrenceDraft((current) => current && current.end_date < nextStartDate ? {
															...current,
															end_date: endDateAfterOneYear(nextStartDate)
														} : current);
													},
													className: "mt-1.5 min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 text-sm"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-sm font-medium text-[var(--foreground)]",
												children: ["Hora de início", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "time",
													required: true,
													value: draft.start_time,
													onChange: (event) => setDraft((current) => current ? {
														...current,
														start_time: event.target.value
													} : current),
													className: "mt-1.5 min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 text-sm"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "block text-sm font-medium text-[var(--foreground)] sm:col-span-2",
												children: ["Hora de término", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "time",
													required: true,
													value: draft.end_time,
													onChange: (event) => setDraft((current) => current ? {
														...current,
														end_time: event.target.value
													} : current),
													className: "mt-2 block min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 text-sm sm:max-w-xs"
												})]
											})
										]
									}),
									!recurrenceEnabled && canManagePayroll && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-sm font-medium text-[var(--foreground)]",
										children: [
											"Valor excepcional deste plantão (R$)",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												inputMode: "decimal",
												min: "0.01",
												max: "1000000",
												step: "0.01",
												value: draft.payroll_amount_cents_override,
												onChange: (event) => setDraft((current) => current ? {
													...current,
													payroll_amount_cents_override: event.target.value
												} : current),
												placeholder: "Somente se for diferente do habitual",
												className: "mt-1.5 block min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 text-sm sm:max-w-xs"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1 block text-xs font-normal text-[var(--muted)]",
												children: "Preencha somente se este plantão tiver valor diferente do habitual. Em branco, o Financeiro usa o valor habitual. Ao salvar, a despesa deste plantão é atualizada no Financeiro. Plantões pagos não podem ter o valor alterado."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex min-h-11 items-center gap-2 text-sm text-[var(--foreground)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: draft.ends_next_day,
											onChange: (event) => setDraft((current) => current ? {
												...current,
												ends_next_day: event.target.checked
											} : current),
											className: "h-4 w-4 accent-[var(--brand)]"
										}), "O horário termina no dia seguinte"]
									}),
									!editingId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
										className: "space-y-3 rounded-xl border border-[var(--border)] bg-white p-3 sm:p-4",
										"aria-label": "Recorrência do plantão",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex min-h-11 items-center gap-3 text-sm font-semibold text-[var(--foreground)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: recurrenceEnabled,
												onChange: (event) => {
													const enabled = event.target.checked;
													setRecurrenceEnabled(enabled);
													if (enabled) setDraft((current) => current ? {
														...current,
														payroll_amount_cents_override: ""
													} : current);
												},
												className: "h-4 w-4 accent-[var(--brand)]"
											}), "Repetir este plantão"]
										}), recurrenceEnabled && recurrenceDraft && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-4 border-t border-[var(--border)] pt-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-[var(--muted)]",
													children: "Escolha o padrão e confira as datas antes de aplicar. Cada ocorrência será criada como um plantão separado."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "block text-sm font-medium text-[var(--foreground)]",
													children: ["Data final", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "date",
														required: true,
														min: draft.scheduled_date,
														value: recurrenceDraft.end_date,
														onChange: (event) => setRecurrenceDraft((current) => current ? {
															...current,
															end_date: event.target.value
														} : current),
														className: "mt-1.5 min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 text-base sm:max-w-xs sm:text-sm"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
														className: "text-sm font-medium text-[var(--foreground)]",
														children: "Como repetir?"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:grid-cols-4",
														children: RECURRENCE_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: `flex min-h-11 cursor-pointer items-start gap-2 rounded-lg border p-2.5 text-sm leading-snug ${recurrenceDraft.pattern === option.value ? "border-[var(--brand)] bg-[var(--brand-light)] text-[var(--brand-dark)]" : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"}`,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "radio",
																name: `schedule-pattern-${recurrenceGroupId}`,
																value: option.value,
																checked: recurrenceDraft.pattern === option.value,
																onChange: () => setRecurrenceDraft((current) => current ? {
																	...current,
																	pattern: option.value
																} : current),
																className: "mt-0.5 h-4 w-4 shrink-0 accent-[var(--brand)]"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: option.label })]
														}, option.value))
													})]
												}),
												recurrenceDraft.pattern === "selected_weekdays" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
													className: "space-y-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
														className: "text-sm font-medium text-[var(--foreground)]",
														children: "Dias da semana"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "grid grid-cols-4 gap-2 sm:grid-cols-7",
														children: WEEKDAYS.map((weekday, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border)] px-2 text-sm text-[var(--foreground)]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "checkbox",
																checked: recurrenceDraft.weekdays.includes(index),
																onChange: (event) => setRecurrenceDraft((current) => {
																	if (!current) return current;
																	const weekdays = event.target.checked ? [...current.weekdays, index].sort((a, b) => a - b) : current.weekdays.filter((day) => day !== index);
																	return {
																		...current,
																		weekdays
																	};
																}),
																className: "h-4 w-4 accent-[var(--brand)]"
															}), weekday]
														}, weekday))
													})]
												}),
												recurrenceDraft.pattern === "every_n_days" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "block text-sm font-medium text-[var(--foreground)]",
													children: ["Repetir a cada quantos dias?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "number",
														min: 1,
														max: 366,
														step: 1,
														value: recurrenceDraft.interval_days,
														onChange: (event) => setRecurrenceDraft((current) => current ? {
															...current,
															interval_days: Number(event.target.value)
														} : current),
														className: "mt-1.5 min-h-11 w-full rounded-xl border border-[var(--border-strong)] bg-white px-3 text-base sm:max-w-xs sm:text-sm"
													})]
												}),
												recurrenceDraft.pattern === "custom_dates" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
													className: "space-y-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
															className: "text-sm font-medium text-[var(--foreground)]",
															children: "Datas dos plantões"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex flex-col gap-2 min-[420px]:flex-row",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "date",
																"aria-label": "Data avulsa",
																value: recurrenceDraft.custom_date,
																onChange: (event) => setRecurrenceDraft((current) => current ? {
																	...current,
																	custom_date: event.target.value
																} : current),
																className: "min-h-11 min-w-0 flex-1 rounded-xl border border-[var(--border-strong)] bg-white px-3 text-base sm:text-sm"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																disabled: !recurrenceDraft.custom_date || recurrenceDraft.dates.includes(recurrenceDraft.custom_date),
																onClick: () => setRecurrenceDraft((current) => current ? {
																	...current,
																	dates: [...current.dates, current.custom_date].sort(),
																	custom_date: ""
																} : current),
																className: "min-h-11 rounded-xl border border-[var(--border-strong)] px-3 text-sm font-medium text-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-50",
																children: "Adicionar data"
															})]
														}),
														recurrenceDraft.dates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
															className: "flex flex-wrap gap-2",
															"aria-label": "Datas avulsas selecionadas",
															children: recurrenceDraft.dates.map((date) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => setRecurrenceDraft((current) => current ? {
																	...current,
																	dates: current.dates.filter((item) => item !== date)
																} : current),
																"aria-label": `Remover data ${formatLongDate(date)} das datas avulsas`,
																className: "min-h-10 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 text-sm text-[var(--foreground)] hover:bg-[var(--brand-light)]",
																children: [formatLongDate(date), " ×"]
															}) }, date))
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
													className: "space-y-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
															className: "text-sm font-medium text-[var(--foreground)]",
															children: "Datas para pular (opcional)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-xs text-[var(--muted)]",
															children: "Use para folgas, feriados ou exceções do vínculo."
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex flex-col gap-2 min-[420px]:flex-row",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "date",
																"aria-label": "Data para pular",
																value: recurrenceDraft.skip_date,
																onChange: (event) => setRecurrenceDraft((current) => current ? {
																	...current,
																	skip_date: event.target.value
																} : current),
																className: "min-h-11 min-w-0 flex-1 rounded-xl border border-[var(--border-strong)] bg-white px-3 text-base sm:text-sm"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																disabled: !recurrenceDraft.skip_date || recurrenceDraft.skip_dates.includes(recurrenceDraft.skip_date),
																onClick: () => setRecurrenceDraft((current) => current ? {
																	...current,
																	skip_dates: [...current.skip_dates, current.skip_date].sort(),
																	skip_date: ""
																} : current),
																className: "min-h-11 rounded-xl border border-[var(--border-strong)] px-3 text-sm font-medium text-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-50",
																children: "Pular data"
															})]
														}),
														recurrenceDraft.skip_dates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
															className: "flex flex-wrap gap-2",
															"aria-label": "Datas para pular selecionadas",
															children: recurrenceDraft.skip_dates.map((date) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => setRecurrenceDraft((current) => current ? {
																	...current,
																	skip_dates: current.skip_dates.filter((item) => item !== date)
																} : current),
																"aria-label": `Remover data ${formatLongDate(date)} das exceções`,
																className: "min-h-10 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 text-sm text-[var(--foreground)] hover:bg-[var(--brand-light)]",
																children: [formatLongDate(date), " ×"]
															}) }, date))
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] p-3 text-sm",
													role: "status",
													"aria-live": "polite",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
														className: "font-semibold text-[var(--foreground)]",
														children: "Prévia da recorrência"
													}), recurrencePreview && "error" in recurrencePreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-[var(--status-critical)]",
														children: recurrencePreview.error
													}) : recurrencePreview && "dates" in recurrencePreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-1 font-medium text-[var(--foreground)]",
														children: [
															recurrencePreview.dates.length,
															" ",
															recurrencePreview.dates.length === 1 ? "plantão" : "plantões",
															" serão adicionados."
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-1 text-[var(--muted)]",
														children: [
															"Próximas datas: ",
															recurrencePreview.dates.slice(0, 5).map(formatLongDate).join(" · "),
															recurrencePreview.dates.length > 5 ? " · …" : ""
														]
													})] }) : null]
												})
											]
										})]
									}),
									mutationError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										role: "alert",
										className: "rounded-lg bg-[var(--status-critical-bg)] p-3 text-sm text-[var(--status-critical)]",
										children: mutationError
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: saving,
											className: "min-h-11 rounded-xl bg-[var(--brand)] px-4 text-sm font-semibold text-white hover:bg-[var(--brand-dark)] disabled:cursor-wait disabled:opacity-60",
											children: saving ? "Salvando…" : editingId ? "Salvar alterações" : recurrenceEnabled ? "Aplicar recorrência" : "Adicionar à escala"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: saving,
											onClick: () => {
												setDraft(null);
												setEditingId(null);
												setMutationError(null);
											},
											className: "min-h-11 rounded-xl border border-[var(--border-strong)] bg-white px-4 text-sm font-medium text-[var(--foreground)] disabled:opacity-60",
											children: "Cancelar"
										})]
									})
								]
							}),
							mutationMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "status",
								"aria-live": "polite",
								className: "rounded-lg bg-[var(--accent-light)] p-3 text-sm font-medium text-[var(--accent-dark)]",
								children: mutationMessage
							}),
							mutationError && !draft && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								className: "rounded-lg bg-[var(--status-critical-bg)] p-3 text-sm text-[var(--status-critical)]",
								children: mutationError
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-3",
						children: selectedEntries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl border border-dashed border-[var(--border-strong)] p-4 text-sm text-[var(--muted)]",
							children: "Nenhum plantão seu está registrado para esta data."
						}) : selectedEntries.map((entry) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-xl border border-[var(--border)] bg-white p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "break-words font-semibold text-[var(--foreground)]",
									children: entry.patient_name || patientNames.get(entry.patient_id) || "Paciente"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-[var(--muted)]",
									children: ["Horário: ", formatShiftTime(entry)]
								})]
							}, entry.id);
						})
					})]
				})
			})
		]
	});
}
//#endregion
export { ScheduleCalendar };
