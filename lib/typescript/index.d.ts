/// <reference types="react" />
import type TimeInputProps from './typing/TimeInputProps';
export default function TimeInput({ id, errorText, showErrorText, isDuration, initialValue, initiallyValid, onTimeChange, onFinishEditing, setCurrentTime, hideToggle, includeSeconds, hideHours, isDisabled, maxHours, maxMinutes, maxSeconds, placeholderTime, alwaysShowFloatingMessageOnFocus, floatingErrorMessage, floatingErrorOffset, styles, theme, }: TimeInputProps): JSX.Element | null;
