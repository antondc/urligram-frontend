import React from 'react';

import { SkeletonItem } from 'Vendor/components';

import './UserRowSkeleton.less';

interface UserRowSkeleton {
  id: string;
}

export const UserRowSkeleton: React.FC<UserRowSkeleton> = ({ id }) => (
  <div className="UserRowSkeleton" data-test-id="UserRowSkeleton" key={id}>
    <div className="UserRowSkeleton-title">
      <SkeletonItem className="UserRowSkeleton-favicon" />
      <SkeletonItem className="UserRowSkeleton-titleText" />
    </div>
    <SkeletonItem className="UserRowSkeleton-description" />
    <div className="UserRowSkeleton-tags">
      <SkeletonItem className="UserRowSkeleton-tag" />
      <SkeletonItem className="UserRowSkeleton-tag" />
      <SkeletonItem className="UserRowSkeleton-tag" />
      <SkeletonItem className="UserRowSkeleton-tag" />
    </div>
    <div className="UserRowSkeleton-icons">
      <SkeletonItem className="UserRowSkeleton-image" />
    </div>
  </div>
);
