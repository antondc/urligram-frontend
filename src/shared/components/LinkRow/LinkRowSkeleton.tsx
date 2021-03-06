import React from 'react';

import { Border, SkeletonItem } from '@antoniodcorrea/components';

import './LinkRowSkeleton.less';

interface LinkRowSkeleton {
  id: number;
}

export const LinkRowSkeleton: React.FC<LinkRowSkeleton> = ({ id }) => (
  <Border grow className="LinkRowSkeleton" data-test-id="LinkRowSkeleton" key={id}>
    <div className="LinkRowSkeleton-left">
      <div className="LinkRowSkeleton-icons">
        <SkeletonItem className="LinkRowSkeleton-icon" />
        <SkeletonItem className="LinkRowSkeleton-icon" />
        <SkeletonItem className="LinkRowSkeleton-icon" />
      </div>
      <SkeletonItem className="LinkRowSkeleton-title" />
      <SkeletonItem className="LinkRowSkeleton-url" />
    </div>

    <div className="LinkRowSkeleton-right">
      <SkeletonItem className="LinkRowSkeleton-vote" />
      <SkeletonItem className="LinkRowSkeleton-stat" />
    </div>
  </Border>
);

export default LinkRowSkeleton;
