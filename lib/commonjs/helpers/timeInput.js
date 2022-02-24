"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = exports.mask = void 0;

const mask = value => {
  // replace non-numeric characters
  value = value.replace(/:|[a-zA-Z]/g, '');
  let totalCharactersInValue = value.length;

  if (totalCharactersInValue === 3) {
    return value.substr(0, 1) + ':' + value.substr(1);
  }

  if (totalCharactersInValue === 4) {
    return value.substr(0, 2) + ':' + value.substr(2);
  }

  return value;
};

exports.mask = mask;

const validate = (value, maxHours, maxSeconds) => {
  var _maxHours$slice, _maxHours$slice2, _maxHours$slice3, _maxSeconds$slice, _maxSeconds$slice2;

  // let reg = new RegExp('^(0?[1-9]|1[012]):[0-5][0-9]$');
  let regex = new RegExp(`^(0?[1-${(_maxHours$slice = maxHours === null || maxHours === void 0 ? void 0 : maxHours.slice(-1)) !== null && _maxHours$slice !== void 0 ? _maxHours$slice : '9'}]|${(_maxHours$slice2 = maxHours === null || maxHours === void 0 ? void 0 : maxHours.slice(0, -1)) !== null && _maxHours$slice2 !== void 0 ? _maxHours$slice2 : '1'}[0-${(_maxHours$slice3 = maxHours === null || maxHours === void 0 ? void 0 : maxHours.slice(-1)) !== null && _maxHours$slice3 !== void 0 ? _maxHours$slice3 : '2'}]):[0-${(_maxSeconds$slice = maxSeconds === null || maxSeconds === void 0 ? void 0 : maxSeconds.slice(0, -1)) !== null && _maxSeconds$slice !== void 0 ? _maxSeconds$slice : '5'}][0-${(_maxSeconds$slice2 = maxSeconds === null || maxSeconds === void 0 ? void 0 : maxSeconds.slice(-1)) !== null && _maxSeconds$slice2 !== void 0 ? _maxSeconds$slice2 : '9'}]$`);
  console.log(regex);
  return value.length ? regex.test(value) : true;
};

exports.validate = validate;
//# sourceMappingURL=timeInput.js.map