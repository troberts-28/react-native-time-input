import { format } from 'date-fns';
export default function getLocaleTimeString(dateTimeString = null, hideHours, includeSeconds) {
  let date = dateTimeString ? new Date(dateTimeString) : new Date();

  if (!hideHours && !includeSeconds) {
    return format(date, 'h:mm a');
  } else if (includeSeconds && (hideHours || date.getHours() === 0)) {
    return format(date, 'm:ss a');
  } else {
    return format(date, 'h:mm:ss a');
  }
}
//# sourceMappingURL=getLocaleTimeString.js.map