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
    formatString = 'h:mm';
  } else if (includeSeconds && (hideHours || date.getHours() === 0)) {
    formatString = 'm:ss';
  } else {
    formatString = 'h:mm:ss';
  }
  if (hideToggle && formatString.startsWith('h')) {
    formatString = 'h' + formatString;
  } else if (!hideToggle) {
    formatString += ' a';
  }
  return format(date, formatString);
}
