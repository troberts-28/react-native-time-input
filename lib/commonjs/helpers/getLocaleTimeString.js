"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLocaleTimeString;

var _dateFns = require("date-fns");

function getLocaleTimeString(dateTimeString = null, hideHours, includeSeconds) {
  let date = dateTimeString ? new Date(dateTimeString) : new Date();

  if (!hideHours && !includeSeconds) {
    return (0, _dateFns.format)(date, 'hh:mm a');
  } else if (includeSeconds && (hideHours || date.getHours() === 0)) {
    return (0, _dateFns.format)(date, 'mm:ss a');
  } else {
    return (0, _dateFns.format)(date, 'hh:mm:ss a');
  }
}
//# sourceMappingURL=getLocaleTimeString.js.map