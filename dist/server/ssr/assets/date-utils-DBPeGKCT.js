//#region src/components/schedules/date-utils.ts
var PROFESSION_LABELS = {
	cuidador: "Cuidador(a)",
	tecnico_enfermagem: "Técnico(a) de enfermagem",
	enfermeiro: "Enfermeiro(a)",
	outros: "Outro profissional"
};
var WEEKDAYS = [
	"Dom",
	"Seg",
	"Ter",
	"Qua",
	"Qui",
	"Sex",
	"Sáb"
];
function dateKey(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function dateFromKey(value) {
	const [year, month, day] = value.split("-").map(Number);
	return new Date(year, month - 1, day);
}
function monthDays(value) {
	const [year, month] = value.split("-").map(Number);
	const firstDay = new Date(year, month - 1, 1);
	const gridStart = new Date(year, month - 1, 1 - firstDay.getDay());
	return Array.from({ length: 42 }, (_, index) => {
		const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
		return {
			date,
			key: dateKey(date),
			inMonth: date.getMonth() === month - 1
		};
	});
}
function formatMonth(value) {
	const [year, month] = value.split("-").map(Number);
	const formatted = new Intl.DateTimeFormat("pt-BR", {
		month: "long",
		year: "numeric"
	}).format(new Date(year, month - 1, 1));
	return formatted.charAt(0).toLocaleUpperCase("pt-BR") + formatted.slice(1);
}
function formatLongDate(value) {
	return new Intl.DateTimeFormat("pt-BR", {
		weekday: "long",
		day: "2-digit",
		month: "long",
		year: "numeric"
	}).format(dateFromKey(value));
}
function formatTime(value) {
	return value.slice(0, 5);
}
function timeToMinutes(value) {
	if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return null;
	const [hours, minutes] = value.split(":").map(Number);
	return hours * 60 + minutes;
}
function formatShiftTime(entry) {
	return `${formatTime(entry.start_time)}–${formatTime(entry.end_time)}${entry.ends_next_day ? " (dia seguinte)" : ""}`;
}
//#endregion
export { formatLongDate as a, formatTime as c, dateKey as i, monthDays as l, WEEKDAYS as n, formatMonth as o, dateFromKey as r, formatShiftTime as s, PROFESSION_LABELS as t, timeToMinutes as u };
