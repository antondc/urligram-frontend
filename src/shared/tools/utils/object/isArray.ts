export const isArray = (item: unknown): boolean => item && typeof item === 'object' && !!Array.isArray(item);
