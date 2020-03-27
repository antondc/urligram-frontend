// Error handler
// @param {response} object received from fetch API and extract the text from the error
// @returns JSON
export const handleResponse = response => {
  return response.json().then(json => {
    if (!response.ok) {
      const error = Object.assign({}, json, {
        status: response.status,
        statusText: response.statusText,
      });

      return Promise.reject(error);
    }

    return json;
  });
};
