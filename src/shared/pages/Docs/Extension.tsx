import React from 'react';

import Chrome from 'Assets/svg/browserChrome.svg';
import Firefox from 'Assets/svg/browserFirefox.svg';
import { CHROME_EXTENSION_URL, FIREFOX_EXTENSION_URL } from 'Root/config.test.json';

interface Props {
  appName: string;
}

export const Extension: React.FC<Props> = ({ appName }) => (
  <div className="Docs-section" id="extension">
    <h2 className="Docs-h2">Browser extension</h2>
    <h4 className="Docs-h4">Why do I need a browser extension?</h4>
    <p className="Docs-paragraph">
      You can access all functionalities of Urligram via its website. We offer as well a browser extension to save
      bookmarks while browsing. By installing it you will be able to save a page in your account on {appName} along with
      tags and lists, without leaving the current page.
    </p>
    <h4 className="Docs-h4">How do I install the extension?</h4>
    <p>
      Currently we have official extensions for{' '}
      <a className="Docs-link" href={FIREFOX_EXTENSION_URL} target="_blank" rel="noreferrer">
        Firefox
      </a>{' '}
      <Firefox className="Docs-iconFirefox" /> and{' '}
      <a className="Docs-link" href={CHROME_EXTENSION_URL} target="_blank" rel="noreferrer">
        Chrome
      </a>{' '}
      <Chrome className="Docs-iconChrome" />. Just click and you will be redirected to the official site of your
      browser, where you can install it.
    </p>
    <h4 className="Docs-h4">Does the extension share data with third parties?</h4>
    <p>No, {appName} does not share any data with other companies.</p>
  </div>
);
