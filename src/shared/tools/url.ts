export const buildEndpoint = (protocol: string, host: string, port: number): string => {
  const url = protocol + '://' + host + ':' + port;
  const stringifiedUrl = JSON.stringify(url);
  return stringifiedUrl;
};
