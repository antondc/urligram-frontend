import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { FIREFOX_EXTENSION_URL } from 'Root/config.test.json';
import { Extension as ExtensionUi } from './Extension';
import ExtensionJson from './Extension.json';

const Extension: React.FC = () => {
  const dispatch = useDispatch();
  const currentSlug = useSelector(selectCurrentLanguageSlug);

  const installExtension = () => {
    window.open(FIREFOX_EXTENSION_URL, '_blank');
  };

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <ExtensionUi data={ExtensionJson.data} currentSlug={currentSlug} installExtension={installExtension} />;
};

export default Extension;
