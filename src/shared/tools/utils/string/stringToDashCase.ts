export const stringToDashCase = (string: string): string => {
  if (!string) return '';

  const replacedDashes = string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])/g, '$1$2')
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .toLowerCase();

  return replacedDashes[0].toUpperCase() + replacedDashes.slice(1);
};
