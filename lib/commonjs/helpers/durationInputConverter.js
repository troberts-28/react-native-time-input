"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const padWithZero = value => {
  if (value < 10) {
    return '0' + value;
  } else {
    return String(value);
  }
};

const durationInputConverter = (durationInSeconds, hideHours, includeSeconds) => {
  // convert duration in seconds to input string
  let seconds = durationInSeconds;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  const paddedMinutes = padWithZero(minutes);
  const paddedSeconds = padWithZero(seconds);

  if (!hideHours && !includeSeconds) {
    return `${hours}:${paddedMinutes} AM`;
  } else if (includeSeconds && (hideHours || hours === 0)) {
    return `${minutes}:${paddedSeconds} AM`;
  } else {
    return `${hours}:${paddedMinutes}:${paddedSeconds} AM`;
  }
};

var _default = durationInputConverter;
exports.default = _default;
//# sourceMappingURL=durationInputConverter.js.map