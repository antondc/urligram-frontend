import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useScrollToSection } from 'Hooks/useScrollToSection';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { getConfigByEnv } from 'Root/src/shared/tools/utils/environment/getConfigByEnv';
import { Docs as DocsUi } from './Docs';

const Docs: React.FC = () => {
  const dispatch = useDispatch();
  const { scrollToSection } = useScrollToSection();
  const domain = getConfigByEnv('DOMAIN');
  const contactEmail = getConfigByEnv('CONTACT_EMAIL');
  const appName = getConfigByEnv('APP_NAME');

  const navigateToSection = (e: React.MouseEvent<HTMLElement>, hash: string) => {
    e.preventDefault();
    scrollToSection(hash);
  };

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return <DocsUi domain={domain} contactEmail={contactEmail} appName={appName} navigateToSection={navigateToSection} />;
};

export default Docs;
