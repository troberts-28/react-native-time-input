"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseLocaleTimeString;

function parseLocaleTimeString(localeTime) {
  let arr = localeTime.split(' ');
  return {
    time: arr[0],
    meridiem: arr[1]
  };
}
//# sourceMappingURL=parseLocaleTimeString.js.map