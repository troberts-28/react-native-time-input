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

  if (totalCharactersInValue === 5) {
    return value.substr(0, 2) + ':' + value.substr(2, 3) + ':' + value.substr(3);
  }

  if (totalCharactersInValue === 6) {
    return value.substr(0, 2) + ':' + value.substr(2, 4) + ':' + value.substr(4);
  }

  return value;
};
export const validate = (value, maxHours, maxMinutes, maxSeconds, includeSeconds, hideHours) => {
  var _maxMinutes$slice, _maxMinutes$slice2;

  let rule = `[0-${(_maxMinutes$slice = maxMinutes === null || maxMinutes === void 0 ? void 0 : maxMinutes.slice(0, -1)) !== null && _maxMinutes$slice !== void 0 ? _maxMinutes$slice : '5'}][0-${(_maxMinutes$slice2 = maxMinutes === null || maxMinutes === void 0 ? void 0 : maxMinutes.slice(-1)) !== null && _maxMinutes$slice2 !== void 0 ? _maxMinutes$slice2 : '9'}]`;

  if (!hideHours) {
    var _maxHours$slice, _ref, _maxHours$slice2;

    rule = `^(0?[0-${(_maxHours$slice = maxHours === null || maxHours === void 0 ? void 0 : maxHours.slice(-1)) !== null && _maxHours$slice !== void 0 ? _maxHours$slice : '9'}]|${(_ref = '[0-' + (maxHours === null || maxHours === void 0 ? void 0 : maxHours.slice(0, -1)) + ']') !== null && _ref !== void 0 ? _ref : '1'}[0-${(_maxHours$slice2 = maxHours === null || maxHours === void 0 ? void 0 : maxHours.slice(-1)) !== null && _maxHours$slice2 !== void 0 ? _maxHours$slice2 : '2'}]):` + rule;
  }

  if (includeSeconds) {
    var _maxSeconds$slice, _maxSeconds$slice2;

    rule += `:[0-${(_maxSeconds$slice = maxSeconds === null || maxSeconds === void 0 ? void 0 : maxSeconds.slice(0, -1)) !== null && _maxSeconds$slice !== void 0 ? _maxSeconds$slice : '5'}][0-${(_maxSeconds$slice2 = maxSeconds === null || maxSeconds === void 0 ? void 0 : maxSeconds.slice(-1)) !== null && _maxSeconds$slice2 !== void 0 ? _maxSeconds$slice2 : '9'}]$`;
  }

  const regex = new RegExp(rule); // regex = new RegExp(
  //   `^(0?[0-${maxHours?.slice(-1) ?? '9'}]|${
  //     '[0-' + maxHours?.slice(0, -1) + ']' ?? '1'
  //   }[0-${maxHours?.slice(-1) ?? '2'}]):[0-${
  //     maxMinutes?.slice(0, -1) ?? '5'
  //   }][0-${maxMinutes?.slice(-1) ?? '9'}]$`
  // );

  return value.length ? regex.test(value) : true;
};
//# sourceMappingURL=timeInput.js.map