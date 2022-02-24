declare enum ETimeParts {
    time = "time",
    meridiem = "meridiem"
}
export declare type TimeParts = {
    [key in ETimeParts]: string;
};
export {};
