export const mask = (value: string): string => {
  // replace non-numeric characters
  value = value.replace(/:|[a-zA-Z]/g, '');

  let totalCharactersInValue = value.length;

  if (totalCharactersInValue === 3) {
    return value.substr(0, 1) + ':' + value.substr(1);
  }

  if (totalCharactersInValue === 4) {
    return value.substr(0, 2) + ':' + value.substr(2);
  }

  return value;
};

export const validate = (
  value: string,
  maxHours: string,
  maxSeconds: string
): boolean => {
  let regex = new RegExp(
    `^(0?[1-${maxHours.slice(-1)}]|${maxHours.slice(0, -1)}[0-${maxHours.slice(
      -1
    )}]):[0-${maxSeconds.slice(0, -1)}][0-${maxSeconds.slice(-1)}]$`
  );
  return value.length ? regex.test(value) : true;
};
