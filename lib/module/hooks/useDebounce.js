import { useMemo, useState } from 'react';
import _ from 'lodash';
export default ((obj = '', wait = 1000) => {
  const [state, setState] = useState(obj);
  const debounce = useMemo(() => _.debounce(prop => {
    setState(prop);
  }, wait), [setState, wait]);

  const setDebouncedState = value => {
    debounce(value);
  };

  return {
    state,
    setDebouncedState,
    debounce
  };
});
//# sourceMappingURL=useDebounce.js.map