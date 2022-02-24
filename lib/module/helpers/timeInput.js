export const mask = value => {
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
export const validate = (value, maxHours, maxMinutes) => {
  var _maxHours$slice, _maxHours$slice2, _maxHours$slice3, _maxMinutes$slice, _maxMinutes$slice2;

  // let reg = new RegExp('^(0?[1-9]|1[012]):[0-5][0-9]$');
  let regex = new RegExp(`^(0?[1-${(_maxHours$slice = maxHours === null || maxHours === void 0 ? void 0 : maxHours.slice(-1)) !== null && _maxHours$slice !== void 0 ? _maxHours$slice : '9'}]|${(_maxHours$slice2 = maxHours === null || maxHours === void 0 ? void 0 : maxHours.slice(0, -1)) !== null && _maxHours$slice2 !== void 0 ? _maxHours$slice2 : '1'}[0-${(_maxHours$slice3 = maxHours === null || maxHours === void 0 ? void 0 : maxHours.slice(-1)) !== null && _maxHours$slice3 !== void 0 ? _maxHours$slice3 : '2'}]):[0-${(_maxMinutes$slice = maxMinutes === null || maxMinutes === void 0 ? void 0 : maxMinutes.slice(0, -1)) !== null && _maxMinutes$slice !== void 0 ? _maxMinutes$slice : '5'}][0-${(_maxMinutes$slice2 = maxMinutes === null || maxMinutes === void 0 ? void 0 : maxMinutes.slice(-1)) !== null && _maxMinutes$slice2 !== void 0 ? _maxMinutes$slice2 : '9'}]$`);
  return value.length ? regex.test(value) : true;
};
//# sourceMappingURL=timeInput.js.map