import React from 'react';

import SidebarLeftDocs from 'Root/src/shared/components/SidebarLeftDocs';
import { About } from './About';
import { FAQ } from './FAQ';
import { Glossary } from './Glossary';
import { Legal } from './Legal';

import './Docs.less';

interface Props {
  domain: string;
  contactEmail: string;
  appName: string;
}

export const Docs: React.FC<Props> = ({ domain, contactEmail, appName }) => (
  <div className="Docs" id="docs">
    <div className="Docs-sidebar">
      <SidebarLeftDocs />
    </div>
    <div className="Docs-main">
      <FAQ />
      <Legal domain={domain} contactEmail={contactEmail} appName={appName} />
      <Glossary />
      <About domain={domain} contactEmail={contactEmail} appName={appName} />
    </div>
  </div>
);
