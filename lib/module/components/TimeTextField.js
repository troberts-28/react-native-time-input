import React, { useEffect, useState, useCallback } from 'react';
import { TextInput } from 'react-native';
import { Tooltip, Box } from 'native-base';
import * as TimeInputHelper from '../helpers/timeInput';
import useDebounce from '../hooks/useDebounce';
export default function TimeTextField({
  id,
  givenTime,
  onTimeValueReady,
  includeSeconds,
  hideHours,
  style,
  placeholderTime,
  placeholderColor,
  focusBorderColor,
  unfocusBorderColor,
  invalidBorderColor,
  floatingErrorMessage,
  floatingErrorOffset,
  alwaysShowFloatingMessageOnFocus,
  isDisabled,
  maxHours,
  maxMinutes,
  maxSeconds,
  onFinishEditing,
  bg,
  selectionColor
}) {
  var _isDisabled, _isDisabled2;

  const [time, setTime] = useState('');
  const [isFocussed, setIsFocussed] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const {
    state: debouncedTime,
    setDebouncedState: setDebouncedTime,
    debounce
  } = useDebounce(time, 250);
  useEffect(() => {
    if (!givenTime) return;
    setTime(givenTime.time);
  }, [givenTime, setTime]);
  useEffect(() => {
    const valid = TimeInputHelper.validate(debouncedTime, maxHours, maxMinutes, maxSeconds, includeSeconds, hideHours);
    setIsValid(valid);
    onTimeValueReady(valid, debouncedTime);
  }, [debouncedTime, hideHours, includeSeconds, maxHours, maxMinutes, maxSeconds, onTimeValueReady]);
  useEffect(() => {
    setDebouncedTime(time);
    return () => {
      debounce.cancel();
    };
  }, [debounce, time, setDebouncedTime]);
  const focusHandler = useCallback(() => {
    setIsFocussed(true);
  }, []);
  const lostFocusHandler = useCallback(() => {
    setIsFocussed(false);

    if (onFinishEditing) {
      onFinishEditing(id !== null && id !== void 0 ? id : 'dummyId', time, isValid);
    }
  }, [id, isValid, onFinishEditing, time]);
  return /*#__PURE__*/React.createElement(Box, {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }, /*#__PURE__*/React.createElement(Tooltip, {
    label: floatingErrorMessage !== null && floatingErrorMessage !== void 0 ? floatingErrorMessage : '',
    isOpen: floatingErrorMessage && (alwaysShowFloatingMessageOnFocus || !isValid) && isFocussed ? true : false,
    placement: "bottom",
    mt: floatingErrorOffset !== null && floatingErrorOffset !== void 0 ? floatingErrorOffset : 16,
    py: "0.5",
    px: "1",
    bg: "#BDBDBD",
    _text: {
      color: '#78716c'
    },
    openDelay: 1000
  }, /*#__PURE__*/React.createElement(TextInput, {
    keyboardType: "number-pad",
    maxLength: includeSeconds ? !hideHours ? 8 : 5 : 5,
    onChangeText: text => setTime(TimeInputHelper.mask(text)),
    onBlur: lostFocusHandler,
    onFocus: focusHandler,
    editable: (_isDisabled = !isDisabled) !== null && _isDisabled !== void 0 ? _isDisabled : true,
    selectTextOnFocus: (_isDisabled2 = !isDisabled) !== null && _isDisabled2 !== void 0 ? _isDisabled2 : true,
    placeholder: placeholderTime !== null && placeholderTime !== void 0 ? placeholderTime : '08:00',
    placeholderTextColor: placeholderColor,
    value: time,
    selectionColor: selectionColor,
    style: [style, {
      borderColor: isDisabled ? 'transparent' : !isValid ? invalidBorderColor : isFocussed ? focusBorderColor : unfocusBorderColor,
      borderWidth: isDisabled ? 0 : 1,
      backgroundColor: isDisabled ? 'transparent' : bg,
      width: time ? '100%' : '95%'
    }]
  })));
}
//# sourceMappingURL=TimeTextField.js.map