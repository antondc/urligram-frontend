import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useScrollToSection } from 'Hooks/useScrollToSection';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import { selectUiScreenTypeIsMobile } from 'Modules/Ui/selectors/selectUiScreenTypeIsMobile';
import { getConfigByEnv } from 'Root/src/shared/tools/utils/environment/getConfigByEnv';
import { Docs as DocsUi } from './Docs';

const Docs: React.FC = () => {
  const dispatch = useDispatch();
  const { scrollToSection } = useScrollToSection();
  const domain = getConfigByEnv('DOMAIN');
  const contactEmail = getConfigByEnv('CONTACT_EMAIL');
  const appName = getConfigByEnv('APP_NAME');
  const uiScreenTypeIsMobile = useSelector(selectUiScreenTypeIsMobile);

  const navigateToSection = (e: React.MouseEvent<HTMLElement>, hash: string) => {
    e.preventDefault();
    scrollToSection(hash);
  };

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <DocsUi
      domain={domain}
      contactEmail={contactEmail}
      appName={appName}
      navigateToSection={navigateToSection}
      uiScreenTypeIsMobile={uiScreenTypeIsMobile}
    />
  );
};

export default Docs;
