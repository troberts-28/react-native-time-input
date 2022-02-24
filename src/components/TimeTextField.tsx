import React, { useEffect, useState } from 'react';
import { TextInput, TextStyle } from 'react-native';
import * as TimeInputHelper from '../helpers/timeInput';
import type { TimeParts } from 'src/typing/TimeParts';
import useDebounce from '../hooks/useDebounce';

type TimeTextFieldProps = {
  style: TextStyle[];
  onTimeValueReady: Function;
  givenTime: TimeParts | null;
  placeholderTime?: string;
};

export default function TimeTextField({
  givenTime,
  onTimeValueReady,
  style,
  placeholderTime,
}: TimeTextFieldProps): JSX.Element {
  const [time, setTime] = useState<string>('');
  const {
    state: debouncedTime,
    setDebouncedState: setDebouncedTime,
    debounce,
  } = useDebounce(time, 250);

  useEffect(() => {
    if (!givenTime) return;
    setTime(givenTime.time);
  }, [givenTime, setTime]);

  useEffect((): void => {
    onTimeValueReady(
      TimeInputHelper.validate(debouncedTime, '99', '99'),
      debouncedTime
    );
  }, [debouncedTime, onTimeValueReady]);

  useEffect((): (() => void) => {
    setDebouncedTime(time);

    return () => {
      debounce.cancel();
    };
  }, [debounce, time, setDebouncedTime]);

  return (
    <TextInput
      keyboardType="number-pad"
      maxLength={5}
      onChangeText={(text: string) => setTime(TimeInputHelper.mask(text))}
      placeholder={placeholderTime ?? '08:00'}
      value={time}
      style={style}
    />
  );
}
