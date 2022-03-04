"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLocaleTimeString;

var _dateFns = require("date-fns");

function getLocaleTimeString(dateTimeString = null, hideHours, includeSeconds, hideToggle) {
  let date = dateTimeString ? new Date(dateTimeString) : new Date();
  let formatString;

  if (!hideHours && !includeSeconds) {
    formatString = 'h:mm';
  } else if (includeSeconds && (hideHours || date.getHours() === 0)) {
    formatString = 'm:ss';
  } else {
    formatString = 'h:mm:ss';
  }

  if (hideToggle) {
    return (0, _dateFns.format)(date, formatString);
  } else {
    return (0, _dateFns.format)(date, formatString + ' a');
  }
}
//# sourceMappingURL=getLocaleTimeString.js.map