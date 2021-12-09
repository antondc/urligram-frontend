import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { getConfigByEnv } from 'Root/src/shared/tools/utils/environment/getConfigByEnv';
import { Docs as DocsUi } from './Docs';

const Docs: React.FC = () => {
  const dispatch = useDispatch();
  const domain = getConfigByEnv('DOMAIN');
  const contactEmail = getConfigByEnv('CONTACT_EMAIL');
  const appName = getConfigByEnv('APP_NAME');

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <DocsUi domain={domain} contactEmail={contactEmail} appName={appName} />;
};

export default Docs;
