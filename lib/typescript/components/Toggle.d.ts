/// <reference types="react" />
import { ViewStyle } from 'react-native';
import type { AnimatedViewStyle } from 'src/typing/AnimatedViewStyle';
declare type ToggleProps = {
    children?: JSX.Element | JSX.Element[];
    toggleStyles?: ViewStyle[];
};
declare type ToggleButtonProps = {
    children?: JSX.Element | JSX.Element[];
    toggleButtonStyles?: ViewStyle[] | AnimatedViewStyle[];
    activeButton?: boolean;
    onPress?: () => void;
};
export declare function ToggleButton({ children, toggleButtonStyles, activeButton, onPress, }: ToggleButtonProps): JSX.Element;
export default function Toggle({ children, toggleStyles, }: ToggleProps): JSX.Element;
export {};
