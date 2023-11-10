// src/lib/GaugeChart/customHooks.js
import _ from "lodash";
import { useEffect, useRef } from "react";
var isDeepEquals = (toCompare, reference) => {
  return _.isEqual(toCompare, reference);
};
var useDeepCompareMemo = (dependencies) => {
  const ref = useRef(null);
  if (isDeepEquals(dependencies, ref.current)) {
    ref.current = dependencies;
  }
  return ref.current;
};
var useDeepCompareEffect = (callback, dependencies) => {
  useEffect(callback, [useDeepCompareMemo(dependencies), callback]);
};
var customHooks_default = useDeepCompareEffect;

export {
  customHooks_default
};
