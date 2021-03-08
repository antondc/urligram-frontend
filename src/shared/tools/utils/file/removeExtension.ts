// Remove extension of file name
// @param {fileName} String
// @returns String
export const removeExtension = (fileName: string): string => fileName.replace(/\.[^/.]+$/, '');

export default removeExtension;
