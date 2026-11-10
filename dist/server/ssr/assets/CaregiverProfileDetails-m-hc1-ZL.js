import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import Link from "./link-CgGlv3b-.js";
import { t as Pill } from "./Badge-wYrEQwK-.js";
import { t as useRouter } from "./navigation-tipnko1D.js";
import { i as SHIFT_LABELS, n as PROFESSION_LABELS, t as DAY_LABELS } from "./caregiver-directory-BZrywd7G.js";
import { CaregiverEditForm } from "./CaregiverEditForm-B2tp3qHa.js";
import { ContractManager } from "./ContractManager-DwCXd7sS.js";
import { DeleteButton } from "./DeleteButton-C-xg8N2K.js";
//#region src/components/admin/CaregiverProfileDetails.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function formatDate(value) {
	if (!value) return "Não informada";
	const date = new Date(value.length === 10 ? `${value}T12:00:00` : value);
	if (Number.isNaN(date.getTime())) return value;
	return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(date);
}
function formatList(values, labels, emptyMessage) {
	return values.length ? values.map((value) => labels[value] || value).join(", ") : emptyMessage;
}
function CaregiverProfileDetails({ profile, patients, contracts, canManageAccess }) {
	const router = useRouter();
	const [accessFormOpen, setAccessFormOpen] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function createAccess(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(`/api/admin/caregivers/${profile.id}/access`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: data.get("email"),
					password: data.get("password")
				})
			});
			const result = await response.json().catch(() => null);
			if (!response.ok) throw new Error(result?.error || "Não foi possível criar o acesso.");
			setAccessFormOpen(false);
			router.refresh();
		} catch (submissionError) {
			setError(submissionError instanceof Error ? submissionError.message : "Erro ao criar acesso.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				href: "/admin/cuidadores",
				className: "text-sm text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline focus-visible:rounded-sm",
				children: "← Cuidadores"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent-dark)]",
							children: profile.application_id ? "Perfil aprovado" : "Cadastro manual"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 break-words text-xl font-semibold text-[var(--foreground)]",
							children: profile.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-[var(--muted)]",
							children: profile.phone || "Telefone não informado"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 flex-col items-start gap-3 sm:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { value: profile.account_status }), canManageAccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeleteButton, {
						endpoint: `/api/admin/caregivers/${profile.id}`,
						redirectTo: "/admin/cuidadores",
						confirmText: `Excluir o cadastro de ${profile.name}? O acesso será encerrado, vínculos ativos serão removidos e os registros históricos serão preservados sem os dados pessoais do profissional.`,
						label: "Excluir profissional"
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaregiverEditForm, {
				mode: "profile",
				caregiver: profile
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "caregiver-professional-data",
					className: "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "caregiver-professional-data",
						className: "font-semibold text-[var(--foreground)]",
						children: "Dados profissionais"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-medium uppercase tracking-wide text-[var(--muted-2)]",
								children: "Profissão"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm text-[var(--foreground)]",
								children: PROFESSION_LABELS[profile.profession]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-medium uppercase tracking-wide text-[var(--muted-2)]",
								children: "COREN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm text-[var(--foreground)]",
								children: profile.coren || "Não informado"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-medium uppercase tracking-wide text-[var(--muted-2)]",
								children: "E-mail de contato"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 break-words text-sm text-[var(--foreground)]",
								children: profile.contact_email
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-medium uppercase tracking-wide text-[var(--muted-2)]",
								children: "Cidade"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm text-[var(--foreground)]",
								children: profile.city || "Não informada"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs font-medium uppercase tracking-wide text-[var(--muted-2)]",
									children: "Experiência"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 whitespace-pre-wrap text-sm leading-6 text-[var(--foreground)]",
									children: profile.experience || "Não informada"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs font-medium uppercase tracking-wide text-[var(--muted-2)]",
									children: "Observações"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 whitespace-pre-wrap text-sm leading-6 text-[var(--foreground)]",
									children: profile.notes || "Nenhuma observação registrada."
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-labelledby": "caregiver-availability",
					className: "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "caregiver-availability",
						className: "font-semibold text-[var(--foreground)]",
						children: "Disponibilidade"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-medium uppercase tracking-wide text-[var(--muted-2)]",
								children: "Dias"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm text-[var(--foreground)]",
								children: formatList(profile.availability_days, DAY_LABELS, "Nenhum dia informado.")
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-medium uppercase tracking-wide text-[var(--muted-2)]",
								children: "Turnos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm text-[var(--foreground)]",
								children: formatList(profile.availability_shifts, SHIFT_LABELS, "Nenhum turno informado.")
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs font-medium uppercase tracking-wide text-[var(--muted-2)]",
								children: "Disponível a partir de"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 text-sm text-[var(--foreground)]",
								children: formatDate(profile.available_from)
							})] })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "caregiver-patients",
				className: "mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "caregiver-patients",
						className: "font-semibold text-[var(--foreground)]",
						children: "Pacientes vinculados"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-[var(--muted-2)]",
						children: [patients.length, " vinculados"]
					})]
				}), patients.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-2 sm:grid-cols-2",
					children: patients.map((patient) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: `/admin/pacientes/${patient.id}`,
							className: "min-w-0 break-words text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline focus-visible:rounded-sm",
							children: patient.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { value: patient.status })]
					}, patient.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-soft)] p-4 text-sm text-[var(--muted-2)]",
					children: "Nenhum paciente vinculado."
				})]
			}),
			canManageAccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "caregiver-actions",
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: "caregiver-actions",
						className: "font-semibold text-[var(--foreground)]",
						children: "Ações e acesso"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-[var(--muted)]",
						children: "Ações existentes do banco de profissionais."
					})] }), profile.account_status === "aguardando_acesso" && !profile.user_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setError(null);
							setAccessFormOpen((open) => !open);
						},
						className: "min-h-10 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-dark)]",
						children: accessFormOpen ? "Cancelar" : "Criar e-mail e senha"
					}) : null]
				}), accessFormOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: createAccess,
					className: "mt-4 grid gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] lg:items-end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: `access-email-${profile.id}`,
							className: "block text-xs font-medium text-[var(--muted)]",
							children: "E-mail de acesso *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: `access-email-${profile.id}`,
							name: "email",
							type: "email",
							required: true,
							defaultValue: profile.contact_email,
							autoComplete: "off",
							className: "mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: `access-password-${profile.id}`,
							className: "block text-xs font-medium text-[var(--muted)]",
							children: "Senha provisória *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: `access-password-${profile.id}`,
							name: "password",
							type: "password",
							required: true,
							minLength: 12,
							autoComplete: "new-password",
							placeholder: "Mínimo de 12 caracteres",
							className: "mt-1 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-sm"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "min-h-10 rounded-lg bg-[var(--brand-dark)] px-5 text-sm font-semibold text-white hover:bg-[var(--brand-deep)] disabled:opacity-50",
							children: loading ? "Criando..." : "Ativar acesso"
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-[var(--status-critical)] sm:col-span-2 lg:col-span-3",
							role: "alert",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-5 text-[var(--muted-2)] sm:col-span-2 lg:col-span-3",
							children: "Oriente o profissional a trocar a senha provisória usando “Esqueci minha senha” após o primeiro acesso."
						})
					]
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContractManager, {
				ownerType: "caregiver_profile",
				ownerId: profile.id,
				contracts
			})
		]
	});
}
//#endregion
export { CaregiverProfileDetails };
