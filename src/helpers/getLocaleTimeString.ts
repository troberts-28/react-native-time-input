import { format } from 'date-fns';

export default function getLocaleTimeString(
  dateTimeString: Date | null = null,
  hideHours?: boolean,
  includeSeconds?: boolean,
  hideToggle?: boolean
): string {
  let date = dateTimeString ? new Date(dateTimeString) : new Date();
  let formatString: string;
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
