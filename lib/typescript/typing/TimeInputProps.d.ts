import type TimeInputStyle from './TimeInputStyle';
import type TimeInputTheme from './TimeInputTheme';
export default interface TimeInputProps {
    id?: string;
    errorText?: string | null;
    showErrorText?: boolean;
    initialTime?: Date | null;
    onTimeChange?: Function;
    onFinishEditing?: Function;
    setCurrentTime?: boolean;
    hideToggle?: boolean;
    isDisabled?: boolean;
    maxHours?: string;
    maxMinutes?: string;
    placeholderTime?: string;
    floatingErrorMessage?: string;
    floatingErrorOffset?: number;
    styles?: TimeInputStyle;
    theme?: TimeInputTheme;
}
