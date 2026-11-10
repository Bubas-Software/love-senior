import { A as __toESM, C as require_react } from "../index.js";
import { c as arrayTooltipSearcher, s as CartesianChart } from "./YAxis-BIE5qNJN.js";
//#region node_modules/recharts/es6/chart/LineChart.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var allowedTooltipTypes = ["axis"];
/**
* @consumes ResponsiveContainerContext
* @provides CartesianViewBoxContext
* @provides CartesianChartContext
*/
var LineChart = /* @__PURE__ */ (0, import_react.forwardRef)((props, ref) => {
	return /* @__PURE__ */ import_react.createElement(CartesianChart, {
		chartName: "LineChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: allowedTooltipTypes,
		tooltipPayloadSearcher: arrayTooltipSearcher,
		categoricalChartProps: props,
		ref
	});
});
//#endregion
export { LineChart as t };
