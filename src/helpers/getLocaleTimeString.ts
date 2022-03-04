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
  if (hideToggle) {
    return format(date, formatString);
  } else {
    return format(date, formatString + ' a');
  }
}
