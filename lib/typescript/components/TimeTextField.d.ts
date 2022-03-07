/// <reference types="react" />
import { TextStyle } from 'react-native';
import type { TimeParts } from 'src/typing/TimeParts';
declare type TimeTextFieldProps = {
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
    alwaysShowFloatingMessageOnFocus?: boolean;
    isDisabled?: boolean;
    maxHours?: string;
    maxMinutes?: string;
    maxSeconds?: string;
    onFinishEditing?: Function;
    bg?: string;
    selectionColor?: string;
};
export default function TimeTextField({ id, givenTime, onTimeValueReady, includeSeconds, hideHours, style, placeholderTime, placeholderColor, focusBorderColor, unfocusBorderColor, invalidBorderColor, floatingErrorMessage, floatingErrorOffset, alwaysShowFloatingMessageOnFocus, isDisabled, maxHours, maxMinutes, maxSeconds, onFinishEditing, bg, selectionColor, }: TimeTextFieldProps): JSX.Element;
export {};
