import React from 'react';

import { getConfigByEnv } from 'Root/src/shared/tools/utils/environment/getConfigByEnv';
import { Docs as DocsUi } from './Docs';

const Docs: React.FC = () => {
  const domain = getConfigByEnv('DOMAIN');
  const contactEmail = getConfigByEnv('CONTACT_EMAIL');
  const appName = getConfigByEnv('APP_NAME');

  return <DocsUi domain={domain} contactEmail={contactEmail} appName={appName} />;
};

export default Docs;
