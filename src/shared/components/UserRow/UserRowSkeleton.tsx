import React from 'react';

import { SkeletonItem } from 'Vendor/components';

import './UserRowSkeleton.less';

interface UserRowSkeleton {
  id: string;
}

export const UserRowSkeleton: React.FC<UserRowSkeleton> = ({ id }) => (
  <div className="UserRowSkeleton" data-test-id="UserRowSkeleton" key={id}>
    <div className="UserRowSkeleton-main">
      <SkeletonItem className="UserRowSkeleton-name" />
      <SkeletonItem className="UserRowSkeleton-details" />
    </div>
    <div className="UserRowSkeleton-tags">
      <SkeletonItem className="UserRowSkeleton-tag" />
      <SkeletonItem className="UserRowSkeleton-tag" />
      <SkeletonItem className="UserRowSkeleton-tag" />
    </div>
    <div className="UserRowSkeleton-imageContainer">
      <SkeletonItem className="UserRowSkeleton-image" />
    </div>
  </div>
);

export default UserRowSkeleton;
