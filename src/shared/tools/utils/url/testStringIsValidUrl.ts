// https://gist.github.com/rodneyrehm/8013067

export const testStringIsValidUrl = (string: string): boolean => {
  const regex = /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;

  const stringIsValidUrl = regex.test(string);

  return stringIsValidUrl;
};
