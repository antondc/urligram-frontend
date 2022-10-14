export const DEFAULT_THROTTLE_VALUE = 10;

export const throttle = (functionParameter, delayParameter: number) => {
  let prev = 0;

  return (...args) => {
    const now = new Date().getTime();

    if (now - prev > delayParameter) {
      prev = now;

      return functionParameter(...args);
    }
  };
};
