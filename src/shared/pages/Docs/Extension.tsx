import React from 'react';

import Chrome from 'Assets/svg/browserChrome.svg';
import Firefox from 'Assets/svg/browserFirefox.svg';
import { CHROME_EXTENSION_URL, FIREFOX_EXTENSION_URL } from 'Root/config.test.json';

export const Extension: React.FC = () => (
  <div className="Docs-section" id="extension">
    <h2 className="Docs-h2">Browser extension</h2>
    <h4 className="Docs-h4">How to download the extension?</h4>
    <p className="Docs-paragraph">
      Urligram works as a website, but there is also an extension to save bookmarks without having Urligram site open:
      this is very convenient to save bookmarks while browsing. Currently we have official extensions for{' '}
      <a className="Docs-link" href={FIREFOX_EXTENSION_URL} target="_blank" rel="noreferrer">
        Firefox
      </a>{' '}
      <Firefox className="Docs-iconFirefox" /> and{' '}
      <a className="Docs-link" href={CHROME_EXTENSION_URL} target="_blank" rel="noreferrer">
        Chrome
      </a>{' '}
      <Chrome className="Docs-iconChrome" />.
      <br />
      Just click and you will be redirected to the official site of your browser, where you can install it.
    </p>
  </div>
);
