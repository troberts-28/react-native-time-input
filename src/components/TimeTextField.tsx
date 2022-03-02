import React, { useEffect, useState, useCallback } from 'react';
import { TextInput, TextStyle } from 'react-native';
import { Tooltip, Box } from 'native-base';
import * as TimeInputHelper from '../helpers/timeInput';
import type { TimeParts } from 'src/typing/TimeParts';
import useDebounce from '../hooks/useDebounce';

type TimeTextFieldProps = {
  id?: string;
  style: TextStyle[];
  onTimeValueReady: Function;
  includeSeconds: boolean;
  hideHours?: boolean;
  givenTime: TimeParts | null;
  placeholderTime?: string;
  placeholderColor?: string;
  focusBorderColor?: string;
  unfocusBorderColor?: string;
  invalidBorderColor?: string;
  floatingErrorOffset?: number;
  floatingErrorMessage?: string;
  isDisabled?: boolean;
  maxHours?: string;
  maxMinutes?: string;
  maxSeconds?: string;
  onFinishEditing?: Function;
  bg?: string;
  selectionColor?: string;
};

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
  isDisabled,
  maxHours,
  maxMinutes,
  maxSeconds,
  onFinishEditing,
  bg,
  selectionColor,
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
    const valid = TimeInputHelper.validate(
      debouncedTime,
      maxHours,
      maxMinutes,
      maxSeconds,
      includeSeconds,
      hideHours
    );
    setIsValid(valid);
    onTimeValueReady(valid, debouncedTime);
  }, [
    debouncedTime,
    hideHours,
    includeSeconds,
    maxHours,
    maxMinutes,
    maxSeconds,
    onTimeValueReady,
  ]);

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
      onFinishEditing(id ?? 'dummyId', time, isValid);
    }
  }, [id, isValid, onFinishEditing, time]);

  return (
    <Tooltip
      label={floatingErrorMessage ?? ''}
      isOpen={floatingErrorMessage ? !isValid && isFocussed : false}
      placement="bottom"
      mt={floatingErrorOffset ?? 16} // * hacky value inserted to push it below - should link to size of input
      py="0.5"
      px="1"
      bg="#BDBDBD"
      _text={{ color: '#78716c' }}
      openDelay={1000}
    >
      <Box flex={1} alignItems="center" justifyContent="center">
        <TextInput
          keyboardType="number-pad"
          maxLength={includeSeconds ? (!hideHours ? 8 : 5) : 5}
          onChangeText={(text: string) => setTime(TimeInputHelper.mask(text))}
          onBlur={lostFocusHandler}
          onFocus={focusHandler}
          editable={!isDisabled ?? true}
          selectTextOnFocus={!isDisabled ?? true}
          placeholder={placeholderTime ?? '08:00'}
          placeholderTextColor={placeholderColor}
          value={time}
          selectionColor={selectionColor}
          style={[
            style,
            {
              borderColor: isDisabled
                ? 'transparent'
                : !isValid
                ? invalidBorderColor
                : isFocussed
                ? focusBorderColor
                : unfocusBorderColor,
              borderWidth: isDisabled ? 0 : 1,
              backgroundColor: isDisabled ? 'transparent' : bg,
              width: time ? '100%' : '95%',
            },
          ]}
        />
      </Box>
    </Tooltip>
  );
}
