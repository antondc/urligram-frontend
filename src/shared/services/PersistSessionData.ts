import { SessionState } from 'Modules/Session/session.types';
import { identifyBrowser } from 'Tools/utils/browser/identifyBrowser';
import { BROWSER_CHROME, BROWSER_FIREFOX } from '../constants';

export class PersistSessionData {
  private userAgent: string;

  constructor() {
    const userAgent = identifyBrowser();
    this.userAgent = userAgent;
  }

  async get(): Promise<SessionState> {
    if (this.userAgent === BROWSER_CHROME) {
      const session = await this.getChromeData();

      return session;
    }
    if (this.userAgent === BROWSER_FIREFOX) {
      const session = await this.getFirefoxData();

      return session;
    }

    return null;
  }

  async set(sessionData: SessionState): Promise<void> {
    if (this.userAgent === BROWSER_CHROME) {
      await this.setChromeData();

      return;
    }
    if (this.userAgent === BROWSER_FIREFOX) {
      await this.setFirefoxData(sessionData);

      return;
    }

    return null;
  }

  async remove(): Promise<void> {
    if (this.userAgent === BROWSER_CHROME) {
      const session = await this.removeChromeData();

      return session;
    }
    if (this.userAgent === BROWSER_FIREFOX) {
      const session = await this.removeFirefoxData();

      return session;
    }

    return null;
  }

  async removeAll(): Promise<void> {
    if (this.userAgent === BROWSER_CHROME) {
      const session = await this.removeAllChromeData();

      return session;
    }
    if (this.userAgent === BROWSER_FIREFOX) {
      const session = await this.removeAllFirefoxData();

      return session;
    }

    return null;
  }

  async getFirefoxData(): Promise<SessionState> {
    const storageRaw = await browser.storage.local.get('Session');
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

  async getChromeData(): Promise<SessionState> {
    const session = new Promise((resolve) => {
      chrome.storage.sync.get(['Session'], (result) => resolve(result.Session));
    });

    return session;
  }

  async setChromeData(): Promise<void> {}

  async removeChromeData(): Promise<void> {}

  async removeAllChromeData(): Promise<void> {}
}
