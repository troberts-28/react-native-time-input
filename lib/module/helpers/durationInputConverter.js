const padWithZero = value => {
  if (value.length <= 1) {
    value.padStart(2, '00');
  }

  return value;
};

const durationInputConverter = (durationInSeconds, hideHours, includeSeconds) => {
  // convert duration in seconds to input string
  let seconds = durationInSeconds;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  const paddedMinutes = padWithZero(String(minutes));
  const paddedSeconds = padWithZero(String(seconds));

  if (!hideHours && !includeSeconds) {
    return `${hours}:${paddedMinutes} AM`;
  } else if (includeSeconds && (hideHours || hours === 0)) {
    return `${minutes}:${paddedSeconds} AM`;
  } else {
    return `${hours}:${paddedMinutes}:${paddedSeconds} AM`;
  }
};

export default durationInputConverter;
//# sourceMappingURL=durationInputConverter.js.map