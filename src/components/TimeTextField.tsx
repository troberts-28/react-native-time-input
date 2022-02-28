import React, { useEffect, useState, useCallback } from 'react';
import { TextInput, TextStyle } from 'react-native';
import { Tooltip } from 'native-base';
import * as TimeInputHelper from '../helpers/timeInput';
import type { TimeParts } from 'src/typing/TimeParts';
import useDebounce from '../hooks/useDebounce';

type TimeTextFieldProps = {
  style: TextStyle[];
  onTimeValueReady: Function;
  givenTime: TimeParts | null;
  placeholderTime?: string;
  placeholderColor?: string;
  focusBorderColor?: string;
  unfocusBorderColor?: string;
  floatingErrorOffset?: number;
  floatingErrorMessage?: string;
  isDisabled?: boolean;
  maxHours?: string;
  maxMinutes?: string;
  onFinishEditing?: Function;
  bg?: string;
};

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
  bg,
}: TimeTextFieldProps): JSX.Element {
  const [time, setTime] = useState<string>('');
  const [isFocussed, setIsFocussed] = useState(false);
  const [isValid, setIsValid] = useState(false);

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
    const valid = TimeInputHelper.validate(debouncedTime, maxHours, maxMinutes);
    setIsValid(valid);
    onTimeValueReady(valid, debouncedTime);
  }, [debouncedTime, maxHours, maxMinutes, onTimeValueReady]);

  useEffect((): (() => void) => {
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

  return (
    <Tooltip
      label={floatingErrorMessage ?? ''}
      isOpen={floatingErrorMessage ? isValid && isFocussed : false}
      placement="bottom"
      mt={floatingErrorOffset ?? 16} // * hacky value inserted to push it below - should link to size of input
      py="0.5"
      px="1"
      bg="#BDBDBD"
      _text={{ color: '#78716c' }}
    >
      <TextInput
        keyboardType="number-pad"
        maxLength={5}
        onChangeText={(text: string) => setTime(TimeInputHelper.mask(text))}
        onBlur={lostFocusHandler}
        onFocus={focusHandler}
        editable={!isDisabled ?? true}
        selectTextOnFocus={!isDisabled ?? true}
        placeholder={placeholderTime ?? '08:00'}
        placeholderTextColor={placeholderColor}
        value={time}
        style={[
          style,
          {
            borderColor: isFocussed ? focusBorderColor : unfocusBorderColor,
            borderWidth: isDisabled ? 0 : 1,
            backgroundColor: isDisabled ? 'transparent' : bg,
          },
        ]}
      />
    </Tooltip>
  );
}
