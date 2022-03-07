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

var _durationInputConverter = _interopRequireDefault(require("./helpers/durationInputConverter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TimeInput({
  id,
  errorText = null,
  showErrorText = true,
  isDuration = false,
  initialValue = null,
  onTimeChange = () => {},
  onFinishEditing,
  setCurrentTime = false,
  hideToggle = false,
  includeSeconds = false,
  hideHours = false,
  isDisabled = false,
  maxHours,
  maxMinutes,
  maxSeconds,
  placeholderTime,
  alwaysShowFloatingMessageOnFocus,
  floatingErrorMessage,
  floatingErrorOffset,
  styles = _style.default,
  theme = _theme.default
}) {
  var _componentStyle$input, _componentStyle$toggl, _componentStyle$toggl2, _componentStyle$toggl3, _componentStyle$toggl4, _componentStyle$toggl5;

  const initialRender = (0, _react.useRef)(true);
  const animation = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const [componentReady, setComponentReady] = (0, _react.useState)(false);
  const [componentTheme, setComponentTheme] = (0, _react.useState)(null);
  const [componentStyle, setComponentStyle] = (0, _react.useState)(null);
  const [componentErrorText, setComponentErrorText] = (0, _react.useState)('Please enter a valid time.');
  const [currentLocaleTime] = (0, _react.useState)((0, _getLocaleTimeString.default)(null, hideHours, includeSeconds, hideToggle));
  const [currentLocaleTimeParsed] = (0, _react.useState)((0, _parseLocaleTimeString.default)(currentLocaleTime));
  const [initialTimeParsed] = (0, _react.useState)(() => isDuration && typeof initialValue === 'number' ? (0, _parseLocaleTimeString.default)((0, _durationInputConverter.default)(initialValue, hideHours, includeSeconds)) : initialValue instanceof Date ? (0, _parseLocaleTimeString.default)((0, _getLocaleTimeString.default)(initialValue, hideHours, includeSeconds, hideToggle)) : null);
  console.log(initialTimeParsed, typeof initialValue);

  const getGivenTime = () => {
    if (initialValue && initialTimeParsed) return initialTimeParsed;
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

    time.length ? onTimeChange(id, `${time} ${meridiem}`, validTime) : onTimeChange(id, '', validTime);
  }, [time, meridiem, validTime, onTimeChange, id]);
  if (!componentReady || !componentStyle || !componentTheme) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: componentStyle.componentContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: componentStyle.container
  }, /*#__PURE__*/_react.default.createElement(_TimeTextField.default, {
    id: id,
    givenTime: getGivenTime(),
    onFinishEditing: onFinishEditing,
    maxHours: maxHours,
    maxMinutes: maxMinutes,
    maxSeconds: maxSeconds,
    isDisabled: isDisabled,
    includeSeconds: includeSeconds,
    hideHours: hideHours,
    placeholderTime: placeholderTime,
    placeholderColor: !isDisabled ? componentTheme.placeholderTextColor : 'transparent',
    focusBorderColor: componentTheme.focusBorderColor,
    alwaysShowFloatingMessageOnFocus: alwaysShowFloatingMessageOnFocus,
    floatingErrorMessage: floatingErrorMessage,
    floatingErrorOffset: floatingErrorOffset,
    unfocusBorderColor: componentTheme.inputBorderColor,
    bg: componentTheme.inputBackgroundColor,
    invalidBorderColor: componentTheme.inputInvalidBorderColor,
    selectionColor: componentTheme.selectionColor,
    style: [(_componentStyle$input = componentStyle.input) !== null && _componentStyle$input !== void 0 ? _componentStyle$input : {}, {
      backgroundColor: componentTheme.inputBackgroundColor,
      borderColor: componentTheme.inputBorderColor,
      borderWidth: componentTheme.inputBorderWidth,
      color: componentTheme.inputTextColor,
      fontFamily: componentTheme.inputFontFamily,
      fontSize: componentTheme.inputFontSize
    }],
    onTimeValueReady: handleTimeValueReady
  }), !hideToggle && !isDuration && /*#__PURE__*/_react.default.createElement(_Toggle.default, {
    toggleStyles: [(_componentStyle$toggl = componentStyle.toggle) !== null && _componentStyle$toggl !== void 0 ? _componentStyle$toggl : {}, {
      backgroundColor: componentTheme.toggleBackgroundColor
    }]
  }, /*#__PURE__*/_react.default.createElement(_Toggle.ToggleButton, {
    toggleButtonStyles: [(_componentStyle$toggl2 = componentStyle.toggleButton) !== null && _componentStyle$toggl2 !== void 0 ? _componentStyle$toggl2 : {}, {
      backgroundColor: componentTheme.toggleButtonBackground
    }],
    onPress: () => setMeridiem('AM')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: componentTheme.toggleButtonTextColor
    }
  }, "AM")), /*#__PURE__*/_react.default.createElement(_Toggle.ToggleButton, {
    toggleButtonStyles: [(_componentStyle$toggl3 = componentStyle.toggleButton) !== null && _componentStyle$toggl3 !== void 0 ? _componentStyle$toggl3 : {}, {
      backgroundColor: componentTheme.toggleButtonBackground
    }],
    onPress: () => setMeridiem('PM')
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: componentTheme.toggleButtonTextColor
    }
  }, "PM")), /*#__PURE__*/_react.default.createElement(_Toggle.ToggleButton, {
    activeButton: true,
    toggleButtonStyles: [(_componentStyle$toggl4 = componentStyle.toggleButton) !== null && _componentStyle$toggl4 !== void 0 ? _componentStyle$toggl4 : {}, (_componentStyle$toggl5 = componentStyle.toggleButtonActive) !== null && _componentStyle$toggl5 !== void 0 ? _componentStyle$toggl5 : {}, {
      backgroundColor: componentTheme.toggleButtonActiveBackgroundColor,
      transform: [{
        translateX: animation
      }]
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      color: componentTheme.toggleButtonActiveTextColor
    }
  }, meridiem)))), showErrorText && !validTime ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: componentStyle.errorTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [componentStyle.errorText, {
      color: componentTheme.errorTextColor,
      paddingLeft: componentTheme.errorTextPaddingLeft,
      fontFamily: componentTheme.inputFontFamily
    }]
  }, validTime ? '' : componentErrorText)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null));
}
//# sourceMappingURL=index.js.map