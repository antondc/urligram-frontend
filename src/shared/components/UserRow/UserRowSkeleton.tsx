import React from 'react';

import { Border, SkeletonItem } from 'Vendor/components';

import './UserRowSkeleton.less';

interface UserRowSkeleton {
  id: string;
}

export const UserRowSkeleton: React.FC<UserRowSkeleton> = ({ id }) => (
  <Border grow className="UserRowSkeleton" data-test-id="UserRowSkeleton" key={id}>
    <div className="UserRowSkeleton-left">
      <SkeletonItem className="UserRowSkeleton-title" />
      <SkeletonItem className="UserRowSkeleton-url" />
    </div>
    <div className="UserRowSkeleton-center">
      <SkeletonItem className="UserRowSkeleton-tag" />
      <SkeletonItem className="UserRowSkeleton-tag" />
      <SkeletonItem className="UserRowSkeleton-tag" />
    </div>
    <div className="UserRowSkeleton-right">
      <SkeletonItem className="UserRowSkeleton-image" />
    </div>
  </Border>
);

export default UserRowSkeleton;
