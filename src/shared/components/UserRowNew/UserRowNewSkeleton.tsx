import React from 'react';

import { SkeletonItem } from '@antoniodcorrea/components';

import './UserRowNewSkeleton.less';

interface UserRowNewSkeleton {
  id: string;
}

export const UserRowNewSkeleton: React.FC<UserRowNewSkeleton> = ({ id }) => (
  <div className="UserRowNewSkeleton" data-test-id="UserRowNewSkeleton" key={id}>
    <div className="UserRowNewSkeleton-title">
      <SkeletonItem className="UserRowNewSkeleton-favicon" />
      <SkeletonItem className="UserRowNewSkeleton-titleText" />
    </div>
    <SkeletonItem className="UserRowNewSkeleton-description" />
    <div className="UserRowNewSkeleton-tags">
      <SkeletonItem className="UserRowNewSkeleton-tag" />
      <SkeletonItem className="UserRowNewSkeleton-tag" />
      <SkeletonItem className="UserRowNewSkeleton-tag" />
      <SkeletonItem className="UserRowNewSkeleton-tag" />
    </div>
    <div className="UserRowNewSkeleton-icons">
      <SkeletonItem className="UserRowNewSkeleton-image" />
    </div>
  </div>
);
