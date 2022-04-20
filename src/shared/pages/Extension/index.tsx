import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { CHROME_EXTENSION_URL, FIREFOX_EXTENSION_URL } from 'Root/config.test.json';
import { Browser, identifyBrowser } from 'Services/IdentifyBrowser';
import { Extension as ExtensionUi } from './Extension';
import ExtensionJson from './Extension.json';

const Extension: React.FC = () => {
  const dispatch = useDispatch();
  const currentSlug = useSelector(selectCurrentLanguageSlug);
  const browser = identifyBrowser();

  const installFirefoxExtension = () => {
    if (browser !== Browser.Firefox) {
      alert('Sorry, this is not a Firefox browser 🙄.');

      return;
    }
    window.location.href = FIREFOX_EXTENSION_URL;
  };

  const installChromeExtension = () => {
    if (browser !== Browser.Chrome) {
      alert('Sorry, this is not a Chrome browser 🙄.');

      return;
    }

    window.open(CHROME_EXTENSION_URL, '_blank');
  };

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <ExtensionUi
      data={ExtensionJson.data}
      currentSlug={currentSlug}
      installFirefoxExtension={installFirefoxExtension}
      installChromeExtension={installChromeExtension}
    />
  );
};

export default Extension;
