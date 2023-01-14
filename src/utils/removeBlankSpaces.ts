
export function removeBlankSpaces(string: string) {
  const stringWithSpacesRemoved = string.split(' ').filter((value) => value !== '').join(' ');

  return stringWithSpacesRemoved;
}
