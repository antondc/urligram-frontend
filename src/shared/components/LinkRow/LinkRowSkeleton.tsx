import React from 'react';

import { Border, Hr, SkeletonItem } from '@antoniodcorrea/components';

import './LinkRowSkeleton.less';

interface LinkRowSkeleton {
  id: number;
}

export const LinkRowSkeleton: React.FC<LinkRowSkeleton> = ({ id }) => (
  <Border grow className="LinkRowSkeleton" data-test-id="LinkRowSkeleton" key={id}>
    <div className="LinkRowSkeleton-left">
      <div className="LinkRowSkeleton-leftTop">
        <div className="LinkRowSkeleton-icons">
          <SkeletonItem hollow className="LinkRowSkeleton-icon" />
          <SkeletonItem hollow className="LinkRowSkeleton-icon" />
          <SkeletonItem hollow className="LinkRowSkeleton-icon" />
        </div>
        <SkeletonItem hollow className="LinkRowSkeleton-title" />
        <Hr spacer size="zero" />
        <SkeletonItem hollow className="LinkRowSkeleton-url" />
      </div>
      <div className="LinkRowSkeleton-leftBottom">
        <SkeletonItem hollow className="LinkRowSkeleton-tag" />
        <SkeletonItem hollow className="LinkRowSkeleton-tag" />
        <SkeletonItem hollow className="LinkRowSkeleton-tag" />
      </div>
    </div>
    <div className="LinkRowSkeleton-right">
      <SkeletonItem hollow className="LinkRowSkeleton-image" />
      <div className="LinkRowSkeleton-rightEnd">
        <SkeletonItem hollow className="LinkRowSkeleton-vote" />
        <div className="LinkRowSkeleton-stats">
          <SkeletonItem hollow className="LinkRowSkeleton-stat" />
          <SkeletonItem hollow className="LinkRowSkeleton-stat" />
        </div>
      </div>
    </div>
  </Border>
);

export default LinkRowSkeleton;
