import { BROWSER_CHROME, BROWSER_FIREFOX } from 'Root/src/shared/constants';

export const identifyBrowser = (): 'Chrome' | 'Firefox' => {
  const userAgentLowerCase = navigator.userAgent.toLowerCase();

  switch (true) {
    case userAgentLowerCase.includes(BROWSER_CHROME.toLowerCase()):
      return BROWSER_CHROME;
    case userAgentLowerCase.includes(BROWSER_FIREFOX.toLowerCase()):
      return BROWSER_FIREFOX;

    default:
      break;
  }
};
