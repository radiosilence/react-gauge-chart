var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib/GaugeChart/index.jsx
var GaugeChart_exports = {};
__export(GaugeChart_exports, {
  default: () => GaugeChart_default
});
module.exports = __toCommonJS(GaugeChart_exports);
var import_d3 = require("d3");
var import_react2 = __toESM(require("react"));

// src/lib/GaugeChart/customHooks.js
var import_lodash = require("lodash");
var import_react = require("react");
var isDeepEquals = (toCompare, reference) => {
  return (0, import_lodash.isEqual)(toCompare, reference);
};
var useDeepCompareMemo = (dependencies) => {
  const ref = (0, import_react.useRef)(null);
  if (isDeepEquals(dependencies, ref.current)) {
    ref.current = dependencies;
  }
  return ref.current;
};
var useDeepCompareEffect = (callback, dependencies) => {
  (0, import_react.useEffect)(callback, [useDeepCompareMemo(dependencies), callback]);
};
var customHooks_default = useDeepCompareEffect;

// src/lib/GaugeChart/index.jsx
var startAngle = -Math.PI / 2;
var endAngle = Math.PI / 2;
var defaultStyle = {
  width: "100%"
};
var animateNeedleProps = [
  "marginInPercent",
  "arcPadding",
  "percent",
  "nrOfLevels",
  "animDelay"
];
var GaugeChart = (props) => {
  const svg = (0, import_react2.useRef)({});
  const g = (0, import_react2.useRef)({});
  const width = (0, import_react2.useRef)({});
  const height = (0, import_react2.useRef)({});
  const doughnut = (0, import_react2.useRef)({});
  const needle = (0, import_react2.useRef)({});
  const outerRadius = (0, import_react2.useRef)({});
  const margin = (0, import_react2.useRef)({});
  const container = (0, import_react2.useRef)({});
  const nbArcsToDisplay = (0, import_react2.useRef)(0);
  const colorArray = (0, import_react2.useRef)([]);
  const arcChart = (0, import_react2.useRef)((0, import_d3.arc)());
  const arcData = (0, import_react2.useRef)([]);
  const pieChart = (0, import_react2.useRef)((0, import_d3.pie)());
  const prevProps = (0, import_react2.useRef)(props);
  let selectedRef = (0, import_react2.useRef)({});
  const initChart = (0, import_react2.useCallback)(
    (update, resize = false, prevProps2) => {
      if (update) {
        renderChart(
          resize,
          prevProps2,
          width,
          margin,
          height,
          outerRadius,
          g,
          doughnut,
          arcChart,
          needle,
          pieChart,
          svg,
          props,
          container,
          arcData
        );
        return;
      }
      container.current.select("svg").remove();
      svg.current = container.current.append("svg");
      g.current = svg.current.append("g");
      doughnut.current = g.current.append("g").attr("class", "doughnut");
      pieChart.current.value(function(d) {
        return d.value;
      }).startAngle(startAngle).endAngle(endAngle).sort(null);
      needle.current = g.current.append("g").attr("class", "needle");
      renderChart(
        resize,
        prevProps2,
        width,
        margin,
        height,
        outerRadius,
        g,
        doughnut,
        arcChart,
        needle,
        pieChart,
        svg,
        props,
        container,
        arcData
      );
    },
    [props]
  );
  (0, import_react2.useLayoutEffect)(() => {
    setArcData(props, nbArcsToDisplay, colorArray, arcData);
    container.current = (0, import_d3.select)(selectedRef);
    initChart();
  }, [props, initChart]);
  customHooks_default(() => {
    if (props.nrOfLevels || prevProps.current.arcsLength.every((a) => props.arcsLength.includes(a)) || prevProps.current.colors.every((a) => props.colors.includes(a))) {
      setArcData(props, nbArcsToDisplay, colorArray, arcData);
    }
    const resize = !animateNeedleProps.some(
      (key) => prevProps.current[key] !== props[key]
    );
    initChart(true, resize, prevProps.current);
    prevProps.current = props;
  }, [
    props.nrOfLevels,
    props.arcsLength,
    props.colors,
    props.percent,
    props.needleColor,
    props.needleBaseColor
  ]);
  (0, import_react2.useEffect)(() => {
    const handleResize = () => {
      var resize = true;
      renderChart(
        resize,
        prevProps,
        width,
        margin,
        height,
        outerRadius,
        g,
        doughnut,
        arcChart,
        needle,
        pieChart,
        svg,
        props,
        container,
        arcData
      );
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [props]);
  const {
    id,
    style,
    className,
    textComponent,
    textComponentContainerClassName
  } = props;
  return /* @__PURE__ */ import_react2.default.createElement(
    "div",
    {
      id,
      className,
      style,
      ref: (svg2) => selectedRef = svg2
    },
    /* @__PURE__ */ import_react2.default.createElement(
      "div",
      {
        className: textComponentContainerClassName,
        style: { position: "relative", top: "50%" }
      },
      textComponent
    )
  );
};
var GaugeChart_default = GaugeChart;
GaugeChart.defaultProps = {
  style: defaultStyle,
  marginInPercent: 0.05,
  cornerRadius: 6,
  nrOfLevels: 3,
  percent: 0.4,
  arcPadding: 0.05,
  //The padding between arcs, in rad
  arcWidth: 0.2,
  //The width of the arc given in percent of the radius
  colors: ["#00FF00", "#FF0000"],
  //Default defined colors
  textColor: "#fff",
  needleColor: "#464A4F",
  needleBaseColor: "#464A4F",
  hideText: false,
  animate: true,
  animDelay: 500,
  formatTextValue: null,
  fontSize: null,
  animateDuration: 3e3,
  textComponent: void 0,
  needleScale: 0.55
};
var setArcData = (props, nbArcsToDisplay, colorArray, arcData) => {
  nbArcsToDisplay.current = props.arcsLength ? props.arcsLength.length : props.nrOfLevels;
  if (nbArcsToDisplay.current === props.colors.length) {
    colorArray.current = props.colors;
  } else {
    colorArray.current = getColors(props, nbArcsToDisplay);
  }
  arcData.current = [];
  for (var i = 0; i < nbArcsToDisplay.current; i++) {
    var arcDatum = {
      value: props.arcsLength && props.arcsLength.length > i ? props.arcsLength[i] : 1,
      color: colorArray.current[i]
    };
    arcData.current.push(arcDatum);
  }
};
var renderChart = (resize, prevProps, width, margin, height, outerRadius, g, doughnut, arcChart, needle, pieChart, svg, props, container, arcData) => {
  updateDimensions(props, container, margin, width, height);
  svg.current.attr("width", width.current + margin.current.left + margin.current.right).attr(
    "height",
    height.current + margin.current.top + margin.current.bottom
  );
  g.current.attr(
    "transform",
    "translate(" + margin.current.left + ", " + margin.current.top + ")"
  );
  calculateRadius(width, height, outerRadius, margin, g);
  doughnut.current.attr(
    "transform",
    "translate(" + outerRadius.current + ", " + outerRadius.current + ")"
  );
  arcChart.current.outerRadius(outerRadius.current).innerRadius(outerRadius.current * (1 - props.arcWidth)).cornerRadius(props.cornerRadius).padAngle(props.arcPadding);
  doughnut.current.selectAll(".arc").remove();
  needle.current.selectAll("*").remove();
  g.current.selectAll(".text-group").remove();
  var arcPaths = doughnut.current.selectAll(".arc").data(pieChart.current(arcData.current)).enter().append("g").attr("class", "arc");
  arcPaths.append("path").attr("d", arcChart.current).style("fill", function(d) {
    return d.data.color;
  });
  drawNeedle(
    resize,
    prevProps,
    props,
    width,
    needle,
    container,
    outerRadius,
    g
  );
  needle.current.attr(
    "transform",
    "translate(" + outerRadius.current + ", " + outerRadius.current + ")"
  );
};
var getColors = (props, nbArcsToDisplay) => {
  const { colors } = props;
  var colorScale = (0, import_d3.scaleLinear)().domain([1, nbArcsToDisplay.current]).range([colors[0], colors[colors.length - 1]]).interpolate(import_d3.interpolateHsl);
  var colorArray = [];
  for (var i = 1; i <= nbArcsToDisplay.current; i++) {
    colorArray.push(colorScale(i));
  }
  return colorArray;
};
var drawNeedle = (resize, prevProps, props, width, needle, container, outerRadius, g) => {
  const {
    percent,
    needleColor,
    needleBaseColor,
    hideText,
    animate,
    needleScale,
    textComponent
  } = props;
  var needleRadius = 15 * (width.current / 500), centerPoint = [0, -needleRadius / 2];
  const prevPercent = prevProps ? prevProps.percent : 0;
  var pathStr = calculateRotation(
    prevPercent || percent,
    outerRadius,
    width,
    needleScale
  );
  needle.current.append("path").attr("d", pathStr).attr("fill", needleColor);
  needle.current.append("circle").attr("cx", centerPoint[0]).attr("cy", centerPoint[1]).attr("r", needleRadius).attr("fill", needleBaseColor);
  if (!hideText && !textComponent) {
    addText(percent, props, outerRadius, width, g);
  }
  if (!resize && animate) {
    needle.current.transition().delay(props.animDelay).ease(import_d3.easeElastic).duration(props.animateDuration).tween("progress", function() {
      const currentPercent = (0, import_d3.interpolateNumber)(prevPercent, percent);
      return function(percentOfPercent) {
        const progress = currentPercent(percentOfPercent);
        return container.current.select(`.needle path`).attr(
          "d",
          calculateRotation(progress, outerRadius, width, needleScale)
        );
      };
    });
  } else {
    container.current.select(`.needle path`).attr("d", calculateRotation(percent, outerRadius, width, needleScale));
  }
};
var calculateRotation = (percent, outerRadius, width, needleScale) => {
  var needleLength = outerRadius.current * needleScale, needleRadius = 15 * (width.current / 500), theta = percentToRad(percent), centerPoint = [0, -needleRadius / 2], topPoint = [
    centerPoint[0] - needleLength * Math.cos(theta),
    centerPoint[1] - needleLength * Math.sin(theta)
  ], leftPoint = [
    centerPoint[0] - needleRadius * Math.cos(theta - Math.PI / 2),
    centerPoint[1] - needleRadius * Math.sin(theta - Math.PI / 2)
  ], rightPoint = [
    centerPoint[0] - needleRadius * Math.cos(theta + Math.PI / 2),
    centerPoint[1] - needleRadius * Math.sin(theta + Math.PI / 2)
  ];
  var pathStr = `M ${leftPoint[0]} ${leftPoint[1]} L ${topPoint[0]} ${topPoint[1]} L ${rightPoint[0]} ${rightPoint[1]}`;
  return pathStr;
};
var percentToRad = (percent) => {
  return percent * Math.PI;
};
var addText = (percentage, props, outerRadius, width, g) => {
  const { formatTextValue, fontSize } = props;
  var textPadding = 20;
  const text = formatTextValue ? formatTextValue(floatingNumber(percentage)) : floatingNumber(percentage) + "%";
  g.current.append("g").attr("class", "text-group").attr(
    "transform",
    `translate(${outerRadius.current}, ${outerRadius.current / 2 + textPadding})`
  ).append("text").text(text).style(
    "font-size",
    () => fontSize ? fontSize : `${width.current / 11 / (text.length > 10 ? text.length / 10 : 1)}px`
  ).style("fill", props.textColor).style("text-anchor", "middle");
};
var floatingNumber = (value, maxDigits = 2) => {
  return Math.round(value * 100 * 10 ** maxDigits) / 10 ** maxDigits;
};
var calculateRadius = (width, height, outerRadius, margin, g) => {
  if (width.current < 2 * height.current) {
    outerRadius.current = (width.current - margin.current.left - margin.current.right) / 2;
  } else {
    outerRadius.current = height.current - margin.current.top - margin.current.bottom;
  }
  centerGraph(width, g, outerRadius, margin);
};
var centerGraph = (width, g, outerRadius, margin) => {
  margin.current.left = width.current / 2 - outerRadius.current + margin.current.right;
  g.current.attr(
    "transform",
    "translate(" + margin.current.left + ", " + margin.current.top + ")"
  );
};
var updateDimensions = (props, container, margin, width, height) => {
  const { marginInPercent } = props;
  var divDimensions = container.current.node().getBoundingClientRect(), divWidth = divDimensions.width, divHeight = divDimensions.height;
  margin.current.left = divWidth * marginInPercent;
  margin.current.right = divWidth * marginInPercent;
  width.current = divWidth - margin.current.left - margin.current.right;
  margin.current.top = divHeight * marginInPercent;
  margin.current.bottom = divHeight * marginInPercent;
  height.current = width.current / 2 - margin.current.top - margin.current.bottom;
};
