export default function parseLocaleTimeString(localeTime) {
  let arr = localeTime.split(' ');
  return {
    time: arr[0],
    meridiem: arr[1]
  };
}
//# sourceMappingURL=parseLocaleTimeString.js.map