"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (obj = '', wait = 1000) => {
  const [state, setState] = (0, _react.useState)(obj);
  const debounce = (0, _react.useMemo)(() => _lodash.default.debounce(prop => {
    setState(prop);
  }, wait), [setState, wait]);

  const setDebouncedState = value => {
    debounce(value);
  };

  return {
    state,
    setDebouncedState,
    debounce
  };
};

exports.default = _default;
//# sourceMappingURL=useDebounce.js.map