// Logs FormData to browser console
// @param {formdata} Object
// @returns Object
export const logFormData = (formdata) => {
  // Display the key/value pairs
  for (const pair of formdata.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
};
