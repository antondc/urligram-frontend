import Cookies from 'js-cookie';

import { SessionState } from 'Modules/Session/session.types';
import { identifyBrowser } from 'Tools/utils/browser/identifyBrowser';
import { EXTENSION_CHROME, EXTENSION_FIREFOX } from '../constants';

export class SessionDataStorage {
  private userAgent: 'ExtensionFirefox' | 'ExtensionChrome' | 'Browser';

  constructor() {
    const userAgent = identifyBrowser();

    this.userAgent = userAgent;
  }

  async get(field: string): Promise<SessionState> {
    if (this.userAgent === EXTENSION_CHROME) {
      const session = await this.getChromeData(field);

      return session;
    }
    if (this.userAgent === EXTENSION_FIREFOX) {
      const session = await this.getFirefoxData(field);

      return session;
    }

    return null;
  }

  async set(sessionData: SessionState): Promise<void> {
    if (this.userAgent === EXTENSION_CHROME) {
      await this.setChromeData(sessionData);

      return;
    }
    if (this.userAgent === EXTENSION_FIREFOX) {
      await this.setFirefoxData(sessionData);

      return;
    }

    return null;
  }

  async remove(field: string): Promise<void> {
    if (this.userAgent === EXTENSION_CHROME) {
      const session = await this.removeChromeData(field);

      return session;
    }
    if (this.userAgent === EXTENSION_FIREFOX) {
      const session = await this.removeFirefoxData();

      return session;
    }

    return null;
  }

  async removeAll(): Promise<void> {
    if (this.userAgent === EXTENSION_CHROME) {
      const session = await this.removeAllChromeData();

      return session;
    }
    if (this.userAgent === EXTENSION_FIREFOX) {
      const session = await this.removeAllFirefoxData();

      return session;
    }

    return null;
  }

  // EXTENSION FIREFOX
  async getFirefoxData(field: string): Promise<SessionState> {
    const storageRaw = await browser.storage.local.get(field);
    const storageStringified = JSON.stringify(storageRaw);
    const { Session } = JSON.parse(storageStringified);

    return Session;
  }

  async setFirefoxData(sessionData: SessionState): Promise<void> {
    await browser.storage.local.set({ Session: sessionData });
  }

  async removeFirefoxData(): Promise<void> {
    await browser.storage.local.remove('Session');
  }
  async removeAllFirefoxData(): Promise<void> {
    await browser.storage.local.clear();
  }

  // EXTENSION CHROME
  async getChromeData(field: string): Promise<SessionState> {
    const session = await new Promise(async (resolve) => {
      await chrome.storage.sync.get([field], async (result) => {
        await resolve(result);
      });
    });
    // alert(JSON.stringify(session, null, 4));
    // return session;
    // const storagePromise = new Promise((resolve) => {
    //   chrome.storage.local.get(['Session'], (data) => {
    //     resolve(data);
    //   });
    // });

    const storageStringified = JSON.stringify(session);
    const { Session } = JSON.parse(storageStringified);

    return Session;
  }

  async setChromeData(sessionData: SessionState): Promise<void> {
    return new Promise(async (resolve) => {
      await chrome.storage.sync.set({ Session: sessionData }, () => {
        resolve(undefined);
      });
    });
  }

  async removeChromeData(field: string): Promise<void> {
    chrome.storage.sync.remove([field]);
  }

  async removeAllChromeData(): Promise<void> {}

  // BROWSERS
  async getBrowserData(field: string): Promise<SessionState> {
    const session = Cookies.get(field);

    return session;
  }

  async setBrowserData(): Promise<void> {
    return null;
  }

  async removeBrowserData(field: string): Promise<void> {
    const session = Cookies.remove(field);

    return session;
  }

  async removeAllBrowserData(): Promise<void> {}
}
