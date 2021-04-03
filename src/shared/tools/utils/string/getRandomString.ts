export const getRandomString = (length = 5): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  const array = Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * charactersLength)));
  const string = array.join('');

  return string;
};
