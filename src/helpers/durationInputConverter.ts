const padWithZero = (value: number): string => {
  if (value < 10) {
    return '0' + value;
  } else {
    return String(value);
  }
};

const durationInputConverter = (
  durationInSeconds: number,
  hideHours?: boolean,
  includeSeconds?: boolean
): string => {
  // convert duration in seconds to input string
  let seconds = durationInSeconds;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  const paddedMinutes = padWithZero(minutes);
  const paddedSeconds = padWithZero(seconds);
  if (!hideHours && !includeSeconds) {
    return `${hours}:${paddedMinutes} AM`;
  } else if (includeSeconds && (hideHours || hours === 0)) {
    return `${minutes}:${paddedSeconds} AM`;
  } else {
    return `${hours}:${paddedMinutes}:${paddedSeconds} AM`;
  }
};

export default durationInputConverter;
