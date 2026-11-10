import { A as __toESM, C as require_react } from "../index.js";
import { A as selectBarGap, At as clsx, B as setActiveMouseOverItemIndex, C as selectCartesianAxisSize, Ct as noop, D as isStacked, E as selectUnfilteredCartesianItems, F as SetErrorBarContext, G as findAllByType, H as Rectangle, I as RegisterGraphicalItemId, J as LabelListFromLabelProp, L as SetTooltipEntrySettings, M as selectRootMaxBarSize, N as selectChartDataWithIndexesIfNotInPanoramaPosition3, O as getStackSeriesIdentifier, Ot as svgPropertiesNoEvents, Q as useChartLayout, R as mouseLeaveItem, S as selectAxisWithScale, St as mathSign, T as selectTicksOfGraphicalItem, Tt as Layer, V as Shape, W as adaptEventsOfChild, X as DefaultZIndexes, Y as ZIndexLayer, Z as selectChartLayout, _ as useNeedsClip, _t as getPercentValue, at as getCateCoordinateOfBar, b as selectActiveTooltipDataKey, bt as isNullish, ct as getTooltipNameProp, d as useAnimationCallbacks, dt as truncateByDomain, et as useIsPanorama, f as matchAppend, ft as createSelector, g as GraphicalItemClipPath, gt as resolveDefaultProps, h as SetLegendPayload, ht as isWellBehavedNumber, it as getBaseValueOfBar, j as selectRootBarSize, k as selectBarCategoryGap, kt as svgPropertiesNoEventsFromUnknown, l as propsAreEqual, lt as getValueByDataKey, m as SetCartesianGraphicalItem, mt as useAppSelector, nt as selectChartOffsetInternal, pt as useAppDispatch, q as CartesianLabelListContextProvider, rt as getBandSizeOfAxis, st as getNormalizedStackId, tt as selectAxisViewBox, u as AnimatedItems, vt as interpolate, w as selectStackGroups, x as selectActiveTooltipIndex, xt as isNumber, yt as isNan, z as setActiveClickItemIndex } from "./YAxis-BIE5qNJN.js";
//#region node_modules/recharts/es6/component/Cell.js
/**
* Cell component used to define colors and styles of chart elements.
*
* This component is now deprecated and will be removed in Recharts 4.0.
*
* Please use the `shape` prop or `content` prop on the respective chart components
* to customize the rendering of chart elements instead of using `Cell`.
*
* @see {@link https://recharts.github.io/en-US/guide/cell/ Guide: Migrate from Cell component to shape prop}
*
* @deprecated
* @consumes CellReader
*/
var Cell = (_props) => null;
Cell.displayName = "Cell";
//#endregion
//#region node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var isProduction = true;
var prefix = "Invariant failed";
function invariant(condition, message) {
	if (condition) return;
	if (isProduction) throw new Error(prefix);
	var provided = typeof message === "function" ? message() : message;
	var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
	throw new Error(value);
}
//#endregion
//#region node_modules/recharts/es6/util/BarUtils.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var _excluded$2 = ["option"];
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
var defaultBarShape = Rectangle;
function BarRectangle(_ref) {
	var option = _ref.option, shapeProps = _objectWithoutProperties$2(_ref, _excluded$2);
	return /* @__PURE__ */ import_react.createElement(Shape, {
		option,
		DefaultShape: defaultBarShape,
		shapeProps,
		activeClassName: "recharts-active-bar",
		inActiveClassName: "recharts-inactive-bar"
	});
}
/**
* Safely gets minPointSize from the minPointSize prop if it is a function
* @param minPointSize minPointSize as passed to the Bar component
* @param defaultValue default minPointSize
* @returns minPointSize
*/
var minPointSizeCallback = function minPointSizeCallback(minPointSize) {
	var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
	return (value, index) => {
		if (isNumber(minPointSize)) return minPointSize;
		var isValueNumberOrNil = isNumber(value) || isNullish(value);
		if (isValueNumberOrNil) return minPointSize(value, index);
		!isValueNumberOrNil && invariant(false, "minPointSize callback function received a value with type of ".concat(typeof value, ". Currently only numbers or null/undefined are supported."));
		return defaultValue;
	};
};
//#endregion
//#region node_modules/recharts/es6/context/tooltipContext.js
/**
* Some graphical items choose to provide more information to the tooltip
* and some do not.
*/
var useMouseEnterItemDispatch = (onMouseEnterFromProps, dataKey, graphicalItemId) => {
	var dispatch = useAppDispatch();
	return (data, index) => (event) => {
		onMouseEnterFromProps === null || onMouseEnterFromProps === void 0 || onMouseEnterFromProps(data, index, event);
		dispatch(setActiveMouseOverItemIndex({
			activeIndex: String(index),
			activeDataKey: dataKey,
			activeCoordinate: data.tooltipPosition,
			activeGraphicalItemId: graphicalItemId
		}));
	};
};
var useMouseLeaveItemDispatch = (onMouseLeaveFromProps) => {
	var dispatch = useAppDispatch();
	return (data, index) => (event) => {
		onMouseLeaveFromProps === null || onMouseLeaveFromProps === void 0 || onMouseLeaveFromProps(data, index, event);
		dispatch(mouseLeaveItem());
	};
};
var useMouseClickItemDispatch = (onMouseClickFromProps, dataKey, graphicalItemId) => {
	var dispatch = useAppDispatch();
	return (data, index) => (event) => {
		onMouseClickFromProps === null || onMouseClickFromProps === void 0 || onMouseClickFromProps(data, index, event);
		dispatch(setActiveClickItemIndex({
			activeIndex: String(index),
			activeDataKey: dataKey,
			activeCoordinate: data.tooltipPosition,
			activeGraphicalItemId: graphicalItemId
		}));
	};
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineBarSizeList.js
function _slicedToArray$1(r, e) {
	return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
	}
}
function _arrayLikeToArray$1(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _iterableToArrayLimit$1(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles$1(r) {
	if (Array.isArray(r)) return r;
}
var getBarSize = (globalSize, totalSize, selfSize) => {
	var barSize = selfSize !== null && selfSize !== void 0 ? selfSize : globalSize;
	if (isNullish(barSize)) return;
	return getPercentValue(barSize, totalSize, 0);
};
var combineBarSizeList = (allBars, globalSize, totalSize) => {
	var initialValue = {};
	var stackedBars = allBars.filter(isStacked);
	var unstackedBars = allBars.filter((b) => b.stackId == null);
	var groupByStack = stackedBars.reduce((acc, bar) => {
		var s = acc[bar.stackId];
		if (s == null) s = [];
		s.push(bar);
		acc[bar.stackId] = s;
		return acc;
	}, initialValue);
	var stackedSizeList = Object.entries(groupByStack).map((_ref) => {
		var _bars$;
		var _ref2 = _slicedToArray$1(_ref, 2), stackId = _ref2[0], bars = _ref2[1];
		return {
			stackId,
			dataKeys: bars.map((b) => b.dataKey),
			barSize: getBarSize(globalSize, totalSize, (_bars$ = bars[0]) === null || _bars$ === void 0 ? void 0 : _bars$.barSize)
		};
	});
	var unstackedSizeList = unstackedBars.map((b) => {
		return {
			stackId: void 0,
			dataKeys: [b.dataKey].filter((dk) => dk != null),
			barSize: getBarSize(globalSize, totalSize, b.barSize)
		};
	});
	return [...stackedSizeList, ...unstackedSizeList];
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineAllBarPositions.js
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
function getBarPositions(barGap, barCategoryGap, bandSize, sizeList, maxBarSize) {
	var _sizeList$;
	var len = sizeList.length;
	if (len < 1) return;
	var realBarGap = getPercentValue(barGap, bandSize, 0, true);
	var result;
	var initialValue = [];
	if (isWellBehavedNumber((_sizeList$ = sizeList[0]) === null || _sizeList$ === void 0 ? void 0 : _sizeList$.barSize)) {
		var useFull = false;
		var fullBarSize = bandSize / len;
		var sum = sizeList.reduce((res, entry) => res + (entry.barSize || 0), 0);
		sum += (len - 1) * realBarGap;
		if (sum >= bandSize) {
			sum -= (len - 1) * realBarGap;
			realBarGap = 0;
		}
		if (sum >= bandSize && fullBarSize > 0) {
			useFull = true;
			fullBarSize *= .9;
			sum = len * fullBarSize;
		}
		var prev = {
			offset: Math.round((bandSize - sum) / 2) - realBarGap,
			size: 0
		};
		result = sizeList.reduce((res, entry) => {
			var _entry$barSize;
			var newPosition = {
				stackId: entry.stackId,
				dataKeys: entry.dataKeys,
				position: {
					offset: prev.offset + prev.size + realBarGap,
					size: useFull ? fullBarSize : (_entry$barSize = entry.barSize) !== null && _entry$barSize !== void 0 ? _entry$barSize : 0
				}
			};
			var newRes = [...res, newPosition];
			prev = newPosition.position;
			return newRes;
		}, initialValue);
	} else {
		var _offset = getPercentValue(barCategoryGap, bandSize, 0, true);
		if (bandSize - 2 * _offset - (len - 1) * realBarGap <= 0) realBarGap = 0;
		var originalSize = (bandSize - 2 * _offset - (len - 1) * realBarGap) / len;
		if (originalSize > 1) originalSize = Math.round(originalSize);
		var size = isWellBehavedNumber(maxBarSize) ? Math.min(originalSize, maxBarSize) : originalSize;
		result = sizeList.reduce((res, entry, i) => [...res, {
			stackId: entry.stackId,
			dataKeys: entry.dataKeys,
			position: {
				offset: _offset + len * (originalSize - size) / 2 + (size + realBarGap) * i,
				size
			}
		}], initialValue);
	}
	return result;
}
var combineAllBarPositions = (sizeList, globalMaxBarSize, barGap, barCategoryGap, barBandSize, bandSize, childMaxBarSize) => {
	var maxBarSize = isNullish(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
	var allBarPositions = getBarPositions(barGap, barCategoryGap, barBandSize !== bandSize ? barBandSize : bandSize, sizeList, maxBarSize);
	if (barBandSize !== bandSize && allBarPositions != null) allBarPositions = allBarPositions.map((pos) => _objectSpread$1(_objectSpread$1({}, pos), {}, { position: _objectSpread$1(_objectSpread$1({}, pos.position), {}, { offset: pos.position.offset - barBandSize / 2 }) }));
	return allBarPositions;
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineStackedData.js
var combineStackedData = (stackGroups, barSettings) => {
	var stackSeriesIdentifier = getStackSeriesIdentifier(barSettings);
	if (!stackGroups || stackSeriesIdentifier == null || barSettings == null) return;
	var stackId = barSettings.stackId;
	if (stackId == null) return;
	var stackGroup = stackGroups[stackId];
	if (!stackGroup) return;
	var stackedData = stackGroup.stackedData;
	if (!stackedData) return;
	return stackedData.find((sd) => sd.key === stackSeriesIdentifier);
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/graphicalItemSelectors.js
function selectXAxisIdFromGraphicalItemId(state, id) {
	var _state$graphicalItems, _state$graphicalItems2;
	return (_state$graphicalItems = (_state$graphicalItems2 = state.graphicalItems.cartesianItems.find((item) => item.id === id)) === null || _state$graphicalItems2 === void 0 ? void 0 : _state$graphicalItems2.xAxisId) !== null && _state$graphicalItems !== void 0 ? _state$graphicalItems : 0;
}
function selectYAxisIdFromGraphicalItemId(state, id) {
	var _state$graphicalItems3, _state$graphicalItems4;
	return (_state$graphicalItems3 = (_state$graphicalItems4 = state.graphicalItems.cartesianItems.find((item) => item.id === id)) === null || _state$graphicalItems4 === void 0 ? void 0 : _state$graphicalItems4.yAxisId) !== null && _state$graphicalItems3 !== void 0 ? _state$graphicalItems3 : 0;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineBarPosition.js
var combineBarPosition = (allBarPositions, barSettings) => {
	if (allBarPositions == null || barSettings == null) return;
	var position = allBarPositions.find((p) => p.stackId === barSettings.stackId && barSettings.dataKey != null && p.dataKeys.includes(barSettings.dataKey));
	if (position == null) return;
	return position.position;
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/barSelectors.js
var pickIsPanorama = (_state, _id, isPanorama) => isPanorama;
var pickBarId = (_state, id) => id;
var selectSynchronisedBarSettings = createSelector([selectUnfilteredCartesianItems, pickBarId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "bar").find((item) => item.id === id));
var selectMaxBarSize = createSelector([selectSynchronisedBarSettings], (barSettings) => barSettings === null || barSettings === void 0 ? void 0 : barSettings.maxBarSize);
var pickCells = (_state, _id, _isPanorama, cells) => cells;
var selectAllVisibleBars = createSelector([
	selectChartLayout,
	selectUnfilteredCartesianItems,
	selectXAxisIdFromGraphicalItemId,
	selectYAxisIdFromGraphicalItemId,
	pickIsPanorama
], (layout, allItems, xAxisId, yAxisId, isPanorama) => allItems.filter((i) => {
	if (layout === "horizontal") return i.xAxisId === xAxisId;
	return i.yAxisId === yAxisId;
}).filter((i) => i.isPanorama === isPanorama).filter((i) => i.hide === false).filter((i) => i.type === "bar"));
var selectBarStackGroups = (state, id, isPanorama) => {
	var layout = selectChartLayout(state);
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null || yAxisId == null) return;
	if (layout === "horizontal") return selectStackGroups(state, "yAxis", yAxisId, isPanorama);
	return selectStackGroups(state, "xAxis", xAxisId, isPanorama);
};
var selectBarCartesianAxisSize = (state, id) => {
	var layout = selectChartLayout(state);
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null || yAxisId == null) return;
	if (layout === "horizontal") return selectCartesianAxisSize(state, "xAxis", xAxisId);
	return selectCartesianAxisSize(state, "yAxis", yAxisId);
};
var selectBarSizeList = createSelector([
	selectAllVisibleBars,
	selectRootBarSize,
	selectBarCartesianAxisSize
], combineBarSizeList);
var selectBarBandSize = (state, id, isPanorama) => {
	var _ref, _getBandSizeOfAxis;
	var barSettings = selectSynchronisedBarSettings(state, id);
	if (barSettings == null) return 0;
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null || yAxisId == null) return 0;
	var layout = selectChartLayout(state);
	var globalMaxBarSize = selectRootMaxBarSize(state);
	var childMaxBarSize = barSettings.maxBarSize;
	var maxBarSize = isNullish(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
	var axis, ticks;
	if (layout === "horizontal") {
		axis = selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
		ticks = selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
	} else {
		axis = selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
		ticks = selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
	}
	return (_ref = (_getBandSizeOfAxis = getBandSizeOfAxis(axis, ticks, true)) !== null && _getBandSizeOfAxis !== void 0 ? _getBandSizeOfAxis : maxBarSize) !== null && _ref !== void 0 ? _ref : 0;
};
var selectAxisBandSize = (state, id, isPanorama) => {
	var layout = selectChartLayout(state);
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null || yAxisId == null) return;
	var axis, ticks;
	if (layout === "horizontal") {
		axis = selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
		ticks = selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
	} else {
		axis = selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
		ticks = selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
	}
	return getBandSizeOfAxis(axis, ticks);
};
var selectAllBarPositions = createSelector([
	selectBarSizeList,
	selectRootMaxBarSize,
	selectBarGap,
	selectBarCategoryGap,
	selectBarBandSize,
	selectAxisBandSize,
	selectMaxBarSize
], combineAllBarPositions);
var selectXAxisWithScale = (state, id, isPanorama) => {
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null) return;
	return selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
};
var selectYAxisWithScale = (state, id, isPanorama) => {
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (yAxisId == null) return;
	return selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
};
var selectXAxisTicks = (state, id, isPanorama) => {
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null) return;
	return selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
};
var selectYAxisTicks = (state, id, isPanorama) => {
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (yAxisId == null) return;
	return selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
};
var selectBarRectangles = createSelector([
	selectChartOffsetInternal,
	selectAxisViewBox,
	selectXAxisWithScale,
	selectYAxisWithScale,
	selectXAxisTicks,
	selectYAxisTicks,
	createSelector([selectAllBarPositions, selectSynchronisedBarSettings], combineBarPosition),
	selectChartLayout,
	selectChartDataWithIndexesIfNotInPanoramaPosition3,
	selectAxisBandSize,
	createSelector([selectBarStackGroups, selectSynchronisedBarSettings], combineStackedData),
	selectSynchronisedBarSettings,
	pickCells
], (offset, axisViewBox, xAxis, yAxis, xAxisTicks, yAxisTicks, pos, layout, _ref2, bandSize, stackedData, barSettings, cells) => {
	var chartData = _ref2.chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
	if (barSettings == null || pos == null || axisViewBox == null || layout !== "horizontal" && layout !== "vertical" || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || bandSize == null) return;
	var data = barSettings.data;
	var displayedData;
	if (data != null && data.length > 0) displayedData = data;
	else displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
	if (displayedData == null) return;
	return computeBarRectangles({
		layout,
		barSettings,
		pos,
		parentViewBox: axisViewBox,
		bandSize,
		xAxis,
		yAxis,
		xAxisTicks,
		yAxisTicks,
		stackedData,
		displayedData,
		offset,
		cells,
		dataStartIndex
	});
});
//#endregion
//#region node_modules/recharts/es6/zIndex/getZIndexFromUnknown.js
function getZIndexFromUnknown(input, defaultZIndex) {
	if (input && typeof input === "object" && "zIndex" in input && typeof input.zIndex === "number" && isWellBehavedNumber(input.zIndex)) return input.zIndex;
	return defaultZIndex;
}
//#endregion
//#region node_modules/recharts/es6/cartesian/BarStack.js
var _excluded$1 = ["index"];
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
var BarStackContext = /* @__PURE__ */ (0, import_react.createContext)(void 0);
/**
* Hook to resolve the stack ID for a Bar component.
* If a stack ID is provided via props, it is used directly.
* Otherwise, this will read stack ID from BarStack context if available.
* If both are undefined, it returns undefined.
* @param childStackId
*/
var useStackId = (childStackId) => {
	var stackSettings = (0, import_react.useContext)(BarStackContext);
	if (stackSettings != null) return stackSettings.stackId;
	if (childStackId == null) return;
	return getNormalizedStackId(childStackId);
};
var getClipPathId = (stackId, index) => {
	return "recharts-bar-stack-clip-path-".concat(stackId, "-").concat(index);
};
var useBarStackClipPathUrl = (index) => {
	var barStackContext = (0, import_react.useContext)(BarStackContext);
	if (barStackContext == null) return;
	var stackId = barStackContext.stackId;
	return "url(#".concat(getClipPathId(stackId, index), ")");
};
var BarStackClipLayer = (_ref) => {
	var index = _ref.index, rest = _objectWithoutProperties$1(_ref, _excluded$1);
	var clipPathUrl = useBarStackClipPathUrl(index);
	return /* @__PURE__ */ import_react.createElement(Layer, _extends$1({
		className: "recharts-bar-stack-layer",
		clipPath: clipPathUrl
	}, rest));
};
//#endregion
//#region node_modules/recharts/es6/cartesian/Bar.js
var _excluded = [
	"onMouseEnter",
	"onMouseLeave",
	"onClick"
], _excluded2 = [
	"value",
	"background",
	"tooltipPosition"
], _excluded3 = ["id"], _excluded4 = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
];
function _slicedToArray(r, e) {
	return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
	if (r) {
		if ("string" == typeof r) return _arrayLikeToArray(r, a);
		var t = {}.toString.call(r).slice(8, -1);
		return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
	}
}
function _arrayLikeToArray(r, a) {
	(null == a || a > r.length) && (a = r.length);
	for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
	return n;
}
function _iterableToArrayLimit(r, l) {
	var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
	if (null != t) {
		var e, n, i, u, a = [], f = !0, o = !1;
		try {
			if (i = (t = t.call(r)).next, 0 === l) {
				if (Object(t) !== t) return;
				f = !1;
			} else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
		} catch (r) {
			o = !0, n = r;
		} finally {
			try {
				if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
			} finally {
				if (o) throw n;
			}
		}
		return a;
	}
}
function _arrayWithHoles(r) {
	if (Array.isArray(r)) return r;
}
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
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
var computeLegendPayloadFromBarData = (props) => {
	var dataKey = props.dataKey, name = props.name, fill = props.fill, legendType = props.legendType;
	return [{
		inactive: props.hide,
		dataKey,
		type: legendType,
		color: fill,
		value: getTooltipNameProp(name, dataKey),
		payload: props
	}];
};
var SetBarTooltipEntrySettings = /* @__PURE__ */ import_react.memo((_ref) => {
	var dataKey = _ref.dataKey, stroke = _ref.stroke, strokeWidth = _ref.strokeWidth, fill = _ref.fill, name = _ref.name, hide = _ref.hide, unit = _ref.unit, formatter = _ref.formatter, tooltipType = _ref.tooltipType, id = _ref.id;
	var tooltipEntrySettings = {
		dataDefinedOnItem: void 0,
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
			color: fill,
			unit,
			formatter,
			graphicalItemId: id
		}
	};
	return /* @__PURE__ */ import_react.createElement(SetTooltipEntrySettings, { tooltipEntrySettings });
});
function BarBackground(props) {
	var activeIndex = useAppSelector(selectActiveTooltipIndex);
	var data = props.data, dataKey = props.dataKey, backgroundFromProps = props.background, allOtherBarProps = props.allOtherBarProps;
	var onMouseEnterFromProps = allOtherBarProps.onMouseEnter, onMouseLeaveFromProps = allOtherBarProps.onMouseLeave, onItemClickFromProps = allOtherBarProps.onClick, restOfAllOtherProps = _objectWithoutProperties(allOtherBarProps, _excluded);
	var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, dataKey, allOtherBarProps.id);
	var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
	var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, dataKey, allOtherBarProps.id);
	if (!backgroundFromProps || data == null) return null;
	var backgroundProps = svgPropertiesNoEventsFromUnknown(backgroundFromProps);
	return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex: getZIndexFromUnknown(backgroundFromProps, DefaultZIndexes.barBackground) }, data.map((entry, i) => {
		entry.value;
		var backgroundFromDataEntry = entry.background;
		entry.tooltipPosition;
		var rest = _objectWithoutProperties(entry, _excluded2);
		if (!backgroundFromDataEntry) return null;
		var onMouseEnter = onMouseEnterFromContext(entry, entry.originalDataIndex);
		var onMouseLeave = onMouseLeaveFromContext(entry, entry.originalDataIndex);
		var onClick = onClickFromContext(entry, entry.originalDataIndex);
		var barRectangleProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
			option: backgroundFromProps,
			isActive: String(entry.originalDataIndex) === activeIndex
		}, rest), {}, { fill: "#eee" }, backgroundFromDataEntry), backgroundProps), adaptEventsOfChild(restOfAllOtherProps, entry, i)), {}, {
			onMouseEnter,
			onMouseLeave,
			onClick,
			dataKey,
			index: i,
			className: "recharts-bar-background-rectangle"
		});
		return /* @__PURE__ */ import_react.createElement(BarRectangle, _extends({ key: "background-bar-".concat(i) }, barRectangleProps));
	}));
}
function BarLabelListProvider(_ref2) {
	var showLabels = _ref2.showLabels, children = _ref2.children, rects = _ref2.rects;
	var labelListEntries = rects === null || rects === void 0 ? void 0 : rects.map((entry) => {
		var viewBox = {
			x: entry.x,
			y: entry.y,
			width: entry.width,
			lowerWidth: entry.width,
			upperWidth: entry.width,
			height: entry.height
		};
		return _objectSpread(_objectSpread({}, viewBox), {}, {
			value: entry.value,
			payload: entry.payload,
			parentViewBox: entry.parentViewBox,
			viewBox,
			fill: entry.fill
		});
	});
	return /* @__PURE__ */ import_react.createElement(CartesianLabelListContextProvider, { value: showLabels ? labelListEntries : void 0 }, children);
}
function BarRectangleWithActiveState(props) {
	var shape = props.shape, activeBar = props.activeBar, baseProps = props.baseProps, entry = props.entry, index = props.index, dataKey = props.dataKey;
	var activeIndex = useAppSelector(selectActiveTooltipIndex);
	var activeDataKey = useAppSelector(selectActiveTooltipDataKey);
	var isActive = activeBar && String(entry.originalDataIndex) === activeIndex && (activeDataKey == null || dataKey === activeDataKey);
	var isAnotherBarActive = activeIndex != null && (String(entry.originalDataIndex) !== activeIndex || activeDataKey != null && dataKey !== activeDataKey);
	var _useState2 = _slicedToArray((0, import_react.useState)(false), 2), stayInLayer = _useState2[0], setStayInLayer = _useState2[1];
	var _useState4 = _slicedToArray((0, import_react.useState)(false), 2), hasMountedActive = _useState4[0], setHasMountedActive = _useState4[1];
	(0, import_react.useEffect)(() => {
		var rafId;
		if (isActive) {
			setStayInLayer(true);
			rafId = requestAnimationFrame(() => {
				setHasMountedActive(true);
			});
		} else {
			setHasMountedActive(false);
			if (isAnotherBarActive) setStayInLayer(false);
		}
		return () => {
			cancelAnimationFrame(rafId);
		};
	}, [isActive, isAnotherBarActive]);
	var handleTransitionEnd = (0, import_react.useCallback)(() => {
		if (!isActive) setStayInLayer(false);
	}, [isActive]);
	var isVisuallyActive = isActive && hasMountedActive;
	var shouldRenderInLayer = isActive || stayInLayer;
	var option;
	if (isActive) if (activeBar === true) option = shape;
	else option = activeBar;
	else option = shape;
	var content = /* @__PURE__ */ import_react.createElement(BarRectangle, _extends({}, baseProps, { name: String(baseProps.name) }, entry, {
		isActive: isVisuallyActive,
		option,
		index,
		dataKey,
		animationElapsedTime: props.animationElapsedTime,
		isAnimating: props.isAnimating,
		isEntrance: props.isEntrance,
		onTransitionEnd: handleTransitionEnd
	}));
	if (shouldRenderInLayer) return /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex: DefaultZIndexes.activeBar }, /* @__PURE__ */ import_react.createElement(BarStackClipLayer, { index: entry.originalDataIndex }, content));
	return content;
}
function BarRectangleNeverActive(props) {
	var shape = props.shape, baseProps = props.baseProps, entry = props.entry, index = props.index, dataKey = props.dataKey;
	return /* @__PURE__ */ import_react.createElement(BarRectangle, _extends({}, baseProps, { name: String(baseProps.name) }, entry, {
		isActive: false,
		option: shape,
		index,
		dataKey,
		animationElapsedTime: props.animationElapsedTime,
		isAnimating: props.isAnimating,
		isEntrance: props.isEntrance
	}));
}
function BarRectangles(_ref3) {
	var _svgPropertiesNoEvent;
	var data = _ref3.data, props = _ref3.props, animationElapsedTime = _ref3.animationElapsedTime, isAnimating = _ref3.isAnimating, isEntrance = _ref3.isEntrance;
	var _ref4 = (_svgPropertiesNoEvent = svgPropertiesNoEvents(props)) !== null && _svgPropertiesNoEvent !== void 0 ? _svgPropertiesNoEvent : {}, id = _ref4.id, baseProps = _objectWithoutProperties(_ref4, _excluded3);
	var shape = props.shape, dataKey = props.dataKey, activeBar = props.activeBar;
	var onMouseEnterFromProps = props.onMouseEnter, onItemClickFromProps = props.onClick, onMouseLeaveFromProps = props.onMouseLeave, restOfAllOtherProps = _objectWithoutProperties(props, _excluded4);
	var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, dataKey, id);
	var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
	var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, dataKey, id);
	if (!data) return null;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, data.map((entry, i) => {
		return /* @__PURE__ */ import_react.createElement(BarStackClipLayer, _extends({
			index: entry.originalDataIndex,
			key: "rectangle-".concat(entry === null || entry === void 0 ? void 0 : entry.x, "-").concat(entry === null || entry === void 0 ? void 0 : entry.y, "-").concat(entry === null || entry === void 0 ? void 0 : entry.value, "-").concat(i),
			className: "recharts-bar-rectangle"
		}, adaptEventsOfChild(restOfAllOtherProps, entry, i), {
			onMouseEnter: onMouseEnterFromContext(entry, entry.originalDataIndex),
			onMouseLeave: onMouseLeaveFromContext(entry, entry.originalDataIndex),
			onClick: onClickFromContext(entry, entry.originalDataIndex)
		}), activeBar ? /* @__PURE__ */ import_react.createElement(BarRectangleWithActiveState, {
			shape,
			activeBar,
			baseProps,
			entry,
			index: i,
			dataKey,
			animationElapsedTime,
			isAnimating,
			isEntrance
		}) : /* @__PURE__ */ import_react.createElement(BarRectangleNeverActive, {
			shape,
			baseProps,
			entry,
			index: i,
			dataKey,
			animationElapsedTime,
			isAnimating,
			isEntrance
		}));
	}));
}
var defaultBarAnimateItems = (items, animationElapsedTime, layout) => {
	if (items == null) return [];
	if (animationElapsedTime === 1) return items.flatMap((item) => item.status === "removed" ? [] : [item.next]);
	return items.flatMap((item) => {
		if (item.status === "removed") {
			if (layout === "horizontal") return [_objectSpread(_objectSpread({}, item.prev), {}, {
				height: interpolate(item.prev.height, 0, animationElapsedTime),
				y: interpolate(item.prev.y, item.prev.y + item.prev.height, animationElapsedTime)
			})];
			return [_objectSpread(_objectSpread({}, item.prev), {}, { width: interpolate(item.prev.width, 0, animationElapsedTime) })];
		}
		if (item.status === "matched") return [_objectSpread(_objectSpread({}, item.next), {}, {
			x: interpolate(item.prev.x, item.next.x, animationElapsedTime),
			y: interpolate(item.prev.y, item.next.y, animationElapsedTime),
			width: interpolate(item.prev.width, item.next.width, animationElapsedTime),
			height: interpolate(item.prev.height, item.next.height, animationElapsedTime)
		})];
		var next = item.next;
		if (layout === "horizontal") return [_objectSpread(_objectSpread({}, next), {}, {
			height: interpolate(0, next.height, animationElapsedTime),
			y: interpolate(next.stackedBarStart, next.y, animationElapsedTime)
		})];
		return [_objectSpread(_objectSpread({}, next), {}, {
			width: interpolate(0, next.width, animationElapsedTime),
			x: interpolate(next.stackedBarStart, next.x, animationElapsedTime)
		})];
	});
};
function RectanglesWithAnimation(_ref5) {
	var props = _ref5.props, previousRectanglesRef = _ref5.previousRectanglesRef;
	var data = props.data, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationInterpolateFn = props.animationInterpolateFn, layout = props.layout;
	var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
	return /* @__PURE__ */ import_react.createElement(BarLabelListProvider, {
		showLabels: !isAnimating,
		rects: data
	}, /* @__PURE__ */ import_react.createElement(AnimatedItems, {
		animationInput: data,
		animationIdPrefix: "recharts-bar-",
		items: data,
		previousItemsRef: previousRectanglesRef,
		isAnimationActive,
		animationBegin,
		animationDuration,
		animationEasing,
		onAnimationStart: handleAnimationStart,
		onAnimationEnd: handleAnimationEnd,
		animationInterpolateFn,
		animationMatchBy: props.animationMatchBy,
		layout
	}, (stepData, animationElapsedTime, isEntrance) => /* @__PURE__ */ import_react.createElement(Layer, null, /* @__PURE__ */ import_react.createElement(BarRectangles, {
		props,
		data: stepData,
		animationElapsedTime,
		isAnimating: isAnimating || animationElapsedTime < 1,
		isEntrance
	}))), /* @__PURE__ */ import_react.createElement(LabelListFromLabelProp, { label: props.label }), props.children);
}
function RenderRectangles(props) {
	var previousRectanglesRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ import_react.createElement(RectanglesWithAnimation, {
		previousRectanglesRef,
		props
	});
}
var defaultMinPointSize = 0;
var errorBarDataPointFormatter = (dataPoint, dataKey) => {
	/**
	* if the value coming from `selectBarRectangles` is an array then this is a stacked bar chart.
	* arr[1] represents end value of the bar since the data is in the form of [startValue, endValue].
	* */
	var value = Array.isArray(dataPoint.value) ? dataPoint.value[1] : dataPoint.value;
	return {
		x: dataPoint.x,
		y: dataPoint.y,
		value,
		errorVal: getValueByDataKey(dataPoint, dataKey)
	};
};
var BarWithState = class extends import_react.PureComponent {
	render() {
		var _this$props = this.props, hide = _this$props.hide, data = _this$props.data, dataKey = _this$props.dataKey, className = _this$props.className, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, needClip = _this$props.needClip, background = _this$props.background, id = _this$props.id;
		if (hide || data == null) return null;
		var layerClass = clsx("recharts-bar", className);
		var clipPathId = id;
		return /* @__PURE__ */ import_react.createElement(Layer, {
			className: layerClass,
			id
		}, needClip && /* @__PURE__ */ import_react.createElement("defs", null, /* @__PURE__ */ import_react.createElement(GraphicalItemClipPath, {
			clipPathId,
			xAxisId,
			yAxisId
		})), /* @__PURE__ */ import_react.createElement(Layer, {
			className: "recharts-bar-rectangles",
			clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0
		}, /* @__PURE__ */ import_react.createElement(BarBackground, {
			data,
			dataKey,
			background,
			allOtherBarProps: this.props
		}), /* @__PURE__ */ import_react.createElement(RenderRectangles, this.props)));
	}
};
var defaultBarProps = {
	activeBar: false,
	animationBegin: 0,
	animationDuration: 400,
	animationEasing: "ease",
	animationInterpolateFn: defaultBarAnimateItems,
	animationMatchBy: matchAppend,
	background: false,
	hide: false,
	isAnimationActive: "auto",
	label: false,
	legendType: "rect",
	minPointSize: defaultMinPointSize,
	shape: defaultBarShape,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: DefaultZIndexes.bar
};
function BarImpl(props) {
	var xAxisId = props.xAxisId, yAxisId = props.yAxisId, hide = props.hide, legendType = props.legendType, minPointSize = props.minPointSize, activeBar = props.activeBar, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, isAnimationActive = props.isAnimationActive;
	var needClip = useNeedsClip(xAxisId, yAxisId).needClip;
	var layout = useChartLayout();
	var isPanorama = useIsPanorama();
	var cells = findAllByType(props.children, Cell);
	var rects = useAppSelector((state) => selectBarRectangles(state, props.id, isPanorama, cells));
	if (layout !== "vertical" && layout !== "horizontal") return null;
	var errorBarOffset;
	var firstDataPoint = rects === null || rects === void 0 ? void 0 : rects[0];
	if (firstDataPoint == null || firstDataPoint.height == null || firstDataPoint.width == null) errorBarOffset = 0;
	else errorBarOffset = layout === "vertical" ? firstDataPoint.height / 2 : firstDataPoint.width / 2;
	return /* @__PURE__ */ import_react.createElement(SetErrorBarContext, {
		xAxisId,
		yAxisId,
		data: rects,
		dataPointFormatter: errorBarDataPointFormatter,
		errorBarOffset
	}, /* @__PURE__ */ import_react.createElement(BarWithState, _extends({}, props, {
		layout,
		needClip,
		data: rects,
		xAxisId,
		yAxisId,
		hide,
		legendType,
		minPointSize,
		activeBar,
		animationBegin,
		animationDuration,
		animationEasing,
		isAnimationActive
	})));
}
function computeBarRectangles(_ref6) {
	var layout = _ref6.layout, _ref6$barSettings = _ref6.barSettings, dataKey = _ref6$barSettings.dataKey, minPointSizeProp = _ref6$barSettings.minPointSize, hasCustomShape = _ref6$barSettings.hasCustomShape, pos = _ref6.pos, bandSize = _ref6.bandSize, xAxis = _ref6.xAxis, yAxis = _ref6.yAxis, xAxisTicks = _ref6.xAxisTicks, yAxisTicks = _ref6.yAxisTicks, stackedData = _ref6.stackedData, displayedData = _ref6.displayedData, offset = _ref6.offset, cells = _ref6.cells, parentViewBox = _ref6.parentViewBox, dataStartIndex = _ref6.dataStartIndex;
	var numericAxis = layout === "horizontal" ? yAxis : xAxis;
	var stackedDomain = stackedData ? numericAxis.scale.domain() : null;
	var baseValue = getBaseValueOfBar({ numericAxis });
	var stackedBarStart = numericAxis.scale.map(baseValue);
	return displayedData.map((entry, index) => {
		var value, x, y, width, height, background;
		if (stackedData) {
			var untruncatedValue = stackedData[index + dataStartIndex];
			if (untruncatedValue == null) return null;
			value = truncateByDomain(untruncatedValue, stackedDomain);
		} else {
			value = getValueByDataKey(entry, dataKey);
			if (!Array.isArray(value)) value = [baseValue, value];
		}
		var minPointSize = minPointSizeCallback(minPointSizeProp, defaultMinPointSize)(value[1], index);
		if (layout === "horizontal") {
			var _ref7;
			var baseValueScale = yAxis.scale.map(value[0]);
			var currentValueScale = yAxis.scale.map(value[1]);
			if (baseValueScale == null || currentValueScale == null) return null;
			x = getCateCoordinateOfBar({
				axis: xAxis,
				ticks: xAxisTicks,
				bandSize,
				offset: pos.offset,
				entry,
				index
			});
			y = (_ref7 = currentValueScale !== null && currentValueScale !== void 0 ? currentValueScale : baseValueScale) !== null && _ref7 !== void 0 ? _ref7 : void 0;
			width = pos.size;
			var computedHeight = baseValueScale - currentValueScale;
			height = isNan(computedHeight) ? 0 : computedHeight;
			background = {
				x,
				y: offset.top,
				width,
				height: offset.height
			};
			if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
				var delta = mathSign(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height));
				y -= delta;
				height += delta;
			}
		} else {
			var _baseValueScale = xAxis.scale.map(value[0]);
			var _currentValueScale = xAxis.scale.map(value[1]);
			if (_baseValueScale == null || _currentValueScale == null) return null;
			x = _baseValueScale;
			y = getCateCoordinateOfBar({
				axis: yAxis,
				ticks: yAxisTicks,
				bandSize,
				offset: pos.offset,
				entry,
				index
			});
			width = _currentValueScale - _baseValueScale;
			height = pos.size;
			background = {
				x: offset.left,
				y,
				width: offset.width,
				height
			};
			if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
				var _delta = mathSign(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width));
				width += _delta;
			}
		}
		if (x == null || y == null || width == null || height == null || !hasCustomShape && (width === 0 || height === 0)) return null;
		return _objectSpread(_objectSpread({}, entry), {}, {
			stackedBarStart,
			x,
			y,
			width,
			height,
			value: stackedData ? value : value[1],
			payload: entry,
			background,
			tooltipPosition: {
				x: x + width / 2,
				y: y + height / 2
			},
			parentViewBox,
			originalDataIndex: index
		}, cells && cells[index] && cells[index].props);
	}).filter(Boolean);
}
function BarFn(outsideProps) {
	var props = resolveDefaultProps(outsideProps, defaultBarProps);
	var stackId = useStackId(props.stackId);
	var isPanorama = useIsPanorama();
	return /* @__PURE__ */ import_react.createElement(RegisterGraphicalItemId, {
		id: props.id,
		type: "bar"
	}, (id) => /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(SetLegendPayload, { legendPayload: computeLegendPayloadFromBarData(props) }), /* @__PURE__ */ import_react.createElement(SetBarTooltipEntrySettings, {
		dataKey: props.dataKey,
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
		type: "bar",
		id,
		data: void 0,
		xAxisId: props.xAxisId,
		yAxisId: props.yAxisId,
		zAxisId: 0,
		dataKey: props.dataKey,
		stackId,
		hide: props.hide,
		barSize: props.barSize,
		minPointSize: props.minPointSize,
		maxBarSize: props.maxBarSize,
		isPanorama,
		hasCustomShape: props.shape != null && props.shape !== defaultBarShape
	}), /* @__PURE__ */ import_react.createElement(ZIndexLayer, { zIndex: props.zIndex }, /* @__PURE__ */ import_react.createElement(BarImpl, _extends({}, props, { id })))));
}
/**
* @provides ErrorBarContext
* @provides LabelListContext
* @provides CellReader
* @consumes CartesianChartContext
* @consumes BarStackContext
*/
var Bar = /* @__PURE__ */ import_react.memo(BarFn, propsAreEqual);
Bar.displayName = "Bar";
//#endregion
export { Bar as t };
