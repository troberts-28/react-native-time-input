"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleButton = ToggleButton;
exports.default = Toggle;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ToggleButton({
  children,
  toggleButtonStyles,
  activeButton = false,
  onPress
}) {
  if (activeButton) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: toggleButtonStyles
    }, children);
  }

  if (_reactNative.Platform.OS === 'android') {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableNativeFeedback, {
      onPress: onPress
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: toggleButtonStyles
    }, children));
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: toggleButtonStyles
  }, children));
}

function Toggle({
  children,
  toggleStyles
}) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: toggleStyles
  }, children);
}
//# sourceMappingURL=Toggle.js.map