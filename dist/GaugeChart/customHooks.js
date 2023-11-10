var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/lib/GaugeChart/customHooks.js
var customHooks_exports = {};
__export(customHooks_exports, {
  default: () => customHooks_default
});
module.exports = __toCommonJS(customHooks_exports);
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
