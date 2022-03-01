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

  if (totalCharactersInValue === 5) {
    return (
      value.substr(0, 1) + ':' + value.substr(2, 2) + ':' + value.substr(3)
    );
  }

  if (totalCharactersInValue === 6) {
    return (
      value.substr(0, 2) + ':' + value.substr(2, 2) + ':' + value.substr(4)
    );
  }

  return value;
};

export const validate = (
  value: string,
  maxHours?: string,
  maxMinutes?: string,
  maxSeconds?: string,
  includeSeconds?: boolean,
  hideHours?: boolean
): boolean => {
  let rule = `[0-${maxMinutes?.slice(0, -1) ?? '5'}][0-${
    maxMinutes?.slice(-1) ?? '9'
  }]`;

  if (!hideHours) {
    rule =
      `^(0?[0-${maxHours?.slice(-1) ?? '9'}]|${
        '[0-' + maxHours?.slice(0, -1) + ']' ?? '1'
      }[0-${maxHours?.slice(-1) ?? '2'}]):` + rule;
  }

  if (includeSeconds) {
    rule += `(:[0-${maxSeconds?.slice(0, -1) ?? '5'}][0-${
      maxSeconds?.slice(-1) ?? '9'
    }])?$`;
  }

  const regex = new RegExp(rule);

  // regex = new RegExp(
  //   `^(0?[0-${maxHours?.slice(-1) ?? '9'}]|${
  //     '[0-' + maxHours?.slice(0, -1) + ']' ?? '1'
  //   }[0-${maxHours?.slice(-1) ?? '2'}]):[0-${
  //     maxMinutes?.slice(0, -1) ?? '5'
  //   }][0-${maxMinutes?.slice(-1) ?? '9'}]$`
  // );
  return value.length ? regex.test(value) : true;
};
