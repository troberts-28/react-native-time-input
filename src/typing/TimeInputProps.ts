import type TimeInputStyle from './TimeInputStyle';
import type TimeInputTheme from './TimeInputTheme';

export default interface TimeInputProps {
  errorText?: string | null;
  showErrorText?: boolean;
  initialTime?: Date | null; // TODO: add stronger typing here for a date string?
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
