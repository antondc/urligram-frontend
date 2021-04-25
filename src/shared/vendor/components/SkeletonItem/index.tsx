import React from 'react';

import './SkeletonItem.less';

interface Props {
  className?: string;
  hollow?: boolean;
}

export const SkeletonItem: React.FC<Props> = ({ className, hollow = false }) => (
  <span className={' SkeletonItem ' + (className ? className : ' ') + (hollow ? ' SkeletonItem' + '-hollow ' : ' ')}>
    {' '}
  </span>
);
