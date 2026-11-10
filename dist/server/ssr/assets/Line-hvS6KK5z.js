import { A as __toESM, C as require_react } from "../index.js";
import { At as clsx, Ct as noop, Dt as svgPropertiesAndEventsFromUnknown, E as selectUnfilteredCartesianItems, Et as svgPropertiesAndEvents, F as SetErrorBarContext, I as RegisterGraphicalItemId, J as LabelListFromLabelProp, K as isClipDot, L as SetTooltipEntrySettings, Ot as svgPropertiesNoEvents, P as selectChartDataWithIndexesIfNotInPanoramaPosition4, Q as useChartLayout, S as selectAxisWithScale, T as selectTicksOfGraphicalItem, Tt as Layer, U as adaptEventHandlers, V as Shape, X as DefaultZIndexes, Y as ZIndexLayer, Z as selectChartLayout, _ as useNeedsClip, bt as isNullish, ct as getTooltipNameProp, d as useAnimationCallbacks, et as useIsPanorama, ft as createSelector, g as GraphicalItemClipPath, gt as resolveDefaultProps, h as SetLegendPayload, i as Curve, kt as svgPropertiesNoEventsFromUnknown, l as propsAreEqual, lt as getValueByDataKey, m as SetCartesianGraphicalItem, mt as useAppSelector, ot as getCateCoordinateOfLine, p as matchByIndex, q as CartesianLabelListContextProvider, rt as getBandSizeOfAxis, u as AnimatedItems, ut as isCategoricalAxis, v as useActiveTooltipDataPoints, vt as interpolate, wt as round, x as selectActiveTooltipIndex, xt as isNumber, y as usePlotArea } from "./YAxis-BIE5qNJN.js";
//#region node_modules/recharts/es6/cartesian/LineDrawShape.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var _excluded$2 = [
	"animationElapsedTime",
	"isAnimating",
	"isEntrance",
	"visibleLength",
	"strokeDasharray",
	"connectNulls"
];
function _extends$3() {
	return _extends$3 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$3.apply(null, arguments);
}
function _objectWithoutProperties$2(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$2(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$2(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
/**
* Reads the total length of an SVG path element, returning 0 if the element
* is null or the measurement fails (e.g. in JSDOM).
*/
function getTotalLength$1(path) {
	try {
		return path && path.getTotalLength && path.getTotalLength() || 0;
	} catch (_unused) {
		return 0;
	}
}
/**
* Generates a simple stroke-dasharray string for animating a line draw effect.
*
* Uses `totalLength` as the gap (instead of `totalLength - length`) to prevent a floating-point
* precision artifact: when fractional dash and gap values are serialized to a string attribute
* and reparsed by the SVG renderer, their sum can differ from the actual path length by a ULP,
* causing the dasharray pattern to repeat and render a phantom dot at the path endpoint
* with round or square strokeLinecap.
*
* @param totalLength The total length of the SVG path
* @param length The currently visible portion of the path
* @returns A stroke-dasharray string like "50px 200px"
*/
function generateSimpleStrokeDasharray(totalLength, length) {
	return "".concat(length, "px ").concat(totalLength, "px");
}
/**
* Normalizes a dash pattern to the even-length sequence used by SVG renderers.
* Odd-length stroke-dasharray values repeat once, so "5" behaves like "5 5".
*
* @param lines Array of dash/gap lengths to repeat
* @returns An even-length dash pattern
*/
function normalizeDashPattern(lines) {
	return lines.length % 2 !== 0 ? [...lines, ...lines] : lines;
}
/**
* Repeats a dash pattern array a given number of times.
*
* @param lines Array of dash/gap lengths to repeat
* @param count Number of times to repeat the pattern
* @returns A new array with the pattern repeated `count` times
*/
function repeat(lines, count) {
	var result = [];
	for (var i = 0; i < count; ++i) result.push(...lines);
	return result;
}
/**
* Computes a stroke-dasharray string for animating a custom-dashed line draw effect.
*
* Given a user-specified dash pattern (e.g. `"7,3"`), this function builds a dasharray
* that reveals exactly `length` pixels of that pattern, followed by a gap of `totalLength`
* to hide the remainder of the path.
*
* Like {@link generateSimpleStrokeDasharray}, the trailing gap uses `totalLength` rather than
* `totalLength - length` to avoid floating-point precision artifacts with round/square strokeLinecap.
*
* @param length The currently visible portion of the path
* @param totalLength The total length of the SVG path
* @param lines The user-specified dash pattern as an array of numbers (e.g. [7, 3])
* @returns A stroke-dasharray string incorporating the custom dash pattern
*/
function getStrokeDasharray(length, totalLength, lines) {
	var normalizedLines = normalizeDashPattern(lines);
	var lineLength = normalizedLines.reduce((pre, next) => pre + next, 0);
	if (!lineLength) return generateSimpleStrokeDasharray(totalLength, length);
	var count = Math.floor(length / lineLength);
	var remainLength = length % lineLength;
	var remainLines = [];
	for (var i = 0, sum = 0; i < normalizedLines.length; sum += (_normalizedLines$i = normalizedLines[i]) !== null && _normalizedLines$i !== void 0 ? _normalizedLines$i : 0, ++i) {
		var _normalizedLines$i;
		var lineValue = normalizedLines[i];
		if (lineValue != null && sum + lineValue > remainLength) {
			remainLines = [...normalizedLines.slice(0, i), remainLength - sum];
			break;
		}
	}
	var emptyLines = remainLines.length % 2 === 0 ? [0, totalLength] : [totalLength];
	return [
		...repeat(normalizedLines, count),
		...remainLines,
		...emptyLines
	].map((line) => "".concat(line, "px")).join(", ");
}
/**
* Computes the animated stroke-dasharray for a line's entrance animation.
*
* @param userStrokeDasharray The user-specified stroke-dasharray (e.g. "5,3"), if any
* @param totalLength Total SVG path length
* @param visibleLength How much of the path should be visible
* @returns A stroke-dasharray string for the current animation frame
*/
function computeAnimatedStrokeDasharray(userStrokeDasharray, totalLength, visibleLength) {
	if (userStrokeDasharray) return getStrokeDasharray(visibleLength, totalLength, "".concat(userStrokeDasharray).split(/[,\s]+/gim).map((num) => parseFloat(num)));
	return generateSimpleStrokeDasharray(totalLength, visibleLength);
}
/**
* The default shape for Line. During the entrance animation, the line is progressively
* revealed using the `strokeDasharray` SVG attribute: the visible portion grows from
* 0 to the full path length as `animationElapsedTime` progresses from 0 to 1.
*
* This is the built-in shape for Line. It is automatically used when no custom `shape` prop
* is provided. You can import and reuse it as a starting point for custom shapes,
* or use it as a reference for building your own.
*
* The animation progress props (`animationElapsedTime`, `isAnimating`, `isEntrance`) are available
* for custom shapes that want to add their own effects on top.
*
* @example
* ```tsx
* import { Line, LineDrawShape } from 'recharts';
*
* // Use the default shape explicitly (same as providing no shape prop)
* <Line dataKey="value" shape={LineDrawShape} />
* ```
*
* @see {@link https://recharts.github.io/en-US/guide/animations Animation guide}
*
* @since 3.9
*/
function LineDrawShape(props) {
	props.animationElapsedTime;
	props.isAnimating;
	props.isEntrance;
	var visibleLength = props.visibleLength, userStrokeDasharray = props.strokeDasharray, connectNulls = props.connectNulls, curveProps = _objectWithoutProperties$2(props, _excluded$2);
	var finalConnectNulls = connectNulls !== null && connectNulls !== void 0 ? connectNulls : false;
	var strokeDasharray;
	if (visibleLength != null) {
		var _pathRef$current;
		var pathRef = curveProps.pathRef;
		strokeDasharray = computeAnimatedStrokeDasharray(userStrokeDasharray, getTotalLength$1((_pathRef$current = pathRef === null || pathRef === void 0 ? void 0 : pathRef.current) !== null && _pathRef$current !== void 0 ? _pathRef$current : null), visibleLength);
	} else if (userStrokeDasharray != null) strokeDasharray = String(userStrokeDasharray);
	return /* @__PURE__ */ import_react.createElement(Curve, _extends$3({}, curveProps, {
		connectNulls: finalConnectNulls,
		strokeDasharray
	}));
}
//#endregion
//#region node_modules/recharts/es6/cartesian/useAnimatedLineLength.js
/**
* Tracks the animated visible length of a Line's SVG path across data changes.
*
* Invariants:
* 1. The visible length only grows (monotonically non-decreasing with animationElapsedTime).
* 2. The visible length changes continuously — no jumps when data changes mid-animation.
*    This is achieved by tracking the maximum animated length in pixels and using it
*    as the starting point for the next animation.
* 3. Once the line reaches 100% visibility, it never becomes partially visible again.
*    In that case the hook returns `null`, meaning no animation stroke-dasharray is needed.
*
* @param points The current set of points for the line. When this reference changes,
*   the hook detects a data change and starts a new animation from the current visible length.
* @returns A stable callback `(animationElapsedTime, totalLength) => number | null` where:
*   - `animationElapsedTime` is the animation progress (0 to 1)
*   - `totalLength` is the current total length of the SVG path in pixels
*   - returns the visible length in pixels, or `null` if the line is fully visible
*/
function useAnimatedLineLength(points) {
	var startingLengthRef = (0, import_react.useRef)(0);
	var maxAnimatedLengthRef = (0, import_react.useRef)(0);
	var reachedFullRef = (0, import_react.useRef)(false);
	var prevPointsRef = (0, import_react.useRef)(points);
	if (prevPointsRef.current !== points) {
		startingLengthRef.current = maxAnimatedLengthRef.current;
		prevPointsRef.current = points;
	}
	return (0, import_react.useCallback)((animationElapsedTime, totalLength) => {
		if (reachedFullRef.current) return null;
		var visibleLength = Math.min(round(startingLengthRef.current + animationElapsedTime * totalLength), totalLength);
		if (animationElapsedTime > 0 && totalLength > 0) {
			maxAnimatedLengthRef.current = Math.max(maxAnimatedLengthRef.current, visibleLength);
			if (visibleLength >= totalLength) {
				reachedFullRef.current = true;
				return null;
			}
		}
		return visibleLength;
	}, []);
}
//#endregion
//#region node_modules/recharts/es6/shape/Dot.js
function _extends$2() {
	return _extends$2 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$2.apply(null, arguments);
}
/**
* Renders a dot in the chart.
*
* This component accepts X and Y coordinates in pixels.
* If you need to position the rectangle based on your chart's data,
* consider using the {@link ReferenceDot} component instead.
*
* @param props
* @constructor
*/
var Dot = (props) => {
	var cx = props.cx, cy = props.cy, r = props.r, className = props.className;
	var layerClass = clsx("recharts-dot", className);
	if (isNumber(cx) && isNumber(cy) && isNumber(r)) return /* @__PURE__ */ import_react.createElement("circle", _extends$2({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
		className: layerClass,
		cx,
		cy,
		r
	}));
	return null;
};
//#endregion
//#region node_modules/recharts/es6/component/Dots.js
var _excluded$1 = ["points"];
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty$2(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$2(e, r, t) {
	return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$2(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$1() {
	return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$1.apply(null, arguments);
}
function _objectWithoutProperties$1(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$1(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$1(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function DotItem(_ref) {
	var option = _ref.option, dotProps = _ref.dotProps, className = _ref.className;
	if (/* @__PURE__ */ (0, import_react.isValidElement)(option)) return /* @__PURE__ */ (0, import_react.cloneElement)(option, dotProps);
	if (typeof option === "function") return option(dotProps);
	var finalClassName = clsx(className, typeof option !== "boolean" ? option.className : ""), _ref2 = dotProps !== null && dotProps !== void 0 ? dotProps : {};
	_ref2.points;
	var props = _objectWithoutProperties$1(_ref2, _excluded$1);
	return /* @__PURE__ */ import_react.createElement(Dot, _extends$1({}, props, { className: finalClassName }));
}
function shouldRenderDots(points, dot) {
	if (points == null) return false;
	if (dot) return true;
	return points.length === 1;
}
function Dots(_ref3) {
	var points = _ref3.points, dot = _ref3.dot, className = _ref3.className, dotClassName = _ref3.dotClassName, dataKey = _ref3.dataKey, baseProps = _ref3.baseProps, needClip = _ref3.needClip, clipPathId = _ref3.clipPathId, _ref3$zIndex = _ref3.zIndex, zIndex = _ref3$zIndex === void 0 ? DefaultZIndexes.scatter : _ref3$zIndex;
	if (!shouldRenderDots(points, dot)) return null;
	var clipDot = isClipDot(dot);
	var customDotProps = svgPropertiesAndEventsFromUnknown(dot);
	var dots = points.map((entry, i) => {
		var _entry$x, _entry$y;
		var dotProps = _objectSpread$2(_objectSpread$2(_objectSpread$2({ r: 3 }, baseProps), customDotProps), {}, {
			index: i,
			cx: (_entry$x = entry.x) !== null && _entry$x !== void 0 ? _entry$x : void 0,
			cy: (_entry$y = entry.y) !== null && _entry$y !== void 0 ? _entry$y : void 0,
			dataKey,
			value: entry.value,
			payload: entry.payload,
			points
		});
		return /* @__PURE__ */ import_react.createElement(DotItem, {
			key: "dot-".concat(i),
			option: dot,
			dotProps,
			className: dotClassName
		});
	});
	var layerProps = {};
	if (needClip && clipPathId != null) layerProps.clipPath = "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")");
	return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex }, /* @__PURE__ */ import_react.createElement(Layer, _extends$1({ className }, layerProps), dots));
}
//#endregion
//#region node_modules/recharts/es6/component/ActivePoints.js
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
			_defineProperty$1(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$1(e, r, t) {
	return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$1(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var ActivePoint = (_ref) => {
	var point = _ref.point, childIndex = _ref.childIndex, mainColor = _ref.mainColor, activeDot = _ref.activeDot, dataKey = _ref.dataKey, clipPath = _ref.clipPath;
	if (activeDot === false || point.x == null || point.y == null) return null;
	var dotProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({}, {
		index: childIndex,
		dataKey,
		cx: point.x,
		cy: point.y,
		r: 4,
		fill: mainColor !== null && mainColor !== void 0 ? mainColor : "none",
		strokeWidth: 2,
		stroke: "#fff",
		payload: point.payload,
		value: point.value
	}), svgPropertiesNoEventsFromUnknown(activeDot)), adaptEventHandlers(activeDot));
	var dot;
	if (/* @__PURE__ */ (0, import_react.isValidElement)(activeDot)) dot = /* @__PURE__ */ (0, import_react.cloneElement)(activeDot, dotProps);
	else if (typeof activeDot === "function") dot = activeDot(dotProps);
	else dot = /* @__PURE__ */ import_react.createElement(Dot, dotProps);
	return /* @__PURE__ */ import_react.createElement(Layer, {
		className: "recharts-active-dot",
		clipPath
	}, dot);
};
function ActivePoints(_ref2) {
	var points = _ref2.points, mainColor = _ref2.mainColor, activeDot = _ref2.activeDot, itemDataKey = _ref2.itemDataKey, clipPath = _ref2.clipPath, _ref2$zIndex = _ref2.zIndex, zIndex = _ref2$zIndex === void 0 ? DefaultZIndexes.activeDot : _ref2$zIndex;
	var activeTooltipIndex = useAppSelector(selectActiveTooltipIndex);
	var activeDataPoints = useActiveTooltipDataPoints();
	if (points == null || activeDataPoints == null) return null;
	var activePoint = points.find((p) => activeDataPoints.includes(p.payload));
	if (isNullish(activePoint)) return null;
	return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex }, /* @__PURE__ */ import_react.createElement(ActivePoint, {
		point: activePoint,
		childIndex: Number(activeTooltipIndex),
		mainColor,
		dataKey: itemDataKey,
		activeDot,
		clipPath
	}));
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/lineSelectors.js
var selectXAxisWithScale = (state, xAxisId, _yAxisId, isPanorama) => selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
var selectXAxisTicks = (state, xAxisId, _yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
var selectYAxisWithScale = (state, _xAxisId, yAxisId, isPanorama) => selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
var selectYAxisTicks = (state, _xAxisId, yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
var selectBandSize = createSelector([
	selectChartLayout,
	selectXAxisWithScale,
	selectYAxisWithScale,
	selectXAxisTicks,
	selectYAxisTicks
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks) => {
	if (isCategoricalAxis(layout, "xAxis")) return getBandSizeOfAxis(xAxis, xAxisTicks, false);
	return getBandSizeOfAxis(yAxis, yAxisTicks, false);
});
var pickLineId = (_state, _xAxisId, _yAxisId, _isPanorama, id) => id;
function isLineSettings(item) {
	return item.type === "line";
}
var selectLinePoints = createSelector([
	selectChartLayout,
	selectXAxisWithScale,
	selectYAxisWithScale,
	selectXAxisTicks,
	selectYAxisTicks,
	createSelector([selectUnfilteredCartesianItems, pickLineId], (graphicalItems, id) => graphicalItems.filter(isLineSettings).find((x) => x.id === id)),
	selectBandSize,
	selectChartDataWithIndexesIfNotInPanoramaPosition4
], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, lineSettings, bandSize, _ref) => {
	var chartData = _ref.chartData, dataStartIndex = _ref.dataStartIndex, dataEndIndex = _ref.dataEndIndex;
	if (lineSettings == null || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null || layout !== "horizontal" && layout !== "vertical") return;
	var dataKey = lineSettings.dataKey, data = lineSettings.data;
	var displayedData;
	if (data != null && data.length > 0) displayedData = data;
	else displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
	if (displayedData == null) return;
	return computeLinePoints({
		layout,
		xAxis,
		yAxis,
		xAxisTicks,
		yAxisTicks,
		dataKey,
		bandSize,
		displayedData
	});
});
//#endregion
//#region node_modules/recharts/es6/util/getRadiusAndStrokeWidthFromDot.js
function getRadiusAndStrokeWidthFromDot(dot) {
	var props = svgPropertiesNoEventsFromUnknown(dot);
	var defaultR = 3;
	var defaultStrokeWidth = 2;
	if (props != null) {
		var r = props.r, strokeWidth = props.strokeWidth;
		var realR = Number(r);
		var realStrokeWidth = Number(strokeWidth);
		if (Number.isNaN(realR) || realR < 0) realR = defaultR;
		if (Number.isNaN(realStrokeWidth) || realStrokeWidth < 0) realStrokeWidth = defaultStrokeWidth;
		return {
			r: realR,
			strokeWidth: realStrokeWidth
		};
	}
	return {
		r: defaultR,
		strokeWidth: defaultStrokeWidth
	};
}
//#endregion
//#region node_modules/recharts/es6/cartesian/Line.js
var _excluded = ["id"], _excluded2 = [
	"type",
	"layout",
	"connectNulls",
	"needClip",
	"shape",
	"strokeDasharray"
], _excluded3 = [
	"activeDot",
	"animateNewValues",
	"animationBegin",
	"animationDuration",
	"animationEasing",
	"connectNulls",
	"dot",
	"hide",
	"isAnimationActive",
	"label",
	"legendType",
	"xAxisId",
	"yAxisId",
	"id"
];
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/**
* Internal props, combination of external props + defaultProps + private Recharts state
*/
/**
* External props, intended for end users to fill in
*/
function getTotalLength(mainCurve) {
	try {
		return mainCurve && mainCurve.getTotalLength && mainCurve.getTotalLength() || 0;
	} catch (_unused) {
		return 0;
	}
}
/**
* Compute the average x-shift between matched pairs (prev → next).
* This tells us the overall direction and magnitude of the data movement.
*/
function averageShift(items) {
	var total = 0;
	var count = 0;
	for (var item of items) if (item.status === "matched" && item.prev.x != null && item.next.x != null) {
		total += item.next.x - item.prev.x;
		count++;
	}
	return count > 0 ? total / count : 0;
}
var defaultLineAnimateItems = (items, animationElapsedTime) => {
	if (items == null) return [];
	if (animationElapsedTime === 1) return items.flatMap((item) => item.status === "removed" ? [] : [item.next]);
	var shift = averageShift(items);
	var result = [];
	for (var item of items) if (item.status === "matched") result.push(_objectSpread(_objectSpread({}, item.next), {}, {
		x: interpolate(item.prev.x, item.next.x, animationElapsedTime),
		y: interpolate(item.prev.y, item.next.y, animationElapsedTime)
	}));
	else if (item.status === "added") if (item.next.x != null) {
		var entryX = item.next.x - shift;
		result.push(_objectSpread(_objectSpread({}, item.next), {}, {
			x: interpolate(entryX, item.next.x, animationElapsedTime),
			y: item.next.y
		}));
	} else result.push(item.next);
	else if (item.status === "removed") {
		if (item.prev.x != null) {
			var exitX = item.prev.x + shift;
			result.push(_objectSpread(_objectSpread({}, item.prev), {}, {
				x: interpolate(item.prev.x, exitX, animationElapsedTime),
				y: item.prev.y
			}));
		}
	}
	return result;
};
var defaultLineProps = {
	activeDot: true,
	animateNewValues: true,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationInterpolateFn: defaultLineAnimateItems,
	animationMatchBy: matchByIndex,
	connectNulls: false,
	dot: true,
	fill: "#fff",
	hide: false,
	isAnimationActive: "auto",
	label: false,
	legendType: "line",
	shape: LineDrawShape,
	stroke: "#3182bd",
	strokeWidth: 1,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: DefaultZIndexes.line,
	type: "linear"
};
/**
* Because of naming conflict, we are forced to ignore certain (valid) SVG attributes.
*/
var computeLegendPayloadFromAreaData = (props) => {
	var dataKey = props.dataKey, name = props.name, stroke = props.stroke, legendType = props.legendType;
	return [{
		inactive: props.hide,
		dataKey,
		type: legendType,
		color: stroke,
		value: getTooltipNameProp(name, dataKey),
		payload: props
	}];
};
var SetLineTooltipEntrySettings = /* @__PURE__ */ import_react.memo((_ref) => {
	var dataKey = _ref.dataKey, data = _ref.data, stroke = _ref.stroke, strokeWidth = _ref.strokeWidth, fill = _ref.fill, name = _ref.name, hide = _ref.hide, unit = _ref.unit, formatter = _ref.formatter, tooltipType = _ref.tooltipType, id = _ref.id;
	var tooltipEntrySettings = {
		dataDefinedOnItem: data,
		getPosition: noop,
		settings: {
			stroke,
			strokeWidth,
			fill,
			dataKey,
			nameKey: void 0,
			name: getTooltipNameProp(name, dataKey),
			hide,
			type: tooltipType,
			color: stroke,
			unit,
			formatter,
			graphicalItemId: id
		}
	};
	return /* @__PURE__ */ import_react.createElement(SetTooltipEntrySettings, { tooltipEntrySettings });
});
function LineDotsWrapper(_ref2) {
	var clipPathId = _ref2.clipPathId, points = _ref2.points, props = _ref2.props;
	var dot = props.dot, dataKey = props.dataKey, needClip = props.needClip;
	props.id;
	var lineProps = svgPropertiesNoEvents(_objectWithoutProperties(props, _excluded));
	return /* @__PURE__ */ import_react.createElement(Dots, {
		points,
		dot,
		className: "recharts-line-dots",
		dotClassName: "recharts-line-dot",
		dataKey,
		baseProps: lineProps,
		needClip,
		clipPathId
	});
}
function LineLabelListProvider(_ref3) {
	var showLabels = _ref3.showLabels, children = _ref3.children, points = _ref3.points;
	var labelListEntries = (0, import_react.useMemo)(() => {
		return points === null || points === void 0 ? void 0 : points.map((point) => {
			var _point$x, _point$y;
			var viewBox = {
				x: (_point$x = point.x) !== null && _point$x !== void 0 ? _point$x : 0,
				y: (_point$y = point.y) !== null && _point$y !== void 0 ? _point$y : 0,
				width: 0,
				lowerWidth: 0,
				upperWidth: 0,
				height: 0
			};
			return _objectSpread(_objectSpread({}, viewBox), {}, {
				value: point.value,
				payload: point.payload,
				viewBox,
				parentViewBox: void 0,
				fill: void 0
			});
		});
	}, [points]);
	return /* @__PURE__ */ import_react.createElement(CartesianLabelListContextProvider, { value: showLabels ? labelListEntries : void 0 }, children);
}
function StaticCurve(_ref4) {
	var clipPathId = _ref4.clipPathId, pathRef = _ref4.pathRef, points = _ref4.points, props = _ref4.props, animationElapsedTime = _ref4.animationElapsedTime, isAnimating = _ref4.isAnimating, isEntrance = _ref4.isEntrance, visibleLength = _ref4.visibleLength;
	var type = props.type, layout = props.layout, connectNulls = props.connectNulls, needClip = props.needClip, shape = props.shape, strokeDasharray = props.strokeDasharray;
	var curveProps = _objectSpread(_objectSpread({}, svgPropertiesAndEvents(_objectWithoutProperties(props, _excluded2))), {}, {
		fill: "none",
		className: "recharts-line-curve",
		clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0,
		points,
		type,
		layout,
		connectNulls,
		strokeDasharray: strokeDasharray !== null && strokeDasharray !== void 0 ? strokeDasharray : props.strokeDasharray,
		pathRef,
		animationElapsedTime,
		isAnimating,
		isEntrance: props.animateNewValues ? isEntrance : false,
		visibleLength
	});
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /* @__PURE__ */ import_react.createElement(Shape, {
		option: shape,
		DefaultShape: defaultLineProps.shape,
		shapeProps: curveProps
	}), /* @__PURE__ */ import_react.createElement(LineDotsWrapper, {
		points,
		clipPathId,
		props
	}));
}
function CurveWithAnimation(_ref5) {
	var clipPathId = _ref5.clipPathId, props = _ref5.props, pathRef = _ref5.pathRef, previousPointsRef = _ref5.previousPointsRef;
	var points = props.points, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationMatchBy = props.animationMatchBy, animationInterpolateFn = props.animationInterpolateFn, layout = props.layout;
	var totalLength = getTotalLength(pathRef.current);
	var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
	var showLabels = !isAnimating;
	var getVisibleLength = useAnimatedLineLength(points);
	var shouldUpdatePreviousRef = (0, import_react.useCallback)((animationElapsedTime) => animationElapsedTime > 0 && totalLength > 0, [totalLength]);
	return /* @__PURE__ */ import_react.createElement(LineLabelListProvider, {
		points,
		showLabels
	}, props.children, /* @__PURE__ */ import_react.createElement(AnimatedItems, {
		animationInput: points,
		animationIdPrefix: "recharts-line-",
		items: points,
		previousItemsRef: previousPointsRef,
		isAnimationActive,
		animationBegin,
		animationDuration,
		animationEasing,
		onAnimationStart: handleAnimationStart,
		onAnimationEnd: handleAnimationEnd,
		animationInterpolateFn,
		animationMatchBy,
		shouldUpdatePreviousRef,
		layout
	}, (stepData, animationElapsedTime, isEntrance) => {
		var animationActive = isAnimating || animationElapsedTime < 1;
		var visibleLength = animationActive ? getVisibleLength(animationElapsedTime, totalLength) : null;
		return /* @__PURE__ */ import_react.createElement(StaticCurve, {
			props,
			points: stepData,
			clipPathId,
			pathRef,
			animationElapsedTime,
			isAnimating: animationActive,
			isEntrance,
			visibleLength
		});
	}), /* @__PURE__ */ import_react.createElement(LabelListFromLabelProp, { label: props.label }));
}
function RenderCurve(_ref6) {
	var clipPathId = _ref6.clipPathId, props = _ref6.props;
	var previousPointsRef = (0, import_react.useRef)(null);
	var pathRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ import_react.createElement(CurveWithAnimation, {
		props,
		clipPathId,
		previousPointsRef,
		pathRef
	});
}
var errorBarDataPointFormatter = (dataPoint, dataKey) => {
	var _dataPoint$x, _dataPoint$y;
	return {
		x: (_dataPoint$x = dataPoint.x) !== null && _dataPoint$x !== void 0 ? _dataPoint$x : void 0,
		y: (_dataPoint$y = dataPoint.y) !== null && _dataPoint$y !== void 0 ? _dataPoint$y : void 0,
		value: dataPoint.value,
		errorVal: getValueByDataKey(dataPoint.payload, dataKey)
	};
};
var LineWithState = class extends import_react.Component {
	render() {
		var _this$props = this.props, hide = _this$props.hide, dot = _this$props.dot, points = _this$props.points, className = _this$props.className, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, top = _this$props.top, left = _this$props.left, width = _this$props.width, height = _this$props.height, id = _this$props.id, needClip = _this$props.needClip, zIndex = _this$props.zIndex;
		if (hide) return null;
		var layerClass = clsx("recharts-line", className);
		var clipPathId = id;
		var _getRadiusAndStrokeWi = getRadiusAndStrokeWidthFromDot(dot), r = _getRadiusAndStrokeWi.r, strokeWidth = _getRadiusAndStrokeWi.strokeWidth;
		var clipDot = isClipDot(dot);
		var dotSize = r * 2 + strokeWidth;
		var activePointsClipPath = needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : void 0;
		return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex }, /* @__PURE__ */ import_react.createElement(Layer, { className: layerClass }, needClip && /* @__PURE__ */ import_react.createElement("defs", null, /* @__PURE__ */ import_react.createElement(GraphicalItemClipPath, {
			clipPathId,
			xAxisId,
			yAxisId
		}), !clipDot && /* @__PURE__ */ import_react.createElement("clipPath", { id: "clipPath-dots-".concat(clipPathId) }, /* @__PURE__ */ import_react.createElement("rect", {
			x: left - dotSize / 2,
			y: top - dotSize / 2,
			width: width + dotSize,
			height: height + dotSize
		}))), /* @__PURE__ */ import_react.createElement(SetErrorBarContext, {
			xAxisId,
			yAxisId,
			data: points,
			dataPointFormatter: errorBarDataPointFormatter,
			errorBarOffset: 0
		}, /* @__PURE__ */ import_react.createElement(RenderCurve, {
			props: this.props,
			clipPathId
		}))), /* @__PURE__ */ import_react.createElement(ActivePoints, {
			activeDot: this.props.activeDot,
			points,
			mainColor: this.props.stroke,
			itemDataKey: this.props.dataKey,
			clipPath: activePointsClipPath
		}));
	}
};
function LineImpl(props) {
	var _resolveDefaultProps = resolveDefaultProps(props, defaultLineProps), activeDot = _resolveDefaultProps.activeDot, animateNewValues = _resolveDefaultProps.animateNewValues, animationBegin = _resolveDefaultProps.animationBegin, animationDuration = _resolveDefaultProps.animationDuration, animationEasing = _resolveDefaultProps.animationEasing, connectNulls = _resolveDefaultProps.connectNulls, dot = _resolveDefaultProps.dot, hide = _resolveDefaultProps.hide, isAnimationActive = _resolveDefaultProps.isAnimationActive, label = _resolveDefaultProps.label, legendType = _resolveDefaultProps.legendType, xAxisId = _resolveDefaultProps.xAxisId, yAxisId = _resolveDefaultProps.yAxisId, id = _resolveDefaultProps.id, everythingElse = _objectWithoutProperties(_resolveDefaultProps, _excluded3);
	var needClip = useNeedsClip(xAxisId, yAxisId).needClip;
	var plotArea = usePlotArea();
	var layout = useChartLayout();
	var isPanorama = useIsPanorama();
	var points = useAppSelector((state) => selectLinePoints(state, xAxisId, yAxisId, isPanorama, id));
	if (layout !== "horizontal" && layout !== "vertical" || points == null || plotArea == null) return null;
	var height = plotArea.height, width = plotArea.width, left = plotArea.x, top = plotArea.y;
	return /* @__PURE__ */ import_react.createElement(LineWithState, _extends({}, everythingElse, {
		id,
		connectNulls,
		dot,
		activeDot,
		animateNewValues,
		animationBegin,
		animationDuration,
		animationEasing,
		isAnimationActive,
		hide,
		label,
		legendType,
		xAxisId,
		yAxisId,
		points,
		layout,
		height,
		width,
		left,
		top,
		needClip
	}));
}
function computeLinePoints(_ref7) {
	var layout = _ref7.layout, xAxis = _ref7.xAxis, yAxis = _ref7.yAxis, xAxisTicks = _ref7.xAxisTicks, yAxisTicks = _ref7.yAxisTicks, dataKey = _ref7.dataKey, bandSize = _ref7.bandSize;
	return _ref7.displayedData.map((entry, index) => {
		var value = getValueByDataKey(entry, dataKey);
		if (layout === "horizontal") {
			var _x = getCateCoordinateOfLine({
				axis: xAxis,
				ticks: xAxisTicks,
				bandSize,
				entry,
				index
			});
			var _y = isNullish(value) ? null : yAxis.scale.map(value);
			return {
				x: _x,
				y: _y !== null && _y !== void 0 ? _y : null,
				value,
				payload: entry
			};
		}
		var x = isNullish(value) ? null : xAxis.scale.map(value);
		var y = getCateCoordinateOfLine({
			axis: yAxis,
			ticks: yAxisTicks,
			bandSize,
			entry,
			index
		});
		if (x == null || y == null) return null;
		return {
			x,
			y,
			value,
			payload: entry
		};
	}).filter(Boolean);
}
function LineFn(outsideProps) {
	var props = resolveDefaultProps(outsideProps, defaultLineProps);
	var isPanorama = useIsPanorama();
	return /* @__PURE__ */ import_react.createElement(RegisterGraphicalItemId, {
		id: props.id,
		type: "line"
	}, (id) => /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(SetLegendPayload, { legendPayload: computeLegendPayloadFromAreaData(props) }), /* @__PURE__ */ import_react.createElement(SetLineTooltipEntrySettings, {
		dataKey: props.dataKey,
		data: props.data,
		stroke: props.stroke,
		strokeWidth: props.strokeWidth,
		fill: props.fill,
		name: props.name,
		hide: props.hide,
		unit: props.unit,
		formatter: props.formatter,
		tooltipType: props.tooltipType,
		id
	}), /* @__PURE__ */ import_react.createElement(SetCartesianGraphicalItem, {
		type: "line",
		id,
		data: props.data,
		xAxisId: props.xAxisId,
		yAxisId: props.yAxisId,
		zAxisId: 0,
		dataKey: props.dataKey,
		hide: props.hide,
		isPanorama
	}), /* @__PURE__ */ import_react.createElement(LineImpl, _extends({}, props, { id }))));
}
/**
* @provides LabelListContext
* @provides ErrorBarContext
* @consumes CartesianChartContext
*/
var Line = /* @__PURE__ */ import_react.memo(LineFn, propsAreEqual);
Line.displayName = "Line";
//#endregion
export { Line as t };
