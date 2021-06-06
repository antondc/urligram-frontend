import React from 'react';

import { Frame, SkeletonItem } from 'Vendor/components';

import './UserRowSkeleton.less';

interface UserRowSkeleton {
  id: string;
}

export const UserRowSkeleton: React.FC<UserRowSkeleton> = ({ id }) => (
  <Frame
    grow
    className="UserRowSkeleton"
    data-test-id="UserRowSkeleton"
    key={id}
    borderTop={false}
    borderLeft={false}
    borderRight={false}
    borderBottom={false}
  >
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
  </Frame>
);

export default UserRowSkeleton;
