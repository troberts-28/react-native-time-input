"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLocaleTimeString;

var _dateFns = require("date-fns");

function getLocaleTimeString(dateTimeString = null) {
  return (0, _dateFns.format)(dateTimeString ? new Date(dateTimeString) : new Date(), 'hh:mm a');
}
//# sourceMappingURL=getLocaleTimeString.js.map