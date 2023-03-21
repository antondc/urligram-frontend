import React from 'react';
import Helmet from 'react-helmet';

import SidebarLeftDocs from 'Components/SidebarLeftDocs';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { About } from './About';
import { Extension } from './Extension';
import { FAQ } from './FAQ';
import { Legal } from './Legal';

import './Docs.less';

interface Props {
  domain: string;
  contactEmail: string;
  appName: string;
  uiScreenTypeIsMobile: boolean;
  navigateToSection: (e: React.MouseEvent<HTMLElement>, hash: string) => void;
}

export const Docs: React.FC<Props> = ({ domain, contactEmail, appName, uiScreenTypeIsMobile, navigateToSection }) => (
  <>
    <Helmet title={`${SITE_TITLE} · Docs`} />
    <div className="Docs" id="docs">
      <div className="Docs-sidebar">
        <SidebarLeftDocs />
      </div>
      <div className="Docs-main">
        <FAQ navigateToSection={navigateToSection} />
        <Extension appName={appName} uiScreenTypeIsMobile={uiScreenTypeIsMobile} />
        <Legal domain={domain} contactEmail={contactEmail} appName={appName} />
        <About domain={domain} contactEmail={contactEmail} appName={appName} />
      </div>
    </div>
  </>
);
