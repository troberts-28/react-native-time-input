"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimeInput;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _TimeTextField = _interopRequireDefault(require("./components/TimeTextField"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Toggle = _interopRequireWildcard(require("./components/Toggle"));

var _style = _interopRequireDefault(require("./utils/style"));

var _theme = _interopRequireDefault(require("./utils/theme"));

var _getLocaleTimeString = _interopRequireDefault(require("./helpers/getLocaleTimeString"));

var _parseLocaleTimeString = _interopRequireDefault(require("./helpers/parseLocaleTimeString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TimeInput({
  errorText = null,
  showErrorText = true,
  initialTime = null,
  onTimeChange = () => {},
  setCurrentTime = false,
  hideToggle = false,
  maxHours,
  maxMinutes,
  placeholderTime,
  styles = _style.default,
  theme = _theme.default
}) {
  const initialRender = (0, _react.useRef)(true);
  const animation = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const [componentReady, setComponentReady] = (0, _react.useState)(false);
  const [componentTheme, setComponentTheme] = (0, _react.useState)(null);
  const [componentStyle, setComponentStyle] = (0, _react.useState)(null);
  const [componentErrorText, setComponentErrorText] = (0, _react.useState)('Please enter a valid time.');
  const [currentLocaleTime] = (0, _react.useState)((0, _getLocaleTimeString.default)());
  const [currentLocaleTimeParsed] = (0, _react.useState)((0, _parseLocaleTimeString.default)(currentLocaleTime));
  const [initialTimeParsed] = (0, _react.useState)(() => !initialTime ? null : (0, _parseLocaleTimeString.default)((0, _getLocaleTimeString.default)(initialTime)));

  const getGivenTime = () => {
    if (initialTime && initialTimeParsed) return initialTimeParsed;
    return setCurrentTime ? currentLocaleTimeParsed : null;
  };

  const [meridiem, setMeridiem] = (0, _react.useState)(() => {
    let gt = getGivenTime();
    return !gt ? currentLocaleTimeParsed.meridiem : gt.meridiem;
  });
  const [time, setTime] = (0, _react.useState)('');
  const [validTime, setValidTime] = (0, _react.useState)(true);

  const handleTimeValueReady = (isValid, updated) => {
    setTime(updated);
    setValidTime(isValid);
  };

  const handleMeridiemChange = (0, _react.useCallback)(() => {
    _reactNative.Animated.timing(animation, {
      toValue: meridiem === 'PM' ? 40 : 0,
      delay: 0,
      duration: 225,
      useNativeDriver: true
    }).start();
  }, [animation, meridiem]); // Init component after setting the theme and styles

  (0, _react.useEffect)(() => {
    if (!componentStyle || !componentTheme) return;
    setComponentReady(true);
  }, [componentStyle, componentTheme, setComponentReady]);
  (0, _react.useEffect)(() => {
    setComponentStyle(_reactNative.StyleSheet.create(_lodash.default.merge({}, _style.default, styles)));
    setComponentTheme(_lodash.default.assign({}, _theme.default, theme));
  }, [styles, theme, setComponentStyle, setComponentTheme]);
  (0, _react.useEffect)(() => {
    if (!errorText) return;
    setComponentErrorText(errorText);
  }, [errorText, setComponentErrorText]);
  (0, _react.useEffect)(() => {
    handleMeridiemChange();
    return () => animation.stopAnimation();
  }, [meridiem, animation, handleMeridiemChange]);
  (0, _react.useEffect)(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    time.length ? onTimeChange(`${time} ${meridiem}`, validTime) : onTimeChange('', validTime);
  }, [time, meridiem, validTime, onTimeChange]);
  if (!componentReady || !componentStyle || !componentTheme) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: componentStyle.componentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: componentStyle.container
  }, /*#__PURE__*/_react.default.createElement(_TimeTextField.default, {
    givenTime: getGivenTime(),
    maxHours: maxHours,
    maxMinutes: maxMinutes,
    placeholderTime: placeholderTime,
    style: [componentStyle.input, {
      backgroundColor: componentTheme.inputBackgroundColor,
      borderColor: componentTheme.inputBorderColor,
      borderWidth: componentTheme.inputBorderWidth,
      color: componentTheme.inputTextColor,
      fontFamily: componentTheme.inputFontFamily,
      fontSize: componentTheme.inputFontSize
    }],
    onTimeValueReady: handleTimeValueReady
  }), !hideToggle && /*#__PURE__*/_react.default.createElement(_Toggle.default, {
    toggleStyles: [componentStyle.toggle, {
      backgroundColor: componentTheme.toggleBackgroundColor
    }]
  }, /*#__PURE__*/_react.default.createElement(_Toggle.ToggleButton, {
    toggleButtonStyles: [componentStyle.toggleButton, {
      backgroundColor: componentTheme.toggleButtonBackground
    }],
    onPress: () => setMeridiem('AM')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: componentTheme.toggleButtonTextColor
    }
  }, "AM")), /*#__PURE__*/_react.default.createElement(_Toggle.ToggleButton, {
    toggleButtonStyles: [componentStyle.toggleButton, {
      backgroundColor: componentTheme.toggleButtonBackground
    }],
    onPress: () => setMeridiem('PM')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: componentTheme.toggleButtonTextColor
    }
  }, "PM")), /*#__PURE__*/_react.default.createElement(_Toggle.ToggleButton, {
    activeButton: true,
    toggleButtonStyles: [componentStyle.toggleButton, componentStyle.toggleButtonActive, {
      backgroundColor: componentTheme.toggleButtonActiveBackgroundColor,
      transform: [{
        translateX: animation
      }]
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: componentTheme.toggleButtonActiveTextColor
    }
  }, meridiem)))), showErrorText && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [componentStyle.errorText, {
      color: componentTheme.errorTextColor,
      paddingLeft: componentTheme.errorTextPaddingLeft,
      fontFamily: componentTheme.inputFontFamily
    }]
  }, validTime ? '' : componentErrorText));
}
//# sourceMappingURL=index.js.map