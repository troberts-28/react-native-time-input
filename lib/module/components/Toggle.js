import React from 'react';
import { Animated, Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
export function ToggleButton({
  children,
  toggleButtonStyles,
  activeButton = false,
  onPress
}) {
  if (activeButton) {
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: toggleButtonStyles
    }, children);
  }

  if (Platform.OS === 'android') {
    return /*#__PURE__*/React.createElement(TouchableNativeFeedback, {
      onPress: onPress
    }, /*#__PURE__*/React.createElement(View, {
      style: toggleButtonStyles
    }, children));
  }

  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress
  }, /*#__PURE__*/React.createElement(View, {
    style: toggleButtonStyles
  }, children));
}
export default function Toggle({
  children,
  toggleStyles
}) {
  return /*#__PURE__*/React.createElement(View, {
    style: toggleStyles
  }, children);
}
//# sourceMappingURL=Toggle.js.map