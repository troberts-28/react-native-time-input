import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import TimeTextField from './components/TimeTextField';
import _ from 'lodash';
import Toggle, { ToggleButton } from './components/Toggle';
import defaultStyles from './utils/style';
import defaultTheme from './utils/theme';
import getLocaleTimeString from './helpers/getLocaleTimeString';
import parseLocaleTimeString from './helpers/parseLocaleTimeString';
export default function TimeInput({
  errorText = null,
  showErrorText = true,
  initialTime = null,
  onTimeChange = () => {},
  setCurrentTime = false,
  hideToggle = false,
  maxHours,
  maxMinutes,
  placeholderTime,
  styles = defaultStyles,
  theme = defaultTheme
}) {
  const initialRender = useRef(true);
  const animation = useRef(new Animated.Value(0)).current;
  const [componentReady, setComponentReady] = useState(false);
  const [componentTheme, setComponentTheme] = useState(null);
  const [componentStyle, setComponentStyle] = useState(null);
  const [componentErrorText, setComponentErrorText] = useState('Please enter a valid time.');
  const [currentLocaleTime] = useState(getLocaleTimeString());
  const [currentLocaleTimeParsed] = useState(parseLocaleTimeString(currentLocaleTime));
  const [initialTimeParsed] = useState(() => !initialTime ? null : parseLocaleTimeString(getLocaleTimeString(initialTime)));

  const getGivenTime = () => {
    if (initialTime && initialTimeParsed) return initialTimeParsed;
    return setCurrentTime ? currentLocaleTimeParsed : null;
  };

  const [meridiem, setMeridiem] = useState(() => {
    let gt = getGivenTime();
    return !gt ? currentLocaleTimeParsed.meridiem : gt.meridiem;
  });
  const [time, setTime] = useState('');
  const [validTime, setValidTime] = useState(true);

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

    time.length ? onTimeChange(`${time} ${meridiem}`, validTime) : onTimeChange('', validTime);
  }, [time, meridiem, validTime, onTimeChange]);
  if (!componentReady || !componentStyle || !componentTheme) return null;
  return /*#__PURE__*/React.createElement(View, {
    style: componentStyle.componentContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: componentStyle.container
  }, /*#__PURE__*/React.createElement(TimeTextField, {
    givenTime: getGivenTime(),
    maxHours: maxHours,
    maxMinutes: maxMinutes,
    placeholderTime: placeholderTime,
    style: [componentStyle.input, {
      backgroundColor: componentTheme.inputBackgroundColor,
      borderColor: componentTheme.inputBorderColor,
      borderWidth: componentTheme.inputBorderWidth,
      color: componentTheme.inputTextColor
    }],
    onTimeValueReady: handleTimeValueReady
  }), !hideToggle && /*#__PURE__*/React.createElement(Toggle, {
    toggleStyles: [componentStyle.toggle, {
      backgroundColor: componentTheme.toggleBackgroundColor
    }]
  }, /*#__PURE__*/React.createElement(ToggleButton, {
    toggleButtonStyles: [componentStyle.toggleButton, {
      backgroundColor: componentTheme.toggleButtonBackground
    }],
    onPress: () => setMeridiem('AM')
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: componentTheme.toggleButtonTextColor
    }
  }, "AM")), /*#__PURE__*/React.createElement(ToggleButton, {
    toggleButtonStyles: [componentStyle.toggleButton, {
      backgroundColor: componentTheme.toggleButtonBackground
    }],
    onPress: () => setMeridiem('PM')
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: componentTheme.toggleButtonTextColor
    }
  }, "PM")), /*#__PURE__*/React.createElement(ToggleButton, {
    activeButton: true,
    toggleButtonStyles: [componentStyle.toggleButton, componentStyle.toggleButtonActive, {
      backgroundColor: componentTheme.toggleButtonActiveBackgroundColor,
      transform: [{
        translateX: animation
      }]
    }]
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: componentTheme.toggleButtonActiveTextColor
    }
  }, meridiem)))), showErrorText && /*#__PURE__*/React.createElement(Text, {
    style: [componentStyle.errorText, {
      color: componentTheme.errorTextColor,
      marginLeft: componentTheme.errorTextMarginLeft
    }]
  }, validTime ? '' : componentErrorText));
}
//# sourceMappingURL=index.js.map