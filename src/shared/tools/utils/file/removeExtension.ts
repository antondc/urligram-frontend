// Remove extension of file name
// @param {fileName} String
// @returns String
export const removeExtension = function (fileName) {
  return fileName.replace(/\.[^/.]+$/, '');
};

export default removeExtension;
