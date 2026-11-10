import { n as require_jsx_runtime } from "../index.js";
import { $ as ResponsiveContainer, a as Legend, n as XAxis, o as CartesianGrid, r as Tooltip, t as YAxis } from "./YAxis-BIE5qNJN.js";
import { t as Line } from "./Line-hvS6KK5z.js";
import { t as LineChart } from "./LineChart-DddtAAC4.js";
//#region src/components/charts/VitalsChart.tsx
var import_jsx_runtime = require_jsx_runtime();
var SERIES_1 = "#2a78d6";
var SERIES_2 = "#eb6834";
var GRID = "#e1e0d9";
var AXIS = "#898781";
function formatDay(dateStr) {
	return (/* @__PURE__ */ new Date(dateStr + "T00:00:00")).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "2-digit"
	});
}
function ChartFrame({ title, unit, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between mb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-sm font-semibold text-[var(--foreground)]",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-[var(--muted-2)]",
				children: unit
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-48",
			children
		})]
	});
}
function BloodPressureChart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		title: "Pressão arterial",
		unit: "mmHg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 4,
					right: 8,
					left: -20,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: GRID,
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "date",
						tickFormatter: formatDay,
						tick: {
							fontSize: 11,
							fill: AXIS
						},
						axisLine: { stroke: GRID },
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fontSize: 11,
							fill: AXIS
						},
						axisLine: false,
						tickLine: false,
						domain: [40, 200]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						labelFormatter: (v) => formatDay(String(v)),
						contentStyle: {
							borderRadius: 8,
							border: "1px solid #e1e0d9",
							fontSize: 12
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "bp_systolic",
						name: "Sistólica",
						stroke: SERIES_1,
						strokeWidth: 2,
						dot: { r: 3 },
						connectNulls: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "bp_diastolic",
						name: "Diastólica",
						stroke: SERIES_2,
						strokeWidth: 2,
						dot: { r: 3 },
						connectNulls: true
					})
				]
			})
		})
	});
}
function SingleMetricChart({ data, dataKey, title, unit, domain }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		title,
		unit,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 4,
					right: 8,
					left: -20,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: GRID,
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "date",
						tickFormatter: formatDay,
						tick: {
							fontSize: 11,
							fill: AXIS
						},
						axisLine: { stroke: GRID },
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fontSize: 11,
							fill: AXIS
						},
						axisLine: false,
						tickLine: false,
						domain
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						labelFormatter: (v) => formatDay(String(v)),
						contentStyle: {
							borderRadius: 8,
							border: "1px solid #e1e0d9",
							fontSize: 12
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey,
						name: title,
						stroke: SERIES_1,
						strokeWidth: 2,
						dot: { r: 3 },
						connectNulls: true
					})
				]
			})
		})
	});
}
function HeartRateChart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleMetricChart, {
		data,
		dataKey: "heart_rate",
		title: "Frequência cardíaca",
		unit: "bpm",
		domain: [40, 140]
	});
}
function TemperatureChart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleMetricChart, {
		data,
		dataKey: "temperature",
		title: "Temperatura",
		unit: "°C",
		domain: [34, 40]
	});
}
function Spo2Chart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleMetricChart, {
		data,
		dataKey: "spo2",
		title: "Saturação O2",
		unit: "%",
		domain: [80, 100]
	});
}
function GlucoseChart({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleMetricChart, {
		data,
		dataKey: "glucose",
		title: "Glicemia",
		unit: "mg/dL",
		domain: [50, 300]
	});
}
//#endregion
export { BloodPressureChart, GlucoseChart, HeartRateChart, Spo2Chart, TemperatureChart };
