// Decoder to convert values from string to int if that is possible; otherwise, return string

export const numberLikeToNumber = (str: string): string | number => (!isNaN(Number(str)) ? Number(str) : str);
