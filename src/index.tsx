import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import TimeTextField from './components/TimeTextField';
import _ from 'lodash';
import Toggle, { ToggleButton } from './components/Toggle';
import defaultStyles from './utils/style';
import defaultTheme from './utils/theme';
import getLocaleTimeString from './helpers/getLocaleTimeString';
import parseLocaleTimeString from './helpers/parseLocaleTimeString';
import type TimeInputProps from './typing/TimeInputProps';
import type TimeInputStyle from './typing/TimeInputStyle';
import type TimeInputTheme from './typing/TimeInputTheme';
import type { TimeParts } from './typing/TimeParts';

export default function TimeInput({
  id,
  errorText = null,
  showErrorText = true,
  initialTime = null,
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
  floatingErrorMessage,
  floatingErrorOffset,
  styles = defaultStyles,
  theme = defaultTheme,
}: TimeInputProps): JSX.Element | null {
  const initialRender = useRef(true);
  const animation = useRef(new Animated.Value(0)).current;
  const [componentReady, setComponentReady] = useState<boolean>(false);
  const [componentTheme, setComponentTheme] = useState<TimeInputTheme | null>(
    null
  );
  const [componentStyle, setComponentStyle] = useState<TimeInputStyle | null>(
    null
  );
  const [componentErrorText, setComponentErrorText] = useState<string>(
    'Please enter a valid time.'
  );
  const [currentLocaleTime] = useState<string>(
    getLocaleTimeString(null, hideHours, includeSeconds, hideToggle)
  );
  const [currentLocaleTimeParsed] = useState<TimeParts>(
    parseLocaleTimeString(currentLocaleTime)
  );
  const [initialTimeParsed] = useState<TimeParts | null>((): TimeParts | null =>
    !initialTime
      ? null
      : parseLocaleTimeString(
          getLocaleTimeString(
            initialTime,
            hideHours,
            includeSeconds,
            hideToggle
          )
        )
  );

  const getGivenTime = (): TimeParts | null => {
    if (initialTime && initialTimeParsed) return initialTimeParsed;
    return setCurrentTime ? currentLocaleTimeParsed : null;
  };

  const [meridiem, setMeridiem] = useState<string>(() => {
    let gt = getGivenTime();
    return !gt ? currentLocaleTimeParsed.meridiem : gt.meridiem;
  });
  const [time, setTime] = useState<string>('');
  const [validTime, setValidTime] = useState<boolean>(true);

  const handleTimeValueReady = (isValid: boolean, updated: string): void => {
    setTime(updated);
    setValidTime(isValid);
  };

  const handleMeridiemChange = useCallback(() => {
    Animated.timing(animation, {
      toValue: meridiem === 'PM' ? 40 : 0,
      delay: 0,
      duration: 225,
      useNativeDriver: true,
    }).start();
  }, [animation, meridiem]);

  // Init component after setting the theme and styles
  useEffect((): void => {
    if (!componentStyle || !componentTheme) return;
    setComponentReady(true);
  }, [componentStyle, componentTheme, setComponentReady]);

  useEffect((): void => {
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

    time.length
      ? onTimeChange(`${time} ${meridiem}`, validTime)
      : onTimeChange('', validTime);
  }, [time, meridiem, validTime, onTimeChange]);

  if (!componentReady || !componentStyle || !componentTheme) return null;

  return (
    <View style={componentStyle.componentContainer}>
      <View style={componentStyle.container}>
        <TimeTextField
          id={id}
          givenTime={getGivenTime()}
          onFinishEditing={onFinishEditing}
          maxHours={maxHours}
          maxMinutes={maxMinutes}
          maxSeconds={maxSeconds}
          isDisabled={isDisabled}
          includeSeconds={includeSeconds}
          hideHours={hideHours}
          placeholderTime={placeholderTime}
          placeholderColor={
            !isDisabled ? componentTheme.placeholderTextColor : 'transparent'
          }
          focusBorderColor={componentTheme.focusBorderColor}
          floatingErrorMessage={floatingErrorMessage}
          floatingErrorOffset={floatingErrorOffset}
          unfocusBorderColor={componentTheme.inputBorderColor}
          bg={componentTheme.inputBackgroundColor}
          invalidBorderColor={componentTheme.inputInvalidBorderColor}
          selectionColor={componentTheme.selectionColor}
          style={[
            componentStyle.input ?? {},
            {
              backgroundColor: componentTheme.inputBackgroundColor,
              borderColor: componentTheme.inputBorderColor,
              borderWidth: componentTheme.inputBorderWidth,
              color: componentTheme.inputTextColor,
              fontFamily: componentTheme.inputFontFamily,
              fontSize: componentTheme.inputFontSize,
            },
          ]}
          onTimeValueReady={handleTimeValueReady}
        />

        {!hideToggle && (
          <Toggle
            toggleStyles={[
              componentStyle.toggle ?? {},
              {
                backgroundColor: componentTheme.toggleBackgroundColor,
              },
            ]}
          >
            <ToggleButton
              toggleButtonStyles={[
                componentStyle.toggleButton ?? {},
                {
                  backgroundColor: componentTheme.toggleButtonBackground,
                },
              ]}
              onPress={() => setMeridiem('AM')}
            >
              <Text
                style={{
                  color: componentTheme.toggleButtonTextColor,
                }}
              >
                AM
              </Text>
            </ToggleButton>

            <ToggleButton
              toggleButtonStyles={[
                componentStyle.toggleButton ?? {},
                {
                  backgroundColor: componentTheme.toggleButtonBackground,
                },
              ]}
              onPress={() => setMeridiem('PM')}
            >
              <Text
                style={{
                  color: componentTheme.toggleButtonTextColor,
                }}
              >
                PM
              </Text>
            </ToggleButton>

            <ToggleButton
              activeButton
              toggleButtonStyles={[
                componentStyle.toggleButton ?? {},
                componentStyle.toggleButtonActive ?? {},
                {
                  backgroundColor:
                    componentTheme.toggleButtonActiveBackgroundColor,
                  transform: [{ translateX: animation }],
                },
              ]}
            >
              <Text
                style={{
                  color: componentTheme.toggleButtonActiveTextColor,
                }}
              >
                {meridiem}
              </Text>
            </ToggleButton>
          </Toggle>
        )}
      </View>

      {showErrorText && !validTime ? (
        <View style={componentStyle.errorTextContainer}>
          <Text
            style={[
              componentStyle.errorText,
              {
                color: componentTheme.errorTextColor,
                paddingLeft: componentTheme.errorTextPaddingLeft,
                fontFamily: componentTheme.inputFontFamily,
              },
            ]}
          >
            {validTime ? '' : componentErrorText}
          </Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
