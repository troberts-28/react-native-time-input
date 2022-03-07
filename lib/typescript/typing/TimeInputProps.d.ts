import type TimeInputStyle from './TimeInputStyle';
import type TimeInputTheme from './TimeInputTheme';
export default interface TimeInputProps {
    id?: string;
    errorText?: string | null;
    showErrorText?: boolean;
    isDuration?: boolean;
    initialValue?: Date | number | null;
    initiallyValid?: boolean;
    onTimeChange?: Function;
    onFinishEditing?: Function;
    setCurrentTime?: boolean;
    hideToggle?: boolean;
    includeSeconds?: boolean;
    hideHours?: boolean;
    isDisabled?: boolean;
    maxHours?: string;
    maxMinutes?: string;
    maxSeconds?: string;
    placeholderTime?: string;
    floatingErrorMessage?: string;
    alwaysShowFloatingMessageOnFocus?: boolean;
    floatingErrorOffset?: number;
    styles?: TimeInputStyle;
    theme?: TimeInputTheme;
}
