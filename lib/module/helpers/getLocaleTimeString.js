import { format } from 'date-fns';
export default function getLocaleTimeString(dateTimeString = null, hideHours, includeSeconds, hideToggle) {
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
    return format(date, formatString) + ' AM';
  } else {
    return format(date, formatString + ' a');
  }
}
//# sourceMappingURL=getLocaleTimeString.js.map