import React from 'react';

import './NoResults.less';

interface Props {
  className?: string;
  content: string;
}

const NoResults: React.FC<Props> = ({ className, content }) => (
  <div className={'NoResults' + (className ? ` ${className}` : '')}>{content}</div>
);

export default NoResults;
