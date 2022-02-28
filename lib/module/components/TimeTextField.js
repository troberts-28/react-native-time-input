import React, { useEffect, useState, useCallback } from 'react';
import { TextInput } from 'react-native';
import { Tooltip } from 'native-base';
import * as TimeInputHelper from '../helpers/timeInput';
import useDebounce from '../hooks/useDebounce';
export default function TimeTextField({
  givenTime,
  onTimeValueReady,
  style,
  placeholderTime,
  placeholderColor,
  focusBorderColor,
  unfocusBorderColor,
  floatingErrorMessage,
  floatingErrorOffset,
  isDisabled,
  maxHours,
  maxMinutes,
  onFinishEditing,
  bg
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
    const valid = TimeInputHelper.validate(debouncedTime, maxHours, maxMinutes);
    setIsValid(valid);
    onTimeValueReady(valid, debouncedTime);
  }, [debouncedTime, maxHours, maxMinutes, onTimeValueReady]);
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
      onFinishEditing(time);
    }
  }, [onFinishEditing, time]);
  return /*#__PURE__*/React.createElement(Tooltip, {
    label: floatingErrorMessage !== null && floatingErrorMessage !== void 0 ? floatingErrorMessage : '',
    isOpen: floatingErrorMessage ? isValid && isFocussed : false,
    placement: "bottom",
    mt: floatingErrorOffset !== null && floatingErrorOffset !== void 0 ? floatingErrorOffset : 16 // * hacky value inserted to push it below - should link to size of input
    ,
    py: "0.5",
    px: "1",
    bg: "#BDBDBD",
    _text: {
      color: '#78716c'
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    keyboardType: "number-pad",
    maxLength: 5,
    onChangeText: text => setTime(TimeInputHelper.mask(text)),
    onBlur: lostFocusHandler,
    onFocus: focusHandler,
    editable: (_isDisabled = !isDisabled) !== null && _isDisabled !== void 0 ? _isDisabled : true,
    selectTextOnFocus: (_isDisabled2 = !isDisabled) !== null && _isDisabled2 !== void 0 ? _isDisabled2 : true,
    placeholder: placeholderTime !== null && placeholderTime !== void 0 ? placeholderTime : '08:00',
    placeholderTextColor: placeholderColor,
    value: time,
    style: [style, {
      borderColor: isFocussed ? focusBorderColor : unfocusBorderColor,
      borderWidth: isDisabled ? 0 : 1,
      backgroundColor: isDisabled ? 'transparent' : bg
    }]
  }));
}
//# sourceMappingURL=TimeTextField.js.map