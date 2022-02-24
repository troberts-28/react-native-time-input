/// <reference types="react" />
import { TextStyle } from 'react-native';
import type { TimeParts } from 'src/typing/TimeParts';
declare type TimeTextFieldProps = {
    style: TextStyle[];
    onTimeValueReady: Function;
    givenTime: TimeParts | null;
    placeholderTime?: string;
};
export default function TimeTextField({ givenTime, onTimeValueReady, style, placeholderTime, }: TimeTextFieldProps): JSX.Element;
export {};
