import React from 'react';

import Chrome from 'Assets/svg/browserChrome.svg';
import Firefox from 'Assets/svg/browserFirefox.svg';
import { CHROME_EXTENSION_URL, FIREFOX_EXTENSION_URL } from 'Root/config.test.json';

interface Props {
  appName: string;
  uiScreenTypeIsMobile: boolean;
}

export const Extension: React.FC<Props> = ({ appName, uiScreenTypeIsMobile }) => (
  <div className="Docs-section" id="extension">
    <h2 className="Docs-h2">Browser extension</h2>
    <h4 className="Docs-h4">Why do I need a browser extension?</h4>
    <p className="Docs-paragraph">
      You can access all functionalities of Urligram via its website, but we offer as well a browser extension for
      desktop to save links of websites while browsing. By installing it you will be able to save a page in your account
      on {appName} along with tags and lists, all without leaving the current page.
    </p>
    <h4 className="Docs-h4">How do I install the extension?</h4>
    {uiScreenTypeIsMobile ? (
      <p>
        We have an extension available for Desktop browsers. As you are currently on mobile you wont be able to download
        it. If you want to use it, please return in a desktop browser to this same page and follow the instructions to
        download it.
      </p>
    ) : (
      <p>
        First, visit the appropriate official store of your browser by clicking the link for{' '}
        <span className="Docs-linkWithIcon">
          <a className="Docs-link" href={FIREFOX_EXTENSION_URL} target="_blank" rel="noreferrer">
            Firefox
          </a>
          <Firefox className="Docs-iconFirefox" />
        </span>{' '}
        or{' '}
        <span className="Docs-linkWithIcon">
          <a className="Docs-link" href={CHROME_EXTENSION_URL} target="_blank" rel="noreferrer">
            Chrome
          </a>
          <Chrome className="Docs-iconChrome" />
        </span>
        . There you will be able to install it following the store instructions. Remember that you will need to be
        logged in in order to save bookmarks into your account.
      </p>
    )}
    <h4 className="Docs-h4">Does the extension share data with third parties?</h4>
    <p>No, {appName} does not share any data with other companies.</p>
  </div>
);
