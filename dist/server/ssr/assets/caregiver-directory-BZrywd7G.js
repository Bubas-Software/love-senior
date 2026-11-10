//#region src/components/admin/caregiver-directory.ts
var DAY_LABELS = {
	segunda: "Segunda-feira",
	terca: "Terça-feira",
	quarta: "Quarta-feira",
	quinta: "Quinta-feira",
	sexta: "Sexta-feira",
	sabado: "Sábado",
	domingo: "Domingo"
};
var SHIFT_LABELS = {
	manha: "Manhã",
	tarde: "Tarde",
	noite: "Noite",
	plantao_12h_diurno: "12h diurno",
	plantao_12h_noturno: "12h noturno",
	plantao_24h: "24h"
};
var PROFESSION_OPTIONS = [
	{
		value: "cuidador",
		label: "Cuidador(a)"
	},
	{
		value: "tecnico_enfermagem",
		label: "Técnico(a) de enfermagem"
	},
	{
		value: "enfermeiro",
		label: "Enfermeiro(a)"
	},
	{
		value: "outros",
		label: "Outros"
	}
];
var PROFESSION_LABELS = {
	cuidador: "Cuidador(a)",
	tecnico_enfermagem: "Técnico(a) de enfermagem",
	enfermeiro: "Enfermeiro(a)",
	outros: "Outros"
};
var UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function isValidCaregiverId(value) {
	return UUID_PATTERN.test(value);
}
//#endregion
export { isValidCaregiverId as a, SHIFT_LABELS as i, PROFESSION_LABELS as n, PROFESSION_OPTIONS as r, DAY_LABELS as t };
