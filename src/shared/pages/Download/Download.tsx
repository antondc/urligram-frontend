import React from 'react';
import Helmet from 'react-helmet';

import { SITE_TITLE } from 'Root/src/shared/constants';

import './Download.less';

interface Props {
  data: {
    [key: string]: {
      title: string;
      content: string;
    };
  };
  currentSlug: string;
}

export const Download: React.FC<Props> = ({ data, currentSlug }) => (
  <>
    <Helmet title={`${SITE_TITLE} · Download`} />
    <div className="Download">
      <div className="Download-content">
        <h1 className="Download-title">{data[currentSlug]?.title}</h1>
        <div className="Download-text">{data[currentSlug]?.content}</div>
      </div>
    </div>
  </>
);
