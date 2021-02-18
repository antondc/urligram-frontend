export const isDomAvailable = (): boolean => !!(typeof window !== 'undefined' && window.document);
