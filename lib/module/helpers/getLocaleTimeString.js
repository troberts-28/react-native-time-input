import { format } from 'date-fns';
export default function getLocaleTimeString(dateTimeString = null) {
  return format(dateTimeString ? new Date(dateTimeString) : new Date(), 'hh:mm a');
}
//# sourceMappingURL=getLocaleTimeString.js.map