import { format } from 'date-fns';
export default function getLocaleTimeString(dateTimeString = null, hideHours, includeSeconds, hideToggle) {
  let date = dateTimeString ? new Date(dateTimeString) : new Date();
  let formatString;

  if (!hideHours && !includeSeconds) {
    formatString = 'h:mm a';
  } else if (includeSeconds && (hideHours || date.getHours() === 0)) {
    formatString = 'm:ss a';
  } else {
    formatString = 'h:mm:ss a';
  }

  if (hideToggle && formatString.startsWith('h')) {
    formatString = 'h' + formatString;
  }

  return format(date, formatString + ' a');
}
//# sourceMappingURL=getLocaleTimeString.js.map