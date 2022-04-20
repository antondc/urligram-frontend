export enum Browser {
  Chrome,
  Firefox,
}

export const identifyBrowser = (): Browser => {
  switch (true) {
    case navigator.userAgent.toLowerCase().includes('chrome'):
      return Browser.Chrome;
    case navigator.userAgent.toLowerCase().includes('firefox'):
      return Browser.Firefox;

    default:
      break;
  }
};
