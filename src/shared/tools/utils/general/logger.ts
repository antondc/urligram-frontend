import { ENVIRONMENT_DEV, ENVIRONMENT_STAGING } from 'Root/webpack/constants';

type ParamType = number | string | Record<string, any>;

export const logger = (a: ParamType, b?: ParamType, c?: ParamType, d?: ParamType): void => {
  if (process.env.ENVIRONMENT !== ENVIRONMENT_DEV && process.env.ENVIRONMENT !== ENVIRONMENT_STAGING) return;

  if (!d && !c && !b) {
    console.log(a);
  } else if (!d && !c) {
    console.log(a, b);
  } else if (!d) {
    console.log(a, b, c);
  } else {
    console.log(a, b, c, d);
  }
};
