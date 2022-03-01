import { format } from 'date-fns';

export default function getLocaleTimeString(
  dateTimeString: Date | null = null,
  hideHours?: boolean,
  includeSeconds?: boolean
): string {
  let date = dateTimeString ? new Date(dateTimeString) : new Date();
  if (!hideHours && !includeSeconds) {
    return format(date, 'hh:mm a');
  } else if (includeSeconds && (hideHours || date.getHours() === 0)) {
    return format(date, 'mm:ss a');
  } else {
    return format(date, 'hh:mm:ss a');
  }
}
