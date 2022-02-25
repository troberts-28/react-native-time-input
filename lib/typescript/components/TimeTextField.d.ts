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
    floatingErrorMessage?: string;
    isDisabled?: boolean;
    maxHours?: string;
    maxMinutes?: string;
    onFinishEditing?: Function;
};
export default function TimeTextField({ givenTime, onTimeValueReady, style, placeholderTime, placeholderColor, focusBorderColor, floatingErrorMessage, isDisabled, maxHours, maxMinutes, onFinishEditing, }: TimeTextFieldProps): JSX.Element;
export {};
