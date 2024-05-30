const numberParser = (
  value: string,
  fallbackValue: number | null | undefined = undefined
) => {
  if (!isNaN(Number(value))) {
    return Number(value);
  } else {
    return nullAndUndefinedParser<number>(value, fallbackValue);
  }
};

const booleanParser = (
  value: string,
  fallbackValue: boolean | null | undefined = undefined
) => {
  const toLower = value.toLowerCase();
  if (toLower === "true") {
    return true;
  }
  if (toLower === "false") {
    return false;
  }
  return nullAndUndefinedParser<boolean>(value, fallbackValue);
};

const stringParser = (
  value: string,
  fallbackValue: string | null | undefined = undefined
) => {
  return nullAndUndefinedParser<string>(value, fallbackValue);
};

const nullAndUndefinedParser = <F>(
  value: string,
  fallbackValue: F | null | undefined
) => {
  if (value === "undefined") {
    return undefined;
  } else if (value === "null") {
    return null;
  } else {
    return fallbackValue;
  }
};

export const parsersUtil = {
  number: numberParser,
  boolean: booleanParser,
  string: stringParser,
};
