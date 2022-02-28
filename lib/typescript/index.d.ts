/// <reference types="react" />
import type TimeInputProps from './typing/TimeInputProps';
export default function TimeInput({ id, errorText, showErrorText, initialTime, onTimeChange, onFinishEditing, setCurrentTime, hideToggle, isDisabled, maxHours, maxMinutes, placeholderTime, floatingErrorMessage, floatingErrorOffset, styles, theme, }: TimeInputProps): JSX.Element | null;
