/// <reference types="react" />
import { TextStyle } from 'react-native';
import type { TimeParts } from 'src/typing/TimeParts';
declare type TimeTextFieldProps = {
    style: TextStyle[];
    onTimeValueReady: Function;
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
    onFinishEditing?: Function;
    bg?: string;
};
export default function TimeTextField({ givenTime, onTimeValueReady, style, placeholderTime, placeholderColor, focusBorderColor, unfocusBorderColor, invalidBorderColor, floatingErrorMessage, floatingErrorOffset, isDisabled, maxHours, maxMinutes, onFinishEditing, bg, }: TimeTextFieldProps): JSX.Element;
export {};
