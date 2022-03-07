import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import TimeTextField from './components/TimeTextField';
import _ from 'lodash';
import Toggle, { ToggleButton } from './components/Toggle';
import defaultStyles from './utils/style';
import defaultTheme from './utils/theme';
import getLocaleTimeString from './helpers/getLocaleTimeString';
import parseLocaleTimeString from './helpers/parseLocaleTimeString';
import durationInputConverter from './helpers/durationInputConverter';
export default function TimeInput({
  id,
  errorText = null,
  showErrorText = true,
  isDuration = false,
  initialValue = null,
  initiallyValid = true,
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
  styles = defaultStyles,
  theme = defaultTheme
}) {
  var _componentStyle$input, _componentStyle$toggl, _componentStyle$toggl2, _componentStyle$toggl3, _componentStyle$toggl4, _componentStyle$toggl5;

  const initialRender = useRef(true);
  const animation = useRef(new Animated.Value(0)).current;
  const [componentReady, setComponentReady] = useState(false);
  const [componentTheme, setComponentTheme] = useState(null);
  const [componentStyle, setComponentStyle] = useState(null);
  const [componentErrorText, setComponentErrorText] = useState('Please enter a valid time.');
  const [currentLocaleTime] = useState(getLocaleTimeString(null, hideHours, includeSeconds, hideToggle));
  const [currentLocaleTimeParsed] = useState(parseLocaleTimeString(currentLocaleTime));
  const [initialTimeParsed] = useState(() => isDuration && typeof initialValue === 'number' ? parseLocaleTimeString(durationInputConverter(initialValue, hideHours, includeSeconds)) : initialValue instanceof Date ? parseLocaleTimeString(getLocaleTimeString(initialValue, hideHours, includeSeconds, hideToggle)) : null);

  const getGivenTime = () => {
    if (initialValue && initialTimeParsed) return initialTimeParsed;
    return setCurrentTime ? currentLocaleTimeParsed : null;
  };

  const [meridiem, setMeridiem] = useState(() => {
    let gt = getGivenTime();
    return !gt ? currentLocaleTimeParsed.meridiem : gt.meridiem;
  });
  const [time, setTime] = useState('');
  const [validTime, setValidTime] = useState(initiallyValid);

  const handleTimeValueReady = (isValid, updated) => {
    setTime(updated);
    setValidTime(isValid);
  };

  const handleMeridiemChange = useCallback(() => {
    Animated.timing(animation, {
      toValue: meridiem === 'PM' ? 40 : 0,
      delay: 0,
      duration: 225,
      useNativeDriver: true
    }).start();
  }, [animation, meridiem]); // Init component after setting the theme and styles

  useEffect(() => {
    if (!componentStyle || !componentTheme) return;
    setComponentReady(true);
  }, [componentStyle, componentTheme, setComponentReady]);
  useEffect(() => {
    setComponentStyle(StyleSheet.create(_.merge({}, defaultStyles, styles)));
    setComponentTheme(_.assign({}, defaultTheme, theme));
  }, [styles, theme, setComponentStyle, setComponentTheme]);
  useEffect(() => {
    if (!errorText) return;
    setComponentErrorText(errorText);
  }, [errorText, setComponentErrorText]);
  useEffect(() => {
    handleMeridiemChange();
    return () => animation.stopAnimation();
  }, [meridiem, animation, handleMeridiemChange]);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    time.length ? onTimeChange(id, `${time} ${meridiem}`, validTime) : onTimeChange(id, '', validTime);
  }, [time, meridiem, validTime, onTimeChange, id]);
  if (!componentReady || !componentStyle || !componentTheme) return null;
  return /*#__PURE__*/React.createElement(View, {
    style: componentStyle.componentContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: componentStyle.container
  }, /*#__PURE__*/React.createElement(TimeTextField, {
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
  }), !hideToggle && !isDuration && /*#__PURE__*/React.createElement(Toggle, {
    toggleStyles: [(_componentStyle$toggl = componentStyle.toggle) !== null && _componentStyle$toggl !== void 0 ? _componentStyle$toggl : {}, {
      backgroundColor: componentTheme.toggleBackgroundColor
    }]
  }, /*#__PURE__*/React.createElement(ToggleButton, {
    toggleButtonStyles: [(_componentStyle$toggl2 = componentStyle.toggleButton) !== null && _componentStyle$toggl2 !== void 0 ? _componentStyle$toggl2 : {}, {
      backgroundColor: componentTheme.toggleButtonBackground
    }],
    onPress: () => setMeridiem('AM')
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: componentTheme.toggleButtonTextColor
    }
  }, "AM")), /*#__PURE__*/React.createElement(ToggleButton, {
    toggleButtonStyles: [(_componentStyle$toggl3 = componentStyle.toggleButton) !== null && _componentStyle$toggl3 !== void 0 ? _componentStyle$toggl3 : {}, {
      backgroundColor: componentTheme.toggleButtonBackground
    }],
    onPress: () => setMeridiem('PM')
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: componentTheme.toggleButtonTextColor
    }
  }, "PM")), /*#__PURE__*/React.createElement(ToggleButton, {
    activeButton: true,
    toggleButtonStyles: [(_componentStyle$toggl4 = componentStyle.toggleButton) !== null && _componentStyle$toggl4 !== void 0 ? _componentStyle$toggl4 : {}, (_componentStyle$toggl5 = componentStyle.toggleButtonActive) !== null && _componentStyle$toggl5 !== void 0 ? _componentStyle$toggl5 : {}, {
      backgroundColor: componentTheme.toggleButtonActiveBackgroundColor,
      transform: [{
        translateX: animation
      }]
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: componentTheme.toggleButtonActiveTextColor
    }
  }, meridiem)))), showErrorText && !validTime ? /*#__PURE__*/React.createElement(View, {
    style: componentStyle.errorTextContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: [componentStyle.errorText, {
      color: componentTheme.errorTextColor,
      paddingLeft: componentTheme.errorTextPaddingLeft,
      fontFamily: componentTheme.inputFontFamily
    }]
  }, validTime ? '' : componentErrorText)) : /*#__PURE__*/React.createElement(React.Fragment, null));
}
//# sourceMappingURL=index.js.map