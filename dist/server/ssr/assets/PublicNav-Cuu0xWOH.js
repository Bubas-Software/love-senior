import { A as __toESM, C as require_react, n as require_jsx_runtime } from "../index.js";
import { t as Image } from "./image-Bd2_LIqb.js";
import Link from "./link-CgGlv3b-.js";
//#region src/components/Brand.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Brand({ compact = false, href = "/" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		href,
		className: "brand-lockup",
		"aria-label": "Love Sênior Cuidados Humanizados — página inicial",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
			src: "/images/love-senior-logo.png",
			alt: "",
			width: 654,
			height: 437,
			unoptimized: true,
			priority: true,
			className: compact ? "h-10 w-[3.75rem] object-contain" : "h-[6rem] w-[9rem] object-contain"
		})
	});
}
//#endregion
//#region src/components/LineIcon.tsx
function LineIcon({ name, className = "h-5 w-5" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		"aria-hidden": "true",
		className,
		fill: "none",
		focusable: "false",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: "1.8",
		viewBox: "0 0 24 24",
		children: (() => {
			switch (name) {
				case "activity": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 12h4l2.2-6 4.1 12 2.1-6H21" });
				case "arrow": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m13 6 6 6-6 6" })] });
				case "care": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 12h2l1-2 2 4 1-2h2" })] });
				case "check": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "12",
					r: "9"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m8 12 2.5 2.5L16 9" })] });
				case "clock": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "12",
					r: "9"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 7v5l3 2" })] });
				case "home": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m3 11 9-8 9 8" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 10v10h14V10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 20v-6h6v6" })
				] });
				case "medical": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 3v5a6 6 0 0 0 12 0V3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 3h6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M15 3h6" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 14v2a4 4 0 0 0 4 4h1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "19",
						cy: "20",
						r: "2"
					})
				] });
				case "person": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "9",
						cy: "8",
						r: "4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 21v-2a7 7 0 0 1 14 0v2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m17 11 2 2 3-4" })
				] });
				case "shield": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 12 2 2 4-4" })] });
			}
		})()
	});
}
//#endregion
//#region src/components/PublicNav.tsx
var NAV_LINKS = [
	{
		href: "/#servicos",
		label: "Serviços"
	},
	{
		href: "/#como-funciona",
		label: "Como funciona"
	},
	{
		href: "/solicitar-cuidado",
		label: "Contato"
	}
];
function PublicNav() {
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [actionsVisible, setActionsVisible] = (0, import_react.useState)(true);
	const menuId = (0, import_react.useId)();
	const headerRef = (0, import_react.useRef)(null);
	const menuButtonRef = (0, import_react.useRef)(null);
	const actionsBarRef = (0, import_react.useRef)(null);
	const actionsVisibleRef = (0, import_react.useRef)(true);
	const lastScrollYRef = (0, import_react.useRef)(0);
	const suppressScrollUntilRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (!menuOpen) return;
		function handleEscape(event) {
			if (event.key !== "Escape") return;
			setMenuOpen(false);
			menuButtonRef.current?.focus();
		}
		function handleOutsidePointer(event) {
			if (headerRef.current && !headerRef.current.contains(event.target)) setMenuOpen(false);
		}
		document.addEventListener("keydown", handleEscape);
		document.addEventListener("pointerdown", handleOutsidePointer);
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.removeEventListener("pointerdown", handleOutsidePointer);
		};
	}, [menuOpen]);
	(0, import_react.useEffect)(() => {
		const desktopQuery = window.matchMedia("(min-width: 1280px)");
		const closeOnDesktop = () => {
			if (desktopQuery.matches) setMenuOpen(false);
		};
		closeOnDesktop();
		desktopQuery.addEventListener("change", closeOnDesktop);
		return () => desktopQuery.removeEventListener("change", closeOnDesktop);
	}, []);
	(0, import_react.useEffect)(() => {
		lastScrollYRef.current = window.scrollY;
		function handleScroll() {
			const currentScrollY = Math.max(window.scrollY, 0);
			const scrollDelta = currentScrollY - lastScrollYRef.current;
			lastScrollYRef.current = currentScrollY;
			if (currentScrollY <= 16) {
				actionsVisibleRef.current = true;
				setActionsVisible(true);
				return;
			}
			if (performance.now() < suppressScrollUntilRef.current || Math.abs(scrollDelta) < 4 || actionsBarRef.current?.contains(document.activeElement)) return;
			const nextVisibility = scrollDelta < 0;
			if (actionsVisibleRef.current === nextVisibility) return;
			actionsVisibleRef.current = nextVisibility;
			suppressScrollUntilRef.current = performance.now() + 260;
			setActionsVisible(nextVisibility);
		}
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	function closeMenu() {
		setMenuOpen(false);
	}
	const showActionsBar = actionsVisible || menuOpen;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		ref: headerRef,
		className: "sticky top-0 z-40 border-b border-[var(--border)] bg-white/95 backdrop-blur-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page flex min-h-[7rem] items-center justify-between gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Navegação principal",
						className: "hidden items-center gap-9 text-sm font-medium text-[var(--muted)] xl:flex",
						children: NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: link.href,
							className: "hover:text-[var(--brand-dark)]",
							children: link.label
						}, link.href))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-3 xl:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/login",
								className: "text-sm font-medium text-[var(--foreground)] hover:text-[var(--brand-dark)]",
								children: "Acessar painel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/trabalhe-conosco",
								className: "inline-flex min-h-10 items-center rounded-lg border border-[var(--brand-dark)] px-3.5 text-sm font-semibold text-[var(--brand-dark)] hover:bg-[var(--brand-light)]",
								children: "Trabalhe conosco"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/solicitar-cuidado",
								className: "rounded-lg bg-[var(--brand-dark)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-deep)]",
								children: "Solicitar cuidado"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						ref: menuButtonRef,
						type: "button",
						className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-white text-[var(--brand-dark)] hover:border-[var(--brand)] hover:bg-[var(--brand-light)] xl:hidden",
						"aria-expanded": menuOpen,
						"aria-controls": menuId,
						"aria-label": menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação",
						onClick: () => setMenuOpen((current) => !current),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							"aria-hidden": "true",
							viewBox: "0 0 24 24",
							className: "h-5 w-5",
							fill: "none",
							stroke: "currentColor",
							strokeLinecap: "round",
							strokeWidth: "2",
							children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m6 6 12 12M18 6 6 18" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 6h16M4 12h16M4 18h16" })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: actionsBarRef,
				"aria-hidden": !showActionsBar,
				inert: !showActionsBar,
				className: `border-t border-[var(--border)] bg-white overflow-hidden transition-[max-height,opacity,padding,transform] duration-200 ease-out motion-reduce:transition-none xl:hidden ${showActionsBar ? "max-h-52 translate-y-0 py-3 opacity-100 sm:max-h-28" : "pointer-events-none max-h-0 -translate-y-1 py-0 opacity-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page grid gap-2 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/login",
							className: "inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--border-strong)] px-4 text-sm font-semibold text-[var(--foreground)] hover:border-[var(--brand)] hover:bg-[var(--brand-light)]",
							children: "Acessar painel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: "/trabalhe-conosco",
							className: "inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--brand-dark)] px-4 text-sm font-semibold text-[var(--brand-dark)] hover:bg-[var(--brand-light)]",
							children: "Trabalhe conosco"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							href: "/solicitar-cuidado",
							className: "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[var(--brand-dark)] px-4 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-deep)]",
							children: ["Solicitar cuidado", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineIcon, {
								name: "arrow",
								className: "h-4 w-4"
							})]
						})
					]
				})
			}),
			menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: menuId,
				className: "border-t border-[var(--border)] bg-white xl:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "container-page py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Navegação mobile",
						className: "grid gap-1",
						children: NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: link.href,
							className: "inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--brand-light)] hover:text-[var(--brand-dark)]",
							onClick: closeMenu,
							children: link.label
						}, link.href))
					})
				})
			}) : null
		]
	});
}
//#endregion
export { PublicNav };
