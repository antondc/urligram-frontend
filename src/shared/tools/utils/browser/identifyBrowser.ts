import { EXTENSION_CHROME, EXTENSION_FIREFOX } from 'Root/src/shared/constants';

export const identifyBrowser = (): 'ExtensionChrome' | 'ExtensionFirefox' | 'Browser' => {
  switch (true) {
    case navigator.userAgent.toLowerCase().includes('chrome'):
      return EXTENSION_CHROME;
    case navigator.userAgent.toLowerCase().includes('firefox'):
      return EXTENSION_FIREFOX;

    default:
      break;
  }
};
