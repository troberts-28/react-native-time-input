"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimeTextField;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var TimeInputHelper = _interopRequireWildcard(require("../helpers/timeInput"));

var _useDebounce = _interopRequireDefault(require("../hooks/useDebounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TimeTextField({
  givenTime,
  onTimeValueReady,
  style,
  placeholderTime
}) {
  const [time, setTime] = (0, _react.useState)('');
  const {
    state: debouncedTime,
    setDebouncedState: setDebouncedTime,
    debounce
  } = (0, _useDebounce.default)(time, 250);
  (0, _react.useEffect)(() => {
    if (!givenTime) return;
    setTime(givenTime.time);
  }, [givenTime, setTime]);
  (0, _react.useEffect)(() => {
    onTimeValueReady(TimeInputHelper.validate(debouncedTime, '99', '99'), debouncedTime);
  }, [debouncedTime, onTimeValueReady]);
  (0, _react.useEffect)(() => {
    setDebouncedTime(time);
    return () => {
      debounce.cancel();
    };
  }, [debounce, time, setDebouncedTime]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    keyboardType: "number-pad",
    maxLength: 5,
    onChangeText: text => setTime(TimeInputHelper.mask(text)),
    placeholder: placeholderTime !== null && placeholderTime !== void 0 ? placeholderTime : '08:00',
    value: time,
    style: style
  });
}
//# sourceMappingURL=TimeTextField.js.map