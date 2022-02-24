import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import * as TimeInputHelper from '../helpers/timeInput';
import useDebounce from '../hooks/useDebounce';
export default function TimeTextField({
  givenTime,
  onTimeValueReady,
  style,
  placeholderTime,
  maxHours,
  maxMinutes
}) {
  const [time, setTime] = useState('');
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
    onTimeValueReady(TimeInputHelper.validate(debouncedTime, maxHours, maxMinutes), debouncedTime);
  }, [debouncedTime, maxHours, maxMinutes, onTimeValueReady]);
  useEffect(() => {
    setDebouncedTime(time);
    return () => {
      debounce.cancel();
    };
  }, [debounce, time, setDebouncedTime]);
  return /*#__PURE__*/React.createElement(TextInput, {
    keyboardType: "number-pad",
    maxLength: 5,
    onChangeText: text => setTime(TimeInputHelper.mask(text)),
    placeholder: placeholderTime !== null && placeholderTime !== void 0 ? placeholderTime : '08:00',
    value: time,
    style: style
  });
}
//# sourceMappingURL=TimeTextField.js.map