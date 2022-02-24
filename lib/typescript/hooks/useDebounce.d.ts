import _ from 'lodash';
declare const _default: (obj?: string, wait?: number) => {
    state: string;
    setDebouncedState: (value: string) => void;
    debounce: _.DebouncedFunc<(prop: any) => void>;
};
export default _default;
