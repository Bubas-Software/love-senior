import { n as require_jsx_runtime } from "../index.js";
//#region src/components/ui/Card.tsx
var import_jsx_runtime = require_jsx_runtime();
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_12px_35px_rgba(8,54,49,0.05)] ${className}`,
		children
	});
}
//#endregion
export { Card as t };
