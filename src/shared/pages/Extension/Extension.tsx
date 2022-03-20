import React from 'react';
import Helmet from 'react-helmet';

import BasePanel from 'Components/BasePanel';
import { SITE_TITLE } from 'Root/src/shared/constants';
import { Button } from '@antoniodcorrea/components';

import './Extension.less';

interface Props {
  data: {
    [key: string]: {
      title: string;
      content: string;
    };
  };
  currentSlug: string;
  installExtension: () => void;
}

export const Extension: React.FC<Props> = ({ data, currentSlug, installExtension }) => (
  <>
    <Helmet title={`${SITE_TITLE} · Extension`} />
    <div className="Extension">
      <BasePanel>
        <h1 className="Extension-title">{data[currentSlug]?.title}</h1>
        <div className="Extension-text">{data[currentSlug]?.content}</div>
        <Button className="Extension-button" text="Install" onClick={installExtension} />
      </BasePanel>
    </div>
  </>
);
