import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { CHROME_EXTENSION_URL, FIREFOX_EXTENSION_URL } from 'Root/config.test.json';
import { Extension as ExtensionUi } from './Extension';
import ExtensionJson from './Extension.json';

const Extension: React.FC = () => {
  const dispatch = useDispatch();
  const currentSlug = useSelector(selectCurrentLanguageSlug);

  const installFirefoxExtension = () => {
    window.location.href = FIREFOX_EXTENSION_URL;
  };

  const installChromeExtension = () => {
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
