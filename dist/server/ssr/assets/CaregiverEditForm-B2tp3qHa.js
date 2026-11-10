import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import { t as useRouter } from "./navigation-tipnko1D.js";
import { a as isValidCaregiverId, i as SHIFT_LABELS, n as PROFESSION_LABELS, t as DAY_LABELS } from "./caregiver-directory-BZrywd7G.js";
//#region src/components/admin/CaregiverEditForm.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var dayOptions = Object.entries(DAY_LABELS);
var shiftOptions = Object.entries(SHIFT_LABELS);
var professionOptions = Object.entries(PROFESSION_LABELS);
var inputClassName = "min-h-10 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]";
function profileDraft(caregiver) {
	return {
		name: caregiver.name,
		contact_email: caregiver.contact_email,
		phone: caregiver.phone,
		city: caregiver.city || "",
		profession: caregiver.profession,
		coren: caregiver.coren || "",
		experience: caregiver.experience || "",
		availability_days: [...caregiver.availability_days],
		availability_shifts: [...caregiver.availability_shifts],
		available_from: caregiver.available_from || "",
		notes: caregiver.notes || ""
	};
}
function manualDraft(caregiver) {
	return {
		name: caregiver.name,
		phone: caregiver.phone || "",
		profession: "cuidador",
		availability_days: [],
		availability_shifts: [],
		available_from: ""
	};
}
function Feedback({ message, error, saving, feedbackRef }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: feedbackRef,
		tabIndex: -1,
		className: "mt-4 space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "status",
			"aria-live": "polite",
			className: "text-sm text-[var(--status-good)]",
			children: saving ? "Salvando dados do profissional..." : message || ""
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "alert",
			"aria-live": "assertive",
			className: "text-sm text-[var(--status-critical)]",
			children: error || ""
		})]
	});
}
function Field({ id, label, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: id,
			className: "block text-xs font-medium text-[var(--muted)]",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1",
			children
		})]
	});
}
function EditSection({ title, description, editing, saving, onEdit, onCancel, children, message, error, feedbackRef }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-labelledby": "caregiver-edit-heading",
		"aria-busy": saving,
		className: "mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "caregiver-edit-heading",
					className: "font-semibold text-[var(--foreground)]",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-sm leading-6 text-[var(--muted)]",
					children: description
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: editing ? onCancel : onEdit,
					className: "min-h-10 shrink-0 rounded-lg border border-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--brand-light)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]",
					children: editing ? "Cancelar" : "Editar dados"
				})]
			}),
			editing ? children : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
				message,
				error,
				saving,
				feedbackRef
			})
		]
	});
}
function ProfileEditForm({ caregiver }) {
	const router = useRouter();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)(() => profileDraft(caregiver));
	const feedbackRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (message || error) feedbackRef.current?.focus();
	}, [message, error]);
	function startEditing() {
		setDraft(profileDraft(caregiver));
		setMessage(null);
		setError(null);
		setEditing(true);
	}
	function cancelEditing() {
		setDraft(profileDraft(caregiver));
		setMessage(null);
		setError(null);
		setEditing(false);
	}
	function toggleSelection(field, value) {
		setDraft((current) => ({
			...current,
			[field]: current[field].includes(value) ? current[field].filter((item) => item !== value) : [...current[field], value]
		}));
	}
	async function submit(event) {
		event.preventDefault();
		setSaving(true);
		setMessage(null);
		setError(null);
		const payload = {
			name: draft.name.trim(),
			contact_email: draft.contact_email.trim(),
			phone: draft.phone.trim(),
			city: draft.city.trim() || null,
			profession: draft.profession,
			coren: draft.coren.trim() || null,
			experience: draft.experience.trim() || null,
			availability_days: draft.availability_days,
			availability_shifts: draft.availability_shifts,
			available_from: draft.available_from || null,
			notes: draft.notes.trim() || null
		};
		try {
			const response = await fetch(`/api/admin/caregivers/${caregiver.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const result = await response.json().catch(() => null);
			if (!response.ok) throw new Error(result?.error || "Não foi possível salvar os dados.");
			setMessage("Dados do profissional atualizados com sucesso.");
			setEditing(false);
			router.refresh();
		} catch (submissionError) {
			setError(submissionError instanceof Error ? submissionError.message : "Erro de conexão. Tente novamente.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditSection, {
		title: "Dados cadastrais",
		description: "Atualize os dados profissionais e a disponibilidade. E-mail de acesso, senha e status permanecem somente para consulta.",
		editing,
		saving,
		onEdit: startEditing,
		onCancel: cancelEditing,
		message,
		error,
		feedbackRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-5 grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `caregiver-name-${caregiver.id}`,
					label: "Nome completo *",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: `caregiver-name-${caregiver.id}`,
						name: "name",
						required: true,
						maxLength: 120,
						autoComplete: "name",
						value: draft.name,
						onChange: (event) => setDraft((current) => ({
							...current,
							name: event.target.value
						})),
						className: inputClassName
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `caregiver-contact-email-${caregiver.id}`,
					label: "E-mail de contato *",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: `caregiver-contact-email-${caregiver.id}`,
						name: "contact_email",
						type: "email",
						required: true,
						maxLength: 254,
						autoComplete: "email",
						value: draft.contact_email,
						onChange: (event) => setDraft((current) => ({
							...current,
							contact_email: event.target.value
						})),
						className: inputClassName
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `caregiver-phone-${caregiver.id}`,
					label: "Telefone *",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: `caregiver-phone-${caregiver.id}`,
						name: "phone",
						type: "tel",
						required: true,
						autoComplete: "tel",
						inputMode: "tel",
						value: draft.phone,
						onChange: (event) => setDraft((current) => ({
							...current,
							phone: event.target.value
						})),
						className: inputClassName
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `caregiver-city-${caregiver.id}`,
					label: "Cidade",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: `caregiver-city-${caregiver.id}`,
						name: "city",
						maxLength: 100,
						autoComplete: "address-level2",
						value: draft.city,
						onChange: (event) => setDraft((current) => ({
							...current,
							city: event.target.value
						})),
						className: inputClassName
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `caregiver-profession-${caregiver.id}`,
					label: "Profissão",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: `caregiver-profession-${caregiver.id}`,
						name: "profession",
						value: draft.profession,
						onChange: (event) => setDraft((current) => ({
							...current,
							profession: event.target.value
						})),
						className: inputClassName,
						children: professionOptions.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value,
							children: label
						}, value))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `caregiver-coren-${caregiver.id}`,
					label: "COREN",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: `caregiver-coren-${caregiver.id}`,
						name: "coren",
						maxLength: 40,
						value: draft.coren,
						onChange: (event) => setDraft((current) => ({
							...current,
							coren: event.target.value
						})),
						className: inputClassName
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `caregiver-available-from-${caregiver.id}`,
					label: "Disponível a partir de",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: `caregiver-available-from-${caregiver.id}`,
						name: "available_from",
						type: "date",
						value: draft.available_from,
						onChange: (event) => setDraft((current) => ({
							...current,
							available_from: event.target.value
						})),
						className: inputClassName
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-xs font-medium text-[var(--muted)]",
						children: "Dias disponíveis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4",
						children: dayOptions.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm text-[var(--foreground)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								name: "availability_days",
								value,
								checked: draft.availability_days.includes(value),
								onChange: () => toggleSelection("availability_days", value),
								className: "h-4 w-4 accent-[var(--brand)]"
							}), label]
						}, value))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-xs font-medium text-[var(--muted)]",
						children: "Turnos disponíveis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3",
						children: shiftOptions.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm text-[var(--foreground)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								name: "availability_shifts",
								value,
								checked: draft.availability_shifts.includes(value),
								onChange: () => toggleSelection("availability_shifts", value),
								className: "h-4 w-4 accent-[var(--brand)]"
							}), label]
						}, value))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `caregiver-experience-${caregiver.id}`,
					label: "Experiência",
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: `caregiver-experience-${caregiver.id}`,
						name: "experience",
						rows: 4,
						maxLength: 2e3,
						value: draft.experience,
						onChange: (event) => setDraft((current) => ({
							...current,
							experience: event.target.value
						})),
						className: `${inputClassName} resize-y`
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `caregiver-notes-${caregiver.id}`,
					label: "Observações",
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: `caregiver-notes-${caregiver.id}`,
						name: "notes",
						rows: 4,
						maxLength: 2e3,
						value: draft.notes,
						onChange: (event) => setDraft((current) => ({
							...current,
							notes: event.target.value
						})),
						className: `${inputClassName} resize-y`
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-4 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: saving,
						className: "min-h-10 rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] disabled:cursor-wait disabled:opacity-50",
						children: saving ? "Salvando..." : "Salvar alterações"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-[var(--muted-2)]",
						children: "As credenciais de acesso não são alteradas por este formulário."
					})]
				})
			]
		})
	});
}
function ManualEditForm({ caregiver }) {
	const router = useRouter();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)(() => manualDraft(caregiver));
	const feedbackRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (message || error) feedbackRef.current?.focus();
	}, [message, error]);
	function startEditing() {
		setDraft(manualDraft(caregiver));
		setMessage(null);
		setError(null);
		setEditing(true);
	}
	function cancelEditing() {
		setDraft(manualDraft(caregiver));
		setMessage(null);
		setError(null);
		setEditing(false);
	}
	function toggleSelection(field, value) {
		setDraft((current) => ({
			...current,
			[field]: current[field].includes(value) ? current[field].filter((item) => item !== value) : [...current[field], value]
		}));
	}
	async function submit(event) {
		event.preventDefault();
		setSaving(true);
		setMessage(null);
		setError(null);
		const payload = {
			name: draft.name.trim(),
			phone: draft.phone.trim() || null,
			profession: draft.profession,
			availability_days: draft.availability_days,
			availability_shifts: draft.availability_shifts,
			available_from: draft.available_from || null
		};
		try {
			const response = await fetch(`/api/admin/caregiver-users/${caregiver.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const result = await response.json().catch(() => null);
			if (!response.ok) throw new Error(result?.error || "Não foi possível salvar os dados.");
			if (!result?.profileId || !isValidCaregiverId(result.profileId)) throw new Error("O perfil do profissional não foi identificado. Tente novamente.");
			setMessage("Dados do profissional atualizados com sucesso.");
			setEditing(false);
			router.replace(`/admin/cuidadores/perfil/${result.profileId}`);
		} catch (submissionError) {
			setError(submissionError instanceof Error ? submissionError.message : "Erro de conexão. Tente novamente.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditSection, {
		title: "Dados cadastrais",
		description: "Atualize os dados do profissional, a profissão e a disponibilidade. E-mail de acesso, senha e status permanecem somente para consulta.",
		editing,
		saving,
		onEdit: startEditing,
		onCancel: cancelEditing,
		message,
		error,
		feedbackRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-5 grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `manual-caregiver-name-${caregiver.id}`,
					label: "Nome completo *",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: `manual-caregiver-name-${caregiver.id}`,
						name: "name",
						required: true,
						maxLength: 120,
						autoComplete: "name",
						value: draft.name,
						onChange: (event) => setDraft((current) => ({
							...current,
							name: event.target.value
						})),
						className: inputClassName
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `manual-caregiver-phone-${caregiver.id}`,
					label: "Telefone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: `manual-caregiver-phone-${caregiver.id}`,
						name: "phone",
						type: "tel",
						autoComplete: "tel",
						inputMode: "tel",
						value: draft.phone,
						onChange: (event) => setDraft((current) => ({
							...current,
							phone: event.target.value
						})),
						className: inputClassName
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `manual-caregiver-profession-${caregiver.id}`,
					label: "Profissão *",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: `manual-caregiver-profession-${caregiver.id}`,
						name: "profession",
						required: true,
						value: draft.profession,
						onChange: (event) => setDraft((current) => ({
							...current,
							profession: event.target.value
						})),
						className: inputClassName,
						children: professionOptions.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value,
							children: label
						}, value))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `manual-caregiver-available-from-${caregiver.id}`,
					label: "Data inicial",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: `manual-caregiver-available-from-${caregiver.id}`,
						name: "available_from",
						type: "date",
						value: draft.available_from,
						onChange: (event) => setDraft((current) => ({
							...current,
							available_from: event.target.value
						})),
						className: inputClassName
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-xs font-medium text-[var(--muted)]",
						children: "Dias disponíveis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4",
						children: dayOptions.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm text-[var(--foreground)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								name: "availability_days",
								value,
								checked: draft.availability_days.includes(value),
								onChange: () => toggleSelection("availability_days", value),
								className: "h-4 w-4 accent-[var(--brand)]"
							}), label]
						}, value))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-xs font-medium text-[var(--muted)]",
						children: "Turnos disponíveis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3",
						children: shiftOptions.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm text-[var(--foreground)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								name: "availability_shifts",
								value,
								checked: draft.availability_shifts.includes(value),
								onChange: () => toggleSelection("availability_shifts", value),
								className: "h-4 w-4 accent-[var(--brand)]"
							}), label]
						}, value))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-4 sm:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: saving,
						className: "min-h-10 rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] disabled:cursor-wait disabled:opacity-50",
						children: saving ? "Salvando..." : "Salvar alterações"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-[var(--muted-2)]",
						children: "O e-mail de acesso e a senha não são alterados por este formulário."
					})]
				})
			]
		})
	});
}
function CaregiverEditForm(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: props.mode === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEditForm, { caregiver: props.caregiver }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManualEditForm, { caregiver: props.caregiver }) });
}
//#endregion
export { CaregiverEditForm };
