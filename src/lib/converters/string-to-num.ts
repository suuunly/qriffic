export const stringToNum = (value: string, defaultValue = 0): number => {
  if (value == "") {
    return defaultValue;
  }

  const num = parseInt(value)
  if (Number.isNaN(num)) {
    return defaultValue;
  }

  return num;
}